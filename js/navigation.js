function navigateTo(screenId) {
  stopLevelTimer();
  AudioManager.playClickSound();
  document.querySelectorAll('.page-screen').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(screenId);
  if (target) target.classList.remove('hidden');
  const hud = document.getElementById('main-hud');
  if (screenId === 'screen-splash') hud.classList.add('hidden');
  else hud.classList.remove('hidden');

  if (screenId === 'screen-level-select') renderLevelMap();
  if (screenId === 'screen-dashboard') updateDashboardUI();
  if (screenId === 'screen-teacher-mode') renderTeacherDashboard();
  if (screenId === 'screen-achievements') renderAchievementsUI();
  updateHUD();
}
function updateHUD() {
  document.getElementById('hud-player-name').textContent = gameState.player.name;
  document.getElementById('hud-player-rank').textContent = getRankTitle(gameState.player.level);
  document.getElementById('hud-level-num').textContent = gameState.player.level;
  const nextXP = gameState.player.level * 300;
  document.getElementById('hud-xp-bar').style.width = `${Math.min(100, (gameState.player.xp / nextXP) * 100)}%`;
  document.getElementById('hud-xp-text').textContent = `${gameState.player.xp}/${nextXP} XP`;
  document.getElementById('hud-score-text').textContent = gameState.player.totalScore.toLocaleString('id-ID');
  document.getElementById('hud-star-text').textContent = `${Object.values(gameState.levelsProgress).reduce((acc, l) => acc + (l.stars || 0), 0)}/45`;
  document.getElementById('hud-coin-text').textContent = gameState.player.coins;
}
function renderLevelMap() {
  if (typeof WorldMapManager !== 'undefined') WorldMapManager.renderWorldMap();
}
function updateDashboardUI() {
  document.getElementById('dash-player-name').textContent = `Nama: ${gameState.player.name}`;
  document.getElementById('dash-player-rank').textContent = `Gelar: ${getRankTitle(gameState.player.level)}`;
  document.getElementById('dash-completed-levels').textContent = `Level Selesai: ${gameState.stats.levelsCompleted} / 15`;
  document.getElementById('dash-total-score').textContent = `Total Skor: ${gameState.player.totalScore.toLocaleString('id-ID')}`;
}
