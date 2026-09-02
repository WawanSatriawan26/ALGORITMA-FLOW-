const GameplayLoopManager = {
  currentLevelId: 1,
  triggerMissionBriefing(levelId) {
    this.currentLevelId = levelId;
    const loopData = GAMEPLAY_LOOP_DATA[levelId] || GAMEPLAY_LOOP_DATA[1];
    const levelMeta = MASTER_LEVELS.find(l => l.id === levelId);
    document.getElementById('briefing-level-num').textContent = levelId;
    document.getElementById('briefing-level-title').textContent = levelMeta ? levelMeta.title : '';
    document.getElementById('briefing-mission-text').textContent = loopData.mission;
    document.getElementById('briefing-objective-text').textContent = loopData.learningObjective;
    document.getElementById('briefing-challenge-text').textContent = loopData.challenge;
    document.getElementById('briefing-instruction-text').textContent = loopData.instruction;
    document.getElementById('modal-mission-briefing').classList.remove('hidden');
    if (typeof AudioManager !== 'undefined') AudioManager.playBotMessage();
  },
  startPlayPhase() {
    document.getElementById('modal-mission-briefing').classList.add('hidden');
    if (typeof startLevelCore === 'function') startLevelCore(this.currentLevelId);
  },
  triggerEvaluationSummary(levelId, stars, score, xp, coins) {
    const loopData = GAMEPLAY_LOOP_DATA[levelId] || GAMEPLAY_LOOP_DATA[1];
    document.getElementById('eval-level-num').textContent = levelId;
    document.getElementById('eval-stars-display').textContent = "⭐".repeat(stars);
    document.getElementById('eval-score-text').textContent = score.toLocaleString('id-ID');
    document.getElementById('eval-xp-text').textContent = `+${xp} XP`;
    document.getElementById('eval-coins-text').textContent = `+${coins} 🪙`;
    document.getElementById('eval-feedback-text').textContent = loopData.feedbackCorrect;
    document.getElementById('eval-reflection-text').textContent = loopData.evaluationReflection;
    document.getElementById('modal-evaluation-summary').classList.remove('hidden');
  },
  proceedToNextLevel() {
    document.getElementById('modal-evaluation-summary').classList.add('hidden');
    if (this.currentLevelId < 15) {
      this.triggerMissionBriefing(this.currentLevelId + 1);
    } else {
      if (typeof navigateTo === 'function') navigateTo('screen-level-select');
    }
  }
};
