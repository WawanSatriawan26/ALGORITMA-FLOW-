function updateAllHUDUI() {
  const p = algoGameData.profile;
  const g = algoGameData.gameStats;
  const gm = algoGameData.stats;

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setTxt("hud-player-nama", p.nama || "Siswa");
  setTxt("hud-player-kelas", p.kelas || "X-1");
  setTxt("hud-player-rank", getPlayerRank());
  setTxt("hud-ap-angka", gm.ap);
  setTxt("hud-ap-angka-game", gm.ap);
  setTxt("hud-xp-angka", g.xp);
  setTxt("hud-game-score", g.score);
  setTxt("skor-bermain-angka", g.score);
  setTxt("hud-game-xp", g.xp);
  setTxt("hud-gm-ap", gm.ap);
  setTxt("hud-gm-combo", `${gm.combo}x`);
  setTxt("hud-gm-streak", `${gm.highestStreak}x`);
  setTxt("hud-current-streak", gm.combo);

  if (typeof checkBadges === "function") checkBadges();
  if (typeof updateWorldMapProgress === "function") updateWorldMapProgress();
}

document.addEventListener("DOMContentLoaded", () => {
  updateAllHUDUI();
  if (typeof initStoryIntro === "function") initStoryIntro();
});