const defaultGamificationData = {
  profile: { nama: "Siswa Aktif", kelas: "X-Informatika 1", sekolah: "SMK Negeri 1" },
  gameStats: { score: 0, xp: 0, coin: 0, star: 0, heart: GAME_CONFIG.DEFAULT_HEARTS },
  stats: { ap: 0, xp: 0, combo: 0, maxCombo: 0, highestStreak: 0, currentRankId: "novice" },
  dailyLoginState: { currentDayStreak: 1, lastClaimDate: "", claimedDaysHistory: [] },
  dailyState: { lastResetDate: "", challenges: {} },
  weeklyState: { lastResetWeekKey: "", challenges: {} },
  missionsState: {},
  specialState: { challenges: {} },
  badges: {}
};

function loadGamificationData() {
  try {
    const raw = localStorage.getItem("ALGO_FLOW_QUEST_DATA_V1");
    if (!raw) return JSON.parse(JSON.stringify(defaultGamificationData));
    return Object.assign({}, defaultGamificationData, JSON.parse(raw));
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultGamificationData));
  }
}

function saveGamificationData() {
  try {
    localStorage.setItem("ALGO_FLOW_QUEST_DATA_V1", JSON.stringify(algoGameData));
    if (typeof updateAllHUDUI === "function") updateAllHUDUI();
  } catch (e) {
    console.warn("Gagal menyimpan data ke localStorage:", e);
  }
}

let algoGameData = loadGamificationData();