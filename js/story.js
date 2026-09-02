const StoryManager = {
  pendingLevelId: null,
  activeHandler: null,
  initStoryState() {
    if (!gameState.storyProgress) gameState.storyProgress = { introSeen: false, bossDefeatedSeen: [], endingSeen: false };
  },
  checkAndShowIntro(callback) {
    this.initStoryState();
    if (!gameState.storyProgress.introSeen) {
      this.showStoryModal(STORY_DATA.intro.title, STORY_DATA.intro.character, STORY_DATA.intro.text, STORY_DATA.intro.btnText, () => {
        gameState.storyProgress.introSeen = true;
        saveGame();
        if (callback) callback();
      });
    } else { if (callback) callback(); }
  },
  triggerLevelStory(levelId, callback) {
    if (callback) callback();
  },
  checkPostLevelStory(levelId, callback) {
    if (callback) callback();
  },
  showStoryModal(title, character, text, buttonText, onConfirm) {
    document.getElementById('story-modal-title').textContent = title;
    document.getElementById('story-modal-character').textContent = character;
    document.getElementById('story-modal-text').textContent = text;
    const btn = document.getElementById('btn-story-continue');
    btn.textContent = buttonText;
    if (this.activeHandler) btn.removeEventListener('click', this.activeHandler);
    this.activeHandler = () => {
      document.getElementById('modal-story-dialog').classList.add('hidden');
      if (onConfirm) onConfirm();
    };
    btn.addEventListener('click', this.activeHandler);
    document.getElementById('modal-story-dialog').classList.remove('hidden');
  }
};
