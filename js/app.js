function startLevelCore(levelId) {
  const levelData = MASTER_LEVELS.find(l => l.id === levelId);
  if (!levelData) return;
  gameState.current.levelId = levelId;
  gameState.current.lives = 3;
  gameState.current.selectedQuizOption = null;
  gameState.current.usedHint = false;
  navigateTo('screen-game-area');
  document.getElementById('hud-lives-container').classList.remove('hidden');
  document.getElementById('hud-timer-container').classList.remove('hidden');
  updateLivesDisplay();
  startLevelTimer();
  document.getElementById('algobot-speech-text').textContent = `Level ${levelId}: ${levelData.title}`;
  const subPuzzle = document.getElementById('sub-game-puzzle');
  const subQuiz = document.getElementById('sub-game-quiz');
  if (levelData.type === "PUZZLE") {
    subPuzzle.classList.remove('hidden');
    subQuiz.classList.add('hidden');
    renderPuzzleSubGame(levelData);
  } else {
    subQuiz.classList.remove('hidden');
    subPuzzle.classList.add('hidden');
    renderQuizSubGame(levelData);
  }
}

function startLevel(levelId) {
  if (typeof StoryManager !== 'undefined') {
    StoryManager.triggerLevelStory(levelId, () => {
      if (typeof GameplayLoopManager !== 'undefined') {
        GameplayLoopManager.triggerMissionBriefing(levelId);
      } else {
        startLevelCore(levelId);
      }
    });
  } else {
    startLevelCore(levelId);
  }
}

function setupEventListeners() {
  document.getElementById('btn-splash-start')?.addEventListener('click', () => {
    AudioManager.initOnUserGesture();
    StoryManager.checkAndShowIntro(() => navigateTo('screen-main-menu'));
  });
  document.getElementById('btn-start-mission-play')?.addEventListener('click', () => GameplayLoopManager.startPlayPhase());
  document.getElementById('btn-eval-map')?.addEventListener('click', () => {
    document.getElementById('modal-evaluation-summary').classList.add('hidden');
    navigateTo('screen-level-select');
  });
  document.getElementById('btn-eval-next')?.addEventListener('click', () => GameplayLoopManager.proceedToNextLevel());
  document.getElementById('btn-menu-map')?.addEventListener('click', () => navigateTo('screen-level-select'));
  document.getElementById('btn-menu-learn')?.addEventListener('click', () => navigateTo('screen-learn'));
  document.getElementById('btn-menu-dashboard')?.addEventListener('click', () => navigateTo('screen-dashboard'));
  document.getElementById('btn-menu-achievements')?.addEventListener('click', () => navigateTo('screen-achievements'));
  document.getElementById('btn-menu-teacher')?.addEventListener('click', () => navigateTo('screen-teacher-mode'));
  document.getElementById('btn-menu-profile')?.addEventListener('click', () => navigateTo('screen-profile'));
  document.querySelectorAll('.btn-to-main').forEach(b => b.addEventListener('click', () => navigateTo('screen-main-menu')));
  document.getElementById('btn-game-execute')?.addEventListener('click', executeVerifyCurrentLevel);
  document.getElementById('btn-game-hint')?.addEventListener('click', () => {
    const lvl = MASTER_LEVELS.find(l => l.id === gameState.current.levelId);
    if(lvl) alert(`💡 HINT: ${lvl.hint}`);
  });
  document.getElementById('btn-hud-settings')?.addEventListener('click', () => document.getElementById('modal-settings').classList.remove('hidden'));
  document.querySelectorAll('.btn-close-settings').forEach(b => b.addEventListener('click', () => document.getElementById('modal-settings').classList.add('hidden')));
  document.getElementById('btn-save-profile')?.addEventListener('click', () => {
    gameState.player.name = document.getElementById('input-player-name').value;
    gameState.player.class = document.getElementById('input-player-class').value;
    saveGame();
    updateHUD();
    alert("Profil disimpan!");
    navigateTo('screen-main-menu');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadGame();
  AudioManager.loadPreferences();
  setupEventListeners();
  updateHUD();
  navigateTo('screen-splash');
});
