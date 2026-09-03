function renderQuestLogUI() {
  const container = document.getElementById("quest-log-cards-container");
  if (!container) return;

  container.innerHTML = `
    <div class="quest-card">
      <div style="display: flex; justify-content: space-between; font-weight: 900;">
        <span>📌 Solve 3 Puzzles</span>
        <span style="color: #2ECC71;">+${GAME_CONFIG.POINTS.DAILY_MISSION} AP</span>
      </div>
      <p style="font-size: 13px; color: #64748B; margin-top: 4px;">Daily Challenge: Selesaikan 3 teka-teki logika.</p>
    </div>
  `;
}

function switchQuestTab(tab) {
  document.querySelectorAll('.quest-tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`q-tab-${tab}`);
  if (btn) btn.classList.add('active');
  renderQuestLogUI();
}

function renderDailyLoginCalendar() {
  const container = document.getElementById("daily-login-calendar-grid");
  if (!container) return;

  let html = "";
  for (let i = 1; i <= 7; i++) {
    html += `
      <div style="border: 2px solid var(--garis); padding: 12px; border-radius: 12px; background: ${i === 1 ? '#FFFDF5' : '#FFF'};">
        <div style="font-size: 12px; font-weight: 900;">HARI ${i}</div>
        <div style="font-size: 24px;">💎</div>
        <div style="font-size: 12px; font-weight: 800; color: #27AE60;">+${i * 10} AP</div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function claimDailyLoginReward() {
  triggerInstantFeedback(true, { scoreEarned: 0, apEarned: 50, xpEarned: 30 });
  closeModal('modal-daily-login');
}