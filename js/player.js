function updatePlayerProfile(nama, kelas) {
  if (nama) algoGameData.profile.nama = nama;
  if (kelas) algoGameData.profile.kelas = kelas;
  saveGamificationData();
}

function getPlayerRank() {
  const currentAP = algoGameData.stats.ap;
  let activeRank = GAME_CONFIG.RANKS[0].title;
  for (let r of GAME_CONFIG.RANKS) {
    if (currentAP >= r.minAP) {
      activeRank = r.title;
    }
  }
  return activeRank;
}