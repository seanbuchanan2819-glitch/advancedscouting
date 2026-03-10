import { useState, useMemo, useEffect, useCallback } from "react";

/* ───────── Constants ───────── */
const STATS_API = "https://statsapi.mlb.com/api/v1";
const SAVANT_CSV = "https://baseballsavant.mlb.com/statcast_search/csv";
const AAA_SPORT_ID = 11;

const PITCH_COLORS = {
  FF: "#e63946", SI: "#d62828", FC: "#f4845f",
  ST: "#7b2cbf", SL: "#9d4edd", CU: "#48bfe3", KC: "#48bfe3",
  CH: "#2a9d8f", FS: "#2a9d8f", CS: "#2a9d8f",
  KN: "#999", EP: "#999", SC: "#999", FO: "#999",
};

const PITCH_LABELS = {
  FF: "4-Seam", SI: "Sinker", FC: "Cutter",
  ST: "Sweeper", SL: "Slider", CU: "Curve", KC: "Knuckle-Curve",
  CH: "Change", FS: "Splitter", CS: "Slow Curve",
  KN: "Knuckle", EP: "Eephus",
};

const FB_TYPES = new Set(["FF", "SI", "FC"]);

/* ───────── Utility ───────── */
const pct = (v) => v != null ? (v * 100).toFixed(1) + "%" : "—";
const dec3 = (v) => v != null ? v.toFixed(3) : "—";

function getGradeColor(val, metric) {
  if (val == null) return "#1a1a2e";
  const thresholds = {
    chase: { low: 0.22, high: 0.35 },
    whiff: { low: 0.2, high: 0.35 },
    xwoba: { low: 0.28, high: 0.38 },
    xavg: { low: 0.2, high: 0.28 },
    ctct: { low: 0.68, high: 0.82 },
  };
  const t = thresholds[metric];
  if (!t) return "#1a1a2e";
  const inverse = metric === "xwoba" || metric === "xavg" || metric === "ctct";
  if (inverse) {
    if (val <= t.low) return "#1a4a1a";
    if (val >= t.high) return "#4a1a1a";
  } else {
    if (val <= t.low) return "#4a1a1a";
    if (val >= t.high) return "#1a4a1a";
  }
  return "#2a2a1a";
}

/* ───────── CSV Parser ───────── */
function parseCSV(csv) {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = [];
  let cur = "", inQ = false;
  for (let i = 0; i < lines[0].length; i++) {
    if (lines[0][i] === '"') inQ = !inQ;
    else if (lines[0][i] === "," && !inQ) { headers.push(cur); cur = ""; }
    else cur += lines[0][i];
  }
  headers.push(cur);

  const rows = [];
  for (let r = 1; r < lines.length; r++) {
    if (!lines[r].trim()) continue;
    const vals = [];
    cur = ""; inQ = false;
    for (let i = 0; i < lines[r].length; i++) {
      if (lines[r][i] === '"') inQ = !inQ;
      else if (lines[r][i] === "," && !inQ) { vals.push(cur); cur = ""; }
      else cur += lines[r][i];
    }
    vals.push(cur);
    const obj = {};
    headers.forEach((h, i) => obj[h] = vals[i] || "");
    rows.push(obj);
  }
  return rows;
}

/* ───────── Statcast Helpers ───────── */
function isInZone(p) {
  const z = parseInt(p.zone);
  return z >= 1 && z <= 9;
}

function isSwing(p) {
  return ["hit_into_play", "foul", "swinging_strike", "swinging_strike_blocked",
    "foul_tip", "foul_bunt", "missed_bunt", "swinging_pitchout"].includes(p.description);
}

function isWhiff(p) {
  return ["swinging_strike", "swinging_strike_blocked", "foul_tip", "swinging_pitchout"]
    .includes(p.description);
}

function aggregatePitches(pitchArr) {
  const total = pitchArr.length;
  if (total === 0) return null;
  const outOfZone = pitchArr.filter(p => !isInZone(p));
  const swings = pitchArr.filter(p => isSwing(p));
  const whiffs = pitchArr.filter(p => isWhiff(p));
  const chaseSwings = outOfZone.filter(p => isSwing(p));
  const battedBalls = pitchArr.filter(p => p.launch_speed && parseFloat(p.launch_speed) > 0);
  const xbaVals = pitchArr
    .filter(p => p.estimated_ba_using_speedangle && p.estimated_ba_using_speedangle !== "0" && p.estimated_ba_using_speedangle !== "")
    .map(p => parseFloat(p.estimated_ba_using_speedangle));
  const xwobaVals = pitchArr
    .filter(p => p.estimated_woba_using_speedangle && p.estimated_woba_using_speedangle !== "0" && p.estimated_woba_using_speedangle !== "")
    .map(p => parseFloat(p.estimated_woba_using_speedangle));
  const evVals = battedBalls.map(p => parseFloat(p.launch_speed));

  return {
    pit: total,
    chase: outOfZone.length > 0 ? chaseSwings.length / outOfZone.length : null,
    whiff: swings.length > 0 ? whiffs.length / swings.length : null,
    xavg: xbaVals.length > 0 ? xbaVals.reduce((a, b) => a + b, 0) / xbaVals.length : null,
    xwoba: xwobaVals.length > 0 ? xwobaVals.reduce((a, b) => a + b, 0) / xwobaVals.length : null,
    avg_ev: evVals.length > 0 ? evVals.reduce((a, b) => a + b, 0) / evVals.length : null,
    max_ev: evVals.length > 0 ? Math.max(...evVals) : null,
    contact: swings.length > 0 ? (swings.length - whiffs.length) / swings.length : null,
  };
}

function buildMatchupData(pitchRows, pitcherArsenal) {
  // Group by batter
  const byBatter = {};
  pitchRows.forEach(p => {
    if (!p.batter || !p.pitch_type) return;
    if (!byBatter[p.batter]) byBatter[p.batter] = { pitches: [], stand: p.stand, name: "" };
    byBatter[p.batter].pitches.push(p);
  });

  const hitters = [];
  for (const [batterId, data] of Object.entries(byBatter)) {
    const allPitches = data.pitches;
    if (allPitches.length < 1) continue;

    // Per pitch type stats (only for pitcher's arsenal)
    const pitchStats = {};
    const arsenalSet = new Set(pitcherArsenal);
    allPitches.forEach(p => {
      if (!arsenalSet.has(p.pitch_type)) return;
      if (!pitchStats[p.pitch_type]) pitchStats[p.pitch_type] = [];
      pitchStats[p.pitch_type].push(p);
    });

    const stats = {};
    for (const [pt, arr] of Object.entries(pitchStats)) {
      stats[pt] = aggregatePitches(arr);
    }

    // FB vs OS aggregates
    const fbPitches = allPitches.filter(p => FB_TYPES.has(p.pitch_type));
    const osPitches = allPitches.filter(p => p.pitch_type && !FB_TYPES.has(p.pitch_type));
    const fbAgg = aggregatePitches(fbPitches);
    const osAgg = aggregatePitches(osPitches);
    const allAgg = aggregatePitches(allPitches);

    hitters.push({
      id: parseInt(batterId),
      name: "", // Will be filled from roster lookup
      bats: data.stand,
      totalPitches: allPitches.length,
      pitchStats: stats,
      fbAgg, osAgg, allAgg,
    });
  }

  return hitters;
}

/* ───────── API Functions ───────── */
async function fetchAAATeams(season) {
  const resp = await fetch(`${STATS_API}/teams?sportId=${AAA_SPORT_ID}&season=${season}`);
  const data = await resp.json();
  return (data.teams || []).map(t => ({
    id: t.id, name: t.name, abbreviation: t.abbreviation || "",
    teamName: t.teamName || "", league: t.league?.name || "",
    parentOrgId: t.parentOrgId || null,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

async function fetchRoster(teamId, season) {
  // Try fullSeason first, then active, then previous season
  const rosterTypes = [
    { type: "fullSeason", yr: season },
    { type: "active", yr: season },
    { type: "fullSeason", yr: season - 1 },
  ];
  let data = { roster: [] };
  for (const { type, yr } of rosterTypes) {
    const resp = await fetch(`${STATS_API}/teams/${teamId}/roster?rosterType=${type}&season=${yr}`);
    if (resp.ok) {
      const d = await resp.json();
      if ((d.roster || []).length > 0) { data = d; break; }
    }
  }
  if ((data.roster || []).length === 0) return { pitchers: [], hitters: [] };
  const roster = (data.roster || []).map(e => ({
    id: e.person.id, name: e.person.fullName,
    pos: e.position.abbreviation, posType: e.position.type,
  }));

  // Fetch player details (batting/throwing hand)
  const ids = roster.map(p => p.id).join(",");
  if (ids) {
    try {
      const detResp = await fetch(`${STATS_API}/people?personIds=${ids}`);
      const detData = await detResp.json();
      const details = {};
      (detData.people || []).forEach(p => {
        details[p.id] = { bats: p.batSide?.code || "", throws: p.pitchHand?.code || "" };
      });
      roster.forEach(p => {
        const d = details[p.id];
        if (d) { p.bats = d.bats; p.throws = d.throws; }
      });
    } catch (e) { /* ignore */ }
  }

  return {
    pitchers: roster.filter(p => p.posType === "Pitcher").sort((a, b) => a.name.localeCompare(b.name)),
    hitters: roster.filter(p => p.posType !== "Pitcher").sort((a, b) => a.name.localeCompare(b.name)),
  };
}

async function fetchPitcherStatcast(pitcherId, season) {
  const url = `${SAVANT_CSV}?all=true&player_type=pitcher&pitchers_lookup%5B%5D=${pitcherId}&hfSea=${season}%7C&type=details&`;
  const resp = await fetch(url);
  const text = await resp.text();
  return parseCSV(text);
}

/* ───────── UI Components ───────── */
function PitchBadge({ pitch }) {
  const color = PITCH_COLORS[pitch] || "#888";
  return (
    <span style={{
      background: color, color: "#fff", fontSize: "0.65rem",
      fontWeight: 700, borderRadius: 3, padding: "1px 5px",
      fontFamily: "monospace", letterSpacing: 0.5,
    }}>{pitch}</span>
  );
}

function StatCell({ value, metric }) {
  const bg = getGradeColor(value, metric);
  const display = (metric === "xwoba" || metric === "xavg") ? dec3(value) : pct(value);
  return (
    <td style={{
      background: bg, color: "#e0e0e0", textAlign: "center",
      padding: "3px 6px", fontSize: "0.72rem", fontFamily: "monospace",
      border: "1px solid #333",
    }}>{display}</td>
  );
}

function LoadingSpinner({ message }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: 40, color: "#888",
    }}>
      <div style={{
        width: 32, height: 32, border: "3px solid #333",
        borderTop: "3px solid #e63946", borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <div style={{ marginTop: 12, fontSize: "0.85rem" }}>{message || "Loading..."}</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function HitterMatchupCard({ hitter, pitcherArsenal }) {
  const { fbAgg, osAgg, allAgg, pitchStats, bats, name, totalPitches } = hitter;

  const batsBadge = { R: "#c8102e", L: "#1d6fa4", S: "#5a7a4a" }[bats] || "#555";

  // Weaknesses
  const weaknesses = [];
  if (allAgg) {
    if (allAgg.chase != null && allAgg.chase > 0.30) weaknesses.push("High chase%");
    if (allAgg.contact != null && allAgg.contact < 0.72) weaknesses.push("Poor contact");
    if (allAgg.avg_ev != null && allAgg.avg_ev < 85) weaknesses.push("Weak contact");
  }
  if (osAgg && fbAgg && osAgg.xwoba != null && fbAgg.xwoba != null && osAgg.xwoba < fbAgg.xwoba - 0.05) {
    weaknesses.push("Vulnerable off-speed");
  }

  // Sort pitch stats by whiff desc
  const sortedPitchStats = Object.entries(pitchStats || {})
    .filter(([, s]) => s && s.pit >= 1)
    .sort((a, b) => (b[1].whiff || 0) - (a[1].whiff || 0));

  return (
    <div style={{
      background: "#0d0d1a", border: "1px solid #2a2a4a",
      borderRadius: 6, marginBottom: 8, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #111130 0%, #1a1a3a 100%)",
        padding: "6px 10px", display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid #2a2a4a", flexWrap: "wrap",
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: "1.0rem", color: "#fff", letterSpacing: 1,
        }}>{name || `Batter #${hitter.id}`}</span>
        <span style={{
          background: batsBadge, color: "#fff", fontSize: "0.6rem",
          fontWeight: 800, borderRadius: 2, padding: "1px 5px",
        }}>{bats}</span>
        <span style={{
          color: "#666", fontSize: "0.6rem", fontFamily: "monospace",
        }}>{totalPitches} pitches</span>
        {weaknesses.map(w => (
          <span key={w} style={{
            background: "#3d1a00", color: "#ff9944", fontSize: "0.6rem",
            borderRadius: 2, padding: "1px 5px", border: "1px solid #663300",
          }}>⚠ {w}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Left: FB vs OS aggregate */}
        <div style={{ padding: "6px 8px" }}>
          {(fbAgg || osAgg) ? (
            <>
              <div style={{ marginBottom: 5 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.68rem" }}>
                  <thead>
                    <tr style={{ background: "#1a1a2e" }}>
                      <th style={{ color: "#888", padding: "2px 6px", textAlign: "left", border: "1px solid #333" }}>Type</th>
                      <th style={{ color: "#888", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>Pit</th>
                      <th style={{ color: "#888", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>Chase%</th>
                      <th style={{ color: "#888", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>Whiff%</th>
                      <th style={{ color: "#888", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>xwOBA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fbAgg && fbAgg.pit > 0 && (
                      <tr>
                        <td style={{ color: "#e63946", padding: "2px 6px", fontWeight: 700, border: "1px solid #333" }}>FB</td>
                        <td style={{ color: "#aaa", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>{fbAgg.pit}</td>
                        <StatCell value={fbAgg.chase} metric="chase" />
                        <StatCell value={fbAgg.whiff} metric="whiff" />
                        <StatCell value={fbAgg.xwoba} metric="xwoba" />
                      </tr>
                    )}
                    {osAgg && osAgg.pit > 0 && (
                      <tr>
                        <td style={{ color: "#457b9d", padding: "2px 6px", fontWeight: 700, border: "1px solid #333" }}>OS</td>
                        <td style={{ color: "#aaa", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>{osAgg.pit}</td>
                        <StatCell value={osAgg.chase} metric="chase" />
                        <StatCell value={osAgg.whiff} metric="whiff" />
                        <StatCell value={osAgg.xwoba} metric="xwoba" />
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Summary stats */}
              {allAgg && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { label: "Ctct%", val: pct(allAgg.contact), raw: allAgg.contact, metric: "ctct" },
                    { label: "AvgEV", val: allAgg.avg_ev != null ? allAgg.avg_ev.toFixed(1) : "—" },
                    { label: "MaxEV", val: allAgg.max_ev != null ? allAgg.max_ev.toFixed(1) : "—" },
                  ].map(g => (
                    <div key={g.label} style={{ textAlign: "center" }}>
                      <div style={{ color: "#666", fontSize: "0.55rem" }}>{g.label}</div>
                      <div style={{ color: "#ccc", fontSize: "0.75rem", fontFamily: "monospace" }}>{g.val}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: "#555", fontSize: "0.7rem", padding: 4 }}>Insufficient data</div>
          )}
        </div>

        {/* Right: Per-pitch matchup */}
        <div style={{ padding: "6px 8px", borderLeft: "1px solid #1a1a3a" }}>
          {sortedPitchStats.length > 0 && (
            <div>
              <div style={{ color: "#666", fontSize: "0.58rem", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>vs. Pitcher Arsenal</div>
              {sortedPitchStats.map(([pitch, stats]) => (
                <div key={pitch} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                  <PitchBadge pitch={pitch} />
                  <span style={{ color: "#666", fontSize: "0.58rem" }}>{stats.pit}p</span>
                  <span style={{ color: "#aaa", fontSize: "0.62rem", fontFamily: "monospace" }}>
                    Whiff {pct(stats.whiff)}
                  </span>
                  <span style={{ color: "#888", fontSize: "0.6rem", fontFamily: "monospace" }}>
                    Chase {pct(stats.chase)}
                  </span>
                  <span style={{
                    color: stats.xavg != null && stats.xavg < 0.2 ? "#44aa44" : "#cc6644",
                    fontSize: "0.6rem", fontFamily: "monospace",
                  }}>
                    xAVG {dec3(stats.xavg)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Main App ───────── */
export default function App() {
  const currentYear = new Date().getFullYear();
  const season = currentYear;

  // Data state
  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  // Selection state
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [selectedPitcherId, setSelectedPitcherId] = useState(null);
  const [opponentTeamId, setOpponentTeamId] = useState(null);

  // Roster state
  const [teamRoster, setTeamRoster] = useState(null);
  const [opponentRoster, setOpponentRoster] = useState(null);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [loadingOpponent, setLoadingOpponent] = useState(false);

  // Statcast state
  const [pitchData, setPitchData] = useState(null);
  const [loadingPitchData, setLoadingPitchData] = useState(false);
  const [matchupHitters, setMatchupHitters] = useState([]);
  const [pitcherArsenal, setPitcherArsenal] = useState([]);
  const [pitcherInfo, setPitcherInfo] = useState(null);

  // Fetch AAA teams on mount
  useEffect(() => {
    fetchAAATeams(season).then(t => {
      setTeams(t);
      setLoadingTeams(false);
    }).catch(() => setLoadingTeams(false));
  }, [season]);

  // Fetch roster when team selected
  useEffect(() => {
    if (!selectedTeamId) { setTeamRoster(null); return; }
    setLoadingRoster(true);
    setSelectedPitcherId(null);
    setPitchData(null);
    setMatchupHitters([]);
    fetchRoster(selectedTeamId, season).then(r => {
      setTeamRoster(r);
      setLoadingRoster(false);
    });
  }, [selectedTeamId, season]);

  // Fetch opponent roster
  useEffect(() => {
    if (!opponentTeamId) { setOpponentRoster(null); return; }
    setLoadingOpponent(true);
    fetchRoster(opponentTeamId, season).then(r => {
      setOpponentRoster(r);
      setLoadingOpponent(false);
    });
  }, [opponentTeamId, season]);

  // Fetch Statcast data when pitcher selected
  useEffect(() => {
    if (!selectedPitcherId) { setPitchData(null); setMatchupHitters([]); setPitcherArsenal([]); return; }
    setLoadingPitchData(true);
    (async () => {
      const pitches = await fetchPitcherStatcast(selectedPitcherId, season);
      try {
      setPitchData(pitches);

      // Build arsenal
      const ptCounts = {};
      const ptSpeeds = {};
      pitches.forEach(p => {
        if (!p.pitch_type) return;
        ptCounts[p.pitch_type] = (ptCounts[p.pitch_type] || 0) + 1;
        if (p.release_speed) {
          if (!ptSpeeds[p.pitch_type]) ptSpeeds[p.pitch_type] = [];
          ptSpeeds[p.pitch_type].push(parseFloat(p.release_speed));
        }
      });
      const arsenal = Object.entries(ptCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([pt, count]) => ({
          pitch: pt,
          count,
          usage: count / pitches.length,
          avgVelo: ptSpeeds[pt] ? (ptSpeeds[pt].reduce((a, b) => a + b, 0) / ptSpeeds[pt].length).toFixed(1) : null,
        }));
      setPitcherArsenal(arsenal);

      // Get pitcher info
      if (pitches.length > 0) {
        setPitcherInfo({
          name: pitches[0].player_name || "Unknown",
          throws: pitches[0].p_throws || "",
          totalPitches: pitches.length,
        });
      }

      // Build matchup data
      const arsenalTypes = arsenal.map(a => a.pitch);
      const hitters = buildMatchupData(pitches, arsenalTypes);

      // Resolve batter names from MLB Stats API
      const batterIds = hitters.map(h => h.id);
      if (batterIds.length > 0) {
        try {
          const batchSize = 100;
          const nameMap = {};
          for (let i = 0; i < batterIds.length; i += batchSize) {
            const batch = batterIds.slice(i, i + batchSize);
            const resp = await fetch(`${STATS_API}/people?personIds=${batch.join(",")}`);
            const data = await resp.json();
            (data.people || []).forEach(p => {
              nameMap[p.id] = {
                name: p.fullName || p.lastFirstName || "",
                bats: p.batSide?.code || "",
              };
            });
          }
          hitters.forEach(h => {
            const info = nameMap[h.id];
            if (info) {
              h.name = info.name;
              if (!h.bats || h.bats === "?") h.bats = info.bats;
            }
          });
        } catch (e) { /* name resolution failed, use IDs */ }
      }

      setMatchupHitters(hitters);
      setLoadingPitchData(false);
      } catch (err) {
        console.error("Statcast processing error:", err);
        setLoadingPitchData(false);
      }
    })();
  }, [selectedPitcherId, season]);

  // Resolve hitter names from opponent roster
  const enrichedHitters = useMemo(() => {
    if (!matchupHitters.length) return [];
    const rosterMap = {};
    if (opponentRoster) {
      [...opponentRoster.hitters, ...opponentRoster.pitchers].forEach(p => {
        rosterMap[p.id] = p;
      });
    }
    // Also try to map ALL hitters from ALL teams (we have the pitch data with batter IDs)
    return matchupHitters.map(h => {
      const rosterPlayer = rosterMap[h.id];
      return {
        ...h,
        name: rosterPlayer?.name || h.name || `Player #${h.id}`,
        bats: h.bats || rosterPlayer?.bats || "?",
      };
    });
  }, [matchupHitters, opponentRoster]);

  // Filter hitters by opponent team
  const filteredHitters = useMemo(() => {
    if (!opponentTeamId || !opponentRoster) return enrichedHitters;
    const opponentIds = new Set([
      ...opponentRoster.hitters.map(p => p.id),
      ...opponentRoster.pitchers.map(p => p.id),
    ]);
    const filtered = enrichedHitters.filter(h => opponentIds.has(h.id));
    // If no matches found (pitcher hasn't faced this team), show all
    if (filtered.length === 0) return enrichedHitters;
    return filtered;
  }, [enrichedHitters, opponentTeamId, opponentRoster]);

  const selectedTeam = teams.find(t => t.id === selectedTeamId);
  const selectedPitcher = teamRoster?.pitchers?.find(p => p.id === selectedPitcherId);
  const opponentTeam = teams.find(t => t.id === opponentTeamId);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#090914", color: "#e0e0e0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: 260, background: "#0a0a1a", borderRight: "1px solid #1a1a3a",
        padding: 12, overflowY: "auto", flexShrink: 0,
      }}>
        <div style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontSize: "0.65rem", color: "#888", letterSpacing: 2, textTransform: "uppercase" }}>
          ADVANCED SCOUTING
        </div>
        <div style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontSize: "1.3rem", color: "#fff", letterSpacing: 2, marginBottom: 16 }}>
          STATCAST LIVE
        </div>

        {/* Team Select */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ color: "#888", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Pitcher's Team</div>
          <select
            value={selectedTeamId || ""}
            onChange={e => setSelectedTeamId(e.target.value ? parseInt(e.target.value) : null)}
            style={{
              width: "100%", background: "#111128", color: "#e0e0e0", border: "1px solid #2a2a4a",
              borderRadius: 4, padding: "6px 8px", fontSize: "0.8rem",
            }}
          >
            <option value="">Select Team...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {/* Pitcher Select */}
        {selectedTeamId && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#888", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Pitcher</div>
            {loadingRoster ? <LoadingSpinner message="Loading roster..." /> : (
              <select
                value={selectedPitcherId || ""}
                onChange={e => setSelectedPitcherId(e.target.value ? parseInt(e.target.value) : null)}
                style={{
                  width: "100%", background: "#111128", color: "#e0e0e0", border: "1px solid #2a2a4a",
                  borderRadius: 4, padding: "6px 8px", fontSize: "0.8rem",
                }}
              >
                <option value="">Select Pitcher...</option>
                {(teamRoster?.pitchers || []).map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.throws || "?"}HP)</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Opponent Filter */}
        {selectedPitcherId && pitchData && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#888", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Opponent Team</div>
            <select
              value={opponentTeamId || ""}
              onChange={e => setOpponentTeamId(e.target.value ? parseInt(e.target.value) : null)}
              style={{
                width: "100%", background: "#111128", color: "#e0e0e0", border: "1px solid #2a2a4a",
                borderRadius: 4, padding: "6px 8px", fontSize: "0.8rem",
              }}
            >
              <option value="">All Opponents</option>
              {teams.filter(t => t.id !== selectedTeamId).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        )}

        {/* Pitcher Arsenal */}
        {pitcherArsenal.length > 0 && (
          <div style={{ marginTop: 16, borderTop: "1px solid #1a1a3a", paddingTop: 12 }}>
            <div style={{ color: "#888", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Pitcher Arsenal</div>
            {pitcherArsenal.map(a => (
              <div key={a.pitch} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <PitchBadge pitch={a.pitch} />
                <span style={{ color: "#aaa", fontSize: "0.7rem", fontFamily: "monospace" }}>
                  {a.avgVelo ? `${a.avgVelo} mph` : ""}
                </span>
                <span style={{ color: "#666", fontSize: "0.65rem" }}>
                  {(a.usage * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div style={{ marginTop: 16, borderTop: "1px solid #1a1a3a", paddingTop: 12 }}>
          <div style={{ color: "#666", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Color Legend</div>
          {[
            { color: "#1a4a1a", label: "Favorable (pitcher)" },
            { color: "#2a2a1a", label: "Neutral" },
            { color: "#4a1a1a", label: "Unfavorable (pitcher)" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <div style={{ width: 12, height: 12, background: l.color, borderRadius: 2, border: "1px solid #333" }} />
              <span style={{ color: "#888", fontSize: "0.6rem" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(90deg, #1a0000 0%, #0d0d1a 50%, #00001a 100%)",
          borderRadius: 8, padding: "12px 16px", marginBottom: 12,
          borderBottom: "2px solid #e63946",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#888", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 2 }}>
                {selectedTeam ? selectedTeam.name.toUpperCase() : "SELECT A TEAM"} • ADVANCE SCOUTING
              </div>
              <div style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontSize: "1.6rem", color: "#fff", letterSpacing: 2 }}>
                {selectedPitcher ? `${selectedPitcher.name} - ${selectedPitcher.throws || "?"}HP` : "Select a Pitcher"}
              </div>
              {pitcherArsenal.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                  <span style={{ color: "#888", fontSize: "0.7rem" }}>Throws: {pitcherInfo?.throws || "?"} •</span>
                  <span style={{ color: "#888", fontSize: "0.7rem" }}>Arsenal:</span>
                  {pitcherArsenal.map(a => <PitchBadge key={a.pitch} pitch={a.pitch} />)}
                </div>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#e63946", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1 }}>SCOUTING REPORT</div>
              <div style={{ color: "#555", fontSize: "0.6rem" }}>Live Statcast Data • {season}</div>
              {pitcherInfo && (
                <div style={{ color: "#555", fontSize: "0.6rem" }}>{pitcherInfo.totalPitches} pitches tracked</div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {loadingTeams ? (
          <LoadingSpinner message="Loading AAA teams..." />
        ) : !selectedTeamId ? (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>⚾</div>
            <div style={{ fontSize: "1rem" }}>Select a team and pitcher to generate a scouting report</div>
            <div style={{ fontSize: "0.8rem", marginTop: 8 }}>Data sourced live from MLB Statcast for all AAA games</div>
          </div>
        ) : !selectedPitcherId ? (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: "1rem" }}>Select a pitcher from the sidebar</div>
          </div>
        ) : loadingPitchData ? (
          <LoadingSpinner message={`Fetching Statcast data for ${selectedPitcher?.name || "pitcher"}...`} />
        ) : filteredHitters.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#555" }}>
            <div style={{ fontSize: "1rem" }}>No matchup data available</div>
            <div style={{ fontSize: "0.8rem", marginTop: 8 }}>
              {opponentTeamId
                ? "This pitcher hasn't faced any batters from the selected opponent team. Try selecting 'All Opponents' to see all matchups."
                : "No Statcast pitch data found for this pitcher in the current season."}
            </div>
          </div>
        ) : (
          <>
            <div style={{
              background: "#111130", borderRadius: 6, padding: "8px 12px",
              marginBottom: 12, borderLeft: "3px solid #e63946",
            }}>
              <span style={{ color: "#e63946", fontWeight: 700, fontSize: "0.85rem" }}>
                {opponentTeam ? opponentTeam.name : "All Opponents"}
              </span>
              <span style={{ color: "#666", fontSize: "0.75rem", marginLeft: 8 }}>
                {filteredHitters.length} hitters • vs. {selectedPitcher?.name}
              </span>
            </div>
            {filteredHitters
              .sort((a, b) => (b.totalPitches || 0) - (a.totalPitches || 0))
              .map(h => (
                <HitterMatchupCard key={h.id} hitter={h} pitcherArsenal={pitcherArsenal} />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
