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
  triggerInstantFeedback(isBenar, { scoreEarned: 20, apEarned: GAME_CONFIG.POINTS.CORRECT_ANSWER, xpEarned: 20 });
}