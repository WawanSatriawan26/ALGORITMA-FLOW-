function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
  if (typeof updateAllHUDUI === "function") updateAllHUDUI();
}

function mulaiPetualangan() {
  const inpNama = document.getElementById("inp-nama")?.value;
  const inpKelas = document.getElementById("inp-kelas")?.value;
  updatePlayerProfile(inpNama, inpKelas);
  showScreen("scr-menu");
}

function goMenu() {
  showScreen("scr-menu");
}

function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add("active");
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove("active");
}