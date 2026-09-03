function triggerInstantFeedback(isCorrect, context = {}) {
  const { scoreEarned = 10, apEarned = GAME_CONFIG.POINTS.CORRECT_ANSWER, xpEarned = 15 } = context;

  if (isCorrect) {
    algoGameData.stats.combo++;
    if (algoGameData.stats.combo > algoGameData.stats.maxCombo) {
      algoGameData.stats.maxCombo = algoGameData.stats.combo;
    }
    algoGameData.stats.highestStreak = Math.max(algoGameData.stats.highestStreak, algoGameData.stats.combo);

    const comboMultiplier = algoGameData.stats.combo >= 3 ? 1.5 : 1;
    const finalAP = Math.round(apEarned * comboMultiplier);

    algoGameData.stats.ap += finalAP;
    algoGameData.gameStats.score += scoreEarned;
    algoGameData.gameStats.xp += xpEarned;

    saveGamificationData();
    playGamificationSound("benar");

    showAlgobotDialog(`🎉 <b>Hebat!</b> Logikamu sangat tajam! (+${finalAP} AP)`);
    showFeedbackBanner(true, `🎉 Hebat! +${finalAP} AP`);
  } else {
    algoGameData.stats.combo = 0;
    saveGamificationData();
    playGamificationSound("salah");

    showAlgobotDialog(`❌ <b>Belum Tepat!</b> Coba periksa kembali langkah analisismu.`);
    showFeedbackBanner(false, `❌ Belum Tepat`);
  }
}

function showFeedbackBanner(isCorrect, text) {
  let banner = document.getElementById("instant-feedback-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "instant-feedback-banner";
    banner.className = "feedback-banner-popup";
    document.body.appendChild(banner);
  }

  banner.className = `feedback-banner-popup ${isCorrect ? 'correct-pop' : 'wrong-pop'} show`;
  banner.textContent = text;

  setTimeout(() => {
    banner.classList.remove("show");
  }, 1500);
}