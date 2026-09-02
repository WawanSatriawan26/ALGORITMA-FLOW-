function saveGame() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.error("Gagal menyimpan game:", e);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      gameState.player = { ...gameState.player, ...(parsed.player || {}) };
      gameState.levelsProgress = parsed.levelsProgress || {};
      gameState.achievements = parsed.achievements || [];
      gameState.storyProgress = parsed.storyProgress || gameState.storyProgress;
      gameState.adaptiveProfile = parsed.adaptiveProfile || gameState.adaptiveProfile;
      gameState.learningAssessment = parsed.learningAssessment || gameState.learningAssessment;
      gameState.learningAnalytics = parsed.learningAnalytics || gameState.learningAnalytics;
      gameState.freePlayStats = parsed.freePlayStats || gameState.freePlayStats;
      gameState.stats = { ...gameState.stats, ...(parsed.stats || {}) };
    }
  } catch (e) {
    console.error("Gagal memuat save data:", e);
  }
}
