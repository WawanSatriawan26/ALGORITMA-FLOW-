function renderTeacherDashboard() {
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  const analytics = getAnalyticsData();

  setTxt("td-nama", algoGameData.profile.nama || "Siswa");
  setTxt("td-kelas", algoGameData.profile.kelas || "X-1");
  setTxt("td-sekolah", algoGameData.profile.sekolah || "SMK Negeri 1");
  setTxt("td-tanggal", new Date().toLocaleDateString("id-ID"));
  setTxt("td-g-score", algoGameData.gameStats.score);
  setTxt("td-g-xp", `${algoGameData.gameStats.xp} XP`);
  setTxt("td-g-ap", `${algoGameData.stats.ap} AP`);
  setTxt("td-g-rank", getPlayerRank());
  setTxt("td-g-streak", `${algoGameData.stats.highestStreak}x`);
  setTxt("td-l-score", analytics.learningScore);
  setTxt("td-l-accuracy", analytics.accuracy);
  setTxt("td-l-remedial", `${analytics.remedialCount} Kali`);
}

function printTeacherReport() {
  renderTeacherDashboard();
  window.print();
}