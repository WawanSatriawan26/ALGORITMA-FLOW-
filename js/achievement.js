const BADGES_MASTER = [
  { id: "alg_beginner", title: "Algorithm Beginner" },
  { id: "seq_master", title: "Sequence Master" },
  { id: "flow_expert", title: "Flowchart Expert" },
  { id: "dec_master", title: "Decision Master" },
  { id: "debug_genius", title: "Debugging Genius" },
  { id: "speed_solver", title: "Speed Solver" },
  { id: "perf_accuracy", title: "Perfect Accuracy" },
  { id: "win_streak_5", title: "5 Win Streak" },
  { id: "star_collector", title: "Star Collector" },
  { id: "boss_slayer", title: "Boss Slayer" },
  { id: "world_explorer", title: "World Explorer" },
  { id: "friend_algobot", title: "Friend of Algobot" },
  { id: "puzzle_hunter", title: "Puzzle Hunter" },
  { id: "bug_detective", title: "Bug Detective" },
  { id: "challenge_conqueror", title: "Challenge Conqueror" }
];

function checkBadges() {
  if (algoGameData.stats.highestStreak >= 5) {
    algoGameData.badges["win_streak_5"] = true;
  }
  saveGamificationData();
}