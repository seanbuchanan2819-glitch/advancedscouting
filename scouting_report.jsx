import { useState, useMemo } from "react";

const HITTERS_DATA = [{"id": 77491, "name": "Bride, Jonah", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2700, "chase": 0.203, "avg_uev": 75, "avg_ev": 81.9, "max_ev": 107.3, "ctct": 0.827}, "grades_lhp": {"pit": 1292, "chase": 0.203, "avg_uev": 76, "avg_ev": 81.1, "max_ev": 106.6, "ctct": 0.803}, "pitch_stats": {"L_swSL": {"pit": 87, "zsw": null, "chase": 0.179, "whiff": 0.45, "xavg": 0.022, "xslg": 0.023}, "L_FC": {"pit": 120, "zsw": 0.29, "chase": 0.109, "whiff": 0.2, "xavg": 0.253, "xslg": 0.385}, "L_shSL": {"pit": 127, "zsw": 0.028, "chase": 0.162, "whiff": 0.275, "xavg": 0.184, "xslg": 0.233}, "L_CU": {"pit": 150, "zsw": null, "chase": 0.198, "whiff": 0.293, "xavg": 0.17, "xslg": 0.227}, "L_FT": {"pit": 194, "zsw": 0.301, "chase": 0.195, "whiff": 0.171, "xavg": 0.338, "xslg": 0.513}, "R_CU": {"pit": 202, "zsw": 0.051, "chase": 0.234, "whiff": 0.286, "xavg": 0.213, "xslg": 0.356}, "R_CH/SP": {"pit": 214, "zsw": 0.316, "chase": 0.295, "whiff": 0.253, "xavg": 0.186, "xslg": 0.314}, "L_CH/SP": {"pit": 245, "zsw": 0.126, "chase": 0.221, "whiff": 0.274, "xavg": 0.216, "xslg": 0.41}, "R_swSL": {"pit": 273, "zsw": 0.044, "chase": 0.235, "whiff": 0.216, "xavg": 0.15, "xslg": 0.222}, "R_FC": {"pit": 293, "zsw": 0.187, "chase": 0.083, "whiff": 0.157, "xavg": 0.289, "xslg": 0.411}, "L_FF": {"pit": 369, "zsw": 0.208, "chase": 0.257, "whiff": 0.082, "xavg": 0.261, "xslg": 0.343}, "R_shSL": {"pit": 458, "zsw": 0.049, "chase": 0.152, "whiff": 0.302, "xavg": 0.2, "xslg": 0.381}, "R_FT": {"pit": 469, "zsw": 0.225, "chase": 0.184, "whiff": 0.111, "xavg": 0.29, "xslg": 0.469}, "R_FF": {"pit": 791, "zsw": 0.223, "chase": 0.237, "whiff": 0.098, "xavg": 0.318, "xslg": 0.572}}, "cc_agg": {"LFB": {"pit": 683, "zsw": 0.25, "whiff": 0.874, "rv": 0.005, "xwoba": 0.37}, "LOS": {"pit": 364, "zsw": 0.009, "whiff": 0.683, "rv": 0.001, "xwoba": 0.265}, "RFB": {"pit": 1553, "zsw": 0.217, "whiff": 0.889, "rv": 0.012, "xwoba": 0.408}, "ROS": {"pit": 933, "zsw": 0.048, "whiff": 0.729, "rv": -0.001, "xwoba": 0.268}}, "approach": {}}, {"id": 138816, "name": "Cauley, Cameron", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2529, "chase": 0.286, "avg_uev": 78, "avg_ev": 82.3, "max_ev": 113.2, "ctct": 0.685}, "grades_lhp": {"pit": 769, "chase": 0.241, "avg_uev": 79, "avg_ev": 84.2, "max_ev": 108.9, "ctct": 0.718}, "pitch_stats": {"L_swSL": {"pit": 26, "zsw": null, "chase": 0.2, "whiff": 0.455, "xavg": 0.092, "xslg": 0.116}, "L_FT": {"pit": 46, "zsw": 0.303, "chase": 0.0, "whiff": 0.111, "xavg": 0.37, "xslg": 0.503}, "L_FC": {"pit": 56, "zsw": 0.549, "chase": 0.2, "whiff": 0.241, "xavg": 0.246, "xslg": 0.483}, "L_shSL": {"pit": 65, "zsw": 0.721, "chase": 0.387, "whiff": 0.447, "xavg": 0.301, "xslg": 0.393}, "L_CU": {"pit": 112, "zsw": 0.55, "chase": 0.23, "whiff": 0.17, "xavg": 0.233, "xslg": 0.41}, "L_CH/SP": {"pit": 145, "zsw": 0.446, "chase": 0.19, "whiff": 0.339, "xavg": 0.208, "xslg": 0.295}, "R_CH/SP": {"pit": 169, "zsw": 0.548, "chase": 0.245, "whiff": 0.35, "xavg": 0.15, "xslg": 0.237}, "R_CU": {"pit": 180, "zsw": 0.476, "chase": 0.275, "whiff": 0.293, "xavg": 0.205, "xslg": 0.32}, "R_FT": {"pit": 237, "zsw": 0.535, "chase": 0.294, "whiff": 0.246, "xavg": 0.279, "xslg": 0.449}, "R_FC": {"pit": 263, "zsw": 0.469, "chase": 0.148, "whiff": 0.361, "xavg": 0.231, "xslg": 0.401}, "R_swSL": {"pit": 291, "zsw": 0.572, "chase": 0.275, "whiff": 0.338, "xavg": 0.271, "xslg": 0.572}, "L_FF": {"pit": 319, "zsw": 0.682, "chase": 0.28, "whiff": 0.274, "xavg": 0.238, "xslg": 0.4}, "R_shSL": {"pit": 399, "zsw": 0.516, "chase": 0.273, "whiff": 0.391, "xavg": 0.183, "xslg": 0.319}, "R_FF": {"pit": 990, "zsw": 0.617, "chase": 0.341, "whiff": 0.286, "xavg": 0.213, "xslg": 0.443}}, "cc_agg": {"LFB": {"pit": 421, "zsw": 0.631, "whiff": 0.744, "rv": 0.003, "xwoba": 0.349}, "LOS": {"pit": 203, "zsw": 0.627, "whiff": 0.696, "rv": 0.004, "xwoba": 0.315}, "RFB": {"pit": 1490, "zsw": 0.57, "whiff": 0.71, "rv": -0.004, "xwoba": 0.322}, "ROS": {"pit": 870, "zsw": 0.526, "whiff": 0.647, "rv": 0.003, "xwoba": 0.309}}, "approach": {}}, {"id": 92882, "name": "Chavez, Frainyer", "bats": "S", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2577, "chase": 0.276, "avg_uev": 75, "avg_ev": 80.2, "max_ev": 110.4, "ctct": 0.766}, "grades_lhp": {"pit": 874, "chase": 0.241, "avg_uev": 78, "avg_ev": 80.2, "max_ev": 104.5, "ctct": 0.801}, "pitch_stats": {"L_swSL": {"pit": 32, "zsw": null, "chase": 0.304, "whiff": 0.25, "xavg": 0.036, "xslg": 0.051}, "R_swSL": {"pit": 77, "zsw": 0.413, "chase": 0.351, "whiff": 0.282, "xavg": 0.257, "xslg": 0.397}, "L_FC": {"pit": 85, "zsw": 0.189, "chase": 0.22, "whiff": 0.324, "xavg": 0.224, "xslg": 0.307}, "L_shSL": {"pit": 88, "zsw": 0.141, "chase": 0.333, "whiff": 0.209, "xavg": 0.301, "xslg": 0.376}, "L_CU": {"pit": 93, "zsw": 0.17, "chase": 0.347, "whiff": 0.22, "xavg": 0.197, "xslg": 0.259}, "L_FT": {"pit": 110, "zsw": 0.489, "chase": 0.214, "whiff": 0.132, "xavg": 0.272, "xslg": 0.282}, "L_CH/SP": {"pit": 142, "zsw": 0.18, "chase": 0.238, "whiff": 0.288, "xavg": 0.266, "xslg": 0.308}, "R_FT": {"pit": 202, "zsw": 0.454, "chase": 0.221, "whiff": 0.181, "xavg": 0.26, "xslg": 0.368}, "R_shSL": {"pit": 236, "zsw": 0.246, "chase": 0.367, "whiff": 0.346, "xavg": 0.119, "xslg": 0.162}, "R_FC": {"pit": 260, "zsw": 0.54, "chase": 0.372, "whiff": 0.207, "xavg": 0.388, "xslg": 0.596}, "R_CU": {"pit": 291, "zsw": 0.08, "chase": 0.252, "whiff": 0.268, "xavg": 0.219, "xslg": 0.322}, "L_FF": {"pit": 324, "zsw": 0.289, "chase": 0.178, "whiff": 0.141, "xavg": 0.28, "xslg": 0.389}, "R_CH/SP": {"pit": 412, "zsw": 0.482, "chase": 0.26, "whiff": 0.257, "xavg": 0.204, "xslg": 0.287}, "R_FF": {"pit": 1099, "zsw": 0.505, "chase": 0.252, "whiff": 0.211, "xavg": 0.212, "xslg": 0.306}}, "cc_agg": {"LFB": {"pit": 519, "zsw": 0.323, "whiff": 0.833, "rv": -0.002, "xwoba": 0.328}, "LOS": {"pit": 213, "zsw": 0.142, "whiff": 0.781, "rv": -0.006, "xwoba": 0.278}, "RFB": {"pit": 1561, "zsw": 0.505, "whiff": 0.793, "rv": -0.002, "xwoba": 0.33}, "ROS": {"pit": 604, "zsw": 0.178, "whiff": 0.696, "rv": -0.009, "xwoba": 0.255}}, "approach": {}}, {"id": 155983, "name": "Figuereo, Gleider", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2755, "chase": 0.32, "avg_uev": 79, "avg_ev": 82.1, "max_ev": 111.1, "ctct": 0.705}, "grades_lhp": {"pit": 671, "chase": 0.32, "avg_uev": 75, "avg_ev": 77.7, "max_ev": 106.3, "ctct": 0.627}, "pitch_stats": {"L_FT": {"pit": 34, "zsw": null, "chase": 0.143, "whiff": 0.333, "xavg": 0.234, "xslg": 0.376}, "L_CH/SP": {"pit": 39, "zsw": 0.395, "chase": 0.36, "whiff": 0.375, "xavg": 0.0, "xslg": 0.0}, "L_CU": {"pit": 64, "zsw": 0.565, "chase": 0.222, "whiff": 0.346, "xavg": 0.265, "xslg": 0.39}, "L_FC": {"pit": 67, "zsw": 0.465, "chase": 0.387, "whiff": 0.324, "xavg": 0.33, "xslg": 0.675}, "L_swSL": {"pit": 89, "zsw": 0.441, "chase": 0.391, "whiff": 0.578, "xavg": 0.189, "xslg": 0.388}, "L_shSL": {"pit": 112, "zsw": 0.609, "chase": 0.373, "whiff": 0.566, "xavg": 0.138, "xslg": 0.212}, "R_swSL": {"pit": 129, "zsw": 0.267, "chase": 0.276, "whiff": 0.279, "xavg": 0.171, "xslg": 0.407}, "R_FT": {"pit": 177, "zsw": 0.782, "chase": 0.195, "whiff": 0.157, "xavg": 0.293, "xslg": 0.492}, "R_FC": {"pit": 246, "zsw": 0.762, "chase": 0.331, "whiff": 0.237, "xavg": 0.183, "xslg": 0.448}, "R_shSL": {"pit": 261, "zsw": 0.59, "chase": 0.42, "whiff": 0.4, "xavg": 0.196, "xslg": 0.376}, "L_FF": {"pit": 266, "zsw": 0.666, "chase": 0.291, "whiff": 0.233, "xavg": 0.148, "xslg": 0.237}, "R_CU": {"pit": 290, "zsw": 0.335, "chase": 0.408, "whiff": 0.345, "xavg": 0.186, "xslg": 0.45}, "R_CH/SP": {"pit": 618, "zsw": 0.648, "chase": 0.362, "whiff": 0.369, "xavg": 0.22, "xslg": 0.328}, "R_FF": {"pit": 1034, "zsw": 0.68, "chase": 0.255, "whiff": 0.25, "xavg": 0.237, "xslg": 0.473}}, "cc_agg": {"LFB": {"pit": 367, "zsw": 0.534, "whiff": 0.742, "rv": -0.008, "xwoba": 0.286}, "LOS": {"pit": 265, "zsw": 0.556, "whiff": 0.476, "rv": -0.008, "xwoba": 0.27}, "RFB": {"pit": 1457, "zsw": 0.708, "whiff": 0.763, "rv": 0.004, "xwoba": 0.35}, "ROS": {"pit": 680, "zsw": 0.436, "whiff": 0.639, "rv": -0.001, "xwoba": 0.304}}, "approach": {}}, {"id": 77123, "name": "Hauver, Trevor", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2694, "chase": 0.211, "avg_uev": 83, "avg_ev": 82.2, "max_ev": 109.7, "ctct": 0.728}, "grades_lhp": {"pit": 980, "chase": 0.174, "avg_uev": 80, "avg_ev": 81.9, "max_ev": 106.9, "ctct": 0.728}, "pitch_stats": {"L_CH/SP": {"pit": 32, "zsw": null, "chase": 0.222, "whiff": 0.2, "xavg": 0.19, "xslg": 0.237}, "L_FC": {"pit": 55, "zsw": 0.469, "chase": 0.25, "whiff": 0.542, "xavg": 0.109, "xslg": 0.125}, "L_CU": {"pit": 71, "zsw": null, "chase": 0.147, "whiff": 0.304, "xavg": 0.227, "xslg": 0.487}, "L_shSL": {"pit": 127, "zsw": 0.275, "chase": 0.106, "whiff": 0.366, "xavg": 0.311, "xslg": 0.648}, "R_swSL": {"pit": 131, "zsw": 0.122, "chase": 0.391, "whiff": 0.339, "xavg": 0.303, "xslg": 0.684}, "L_swSL": {"pit": 152, "zsw": 0.102, "chase": 0.125, "whiff": 0.469, "xavg": 0.074, "xslg": 0.085}, "R_shSL": {"pit": 212, "zsw": 0.262, "chase": 0.333, "whiff": 0.447, "xavg": 0.189, "xslg": 0.445}, "L_FT": {"pit": 226, "zsw": 0.336, "chase": 0.317, "whiff": 0.149, "xavg": 0.289, "xslg": 0.488}, "R_CU": {"pit": 240, "zsw": 0.154, "chase": 0.267, "whiff": 0.39, "xavg": 0.151, "xslg": 0.274}, "R_FC": {"pit": 287, "zsw": 0.324, "chase": 0.252, "whiff": 0.218, "xavg": 0.296, "xslg": 0.437}, "L_FF": {"pit": 317, "zsw": 0.357, "chase": 0.115, "whiff": 0.198, "xavg": 0.163, "xslg": 0.242}, "R_FT": {"pit": 328, "zsw": 0.405, "chase": 0.11, "whiff": 0.096, "xavg": 0.315, "xslg": 0.42}, "R_CH/SP": {"pit": 520, "zsw": 0.431, "chase": 0.272, "whiff": 0.444, "xavg": 0.253, "xslg": 0.442}, "R_FF": {"pit": 976, "zsw": 0.519, "chase": 0.113, "whiff": 0.176, "xavg": 0.266, "xslg": 0.434}}, "cc_agg": {"LFB": {"pit": 598, "zsw": 0.356, "whiff": 0.786, "rv": -0.001, "xwoba": 0.334}, "LOS": {"pit": 350, "zsw": 0.175, "whiff": 0.602, "rv": 0.004, "xwoba": 0.294}, "RFB": {"pit": 1591, "zsw": 0.453, "whiff": 0.833, "rv": 0.009, "xwoba": 0.376}, "ROS": {"pit": 583, "zsw": 0.185, "whiff": 0.6, "rv": 0.009, "xwoba": 0.338}}, "approach": {}}, {"id": 68674, "name": "Herrera, Jose", "bats": "S", "opponent": "Round Rock Express", "grades_rhp": {"pit": 1512, "chase": 0.199, "avg_uev": 70, "avg_ev": 77.9, "max_ev": 106.1, "ctct": 0.808}, "grades_lhp": {"pit": 560, "chase": 0.197, "avg_uev": 75, "avg_ev": 80.3, "max_ev": 106.6, "ctct": 0.739}, "pitch_stats": {"L_FC": {"pit": 28, "zsw": 0.558, "chase": 0.182, "whiff": 0.231, "xavg": 0.119, "xslg": 0.126}, "L_swSL": {"pit": 31, "zsw": 0.256, "chase": 0.25, "whiff": 0.583, "xavg": 0.092, "xslg": 0.093}, "L_shSL": {"pit": 38, "zsw": 0.042, "chase": 0.333, "whiff": 0.45, "xavg": 0.139, "xslg": 0.141}, "L_CU": {"pit": 43, "zsw": null, "chase": 0.292, "whiff": 0.235, "xavg": 0.385, "xslg": 0.57}, "L_CH/SP": {"pit": 103, "zsw": 0.385, "chase": 0.333, "whiff": 0.412, "xavg": 0.236, "xslg": 0.301}, "R_swSL": {"pit": 106, "zsw": 0.29, "chase": 0.241, "whiff": 0.182, "xavg": 0.208, "xslg": 0.296}, "L_FT": {"pit": 109, "zsw": 0.203, "chase": 0.023, "whiff": 0.156, "xavg": 0.247, "xslg": 0.336}, "R_CU": {"pit": 130, "zsw": 0.16, "chase": 0.243, "whiff": 0.378, "xavg": 0.144, "xslg": 0.273}, "R_FC": {"pit": 146, "zsw": 0.352, "chase": 0.27, "whiff": 0.235, "xavg": 0.187, "xslg": 0.274}, "R_shSL": {"pit": 147, "zsw": 0.431, "chase": 0.301, "whiff": 0.275, "xavg": 0.142, "xslg": 0.209}, "R_FT": {"pit": 172, "zsw": 0.449, "chase": 0.123, "whiff": 0.1, "xavg": 0.28, "xslg": 0.432}, "L_FF": {"pit": 208, "zsw": 0.338, "chase": 0.114, "whiff": 0.135, "xavg": 0.318, "xslg": 0.468}, "R_CH/SP": {"pit": 218, "zsw": 0.485, "chase": 0.214, "whiff": 0.326, "xavg": 0.143, "xslg": 0.156}, "R_FF": {"pit": 593, "zsw": 0.454, "chase": 0.136, "whiff": 0.107, "xavg": 0.247, "xslg": 0.366}}, "cc_agg": {"LFB": {"pit": 345, "zsw": 0.311, "whiff": 0.851, "rv": -0.001, "xwoba": 0.328}, "LOS": {"pit": 112, "zsw": 0.039, "whiff": 0.592, "rv": -0.013, "xwoba": 0.203}, "RFB": {"pit": 911, "zsw": 0.441, "whiff": 0.871, "rv": -0.003, "xwoba": 0.326}, "ROS": {"pit": 383, "zsw": 0.294, "whiff": 0.727, "rv": -0.008, "xwoba": 0.227}}, "approach": {}}, {"id": 73487, "name": "Johnson, Cooper", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2076, "chase": 0.247, "avg_uev": 79, "avg_ev": 78.4, "max_ev": 108.6, "ctct": 0.679}, "grades_lhp": {"pit": 929, "chase": 0.201, "avg_uev": 78, "avg_ev": 79.7, "max_ev": 110.2, "ctct": 0.717}, "pitch_stats": {"L_swSL": {"pit": 38, "zsw": null, "chase": 0.211, "whiff": 0.0, "xavg": 0.141, "xslg": 0.246}, "L_FC": {"pit": 74, "zsw": 0.261, "chase": 0.333, "whiff": 0.324, "xavg": 0.308, "xslg": 0.675}, "L_shSL": {"pit": 82, "zsw": 0.002, "chase": 0.458, "whiff": 0.395, "xavg": 0.286, "xslg": 0.605}, "L_CU": {"pit": 83, "zsw": null, "chase": 0.102, "whiff": 0.2, "xavg": 0.197, "xslg": 0.473}, "L_FT": {"pit": 127, "zsw": 0.584, "chase": 0.062, "whiff": 0.205, "xavg": 0.337, "xslg": 0.586}, "R_CH/SP": {"pit": 144, "zsw": 0.642, "chase": 0.346, "whiff": 0.299, "xavg": 0.263, "xslg": 0.472}, "R_CU": {"pit": 168, "zsw": 0.188, "chase": 0.319, "whiff": 0.333, "xavg": 0.132, "xslg": 0.316}, "L_CH/SP": {"pit": 172, "zsw": 0.631, "chase": 0.292, "whiff": 0.272, "xavg": 0.203, "xslg": 0.33}, "R_FC": {"pit": 191, "zsw": 0.505, "chase": 0.202, "whiff": 0.261, "xavg": 0.322, "xslg": 0.513}, "R_FT": {"pit": 249, "zsw": 0.436, "chase": 0.181, "whiff": 0.1, "xavg": 0.274, "xslg": 0.37}, "R_swSL": {"pit": 256, "zsw": 0.222, "chase": 0.304, "whiff": 0.417, "xavg": 0.137, "xslg": 0.249}, "L_FF": {"pit": 315, "zsw": 0.509, "chase": 0.13, "whiff": 0.319, "xavg": 0.149, "xslg": 0.246}, "R_shSL": {"pit": 322, "zsw": 0.416, "chase": 0.311, "whiff": 0.441, "xavg": 0.221, "xslg": 0.368}, "R_FF": {"pit": 680, "zsw": 0.55, "chase": 0.192, "whiff": 0.329, "xavg": 0.237, "xslg": 0.479}}, "cc_agg": {"LFB": {"pit": 537, "zsw": 0.487, "whiff": 0.707, "rv": 0.003, "xwoba": 0.373}, "LOS": {"pit": 213, "zsw": 0.001, "whiff": 0.722, "rv": 0.008, "xwoba": 0.344}, "RFB": {"pit": 1165, "zsw": 0.522, "whiff": 0.727, "rv": 0.008, "xwoba": 0.379}, "ROS": {"pit": 765, "zsw": 0.272, "whiff": 0.598, "rv": -0.011, "xwoba": 0.245}}, "approach": {}}, {"id": 5857, "name": "Martin, Jr., Richie", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 793, "chase": 0.279, "avg_uev": 73, "avg_ev": 78.3, "max_ev": 109.1, "ctct": 0.718}, "grades_lhp": {"pit": 353, "chase": 0.358, "avg_uev": 71, "avg_ev": 78.0, "max_ev": 107.6, "ctct": 0.711}, "pitch_stats": {"L_FC": {"pit": 23, "zsw": 0.306, "chase": 0.556, "whiff": 0.286, "xavg": 0.66, "xslg": 0.695}, "L_swSL": {"pit": 24, "zsw": 0.409, "chase": 0.3, "whiff": 0.091, "xavg": 0.243, "xslg": 0.275}, "L_shSL": {"pit": 25, "zsw": 0.74, "chase": 0.5, "whiff": 0.588, "xavg": 0.05, "xslg": 0.05}, "L_CU": {"pit": 31, "zsw": 0.255, "chase": 0.25, "whiff": 0.417, "xavg": 0.453, "xslg": 0.472}, "R_CU": {"pit": 34, "zsw": 0.05, "chase": 0.3, "whiff": 0.533, "xavg": 0.13, "xslg": 0.132}, "R_CH/SP": {"pit": 47, "zsw": 0.615, "chase": 0.276, "whiff": 0.217, "xavg": 0.192, "xslg": 0.396}, "L_CH/SP": {"pit": 56, "zsw": 0.506, "chase": 0.485, "whiff": 0.455, "xavg": 0.243, "xslg": 0.387}, "L_FT": {"pit": 80, "zsw": 0.429, "chase": 0.312, "whiff": 0.2, "xavg": 0.349, "xslg": 0.406}, "R_FC": {"pit": 83, "zsw": 0.525, "chase": 0.323, "whiff": 0.283, "xavg": 0.311, "xslg": 0.377}, "R_swSL": {"pit": 92, "zsw": 0.448, "chase": 0.327, "whiff": 0.426, "xavg": 0.192, "xslg": 0.228}, "L_FF": {"pit": 103, "zsw": 0.686, "chase": 0.279, "whiff": 0.22, "xavg": 0.274, "xslg": 0.383}, "R_shSL": {"pit": 122, "zsw": 0.604, "chase": 0.257, "whiff": 0.379, "xavg": 0.263, "xslg": 0.427}, "R_FT": {"pit": 144, "zsw": 0.412, "chase": 0.234, "whiff": 0.141, "xavg": 0.212, "xslg": 0.23}, "R_FF": {"pit": 269, "zsw": 0.585, "chase": 0.274, "whiff": 0.252, "xavg": 0.282, "xslg": 0.355}}, "cc_agg": {"LFB": {"pit": 215, "zsw": 0.551, "whiff": 0.789, "rv": 0.001, "xwoba": 0.335}, "LOS": {"pit": 81, "zsw": 0.431, "whiff": 0.6, "rv": -0.009, "xwoba": 0.276}, "RFB": {"pit": 498, "zsw": 0.524, "whiff": 0.773, "rv": -0.004, "xwoba": 0.337}, "ROS": {"pit": 248, "zsw": 0.453, "whiff": 0.583, "rv": -0.004, "xwoba": 0.263}}, "approach": {}}, {"id": 131479, "name": "Mitchell, Tucker", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 1148, "chase": 0.293, "avg_uev": 75, "avg_ev": 81.0, "max_ev": 110.5, "ctct": 0.708}, "grades_lhp": {"pit": 433, "chase": 0.255, "avg_uev": 75, "avg_ev": 79.8, "max_ev": 109.5, "ctct": 0.777}, "pitch_stats": {"L_swSL": {"pit": 15, "zsw": 0.336, "chase": 0.0, "whiff": 0.2, "xavg": 0.0, "xslg": 0.0}, "L_FT": {"pit": 23, "zsw": 0.549, "chase": 0.375, "whiff": 0.133, "xavg": 0.203, "xslg": 0.243}, "L_FC": {"pit": 28, "zsw": 0.567, "chase": 0.286, "whiff": 0.071, "xavg": 0.434, "xslg": 0.442}, "L_shSL": {"pit": 42, "zsw": 0.587, "chase": 0.417, "whiff": 0.375, "xavg": 0.14, "xslg": 0.159}, "L_CU": {"pit": 63, "zsw": 0.503, "chase": 0.235, "whiff": 0.407, "xavg": 0.147, "xslg": 0.346}, "R_CH/SP": {"pit": 66, "zsw": 0.482, "chase": 0.293, "whiff": 0.393, "xavg": 0.073, "xslg": 0.06}, "L_CH/SP": {"pit": 86, "zsw": 0.682, "chase": 0.229, "whiff": 0.308, "xavg": 0.208, "xslg": 0.241}, "R_FC": {"pit": 102, "zsw": 0.842, "chase": 0.167, "whiff": 0.265, "xavg": 0.34, "xslg": 0.452}, "R_FT": {"pit": 113, "zsw": 0.63, "chase": 0.304, "whiff": 0.176, "xavg": 0.24, "xslg": 0.264}, "R_CU": {"pit": 117, "zsw": 0.54, "chase": 0.226, "whiff": 0.389, "xavg": 0.176, "xslg": 0.213}, "R_swSL": {"pit": 124, "zsw": 0.31, "chase": 0.286, "whiff": 0.407, "xavg": 0.252, "xslg": 0.401}, "L_FF": {"pit": 176, "zsw": 0.448, "chase": 0.229, "whiff": 0.126, "xavg": 0.225, "xslg": 0.311}, "R_shSL": {"pit": 195, "zsw": 0.522, "chase": 0.253, "whiff": 0.415, "xavg": 0.175, "xslg": 0.259}, "R_FF": {"pit": 431, "zsw": 0.494, "chase": 0.372, "whiff": 0.208, "xavg": 0.218, "xslg": 0.313}}, "cc_agg": {"LFB": {"pit": 227, "zsw": 0.485, "whiff": 0.879, "rv": -0.013, "xwoba": 0.281}, "LOS": {"pit": 120, "zsw": 0.499, "whiff": 0.625, "rv": -0.016, "xwoba": 0.219}, "RFB": {"pit": 646, "zsw": 0.578, "whiff": 0.788, "rv": -0.012, "xwoba": 0.286}, "ROS": {"pit": 436, "zsw": 0.457, "whiff": 0.594, "rv": -0.011, "xwoba": 0.246}}, "approach": {}}, {"id": 138580, "name": "Moller, Ian", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 1881, "chase": 0.209, "avg_uev": 76, "avg_ev": 80.6, "max_ev": 108.2, "ctct": 0.71}, "grades_lhp": {"pit": 582, "chase": 0.22, "avg_uev": 79, "avg_ev": 82.7, "max_ev": 108.9, "ctct": 0.71}, "pitch_stats": {"L_swSL": {"pit": 27, "zsw": 0.103, "chase": 0.2, "whiff": 0.417, "xavg": 0.118, "xslg": 0.147}, "L_FT": {"pit": 28, "zsw": 0.344, "chase": 0.077, "whiff": 0.111, "xavg": 0.234, "xslg": 0.236}, "L_FC": {"pit": 30, "zsw": 0.0, "chase": 0.182, "whiff": 0.231, "xavg": 0.276, "xslg": 0.333}, "L_shSL": {"pit": 50, "zsw": 0.246, "chase": 0.44, "whiff": 0.545, "xavg": 0.095, "xslg": 0.1}, "L_CU": {"pit": 86, "zsw": 0.139, "chase": 0.316, "whiff": 0.265, "xavg": 0.17, "xslg": 0.187}, "R_CH/SP": {"pit": 112, "zsw": 0.265, "chase": 0.194, "whiff": 0.349, "xavg": 0.343, "xslg": 0.488}, "L_CH/SP": {"pit": 119, "zsw": 0.294, "chase": 0.188, "whiff": 0.333, "xavg": 0.208, "xslg": 0.371}, "R_CU": {"pit": 137, "zsw": 0.31, "chase": 0.167, "whiff": 0.396, "xavg": 0.12, "xslg": 0.159}, "R_FT": {"pit": 163, "zsw": 0.269, "chase": 0.19, "whiff": 0.254, "xavg": 0.32, "xslg": 0.474}, "R_FC": {"pit": 213, "zsw": 0.258, "chase": 0.126, "whiff": 0.243, "xavg": 0.199, "xslg": 0.338}, "R_swSL": {"pit": 222, "zsw": 0.09, "chase": 0.197, "whiff": 0.408, "xavg": 0.134, "xslg": 0.19}, "L_FF": {"pit": 242, "zsw": 0.34, "chase": 0.184, "whiff": 0.228, "xavg": 0.255, "xslg": 0.444}, "R_shSL": {"pit": 334, "zsw": 0.223, "chase": 0.185, "whiff": 0.455, "xavg": 0.161, "xslg": 0.168}, "R_FF": {"pit": 700, "zsw": 0.297, "chase": 0.274, "whiff": 0.194, "xavg": 0.219, "xslg": 0.355}}, "cc_agg": {"LFB": {"pit": 300, "zsw": 0.302, "whiff": 0.781, "rv": 0.006, "xwoba": 0.38}, "LOS": {"pit": 163, "zsw": 0.157, "whiff": 0.618, "rv": -0.028, "xwoba": 0.177}, "RFB": {"pit": 1076, "zsw": 0.286, "whiff": 0.789, "rv": -0.001, "xwoba": 0.352}, "ROS": {"pit": 693, "zsw": 0.219, "whiff": 0.571, "rv": -0.014, "xwoba": 0.179}}, "approach": {}}, {"id": 155958, "name": "Morrobel, Yeison", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2135, "chase": 0.334, "avg_uev": 76, "avg_ev": 80.8, "max_ev": 110.1, "ctct": 0.757}, "grades_lhp": {"pit": 682, "chase": 0.352, "avg_uev": 73, "avg_ev": 77.2, "max_ev": 106.9, "ctct": 0.756}, "pitch_stats": {"L_FT": {"pit": 24, "zsw": 0.207, "chase": 0.364, "whiff": 0.111, "xavg": 0.632, "xslg": 0.639}, "L_FC": {"pit": 39, "zsw": 0.655, "chase": 0.278, "whiff": 0.136, "xavg": 0.414, "xslg": 0.557}, "L_CH/SP": {"pit": 41, "zsw": 0.897, "chase": 0.391, "whiff": 0.136, "xavg": 0.248, "xslg": 0.249}, "L_swSL": {"pit": 85, "zsw": 0.395, "chase": 0.333, "whiff": 0.293, "xavg": 0.152, "xslg": 0.29}, "R_swSL": {"pit": 92, "zsw": 0.365, "chase": 0.404, "whiff": 0.225, "xavg": 0.151, "xslg": 0.202}, "L_shSL": {"pit": 118, "zsw": 0.454, "chase": 0.317, "whiff": 0.327, "xavg": 0.225, "xslg": 0.208}, "L_CU": {"pit": 120, "zsw": 0.354, "chase": 0.343, "whiff": 0.294, "xavg": 0.142, "xslg": 0.2}, "R_FT": {"pit": 145, "zsw": 0.792, "chase": 0.25, "whiff": 0.162, "xavg": 0.296, "xslg": 0.493}, "R_FC": {"pit": 171, "zsw": 0.462, "chase": 0.354, "whiff": 0.298, "xavg": 0.261, "xslg": 0.395}, "R_shSL": {"pit": 204, "zsw": 0.557, "chase": 0.46, "whiff": 0.381, "xavg": 0.172, "xslg": 0.214}, "R_CU": {"pit": 236, "zsw": 0.23, "chase": 0.352, "whiff": 0.298, "xavg": 0.113, "xslg": 0.182}, "L_FF": {"pit": 255, "zsw": 0.355, "chase": 0.386, "whiff": 0.217, "xavg": 0.2, "xslg": 0.287}, "R_CH/SP": {"pit": 426, "zsw": 0.628, "chase": 0.349, "whiff": 0.226, "xavg": 0.222, "xslg": 0.389}, "R_FF": {"pit": 861, "zsw": 0.637, "chase": 0.282, "whiff": 0.216, "xavg": 0.255, "xslg": 0.46}}, "cc_agg": {"LFB": {"pit": 318, "zsw": 0.388, "whiff": 0.803, "rv": -0.008, "xwoba": 0.316}, "LOS": {"pit": 323, "zsw": 0.402, "whiff": 0.694, "rv": -0.015, "xwoba": 0.228}, "RFB": {"pit": 1177, "zsw": 0.629, "whiff": 0.78, "rv": 0.002, "xwoba": 0.35}, "ROS": {"pit": 532, "zsw": 0.36, "whiff": 0.677, "rv": -0.023, "xwoba": 0.191}}, "approach": {}}, {"id": 80184, "name": "Rodriguez, Keyber", "bats": "R", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2412, "chase": 0.366, "avg_uev": 76, "avg_ev": 79.6, "max_ev": 107.8, "ctct": 0.799}, "grades_lhp": {"pit": 874, "chase": 0.305, "avg_uev": 75, "avg_ev": 81.0, "max_ev": 108.3, "ctct": 0.779}, "pitch_stats": {"L_swSL": {"pit": 26, "zsw": null, "chase": 0.0, "whiff": 0.0, "xavg": 0.062, "xslg": 0.158}, "L_shSL": {"pit": 69, "zsw": 0.637, "chase": 0.357, "whiff": 0.257, "xavg": 0.298, "xslg": 0.336}, "L_FC": {"pit": 75, "zsw": 0.389, "chase": 0.324, "whiff": 0.237, "xavg": 0.353, "xslg": 0.573}, "L_CU": {"pit": 82, "zsw": 0.254, "chase": 0.34, "whiff": 0.459, "xavg": 0.182, "xslg": 0.315}, "L_FT": {"pit": 95, "zsw": 0.407, "chase": 0.189, "whiff": 0.024, "xavg": 0.262, "xslg": 0.302}, "L_CH/SP": {"pit": 160, "zsw": 0.539, "chase": 0.409, "whiff": 0.253, "xavg": 0.258, "xslg": 0.328}, "R_CU": {"pit": 179, "zsw": 0.361, "chase": 0.476, "whiff": 0.232, "xavg": 0.227, "xslg": 0.257}, "R_CH/SP": {"pit": 191, "zsw": 0.542, "chase": 0.441, "whiff": 0.255, "xavg": 0.192, "xslg": 0.331}, "R_FC": {"pit": 235, "zsw": 0.493, "chase": 0.322, "whiff": 0.218, "xavg": 0.257, "xslg": 0.286}, "R_FT": {"pit": 237, "zsw": 0.293, "chase": 0.288, "whiff": 0.133, "xavg": 0.293, "xslg": 0.365}, "R_swSL": {"pit": 247, "zsw": 0.334, "chase": 0.32, "whiff": 0.317, "xavg": 0.168, "xslg": 0.201}, "L_FF": {"pit": 360, "zsw": 0.44, "chase": 0.27, "whiff": 0.198, "xavg": 0.253, "xslg": 0.383}, "R_shSL": {"pit": 360, "zsw": 0.4, "chase": 0.386, "whiff": 0.263, "xavg": 0.264, "xslg": 0.454}, "R_FF": {"pit": 959, "zsw": 0.343, "chase": 0.355, "whiff": 0.136, "xavg": 0.234, "xslg": 0.327}}, "cc_agg": {"LFB": {"pit": 533, "zsw": 0.426, "whiff": 0.822, "rv": -0.002, "xwoba": 0.341}, "LOS": {"pit": 181, "zsw": 0.355, "whiff": 0.683, "rv": -0.01, "xwoba": 0.271}, "RFB": {"pit": 1435, "zsw": 0.361, "whiff": 0.848, "rv": -0.011, "xwoba": 0.302}, "ROS": {"pit": 786, "zsw": 0.369, "whiff": 0.728, "rv": -0.012, "xwoba": 0.267}}, "approach": {}}, {"id": 94828, "name": "Snider, Jake", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 1783, "chase": 0.231, "avg_uev": 78, "avg_ev": 80.2, "max_ev": 107.4, "ctct": 0.777}, "grades_lhp": {"pit": 461, "chase": 0.199, "avg_uev": 67, "avg_ev": 75.9, "max_ev": 108.7, "ctct": 0.661}, "pitch_stats": {"L_FC": {"pit": 19, "zsw": 0.562, "chase": 0.222, "whiff": 0.286, "xavg": 0.436, "xslg": 0.634}, "L_FT": {"pit": 23, "zsw": 0.666, "chase": 0.167, "whiff": 0.286, "xavg": 0.258, "xslg": 0.277}, "L_CH/SP": {"pit": 29, "zsw": 0.497, "chase": 0.316, "whiff": 0.286, "xavg": 0.053, "xslg": 0.055}, "L_CU": {"pit": 46, "zsw": 0.206, "chase": 0.167, "whiff": 0.25, "xavg": 0.205, "xslg": 0.181}, "L_shSL": {"pit": 52, "zsw": 0.429, "chase": 0.393, "whiff": 0.577, "xavg": 0.16, "xslg": 0.169}, "L_swSL": {"pit": 53, "zsw": null, "chase": 0.194, "whiff": 0.211, "xavg": 0.163, "xslg": 0.172}, "R_swSL": {"pit": 87, "zsw": 0.197, "chase": 0.419, "whiff": 0.381, "xavg": 0.137, "xslg": 0.131}, "R_FC": {"pit": 115, "zsw": 0.369, "chase": 0.304, "whiff": 0.226, "xavg": 0.222, "xslg": 0.4}, "R_shSL": {"pit": 118, "zsw": 0.614, "chase": 0.286, "whiff": 0.326, "xavg": 0.207, "xslg": 0.274}, "R_CU": {"pit": 159, "zsw": 0.153, "chase": 0.38, "whiff": 0.384, "xavg": 0.147, "xslg": 0.2}, "R_FT": {"pit": 179, "zsw": 0.569, "chase": 0.095, "whiff": 0.045, "xavg": 0.224, "xslg": 0.288}, "L_FF": {"pit": 239, "zsw": 0.45, "chase": 0.146, "whiff": 0.329, "xavg": 0.164, "xslg": 0.222}, "R_CH/SP": {"pit": 334, "zsw": 0.596, "chase": 0.24, "whiff": 0.232, "xavg": 0.281, "xslg": 0.349}, "R_FF": {"pit": 791, "zsw": 0.63, "chase": 0.178, "whiff": 0.184, "xavg": 0.291, "xslg": 0.426}}, "cc_agg": {"LFB": {"pit": 281, "zsw": 0.475, "whiff": 0.678, "rv": 0.011, "xwoba": 0.373}, "LOS": {"pit": 151, "zsw": 0.249, "whiff": 0.623, "rv": -0.016, "xwoba": 0.22}, "RFB": {"pit": 1085, "zsw": 0.585, "whiff": 0.832, "rv": 0.012, "xwoba": 0.401}, "ROS": {"pit": 364, "zsw": 0.299, "whiff": 0.634, "rv": -0.013, "xwoba": 0.242}}, "approach": {}}, {"id": 3991, "name": "Velazquez, Andrew", "bats": "S", "opponent": "Round Rock Express", "grades_rhp": {"pit": 2434, "chase": 0.37, "avg_uev": 73, "avg_ev": 79.2, "max_ev": 109.2, "ctct": 0.614}, "grades_lhp": {"pit": 659, "chase": 0.431, "avg_uev": 72, "avg_ev": 79.1, "max_ev": 106.9, "ctct": 0.641}, "pitch_stats": {"L_swSL": {"pit": 40, "zsw": 0.518, "chase": 0.529, "whiff": 0.455, "xavg": 0.247, "xslg": 0.53}, "L_FT": {"pit": 53, "zsw": 0.854, "chase": 0.333, "whiff": 0.256, "xavg": 0.375, "xslg": 0.577}, "L_CU": {"pit": 55, "zsw": 0.554, "chase": 0.357, "whiff": 0.296, "xavg": 0.218, "xslg": 0.257}, "L_FC": {"pit": 62, "zsw": 0.446, "chase": 0.4, "whiff": 0.361, "xavg": 0.192, "xslg": 0.322}, "L_shSL": {"pit": 66, "zsw": 0.807, "chase": 0.5, "whiff": 0.564, "xavg": 0.216, "xslg": 0.283}, "L_CH/SP": {"pit": 152, "zsw": 0.839, "chase": 0.539, "whiff": 0.433, "xavg": 0.15, "xslg": 0.223}, "R_swSL": {"pit": 196, "zsw": 0.339, "chase": 0.471, "whiff": 0.347, "xavg": 0.126, "xslg": 0.271}, "R_CU": {"pit": 197, "zsw": 0.543, "chase": 0.452, "whiff": 0.546, "xavg": 0.119, "xslg": 0.226}, "R_FT": {"pit": 209, "zsw": 0.637, "chase": 0.172, "whiff": 0.266, "xavg": 0.386, "xslg": 0.691}, "R_shSL": {"pit": 223, "zsw": 0.575, "chase": 0.425, "whiff": 0.419, "xavg": 0.2, "xslg": 0.379}, "L_FF": {"pit": 231, "zsw": 0.756, "chase": 0.342, "whiff": 0.27, "xavg": 0.236, "xslg": 0.314}, "R_FC": {"pit": 241, "zsw": 0.675, "chase": 0.45, "whiff": 0.349, "xavg": 0.221, "xslg": 0.366}, "R_CH/SP": {"pit": 461, "zsw": 0.726, "chase": 0.441, "whiff": 0.375, "xavg": 0.2, "xslg": 0.355}, "R_FF": {"pit": 907, "zsw": 0.813, "chase": 0.276, "whiff": 0.396, "xavg": 0.204, "xslg": 0.342}}, "cc_agg": {"LFB": {"pit": 346, "zsw": 0.715, "whiff": 0.717, "rv": -0.009, "xwoba": 0.297}, "LOS": {"pit": 161, "zsw": 0.604, "whiff": 0.545, "rv": -0.015, "xwoba": 0.245}, "RFB": {"pit": 1357, "zsw": 0.754, "whiff": 0.631, "rv": -0.005, "xwoba": 0.31}, "ROS": {"pit": 616, "zsw": 0.491, "whiff": 0.563, "rv": -0.014, "xwoba": 0.241}}, "approach": {}}, {"id": 67967, "name": "Wade, Tyler", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 1263, "chase": 0.266, "avg_uev": 72, "avg_ev": 77.1, "max_ev": 104.8, "ctct": 0.786}, "grades_lhp": {"pit": 308, "chase": 0.253, "avg_uev": 64, "avg_ev": 72.7, "max_ev": 104.9, "ctct": 0.704}, "pitch_stats": {"L_CH/SP": {"pit": 4, "zsw": null, "chase": 0.333, "whiff": 0.5, "xavg": 0.156, "xslg": 0.157}, "L_CU": {"pit": 12, "zsw": 0.957, "chase": 0.222, "whiff": 0.25, "xavg": 0.283, "xslg": 0.288}, "L_FC": {"pit": 14, "zsw": 1.0, "chase": 0.25, "whiff": 0.333, "xavg": 0.277, "xslg": 0.282}, "L_shSL": {"pit": 44, "zsw": 0.269, "chase": 0.36, "whiff": 0.545, "xavg": 0.12, "xslg": 0.125}, "L_swSL": {"pit": 46, "zsw": null, "chase": 0.31, "whiff": 0.588, "xavg": 0.099, "xslg": 0.1}, "R_swSL": {"pit": 75, "zsw": 0.238, "chase": 0.3, "whiff": 0.333, "xavg": 0.209, "xslg": 0.249}, "L_FT": {"pit": 85, "zsw": 0.278, "chase": 0.229, "whiff": 0.152, "xavg": 0.185, "xslg": 0.191}, "L_FF": {"pit": 103, "zsw": 0.465, "chase": 0.171, "whiff": 0.132, "xavg": 0.28, "xslg": 0.303}, "R_shSL": {"pit": 110, "zsw": 0.243, "chase": 0.4, "whiff": 0.339, "xavg": 0.286, "xslg": 0.365}, "R_CU": {"pit": 115, "zsw": 0.432, "chase": 0.313, "whiff": 0.349, "xavg": 0.232, "xslg": 0.266}, "R_FT": {"pit": 130, "zsw": 0.364, "chase": 0.1, "whiff": 0.073, "xavg": 0.255, "xslg": 0.537}, "R_FC": {"pit": 132, "zsw": 0.195, "chase": 0.25, "whiff": 0.115, "xavg": 0.209, "xslg": 0.248}, "R_CH/SP": {"pit": 201, "zsw": 0.398, "chase": 0.341, "whiff": 0.218, "xavg": 0.242, "xslg": 0.289}, "R_FF": {"pit": 500, "zsw": 0.424, "chase": 0.212, "whiff": 0.192, "xavg": 0.215, "xslg": 0.285}}, "cc_agg": {"LFB": {"pit": 202, "zsw": 0.403, "whiff": 0.838, "rv": -0.012, "xwoba": 0.297}, "LOS": {"pit": 102, "zsw": 0.124, "whiff": 0.465, "rv": -0.034, "xwoba": 0.116}, "RFB": {"pit": 762, "zsw": 0.383, "whiff": 0.838, "rv": -0.009, "xwoba": 0.3}, "ROS": {"pit": 300, "zsw": 0.309, "whiff": 0.659, "rv": -0.001, "xwoba": 0.264}}, "approach": {}}, {"id": 121041, "name": "Zavala, Aaron", "bats": "L", "opponent": "Round Rock Express", "grades_rhp": {"pit": 3176, "chase": 0.257, "avg_uev": 80, "avg_ev": 81.7, "max_ev": 110.4, "ctct": 0.73}, "grades_lhp": {"pit": 897, "chase": 0.293, "avg_uev": 74, "avg_ev": 76.2, "max_ev": 107.9, "ctct": 0.652}, "pitch_stats": {"L_CH/SP": {"pit": 41, "zsw": 0.418, "chase": 0.56, "whiff": 0.391, "xavg": 0.185, "xslg": 0.171}, "L_FC": {"pit": 54, "zsw": 0.656, "chase": 0.2, "whiff": 0.391, "xavg": 0.06, "xslg": 0.07}, "L_swSL": {"pit": 83, "zsw": 0.681, "chase": 0.311, "whiff": 0.475, "xavg": 0.016, "xslg": 0.021}, "R_swSL": {"pit": 88, "zsw": 0.364, "chase": 0.375, "whiff": 0.275, "xavg": 0.094, "xslg": 0.15}, "L_FT": {"pit": 121, "zsw": 0.466, "chase": 0.259, "whiff": 0.167, "xavg": 0.141, "xslg": 0.162}, "L_CU": {"pit": 127, "zsw": 0.506, "chase": 0.257, "whiff": 0.28, "xavg": 0.144, "xslg": 0.181}, "L_shSL": {"pit": 147, "zsw": 0.641, "chase": 0.293, "whiff": 0.486, "xavg": 0.173, "xslg": 0.207}, "R_FT": {"pit": 215, "zsw": 0.861, "chase": 0.147, "whiff": 0.163, "xavg": 0.258, "xslg": 0.372}, "R_shSL": {"pit": 267, "zsw": 0.612, "chase": 0.393, "whiff": 0.324, "xavg": 0.258, "xslg": 0.489}, "R_FC": {"pit": 316, "zsw": 0.642, "chase": 0.329, "whiff": 0.28, "xavg": 0.306, "xslg": 0.588}, "L_FF": {"pit": 324, "zsw": 0.528, "chase": 0.295, "whiff": 0.312, "xavg": 0.159, "xslg": 0.231}, "R_CU": {"pit": 367, "zsw": 0.209, "chase": 0.343, "whiff": 0.394, "xavg": 0.132, "xslg": 0.25}, "R_CH/SP": {"pit": 529, "zsw": 0.568, "chase": 0.285, "whiff": 0.343, "xavg": 0.274, "xslg": 0.432}, "R_FF": {"pit": 1394, "zsw": 0.638, "chase": 0.18, "whiff": 0.217, "xavg": 0.252, "xslg": 0.382}}, "cc_agg": {"LFB": {"pit": 499, "zsw": 0.526, "whiff": 0.713, "rv": -0.017, "xwoba": 0.259}, "LOS": {"pit": 357, "zsw": 0.604, "whiff": 0.579, "rv": -0.026, "xwoba": 0.146}, "RFB": {"pit": 1925, "zsw": 0.667, "whiff": 0.778, "rv": 0.007, "xwoba": 0.372}, "ROS": {"pit": 722, "zsw": 0.356, "whiff": 0.653, "rv": -0.011, "xwoba": 0.248}}, "approach": {}}, {"id": 73747, "name": "Bastidas, Jesus", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 3182, "chase": 0.327, "avg_uev": 78, "avg_ev": 80.5, "max_ev": 109.1, "ctct": 0.712}, "grades_lhp": {"pit": 1187, "chase": 0.326, "avg_uev": 77, "avg_ev": 79.6, "max_ev": 111.1, "ctct": 0.703}, "pitch_stats": {"L_FC": {"pit": 78, "zsw": 0.583, "chase": 0.371, "whiff": 0.191, "xavg": 0.381, "xslg": 0.645}, "L_swSL": {"pit": 88, "zsw": 0.24, "chase": 0.4, "whiff": 0.404, "xavg": 0.169, "xslg": 0.409}, "L_shSL": {"pit": 105, "zsw": 0.388, "chase": 0.443, "whiff": 0.311, "xavg": 0.323, "xslg": 0.568}, "L_CU": {"pit": 110, "zsw": 0.403, "chase": 0.299, "whiff": 0.311, "xavg": 0.156, "xslg": 0.404}, "R_CH/SP": {"pit": 156, "zsw": 0.753, "chase": 0.404, "whiff": 0.347, "xavg": 0.212, "xslg": 0.506}, "L_FT": {"pit": 173, "zsw": 0.567, "chase": 0.273, "whiff": 0.216, "xavg": 0.241, "xslg": 0.266}, "L_CH/SP": {"pit": 187, "zsw": 0.618, "chase": 0.442, "whiff": 0.355, "xavg": 0.274, "xslg": 0.45}, "R_CU": {"pit": 196, "zsw": 0.402, "chase": 0.333, "whiff": 0.318, "xavg": 0.177, "xslg": 0.406}, "R_FC": {"pit": 294, "zsw": 0.59, "chase": 0.425, "whiff": 0.382, "xavg": 0.258, "xslg": 0.491}, "R_swSL": {"pit": 369, "zsw": 0.418, "chase": 0.416, "whiff": 0.373, "xavg": 0.221, "xslg": 0.397}, "L_FF": {"pit": 446, "zsw": 0.495, "chase": 0.23, "whiff": 0.294, "xavg": 0.23, "xslg": 0.373}, "R_shSL": {"pit": 539, "zsw": 0.583, "chase": 0.385, "whiff": 0.346, "xavg": 0.188, "xslg": 0.359}, "R_FT": {"pit": 553, "zsw": 0.453, "chase": 0.239, "whiff": 0.098, "xavg": 0.329, "xslg": 0.486}, "R_FF": {"pit": 1075, "zsw": 0.57, "chase": 0.252, "whiff": 0.272, "xavg": 0.239, "xslg": 0.457}}, "cc_agg": {"LFB": {"pit": 697, "zsw": 0.526, "whiff": 0.738, "rv": 0.001, "xwoba": 0.356}, "LOS": {"pit": 303, "zsw": 0.351, "whiff": 0.66, "rv": 0.01, "xwoba": 0.333}, "RFB": {"pit": 1922, "zsw": 0.532, "whiff": 0.756, "rv": 0.01, "xwoba": 0.378}, "ROS": {"pit": 1104, "zsw": 0.501, "whiff": 0.649, "rv": -0.006, "xwoba": 0.267}}, "approach": {}}, {"id": 107126, "name": "Berry, Jacob", "bats": "S", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 3070, "chase": 0.306, "avg_uev": 79, "avg_ev": 82.4, "max_ev": 114.1, "ctct": 0.797}, "grades_lhp": {"pit": 676, "chase": 0.343, "avg_uev": 77, "avg_ev": 82.5, "max_ev": 111.9, "ctct": 0.699}, "pitch_stats": {"L_shSL": {"pit": 44, "zsw": 0.498, "chase": 0.5, "whiff": 0.542, "xavg": 0.186, "xslg": 0.398}, "L_swSL": {"pit": 49, "zsw": 0.386, "chase": 0.367, "whiff": 0.4, "xavg": 0.155, "xslg": 0.347}, "L_CU": {"pit": 56, "zsw": 0.177, "chase": 0.407, "whiff": 0.545, "xavg": 0.212, "xslg": 0.401}, "L_FC": {"pit": 57, "zsw": 0.969, "chase": 0.36, "whiff": 0.333, "xavg": 0.139, "xslg": 0.231}, "L_FT": {"pit": 63, "zsw": 0.574, "chase": 0.276, "whiff": 0.188, "xavg": 0.203, "xslg": 0.239}, "L_CH/SP": {"pit": 155, "zsw": 0.563, "chase": 0.371, "whiff": 0.325, "xavg": 0.257, "xslg": 0.306}, "R_swSL": {"pit": 158, "zsw": 0.211, "chase": 0.381, "whiff": 0.239, "xavg": 0.158, "xslg": 0.249}, "L_FF": {"pit": 252, "zsw": 0.598, "chase": 0.267, "whiff": 0.204, "xavg": 0.286, "xslg": 0.352}, "R_FT": {"pit": 254, "zsw": 0.513, "chase": 0.226, "whiff": 0.28, "xavg": 0.275, "xslg": 0.417}, "R_FC": {"pit": 254, "zsw": 0.442, "chase": 0.307, "whiff": 0.197, "xavg": 0.38, "xslg": 0.731}, "R_CU": {"pit": 299, "zsw": 0.153, "chase": 0.26, "whiff": 0.292, "xavg": 0.173, "xslg": 0.31}, "R_shSL": {"pit": 347, "zsw": 0.33, "chase": 0.379, "whiff": 0.222, "xavg": 0.242, "xslg": 0.503}, "R_CH/SP": {"pit": 643, "zsw": 0.473, "chase": 0.307, "whiff": 0.284, "xavg": 0.248, "xslg": 0.369}, "R_FF": {"pit": 1115, "zsw": 0.581, "chase": 0.302, "whiff": 0.118, "xavg": 0.265, "xslg": 0.434}}, "cc_agg": {"LFB": {"pit": 372, "zsw": 0.645, "whiff": 0.777, "rv": -0.015, "xwoba": 0.268}, "LOS": {"pit": 149, "zsw": 0.272, "whiff": 0.507, "rv": -0.003, "xwoba": 0.305}, "RFB": {"pit": 1623, "zsw": 0.547, "whiff": 0.847, "rv": 0.009, "xwoba": 0.373}, "ROS": {"pit": 804, "zsw": 0.232, "whiff": 0.754, "rv": -0.001, "xwoba": 0.303}}, "approach": {}}, {"id": 125055, "name": "Bierman, Gabe", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {}, "grades_lhp": {}, "pitch_stats": {}, "cc_agg": {}, "approach": {}}, {"id": 155716, "name": "Cappe, Yiddi", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 1481, "chase": 0.329, "avg_uev": 75, "avg_ev": 80.2, "max_ev": 107.4, "ctct": 0.703}, "grades_lhp": {"pit": 553, "chase": 0.241, "avg_uev": 78, "avg_ev": 79.3, "max_ev": 105.1, "ctct": 0.777}, "pitch_stats": {"L_swSL": {"pit": 18, "zsw": null, "chase": 0.231, "whiff": 0.4, "xavg": 0.065, "xslg": 0.065}, "L_FC": {"pit": 25, "zsw": null, "chase": 0.25, "whiff": 0.364, "xavg": 0.42, "xslg": 0.482}, "L_shSL": {"pit": 39, "zsw": 0.395, "chase": 0.364, "whiff": 0.35, "xavg": 0.099, "xslg": 0.192}, "L_FT": {"pit": 52, "zsw": 0.612, "chase": 0.1, "whiff": 0.087, "xavg": 0.177, "xslg": 0.217}, "R_FT": {"pit": 71, "zsw": 0.583, "chase": 0.289, "whiff": 0.2, "xavg": 0.347, "xslg": 0.376}, "L_CU": {"pit": 74, "zsw": 0.435, "chase": 0.205, "whiff": 0.269, "xavg": 0.268, "xslg": 0.464}, "R_FC": {"pit": 99, "zsw": 0.367, "chase": 0.26, "whiff": 0.289, "xavg": 0.279, "xslg": 0.447}, "L_CH/SP": {"pit": 104, "zsw": 0.627, "chase": 0.119, "whiff": 0.2, "xavg": 0.13, "xslg": 0.173}, "R_CH/SP": {"pit": 120, "zsw": 0.33, "chase": 0.351, "whiff": 0.481, "xavg": 0.169, "xslg": 0.442}, "R_swSL": {"pit": 127, "zsw": 0.507, "chase": 0.333, "whiff": 0.339, "xavg": 0.173, "xslg": 0.231}, "R_CU": {"pit": 178, "zsw": 0.536, "chase": 0.305, "whiff": 0.384, "xavg": 0.224, "xslg": 0.324}, "L_FF": {"pit": 241, "zsw": 0.668, "chase": 0.314, "whiff": 0.206, "xavg": 0.265, "xslg": 0.371}, "R_shSL": {"pit": 277, "zsw": 0.399, "chase": 0.246, "whiff": 0.4, "xavg": 0.19, "xslg": 0.268}, "R_FF": {"pit": 609, "zsw": 0.54, "chase": 0.388, "whiff": 0.208, "xavg": 0.263, "xslg": 0.345}}, "cc_agg": {"LFB": {"pit": 318, "zsw": 0.609, "whiff": 0.8, "rv": -0.001, "xwoba": 0.313}, "LOS": {"pit": 131, "zsw": 0.4, "whiff": 0.686, "rv": 0.001, "xwoba": 0.295}, "RFB": {"pit": 779, "zsw": 0.524, "whiff": 0.783, "rv": -0.007, "xwoba": 0.318}, "ROS": {"pit": 582, "zsw": 0.465, "whiff": 0.62, "rv": -0.013, "xwoba": 0.213}}, "approach": {}}, {"id": 155813, "name": "Hernandez, Jesus", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 2038, "chase": 0.203, "avg_uev": 76, "avg_ev": 79.8, "max_ev": 109.8, "ctct": 0.761}, "grades_lhp": {"pit": 581, "chase": 0.199, "avg_uev": 79, "avg_ev": 79.7, "max_ev": 103.9, "ctct": 0.773}, "pitch_stats": {"L_FC": {"pit": 14, "zsw": 0.499, "chase": 0.25, "whiff": 0.4, "xavg": 0.254, "xslg": 0.258}, "L_FT": {"pit": 23, "zsw": 0.253, "chase": 0.25, "whiff": 0.3, "xavg": 0.974, "xslg": 0.569}, "L_shSL": {"pit": 35, "zsw": 0.371, "chase": 0.167, "whiff": 0.118, "xavg": 0.276, "xslg": 0.659}, "L_swSL": {"pit": 36, "zsw": 0.277, "chase": 0.263, "whiff": 0.357, "xavg": 0.361, "xslg": 0.46}, "L_CU": {"pit": 72, "zsw": 0.633, "chase": 0.286, "whiff": 0.242, "xavg": 0.115, "xslg": 0.14}, "L_CH/SP": {"pit": 82, "zsw": 0.785, "chase": 0.265, "whiff": 0.268, "xavg": 0.193, "xslg": 0.309}, "R_FC": {"pit": 129, "zsw": 0.591, "chase": 0.117, "whiff": 0.245, "xavg": 0.249, "xslg": 0.399}, "R_FT": {"pit": 131, "zsw": 0.543, "chase": 0.133, "whiff": 0.107, "xavg": 0.243, "xslg": 0.285}, "R_swSL": {"pit": 136, "zsw": 0.557, "chase": 0.316, "whiff": 0.323, "xavg": 0.175, "xslg": 0.323}, "R_CH/SP": {"pit": 171, "zsw": 0.549, "chase": 0.281, "whiff": 0.312, "xavg": 0.249, "xslg": 0.337}, "R_CU": {"pit": 247, "zsw": 0.407, "chase": 0.234, "whiff": 0.302, "xavg": 0.184, "xslg": 0.263}, "L_FF": {"pit": 319, "zsw": 0.439, "chase": 0.14, "whiff": 0.198, "xavg": 0.305, "xslg": 0.486}, "R_shSL": {"pit": 338, "zsw": 0.518, "chase": 0.243, "whiff": 0.288, "xavg": 0.192, "xslg": 0.296}, "R_FF": {"pit": 886, "zsw": 0.46, "chase": 0.155, "whiff": 0.192, "xavg": 0.226, "xslg": 0.361}}, "cc_agg": {"LFB": {"pit": 356, "zsw": 0.426, "whiff": 0.788, "rv": 0.011, "xwoba": 0.411}, "LOS": {"pit": 143, "zsw": 0.417, "whiff": 0.766, "rv": 0.005, "xwoba": 0.299}, "RFB": {"pit": 1146, "zsw": 0.492, "whiff": 0.812, "rv": -0.001, "xwoba": 0.335}, "ROS": {"pit": 721, "zsw": 0.487, "whiff": 0.7, "rv": -0.01, "xwoba": 0.234}}, "approach": {}}, {"id": 114416, "name": "Hostetler, Bennett", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 1025, "chase": 0.29, "avg_uev": 76, "avg_ev": 79.7, "max_ev": 106.3, "ctct": 0.643}, "grades_lhp": {"pit": 392, "chase": 0.335, "avg_uev": 80, "avg_ev": 80.1, "max_ev": 106.3, "ctct": 0.672}, "pitch_stats": {"L_swSL": {"pit": 20, "zsw": null, "chase": 0.375, "whiff": 0.167, "xavg": 0.3, "xslg": 0.462}, "L_CU": {"pit": 25, "zsw": 0.295, "chase": 0.529, "whiff": 0.462, "xavg": 0.144, "xslg": 0.149}, "L_FT": {"pit": 29, "zsw": 0.716, "chase": 0.235, "whiff": 0.067, "xavg": 0.485, "xslg": 1.036}, "L_shSL": {"pit": 47, "zsw": 0.406, "chase": 0.458, "whiff": 0.333, "xavg": 0.147, "xslg": 0.228}, "L_FC": {"pit": 48, "zsw": 0.571, "chase": 0.471, "whiff": 0.226, "xavg": 0.34, "xslg": 0.406}, "R_CU": {"pit": 52, "zsw": 0.63, "chase": 0.444, "whiff": 0.344, "xavg": 0.222, "xslg": 0.386}, "R_CH/SP": {"pit": 81, "zsw": 0.635, "chase": 0.378, "whiff": 0.605, "xavg": 0.059, "xslg": 0.095}, "R_swSL": {"pit": 87, "zsw": 0.534, "chase": 0.262, "whiff": 0.378, "xavg": 0.288, "xslg": 0.504}, "L_CH/SP": {"pit": 93, "zsw": 0.853, "chase": 0.352, "whiff": 0.327, "xavg": 0.253, "xslg": 0.37}, "R_FC": {"pit": 110, "zsw": 0.622, "chase": 0.39, "whiff": 0.492, "xavg": 0.107, "xslg": 0.16}, "R_FT": {"pit": 113, "zsw": 0.347, "chase": 0.19, "whiff": 0.111, "xavg": 0.181, "xslg": 0.193}, "L_FF": {"pit": 130, "zsw": 0.715, "chase": 0.2, "whiff": 0.42, "xavg": 0.171, "xslg": 0.208}, "R_shSL": {"pit": 189, "zsw": 0.548, "chase": 0.383, "whiff": 0.475, "xavg": 0.262, "xslg": 0.373}, "R_FF": {"pit": 393, "zsw": 0.57, "chase": 0.181, "whiff": 0.247, "xavg": 0.206, "xslg": 0.289}}, "cc_agg": {"LFB": {"pit": 207, "zsw": 0.685, "whiff": 0.678, "rv": 0.0, "xwoba": 0.325}, "LOS": {"pit": 92, "zsw": 0.336, "whiff": 0.65, "rv": -0.023, "xwoba": 0.216}, "RFB": {"pit": 616, "zsw": 0.517, "whiff": 0.722, "rv": -0.016, "xwoba": 0.253}, "ROS": {"pit": 328, "zsw": 0.553, "whiff": 0.571, "rv": 0.002, "xwoba": 0.311}}, "approach": {}}, {"id": 75097, "name": "Johnson, Daniel", "bats": "L", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 2435, "chase": 0.349, "avg_uev": 80, "avg_ev": 83.1, "max_ev": 114.7, "ctct": 0.704}, "grades_lhp": {"pit": 792, "chase": 0.332, "avg_uev": 74, "avg_ev": 80.6, "max_ev": 112.3, "ctct": 0.688}, "pitch_stats": {"L_CH/SP": {"pit": 27, "zsw": 0.249, "chase": 0.462, "whiff": 0.286, "xavg": 0.144, "xslg": 0.491}, "L_CU": {"pit": 47, "zsw": 0.343, "chase": 0.379, "whiff": 0.476, "xavg": 0.139, "xslg": 0.187}, "L_FC": {"pit": 61, "zsw": 0.501, "chase": 0.385, "whiff": 0.378, "xavg": 0.225, "xslg": 0.425}, "L_FT": {"pit": 100, "zsw": 0.331, "chase": 0.229, "whiff": 0.2, "xavg": 0.179, "xslg": 0.229}, "L_shSL": {"pit": 112, "zsw": 0.439, "chase": 0.321, "whiff": 0.345, "xavg": 0.326, "xslg": 0.509}, "R_swSL": {"pit": 115, "zsw": 0.04, "chase": 0.339, "whiff": 0.385, "xavg": 0.228, "xslg": 0.588}, "L_swSL": {"pit": 138, "zsw": 0.298, "chase": 0.415, "whiff": 0.432, "xavg": 0.135, "xslg": 0.324}, "R_shSL": {"pit": 202, "zsw": 0.292, "chase": 0.521, "whiff": 0.331, "xavg": 0.266, "xslg": 0.536}, "R_CU": {"pit": 216, "zsw": 0.282, "chase": 0.404, "whiff": 0.37, "xavg": 0.188, "xslg": 0.344}, "L_FF": {"pit": 218, "zsw": 0.566, "chase": 0.309, "whiff": 0.219, "xavg": 0.273, "xslg": 0.526}, "R_FT": {"pit": 223, "zsw": 0.426, "chase": 0.237, "whiff": 0.14, "xavg": 0.408, "xslg": 0.675}, "R_FC": {"pit": 236, "zsw": 0.364, "chase": 0.376, "whiff": 0.277, "xavg": 0.292, "xslg": 0.546}, "R_CH/SP": {"pit": 415, "zsw": 0.476, "chase": 0.407, "whiff": 0.332, "xavg": 0.227, "xslg": 0.424}, "R_FF": {"pit": 854, "zsw": 0.486, "chase": 0.262, "whiff": 0.276, "xavg": 0.27, "xslg": 0.465}}, "cc_agg": {"LFB": {"pit": 432, "zsw": 0.464, "whiff": 0.763, "rv": -0.006, "xwoba": 0.291}, "LOS": {"pit": 330, "zsw": 0.35, "whiff": 0.595, "rv": -0.008, "xwoba": 0.282}, "RFB": {"pit": 1420, "zsw": 0.467, "whiff": 0.746, "rv": 0.009, "xwoba": 0.383}, "ROS": {"pit": 565, "zsw": 0.249, "whiff": 0.641, "rv": -0.001, "xwoba": 0.303}}, "approach": {}}, {"id": 168486, "name": "Lara, Wilfredo", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 2216, "chase": 0.257, "avg_uev": 76, "avg_ev": 80.5, "max_ev": 108.8, "ctct": 0.735}, "grades_lhp": {"pit": 603, "chase": 0.291, "avg_uev": 80, "avg_ev": 82.4, "max_ev": 109.6, "ctct": 0.739}, "pitch_stats": {"L_FC": {"pit": 32, "zsw": 0.24, "chase": 0.333, "whiff": 0.238, "xavg": 0.525, "xslg": 1.105}, "L_swSL": {"pit": 36, "zsw": 0.301, "chase": 0.35, "whiff": 0.611, "xavg": 0.181, "xslg": 0.569}, "L_FT": {"pit": 41, "zsw": 0.435, "chase": 0.438, "whiff": 0.208, "xavg": 0.301, "xslg": 0.338}, "L_shSL": {"pit": 41, "zsw": 0.04, "chase": 0.217, "whiff": 0.3, "xavg": 0.271, "xslg": 0.435}, "L_CU": {"pit": 61, "zsw": 0.34, "chase": 0.355, "whiff": 0.333, "xavg": 0.195, "xslg": 0.299}, "L_CH/SP": {"pit": 114, "zsw": 0.516, "chase": 0.25, "whiff": 0.283, "xavg": 0.276, "xslg": 0.411}, "R_FC": {"pit": 151, "zsw": 0.317, "chase": 0.309, "whiff": 0.348, "xavg": 0.234, "xslg": 0.292}, "R_swSL": {"pit": 165, "zsw": 0.224, "chase": 0.232, "whiff": 0.339, "xavg": 0.186, "xslg": 0.371}, "R_FT": {"pit": 172, "zsw": 0.406, "chase": 0.214, "whiff": 0.153, "xavg": 0.306, "xslg": 0.437}, "R_CH/SP": {"pit": 228, "zsw": 0.511, "chase": 0.33, "whiff": 0.381, "xavg": 0.192, "xslg": 0.36}, "R_CU": {"pit": 259, "zsw": 0.176, "chase": 0.212, "whiff": 0.338, "xavg": 0.162, "xslg": 0.277}, "L_FF": {"pit": 278, "zsw": 0.619, "chase": 0.28, "whiff": 0.2, "xavg": 0.223, "xslg": 0.319}, "R_shSL": {"pit": 373, "zsw": 0.333, "chase": 0.311, "whiff": 0.384, "xavg": 0.188, "xslg": 0.253}, "R_FF": {"pit": 868, "zsw": 0.486, "chase": 0.227, "whiff": 0.173, "xavg": 0.274, "xslg": 0.507}}, "cc_agg": {"LFB": {"pit": 351, "zsw": 0.565, "whiff": 0.795, "rv": -0.006, "xwoba": 0.318}, "LOS": {"pit": 138, "zsw": 0.274, "whiff": 0.603, "rv": 0.008, "xwoba": 0.316}, "RFB": {"pit": 1191, "zsw": 0.458, "whiff": 0.81, "rv": 0.007, "xwoba": 0.369}, "ROS": {"pit": 797, "zsw": 0.273, "whiff": 0.636, "rv": -0.004, "xwoba": 0.267}}, "approach": {}}, {"id": 107888, "name": "Lewis, Ian", "bats": "S", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 809, "chase": 0.336, "avg_uev": 75, "avg_ev": 81.2, "max_ev": 109.9, "ctct": 0.753}, "grades_lhp": {"pit": 187, "chase": 0.277, "avg_uev": 65, "avg_ev": 75.7, "max_ev": 112.4, "ctct": 0.727}, "pitch_stats": {"L_FT": {"pit": 5, "zsw": null, "chase": 0.0, "whiff": 0.0, "xavg": null, "xslg": null}, "L_FC": {"pit": 6, "zsw": 0.869, "chase": 0.333, "whiff": 0.0, "xavg": 0.264, "xslg": 0.265}, "L_swSL": {"pit": 7, "zsw": null, "chase": 0.4, "whiff": 0.5, "xavg": 0.793, "xslg": 1.554}, "L_CU": {"pit": 20, "zsw": null, "chase": 0.4, "whiff": 0.4, "xavg": 0.226, "xslg": 0.243}, "L_shSL": {"pit": 21, "zsw": 0.588, "chase": 0.444, "whiff": 0.286, "xavg": 0.448, "xslg": 0.998}, "R_swSL": {"pit": 28, "zsw": 0.012, "chase": 0.385, "whiff": 0.214, "xavg": 0.146, "xslg": 0.156}, "R_FT": {"pit": 36, "zsw": 0.413, "chase": 0.312, "whiff": 0.095, "xavg": 0.282, "xslg": 0.427}, "L_CH/SP": {"pit": 37, "zsw": 0.0, "chase": 0.32, "whiff": 0.389, "xavg": 0.122, "xslg": 0.135}, "R_shSL": {"pit": 50, "zsw": 0.749, "chase": 0.36, "whiff": 0.281, "xavg": 0.145, "xslg": 0.148}, "R_FC": {"pit": 69, "zsw": 0.66, "chase": 0.333, "whiff": 0.235, "xavg": 0.143, "xslg": 0.225}, "L_FF": {"pit": 91, "zsw": 0.625, "chase": 0.196, "whiff": 0.211, "xavg": 0.284, "xslg": 0.406}, "R_CU": {"pit": 113, "zsw": 0.548, "chase": 0.361, "whiff": 0.31, "xavg": 0.192, "xslg": 0.292}, "R_CH/SP": {"pit": 181, "zsw": 0.615, "chase": 0.371, "whiff": 0.433, "xavg": 0.159, "xslg": 0.192}, "R_FF": {"pit": 332, "zsw": 0.682, "chase": 0.302, "whiff": 0.138, "xavg": 0.296, "xslg": 0.415}}, "cc_agg": {"LFB": {"pit": 102, "zsw": 0.638, "whiff": 0.818, "rv": 0.007, "xwoba": 0.369}, "LOS": {"pit": 48, "zsw": 0.323, "whiff": 0.654, "rv": 0.035, "xwoba": 0.478}, "RFB": {"pit": 437, "zsw": 0.665, "whiff": 0.852, "rv": 0.006, "xwoba": 0.353}, "ROS": {"pit": 191, "zsw": 0.546, "whiff": 0.712, "rv": -0.022, "xwoba": 0.204}}, "approach": {}}, {"id": 152285, "name": "Martorella, Nathan", "bats": "L", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 3171, "chase": 0.268, "avg_uev": 78, "avg_ev": 83.4, "max_ev": 110.8, "ctct": 0.755}, "grades_lhp": {"pit": 762, "chase": 0.268, "avg_uev": 71, "avg_ev": 80.0, "max_ev": 108.6, "ctct": 0.686}, "pitch_stats": {"L_FC": {"pit": 56, "zsw": 0.311, "chase": 0.167, "whiff": 0.308, "xavg": 0.372, "xslg": 0.63}, "L_CU": {"pit": 58, "zsw": 0.216, "chase": 0.289, "whiff": 0.455, "xavg": 0.07, "xslg": 0.171}, "L_CH/SP": {"pit": 58, "zsw": 0.569, "chase": 0.182, "whiff": 0.318, "xavg": 0.123, "xslg": 0.135}, "L_FT": {"pit": 81, "zsw": 0.101, "chase": 0.333, "whiff": 0.152, "xavg": 0.195, "xslg": 0.213}, "R_swSL": {"pit": 108, "zsw": 0.158, "chase": 0.193, "whiff": 0.289, "xavg": 0.182, "xslg": 0.424}, "L_swSL": {"pit": 114, "zsw": 0.327, "chase": 0.214, "whiff": 0.4, "xavg": 0.099, "xslg": 0.14}, "L_shSL": {"pit": 139, "zsw": 0.303, "chase": 0.205, "whiff": 0.46, "xavg": 0.165, "xslg": 0.192}, "R_FT": {"pit": 198, "zsw": 0.514, "chase": 0.216, "whiff": 0.186, "xavg": 0.351, "xslg": 0.649}, "L_FF": {"pit": 256, "zsw": 0.334, "chase": 0.349, "whiff": 0.241, "xavg": 0.214, "xslg": 0.289}, "R_FC": {"pit": 263, "zsw": 0.467, "chase": 0.31, "whiff": 0.173, "xavg": 0.265, "xslg": 0.593}, "R_CU": {"pit": 381, "zsw": 0.164, "chase": 0.26, "whiff": 0.393, "xavg": 0.105, "xslg": 0.146}, "R_shSL": {"pit": 397, "zsw": 0.209, "chase": 0.324, "whiff": 0.216, "xavg": 0.247, "xslg": 0.5}, "R_CH/SP": {"pit": 754, "zsw": 0.417, "chase": 0.306, "whiff": 0.384, "xavg": 0.224, "xslg": 0.357}, "R_FF": {"pit": 1070, "zsw": 0.618, "chase": 0.221, "whiff": 0.161, "xavg": 0.279, "xslg": 0.579}}, "cc_agg": {"LFB": {"pit": 393, "zsw": 0.282, "whiff": 0.766, "rv": -0.017, "xwoba": 0.276}, "LOS": {"pit": 311, "zsw": 0.296, "whiff": 0.567, "rv": -0.023, "xwoba": 0.174}, "RFB": {"pit": 1531, "zsw": 0.571, "whiff": 0.834, "rv": 0.022, "xwoba": 0.415}, "ROS": {"pit": 886, "zsw": 0.183, "whiff": 0.711, "rv": 0.0, "xwoba": 0.301}}, "approach": {}}, {"id": 106451, "name": "Morissette, Cody", "bats": "L", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 2391, "chase": 0.371, "avg_uev": 79, "avg_ev": 81.2, "max_ev": 110.2, "ctct": 0.731}, "grades_lhp": {"pit": 595, "chase": 0.348, "avg_uev": 75, "avg_ev": 76.9, "max_ev": 108.3, "ctct": 0.728}, "pitch_stats": {"L_FC": {"pit": 29, "zsw": 0.328, "chase": 0.211, "whiff": 0.3, "xavg": 0.072, "xslg": 0.139}, "L_FT": {"pit": 40, "zsw": 0.479, "chase": 0.556, "whiff": 0.182, "xavg": 0.439, "xslg": 0.524}, "L_swSL": {"pit": 59, "zsw": null, "chase": 0.176, "whiff": 0.391, "xavg": 0.075, "xslg": 0.088}, "L_CH/SP": {"pit": 61, "zsw": 0.263, "chase": 0.436, "whiff": 0.333, "xavg": 0.101, "xslg": 0.231}, "L_CU": {"pit": 81, "zsw": 0.551, "chase": 0.25, "whiff": 0.238, "xavg": 0.217, "xslg": 0.372}, "L_shSL": {"pit": 88, "zsw": 0.576, "chase": 0.333, "whiff": 0.375, "xavg": 0.176, "xslg": 0.245}, "R_swSL": {"pit": 101, "zsw": 0.094, "chase": 0.419, "whiff": 0.359, "xavg": 0.18, "xslg": 0.318}, "R_FC": {"pit": 135, "zsw": 0.142, "chase": 0.381, "whiff": 0.151, "xavg": 0.234, "xslg": 0.435}, "R_FT": {"pit": 201, "zsw": 0.61, "chase": 0.247, "whiff": 0.206, "xavg": 0.285, "xslg": 0.499}, "R_CU": {"pit": 232, "zsw": 0.14, "chase": 0.35, "whiff": 0.333, "xavg": 0.149, "xslg": 0.22}, "L_FF": {"pit": 237, "zsw": 0.355, "chase": 0.397, "whiff": 0.219, "xavg": 0.226, "xslg": 0.399}, "R_shSL": {"pit": 268, "zsw": 0.25, "chase": 0.481, "whiff": 0.301, "xavg": 0.228, "xslg": 0.468}, "R_CH/SP": {"pit": 504, "zsw": 0.269, "chase": 0.324, "whiff": 0.363, "xavg": 0.209, "xslg": 0.343}, "R_FF": {"pit": 950, "zsw": 0.527, "chase": 0.39, "whiff": 0.226, "xavg": 0.257, "xslg": 0.452}}, "cc_agg": {"LFB": {"pit": 306, "zsw": 0.389, "whiff": 0.781, "rv": -0.001, "xwoba": 0.356}, "LOS": {"pit": 228, "zsw": 0.455, "whiff": 0.676, "rv": -0.016, "xwoba": 0.208}, "RFB": {"pit": 1286, "zsw": 0.501, "whiff": 0.783, "rv": 0.0, "xwoba": 0.345}, "ROS": {"pit": 601, "zsw": 0.181, "whiff": 0.68, "rv": -0.007, "xwoba": 0.288}}, "approach": {}}, {"id": 3755, "name": "Navarreto, Brian", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 1055, "chase": 0.369, "avg_uev": 76, "avg_ev": 80.5, "max_ev": 109.4, "ctct": 0.746}, "grades_lhp": {"pit": 266, "chase": 0.419, "avg_uev": 83, "avg_ev": 82.3, "max_ev": 104.3, "ctct": 0.72}, "pitch_stats": {"L_swSL": {"pit": 20, "zsw": 0.513, "chase": 0.444, "whiff": 0.417, "xavg": 0.464, "xslg": 0.918}, "L_shSL": {"pit": 25, "zsw": 0.491, "chase": 0.5, "whiff": 0.353, "xavg": 0.213, "xslg": 0.331}, "L_FC": {"pit": 26, "zsw": 0.445, "chase": 0.455, "whiff": 0.375, "xavg": 0.279, "xslg": 0.422}, "L_FT": {"pit": 27, "zsw": 0.266, "chase": 0.267, "whiff": 0.333, "xavg": 0.24, "xslg": 0.662}, "L_CU": {"pit": 29, "zsw": 0.28, "chase": 0.333, "whiff": 0.417, "xavg": 0.181, "xslg": 0.183}, "R_CH/SP": {"pit": 50, "zsw": 0.792, "chase": 0.457, "whiff": 0.6, "xavg": 0.058, "xslg": 0.059}, "L_CH/SP": {"pit": 53, "zsw": 0.602, "chase": 0.469, "whiff": 0.273, "xavg": 0.229, "xslg": 0.378}, "L_FF": {"pit": 86, "zsw": 0.357, "chase": 0.432, "whiff": 0.146, "xavg": 0.308, "xslg": 0.479}, "R_CU": {"pit": 90, "zsw": 0.614, "chase": 0.281, "whiff": 0.333, "xavg": 0.188, "xslg": 0.316}, "R_swSL": {"pit": 97, "zsw": 0.44, "chase": 0.352, "whiff": 0.255, "xavg": 0.191, "xslg": 0.217}, "R_FT": {"pit": 136, "zsw": 0.528, "chase": 0.263, "whiff": 0.078, "xavg": 0.301, "xslg": 0.393}, "R_FC": {"pit": 138, "zsw": 0.529, "chase": 0.304, "whiff": 0.237, "xavg": 0.164, "xslg": 0.274}, "R_shSL": {"pit": 208, "zsw": 0.34, "chase": 0.415, "whiff": 0.354, "xavg": 0.248, "xslg": 0.482}, "R_FF": {"pit": 319, "zsw": 0.5, "chase": 0.422, "whiff": 0.189, "xavg": 0.205, "xslg": 0.368}}, "cc_agg": {"LFB": {"pit": 139, "zsw": 0.363, "whiff": 0.776, "rv": 0.014, "xwoba": 0.386}, "LOS": {"pit": 74, "zsw": 0.387, "whiff": 0.61, "rv": 0.005, "xwoba": 0.362}, "RFB": {"pit": 600, "zsw": 0.515, "whiff": 0.821, "rv": -0.011, "xwoba": 0.299}, "ROS": {"pit": 403, "zsw": 0.395, "whiff": 0.676, "rv": -0.009, "xwoba": 0.254}}, "approach": {}}, {"id": 139266, "name": "Pintar, Andrew", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 2734, "chase": 0.252, "avg_uev": 76, "avg_ev": 81.0, "max_ev": 113.5, "ctct": 0.701}, "grades_lhp": {"pit": 669, "chase": 0.257, "avg_uev": 80, "avg_ev": 82.2, "max_ev": 110.9, "ctct": 0.78}, "pitch_stats": {"L_swSL": {"pit": 28, "zsw": 0.521, "chase": 0.059, "whiff": 0.2, "xavg": 0.368, "xslg": 0.394}, "L_shSL": {"pit": 39, "zsw": 0.599, "chase": 0.353, "whiff": 0.227, "xavg": 0.235, "xslg": 0.304}, "L_FC": {"pit": 40, "zsw": 0.736, "chase": 0.4, "whiff": 0.28, "xavg": 0.298, "xslg": 0.802}, "L_CU": {"pit": 42, "zsw": 0.333, "chase": 0.296, "whiff": 0.562, "xavg": 0.065, "xslg": 0.08}, "L_FT": {"pit": 82, "zsw": 0.553, "chase": 0.276, "whiff": 0.044, "xavg": 0.307, "xslg": 0.35}, "L_CH/SP": {"pit": 145, "zsw": 0.572, "chase": 0.25, "whiff": 0.375, "xavg": 0.246, "xslg": 0.297}, "R_CH/SP": {"pit": 156, "zsw": 0.351, "chase": 0.333, "whiff": 0.446, "xavg": 0.208, "xslg": 0.275}, "L_FF": {"pit": 201, "zsw": 0.432, "chase": 0.15, "whiff": 0.083, "xavg": 0.395, "xslg": 0.579}, "R_FC": {"pit": 208, "zsw": 0.417, "chase": 0.233, "whiff": 0.291, "xavg": 0.228, "xslg": 0.379}, "R_CU": {"pit": 238, "zsw": 0.347, "chase": 0.239, "whiff": 0.396, "xavg": 0.214, "xslg": 0.403}, "R_swSL": {"pit": 251, "zsw": 0.259, "chase": 0.29, "whiff": 0.521, "xavg": 0.152, "xslg": 0.195}, "R_FT": {"pit": 322, "zsw": 0.449, "chase": 0.176, "whiff": 0.203, "xavg": 0.231, "xslg": 0.321}, "R_shSL": {"pit": 446, "zsw": 0.425, "chase": 0.287, "whiff": 0.408, "xavg": 0.198, "xslg": 0.281}, "R_FF": {"pit": 750, "zsw": 0.489, "chase": 0.255, "whiff": 0.159, "xavg": 0.299, "xslg": 0.488}}, "cc_agg": {"LFB": {"pit": 370, "zsw": 0.515, "whiff": 0.874, "rv": 0.012, "xwoba": 0.394}, "LOS": {"pit": 129, "zsw": 0.392, "whiff": 0.644, "rv": -0.004, "xwoba": 0.27}, "RFB": {"pit": 1478, "zsw": 0.479, "whiff": 0.802, "rv": 0.01, "xwoba": 0.37}, "ROS": {"pit": 1087, "zsw": 0.38, "whiff": 0.576, "rv": -0.009, "xwoba": 0.239}}, "approach": {}}, {"id": 119638, "name": "Praytor, Sam", "bats": "R", "opponent": "Jacksonville Jumbo Shrimp", "grades_rhp": {"pit": 1000, "chase": 0.21, "avg_uev": 78, "avg_ev": 82.6, "max_ev": 107.5, "ctct": 0.742}, "grades_lhp": {"pit": 369, "chase": 0.216, "avg_uev": 81, "avg_ev": 84.6, "max_ev": 106.8, "ctct": 0.679}, "pitch_stats": {"L_FT": {"pit": 17, "zsw": 0.125, "chase": 0.222, "whiff": 0.143, "xavg": 0.607, "xslg": 1.542}, "L_swSL": {"pit": 19, "zsw": 0.45, "chase": 0.167, "whiff": 0.0, "xavg": 0.478, "xslg": 0.831}, "L_FC": {"pit": 20, "zsw": 0.514, "chase": 0.308, "whiff": 0.333, "xavg": 0.186, "xslg": 0.216}, "L_shSL": {"pit": 24, "zsw": 0.0, "chase": 0.333, "whiff": 0.364, "xavg": 0.406, "xslg": 1.422}, "L_CU": {"pit": 33, "zsw": 0.219, "chase": 0.25, "whiff": 0.6, "xavg": 0.084, "xslg": 0.293}, "R_swSL": {"pit": 72, "zsw": 0.347, "chase": 0.19, "whiff": 0.348, "xavg": 0.119, "xslg": 0.241}, "L_CH/SP": {"pit": 74, "zsw": 0.705, "chase": 0.256, "whiff": 0.588, "xavg": 0.273, "xslg": 0.323}, "R_CH/SP": {"pit": 77, "zsw": 0.63, "chase": 0.317, "whiff": 0.436, "xavg": 0.132, "xslg": 0.126}, "R_FT": {"pit": 78, "zsw": 0.619, "chase": 0.233, "whiff": 0.1, "xavg": 0.293, "xslg": 0.451}, "R_FC": {"pit": 79, "zsw": 0.431, "chase": 0.243, "whiff": 0.333, "xavg": 0.32, "xslg": 0.441}, "R_CU": {"pit": 105, "zsw": 0.118, "chase": 0.078, "whiff": 0.333, "xavg": 0.26, "xslg": 0.646}, "L_FF": {"pit": 182, "zsw": 0.622, "chase": 0.165, "whiff": 0.212, "xavg": 0.298, "xslg": 0.656}, "R_shSL": {"pit": 185, "zsw": 0.522, "chase": 0.194, "whiff": 0.457, "xavg": 0.264, "xslg": 0.39}, "R_FF": {"pit": 390, "zsw": 0.534, "chase": 0.242, "whiff": 0.142, "xavg": 0.232, "xslg": 0.428}}, "cc_agg": {"LFB": {"pit": 219, "zsw": 0.566, "whiff": 0.782, "rv": 0.033, "xwoba": 0.461}, "LOS": {"pit": 76, "zsw": 0.259, "whiff": 0.63, "rv": 0.027, "xwoba": 0.468}, "RFB": {"pit": 555, "zsw": 0.536, "whiff": 0.839, "rv": 0.006, "xwoba": 0.352}, "ROS": {"pit": 362, "zsw": 0.403, "whiff": 0.592, "rv": 0.012, "xwoba": 0.324}}, "approach": {}}];

// Sugar Land Space Cowboys 2025 pitchers (example roster - can be updated)
const SL_PITCHERS = [
  { name: "Pitcher - RHP", throws: "R", pitches: ["FF", "SL", "CH/SP", "CU"] },
  { name: "Pitcher - LHP", throws: "L", pitches: ["FF", "FT", "SL", "CU"] },
];

// Utility functions
const pct = (v) => v != null ? (v * 100).toFixed(1) + "%" : "—";
const dec3 = (v) => v != null ? v.toFixed(3) : "—";

function getGradeColor(val, metric) {
  if (val == null) return "#1a1a2e";
  const thresholds = {
    chase: { low: 0.22, high: 0.35 },
    whiff: { low: 0.2, high: 0.35 },
    xwoba: { low: 0.28, high: 0.38 },
    ctct: { low: 0.68, high: 0.82 },
  };
  const t = thresholds[metric];
  if (!t) return "#1a1a2e";
  if (metric === "chase" || metric === "whiff") {
    if (val >= t.high) return "#1a4a1a";
    if (val <= t.low) return "#4a1a1a";
    return "#2a2a1a";
  }
  if (metric === "ctct" || metric === "xwoba") {
    if (val >= t.high) return "#4a1a1a";
    if (val <= t.low) return "#1a4a1a";
    return "#2a2a1a";
  }
  return "#1a1a2e";
}

function getBestPitches(hitter, pitcherThrows, pitcherPitches) {
  const hand = pitcherThrows;
  const results = [];
  for (const pitch of pitcherPitches) {
    const key = `${hand}_${pitch}`;
    const altKey = `${hand}_${pitch.replace("/", "/")}`;
    const stats = hitter.pitch_stats[key] || hitter.pitch_stats[altKey];
    if (stats && stats.pit >= 15) {
      results.push({ pitch, stats });
    }
  }
  return results.sort((a, b) => (b.stats.whiff || 0) - (a.stats.whiff || 0));
}

function getWeakness(hitter, pitcherThrows) {
  const grades = pitcherThrows === "R" ? hitter.grades_rhp : hitter.grades_lhp;
  const weaknesses = [];
  if (grades.chase && grades.chase > 0.30) weaknesses.push("High chase%");
  if (grades.ctct && grades.ctct < 0.72) weaknesses.push("Poor contact");
  if (grades.avg_uev && grades.avg_uev < 74) weaknesses.push("Weak contact");
  const osKey = `${pitcherThrows}OS`;
  const fbKey = `${pitcherThrows}FB`;
  const cc = hitter.cc_agg;
  if (cc[osKey] && cc[fbKey] && cc[osKey].xwoba < cc[fbKey].xwoba - 0.05) weaknesses.push("Vulnerable off-speed");
  return weaknesses;
}

const OPPONENT_COLORS = {
  "Round Rock Express": { bg: "#002060", accent: "#C8102E" },
  "Jacksonville Jumbo Shrimp": { bg: "#003087", accent: "#E41C23" },
};

// Pitch type badges
const PITCH_COLORS = {
  FF: "#e63946", FT: "#f4a261", FC: "#e9c46a",
  SL: "#2a9d8f", CU: "#457b9d", "CH/SP": "#8338ec",
  swSL: "#06d6a0", shSL: "#118ab2",
};

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
  const display = metric === "xwoba" ? dec3(value) : pct(value);
  return (
    <td style={{
      background: bg, color: "#e0e0e0", textAlign: "center",
      padding: "3px 6px", fontSize: "0.72rem", fontFamily: "monospace",
      border: "1px solid #333",
    }}>{display}</td>
  );
}

function HitterCard({ hitter, pitcherThrows, pitcherPitches }) {
  const grades = pitcherThrows === "R" ? hitter.grades_rhp : hitter.grades_lhp;
  const approach = hitter.approach || {};
  const approachSide = pitcherThrows === "R" ? approach.rhp : approach.lhp;
  const bestPitches = getBestPitches(hitter, pitcherThrows, pitcherPitches);
  const weaknesses = getWeakness(hitter, pitcherThrows);
  const hasData = grades && Object.keys(grades).length > 0;

  const fbAgg = hitter.cc_agg[`${pitcherThrows}FB`];
  const osAgg = hitter.cc_agg[`${pitcherThrows}OS`];

  const batsBadge = { R: "#c8102e", L: "#1d6fa4", S: "#5a7a4a" }[hitter.bats] || "#555";

  return (
    <div style={{
      background: "#0d0d1a", border: "1px solid #2a2a4a",
      borderRadius: 6, marginBottom: 8, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #111130 0%, #1a1a3a 100%)",
        padding: "6px 10px", display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid #2a2a4a",
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', 'Impact', sans-serif",
          fontSize: "1.0rem", color: "#fff", letterSpacing: 1,
        }}>{hitter.name}</span>
        <span style={{
          background: batsBadge, color: "#fff", fontSize: "0.6rem",
          fontWeight: 800, borderRadius: 2, padding: "1px 5px",
        }}>{hitter.bats}</span>
        {weaknesses.map(w => (
          <span key={w} style={{
            background: "#3d1a00", color: "#ff9944", fontSize: "0.6rem",
            borderRadius: 2, padding: "1px 5px", border: "1px solid #663300",
          }}>⚠ {w}</span>
        ))}
        {approach.runner === "YES" && (
          <span style={{
            background: "#002233", color: "#44aaff", fontSize: "0.6rem",
            borderRadius: 2, padding: "1px 5px", border: "1px solid #004466",
          }}>🏃 RUNNER</span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Left: Stats */}
        <div style={{ padding: "6px 8px" }}>
          {hasData ? (
            <>
              {/* Aggregated FB/OS */}
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
                    {fbAgg && (
                      <tr>
                        <td style={{ color: "#e63946", padding: "2px 6px", fontWeight: 700, border: "1px solid #333" }}>FB</td>
                        <td style={{ color: "#aaa", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>{fbAgg.pit}</td>
                        <StatCell value={grades.chase} metric="chase" />
                        <StatCell value={fbAgg.whiff} metric="whiff" />
                        <StatCell value={fbAgg.xwoba} metric="xwoba" />
                      </tr>
                    )}
                    {osAgg && (
                      <tr>
                        <td style={{ color: "#457b9d", padding: "2px 6px", fontWeight: 700, border: "1px solid #333" }}>OS</td>
                        <td style={{ color: "#aaa", padding: "2px 6px", textAlign: "center", border: "1px solid #333" }}>{osAgg.pit}</td>
                        <StatCell value={grades.chase} metric="chase" />
                        <StatCell value={osAgg.whiff} metric="whiff" />
                        <StatCell value={osAgg.xwoba} metric="xwoba" />
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Grades row */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "Ctct%", val: pct(grades.ctct), raw: grades.ctct, metric: "ctct" },
                  { label: "AvgEV", val: grades.avg_ev != null ? grades.avg_ev : "—" },
                  { label: "MaxEV", val: grades.max_ev != null ? grades.max_ev : "—" },
                  { label: "avgUEV", val: grades.avg_uev != null ? grades.avg_uev : "—" },
                ].map(g => (
                  <div key={g.label} style={{ textAlign: "center" }}>
                    <div style={{ color: "#666", fontSize: "0.55rem" }}>{g.label}</div>
                    <div style={{ color: "#ccc", fontSize: "0.75rem", fontFamily: "monospace" }}>{g.val}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#555", fontSize: "0.7rem", padding: 4 }}>No data available</div>
          )}
        </div>

        {/* Right: Pitch matchup + approach */}
        <div style={{ padding: "6px 8px", borderLeft: "1px solid #1a1a3a" }}>
          {/* Best pitch matchups */}
          {bestPitches.length > 0 && (
            <div style={{ marginBottom: 5 }}>
              <div style={{ color: "#666", fontSize: "0.58rem", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5 }}>vs. Pitcher Arsenal</div>
              {bestPitches.slice(0, 4).map(({ pitch, stats }) => (
                <div key={pitch} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                  <PitchBadge pitch={pitch} />
                  <span style={{ color: "#666", fontSize: "0.58rem" }}>{stats.pit}p</span>
                  <span style={{ color: "#aaa", fontSize: "0.62rem", fontFamily: "monospace" }}>
                    Whiff {pct(stats.whiff)}
                  </span>
                  <span style={{ color: "#888", fontSize: "0.6rem", fontFamily: "monospace" }}>
                    Chase {pct(stats.chase)}
                  </span>
                  <span style={{ color: stats.xavg && stats.xavg < 0.2 ? "#44aa44" : "#cc6644", fontSize: "0.6rem", fontFamily: "monospace" }}>
                    xAVG {dec3(stats.xavg)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Catcher card approach */}
          {approachSide && approachSide.fb_attack && (
            <div style={{ borderTop: "1px solid #1a1a3a", paddingTop: 4 }}>
              <div style={{ color: "#666", fontSize: "0.58rem", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>Attack Plan</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {[
                  { label: "FB Attack", val: approachSide.fb_attack, color: "#e63946" },
                  { label: "Alt Attack", val: approachSide.alt_attack, color: "#f4a261" },
                  { label: "Kill Pitch", val: approachSide.kill, color: "#2a9d8f" },
                  { label: "No Go", val: approachSide.no_go, color: "#e76f51" },
                ].map(item => item.val ? (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ color: "#555", fontSize: "0.55rem" }}>{item.label}:</span>
                    <span style={{ color: item.color, fontSize: "0.65rem", fontWeight: 700, fontFamily: "monospace" }}>{item.val}</span>
                  </div>
                ) : null)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PitcherCard({ pitcher, hitters }) {
  const oppColors = {};
  const opponents = [...new Set(hitters.map(h => h.opponent))];

  return (
    <div style={{
      background: "#080814", minHeight: "100vh",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Pitcher header */}
      <div style={{
        background: "linear-gradient(135deg, #001020 0%, #002060 50%, #001838 100%)",
        padding: "16px 20px",
        borderBottom: "3px solid #C8102E",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ color: "#C8102E", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            Sugar Land Space Cowboys • Advance Scouting
          </div>
          <div style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: "1.8rem", color: "#fff", letterSpacing: 2,
          }}>{pitcher.name}</div>
          <div style={{ color: "#aaa", fontSize: "0.75rem" }}>
            Throws: <strong style={{ color: pitcher.throws === "R" ? "#e63946" : "#4a9eff" }}>{pitcher.throws === "R" ? "RIGHT" : "LEFT"}</strong>
            &nbsp;•&nbsp; Arsenal: {pitcher.pitches.map(p => <PitchBadge key={p} pitch={p} />).reduce((a, b) => <>{a} {b}</>)}
          </div>
        </div>
        <div style={{ textAlign: "right", color: "#555", fontSize: "0.7rem" }}>
          <div style={{ color: "#C8102E", fontWeight: 700 }}>CATCHER CARD</div>
          <div>Generated {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Hitters by opponent */}
      <div style={{ padding: "12px 16px" }}>
        {opponents.map(opp => {
          const oppHitters = hitters.filter(h => h.opponent === opp);
          const colors = OPPONENT_COLORS[opp] || { bg: "#1a1a2e", accent: "#fff" };
          return (
            <div key={opp} style={{ marginBottom: 20 }}>
              <div style={{
                background: `linear-gradient(90deg, ${colors.bg} 0%, #0d0d1a 100%)`,
                borderLeft: `4px solid ${colors.accent}`,
                padding: "8px 12px", marginBottom: 8, borderRadius: "0 4px 4px 0",
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  fontSize: "1.1rem", color: "#fff", letterSpacing: 1,
                }}>{opp}</span>
                <span style={{ color: "#888", fontSize: "0.7rem", marginLeft: 8 }}>
                  {oppHitters.length} hitters • vs. {pitcher.throws === "R" ? "RHP" : "LHP"}
                </span>
              </div>

              {oppHitters.map(h => (
                <HitterCard
                  key={h.id}
                  hitter={h}
                  pitcherThrows={pitcher.throws}
                  pitcherPitches={pitcher.pitches}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Pitcher editor modal
function PitcherEditor({ pitcher, onSave, onClose }) {
  const [name, setName] = useState(pitcher.name);
  const [throws, setThrows] = useState(pitcher.throws);
  const [pitchInput, setPitchInput] = useState(pitcher.pitches.join(", "));

  const handleSave = () => {
    const pitches = pitchInput.split(",").map(p => p.trim()).filter(Boolean);
    onSave({ name, throws, pitches });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div style={{
        background: "#0d0d1a", border: "1px solid #2a2a4a",
        borderRadius: 8, padding: 24, width: 400,
      }}>
        <h3 style={{ color: "#fff", margin: "0 0 16px", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>
          Edit Pitcher
        </h3>
        <label style={{ color: "#888", fontSize: "0.75rem" }}>Name</label>
        <input value={name} onChange={e => setName(e.target.value)}
          style={{ display: "block", width: "100%", background: "#1a1a2e", border: "1px solid #333",
            color: "#fff", borderRadius: 4, padding: "6px 8px", marginBottom: 12, fontSize: "0.85rem", boxSizing: "border-box" }} />
        <label style={{ color: "#888", fontSize: "0.75rem" }}>Throws</label>
        <select value={throws} onChange={e => setThrows(e.target.value)}
          style={{ display: "block", width: "100%", background: "#1a1a2e", border: "1px solid #333",
            color: "#fff", borderRadius: 4, padding: "6px 8px", marginBottom: 12, fontSize: "0.85rem" }}>
          <option value="R">Right (RHP)</option>
          <option value="L">Left (LHP)</option>
        </select>
        <label style={{ color: "#888", fontSize: "0.75rem" }}>Pitch Arsenal (comma-separated)</label>
        <div style={{ color: "#555", fontSize: "0.65rem", marginBottom: 4 }}>
          Options: FF, FT, FC, SL, swSL, shSL, CU, CH/SP
        </div>
        <input value={pitchInput} onChange={e => setPitchInput(e.target.value)}
          style={{ display: "block", width: "100%", background: "#1a1a2e", border: "1px solid #333",
            color: "#fff", borderRadius: 4, padding: "6px 8px", marginBottom: 16, fontSize: "0.85rem", boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleSave}
            style={{ flex: 1, background: "#002060", color: "#fff", border: "none",
              borderRadius: 4, padding: "8px", cursor: "pointer", fontWeight: 700 }}>
            Save
          </button>
          <button onClick={onClose}
            style={{ flex: 1, background: "#2a1a1a", color: "#ccc", border: "1px solid #333",
              borderRadius: 4, padding: "8px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [pitchers, setPitchers] = useState(SL_PITCHERS);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [editingIdx, setEditingIdx] = useState(null);
  const [oppFilter, setOppFilter] = useState("all");

  const opponents = useMemo(() => [...new Set(HITTERS_DATA.map(h => h.opponent))], []);
  const filteredHitters = useMemo(() =>
    oppFilter === "all" ? HITTERS_DATA : HITTERS_DATA.filter(h => h.opponent === oppFilter),
    [oppFilter]
  );

  const addPitcher = () => {
    const newP = { name: "New Pitcher", throws: "R", pitches: ["FF", "SL", "CH/SP"] };
    setPitchers(prev => [...prev, newP]);
    setSelectedIdx(pitchers.length);
  };

  const removePitcher = (idx) => {
    setPitchers(prev => prev.filter((_, i) => i !== idx));
    setSelectedIdx(Math.max(0, selectedIdx - 1));
  };

  return (
    <div style={{ background: "#050510", minHeight: "100vh", display: "flex" }}>
      {/* Sidebar */}
      <div style={{
        width: 220, background: "#08080f", borderRight: "1px solid #1a1a2e",
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        <div style={{
          padding: "14px 12px", borderBottom: "1px solid #1a1a2e",
          background: "linear-gradient(180deg, #001020 0%, #050510 100%)",
        }}>
          <div style={{ color: "#C8102E", fontSize: "0.55rem", fontWeight: 700, letterSpacing: 2 }}>SUGAR LAND</div>
          <div style={{ color: "#fff", fontFamily: "'Bebas Neue','Impact',sans-serif", fontSize: "1.1rem", letterSpacing: 2 }}>
            SPACE COWBOYS
          </div>
          <div style={{ color: "#555", fontSize: "0.6rem" }}>Advance Scouting System</div>
        </div>

        {/* Opponent filter */}
        <div style={{ padding: "10px 10px 0" }}>
          <div style={{ color: "#555", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Opponent</div>
          <select value={oppFilter} onChange={e => setOppFilter(e.target.value)}
            style={{ width: "100%", background: "#0d0d1a", border: "1px solid #222", color: "#ccc",
              borderRadius: 4, padding: "4px 6px", fontSize: "0.7rem" }}>
            <option value="all">All Opponents</option>
            {opponents.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Pitcher list */}
        <div style={{ padding: "10px 10px 0" }}>
          <div style={{ color: "#555", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Pitchers</div>
          {pitchers.map((p, i) => (
            <div key={i} onClick={() => setSelectedIdx(i)}
              style={{
                padding: "6px 8px", borderRadius: 4, marginBottom: 3, cursor: "pointer",
                background: i === selectedIdx ? "#001838" : "transparent",
                border: i === selectedIdx ? "1px solid #002060" : "1px solid transparent",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
              <div>
                <div style={{ color: i === selectedIdx ? "#fff" : "#aaa", fontSize: "0.75rem", fontWeight: i === selectedIdx ? 700 : 400 }}>
                  {p.name}
                </div>
                <div style={{ color: p.throws === "R" ? "#e63946" : "#4a9eff", fontSize: "0.6rem" }}>
                  {p.throws}HP • {p.pitches.slice(0, 3).join("/")}
                </div>
              </div>
              <button onClick={e => { e.stopPropagation(); setEditingIdx(i); }}
                style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.8rem", padding: 2 }}>✎</button>
            </div>
          ))}
          <button onClick={addPitcher}
            style={{ width: "100%", background: "#0d1a0d", border: "1px dashed #1a3a1a",
              color: "#4a8a4a", borderRadius: 4, padding: "6px", cursor: "pointer",
              fontSize: "0.7rem", marginTop: 4 }}>
            + Add Pitcher
          </button>
        </div>

        {/* Legend */}
        <div style={{ marginTop: "auto", padding: 10, borderTop: "1px solid #1a1a2e" }}>
          <div style={{ color: "#555", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Color Key</div>
          {[
            { color: "#1a4a1a", label: "Favorable" },
            { color: "#4a1a1a", label: "Unfavorable" },
            { color: "#2a2a1a", label: "Neutral" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
              <div style={{ width: 12, height: 12, background: item.color, borderRadius: 2 }} />
              <span style={{ color: "#666", fontSize: "0.62rem" }}>{item.label}</span>
            </div>
          ))}
          <div style={{ color: "#444", fontSize: "0.58rem", marginTop: 6 }}>
            ↑ Chase%/Whiff% = good<br/>
            ↓ xwOBA/Ctct% = good
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {pitchers[selectedIdx] ? (
          <PitcherCard
            pitcher={pitchers[selectedIdx]}
            hitters={filteredHitters}
          />
        ) : (
          <div style={{ color: "#555", padding: 40, textAlign: "center" }}>
            Select a pitcher or add one to get started
          </div>
        )}
      </div>

      {/* Editor modal */}
      {editingIdx !== null && (
        <PitcherEditor
          pitcher={pitchers[editingIdx]}
          onSave={(updated) => {
            setPitchers(prev => prev.map((p, i) => i === editingIdx ? updated : p));
            setEditingIdx(null);
          }}
          onClose={() => setEditingIdx(null)}
        />
      )}
    </div>
  );
}
