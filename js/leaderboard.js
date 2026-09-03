function switchLeaderboardTab(type) {
  const container = document.getElementById("leaderboard-list-container");
  if (!container) return;

  container.innerHTML = `
    <div style="border: 2px solid var(--garis); padding: 12px; border-radius: 12px; margin-bottom: 8px; display: flex; justify-content: space-between;">
      <span>🥇 ${algoGameData.profile.nama} (Anda)</span>
      <b>${algoGameData.stats.ap} AP</b>
    </div>
    <div style="border: 1px solid var(--garis); padding: 10px; border-radius: 12px; color: #64748B; display: flex; justify-content: space-between;">
      <span>🥈 Andi Prasetya <small style="color: #D35400;">[DEMO]</small></span>
      <b>1250 AP</b>
    </div>
  `;
}