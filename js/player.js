function getRankTitle(lvl) {
  if (lvl >= 5) return "Master Komputasi";
  if (lvl >= 3) return "Penjelajah Flowchart";
  return "Pemula Logika";
}

function updateLivesDisplay() {
  const container = document.getElementById('hud-lives-icons');
  if (!container) return;
  let h = '';
  for (let i = 0; i < 3; i++) {
    h += i < gameState.current.lives ? '❤️' : '🖤';
  }
  container.innerHTML = h;
}

function completeLevelReward(levelId) {
  stopLevelTimer();
  const starsEarned = gameState.current.lives === 3 ? 3 : (gameState.current.lives === 2 ? 2 : 1);
  const scoreGained = gameState.current.usedHint ? 750 : 1000;
  const xpGained = 150;
  const coinsGained = starsEarned * 25;

  gameState.player.totalScore += scoreGained;
  gameState.player.xp += xpGained;
  gameState.player.coins += coinsGained;

  if (gameState.player.xp >= gameState.player.level * 300) {
    gameState.player.xp -= gameState.player.level * 300;
    gameState.player.level++;
    AudioManager.playBotPraise();
  }

  const prog = gameState.levelsProgress[levelId] || { unlocked: true, completed: false, stars: 0, highScore: 0 };
  prog.completed = true;
  if (starsEarned > prog.stars) prog.stars = starsEarned;
  prog.highScore = Math.max(prog.highScore, scoreGained);
  gameState.levelsProgress[levelId] = prog;

  const nextLevelId = levelId + 1;
  if (MASTER_LEVELS.find(l => l.id === nextLevelId)) {
    if (!gameState.levelsProgress[nextLevelId]) {
      gameState.levelsProgress[nextLevelId] = { unlocked: true, completed: false, stars: 0, highScore: 0 };
    } else {
      gameState.levelsProgress[nextLevelId].unlocked = true;
    }
    AudioManager.playLevelUnlock();
  }

  gameState.stats.levelsCompleted = Object.values(gameState.levelsProgress).filter(l => l.completed).length;

  if (!gameState.achievements.includes('first_win') && gameState.stats.levelsCompleted >= 1) {
    gameState.achievements.push('first_win');
    setTimeout(() => AudioManager.playAchievement(), 400);
  }

  saveGame();
  updateHUD();

  setTimeout(() => AudioManager.playStar(), 300);
  if (levelId === 15) {
    setTimeout(() => AudioManager.playVictory(), 600);
  } else {
    setTimeout(() => AudioManager.playLevelComplete(), 600);
  }

  if (typeof GameplayLoopManager !== 'undefined') {
    GameplayLoopManager.triggerEvaluationSummary(levelId, starsEarned, scoreGained, xpGained, coinsGained);
  }
}
