// Открыть меню
function openMenu() {
  document.getElementById("sideMenu").classList.add("active");
}

// Закрыть меню
function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
}

// Навигация по кнопкам
function navigateTo(page) {
  window.location.href = page;
}