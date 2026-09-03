function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
  if (typeof updateAllHUDUI === "function") updateAllHUDUI();
}

function mulaiPetualangan() {
  const inpNama = document.getElementById("inp-nama")?.value;
  const inpKelas = document.getElementById("inp-kelas")?.value;

  if (inpNama) algoGameData.profile.nama = inpNama;
  if (inpKelas) algoGameData.profile.kelas = inpKelas;

  saveGamificationData();
  showScreen("scr-menu");
}

function goMenu() {
  showScreen("scr-menu");
}

function pilihModul(modulId) {
  showScreen("scr-bermain");
  renderMiniGame(modulId);
}

function renderMiniGame(modulId) {
  const container = document.getElementById("bermain-content");
  const subTitle = document.getElementById("bermain-sub");
  if (!container) return;

  if (modulId === 1) {
    if (subTitle) subTitle.textContent = "Bab 1: Klasifikasi Ciri Algoritma";
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3>Apakah Algoritma Harus Memiliki Output Yang Jelas?</h3>
        <p style="margin-bottom: 20px; color: #64748B;">Pilih Jawaban Yang Paling Tepat Berdasarkan 5 Ciri Knuth:</p>
        <div style="display: flex; gap: 16px; justify-content: center;">
          <button class="btn btn-biru" onclick="jawabMiniGame(true)">Ya, Output Harus Jelas (Definiteness)</button>
          <button class="btn btn-kuning" onclick="jawabMiniGame(false)">Tidak Memperlukan Output</button>
        </div>
      </div>
    `;
  } else {
    if (subTitle) subTitle.textContent = `Bab ${modulId}: Latihan Logika`;
    container.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3>Manakah Yang Merupakan Tipe Data Bilangan Bulat?</h3>
        <p style="margin-bottom: 20px; color: #64748B;">Pilih opsi yang sesuai:</p>

        <div style="display: flex; gap: 16px; justify-content: center;">
          <button class="btn btn-biru" onclick="jawabMiniGame(true)">Integer</button>
          <button class="btn btn-kuning" onclick="jawabMiniGame(false)">String</button>
        </div>
      </div>
    `;
  }
}

function jawabMiniGame(isBenar) {
  if (typeof triggerInstantFeedback === "function") {
    triggerInstantFeedback(isBenar, { scoreEarned: 20, apEarned: 15, xpEarned: 20 });
  }
}

function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("active");
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("active");
}

function switchQuestTab(tab) {
  document.querySelectorAll('.quest-tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`q-tab-${tab}`);
  if (btn) btn.classList.add('active');
  renderQuestLogUI();
}

function renderQuestLogUI() {
  const container = document.getElementById("quest-log-cards-container");
  if (!container) return;

  container.innerHTML = `
    <div class="quest-card">
      <div style="display: flex; justify-content: space-between; font-weight: 900;">
        <span>📌 Selesaikan Modul Bab 1</span>
        <span style="color: #2ECC71;">+50 AP</span>
      </div>
      <p style="font-size: 13px; color: #64748B; margin-top: 4px;">Selesaikan latihan klasifikasi ciri algoritma.</p>
    </div>
  `;
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
  if (typeof triggerInstantFeedback === "function") {
    triggerInstantFeedback(true, { scoreEarned: 0, apEarned: 50, xpEarned: 30 });
  }
  closeModal('modal-daily-login');
}

function renderTeacherDashboard() {
  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt("td-nama", algoGameData.profile.nama || "Siswa");
  setTxt("td-kelas", algoGameData.profile.kelas || "X-1");
  setTxt("td-sekolah", algoGameData.profile.sekolah || "SMK Negeri 1");
  setTxt("td-tanggal", new Date().toLocaleDateString("id-ID"));
  setTxt("td-g-score", algoGameData.gameStats.score);
  setTxt("td-g-xp", `${algoGameData.gameStats.xp} XP`);
  setTxt("td-g-ap", `${algoGameData.stats.ap} AP`);
  setTxt("td-g-streak", `${algoGameData.stats.highestStreak}x`);
  setTxt("td-l-score", Math.min(100, algoGameData.gameStats.score));
  setTxt("td-l-accuracy", "100%");
}

function printTeacherReport() {
  renderTeacherDashboard();
  window.print();
}