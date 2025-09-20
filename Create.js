// Меню
function openMenu() {
  document.getElementById("sideMenu").classList.add("active");
}
function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
}

// Вернуться назад
function goBack() {
  window.location.href = "index.html";
}

// Показать форму
function showExerciseForm() {
  const formContainer = document.getElementById("exercise-form");
  const addBtn = document.getElementById("add-btn");
  formContainer.innerHTML = `
    <div class="exercise-form" id="current-form">
      <label>Название упражнения</label>
      <input type="text" id="ex-name" placeholder="Введите название">

      <label>Описание</label>
      <textarea id="ex-desc" rows="2" placeholder="Краткое описание"></textarea>

      <label>Длительность (мин)</label>
      <input type="number" id="ex-duration" placeholder="0">

      <label>Повторения</label>
      <input type="number" id="ex-reps" placeholder="0">

      <div class="form-actions">
        <button class="form-btn save" onclick="saveExercise()">Сохранить</button>
        <button class="form-btn cancel" onclick="cancelForm()">Отмена</button>
      </div>
    </div>
  `;
  addBtn.style.display = "none";
}

// Сохранить упражнение
function saveExercise() {
  const name = document.getElementById("ex-name").value;
  const desc = document.getElementById("ex-desc").value;
  const duration = document.getElementById("ex-duration").value;
  const reps = document.getElementById("ex-reps").value;

  if (!name) {
    alert("Введите название упражнения");
    return;
  }

  const list = document.getElementById("exercises-list");
  const listTitle = document.getElementById("list-title");
  const saveBtn = document.getElementById("save-btn");

  // Плавное появление заголовка и кнопки
  if (list.children.length === 0) {
    listTitle.style.display = "block";
    saveBtn.style.display = "block";
    setTimeout(() => {
      listTitle.classList.add("fade-slide");
      saveBtn.classList.add("fade-slide");
    }, 10);
  }

  const card = document.createElement("div");
  card.classList.add("exercise-card", "fade-slide");
  card.innerHTML = `
    <h4>${name}</h4>
    <p>${desc}</p>
    <p>${duration || 0} мин</p>
    <p>${reps || 0} повтор.</p>
    <button class="delete-btn" onclick="deleteExercise(this)">Удалить</button>
  `;

  list.appendChild(card);

  // Убираем форму с анимацией
  const form = document.getElementById("current-form");
  form.classList.add("removing");
  setTimeout(() => {
    form.remove();
    document.getElementById("add-btn").style.display = "block";
  }, 400);
}

// Отмена формы
function cancelForm() {
  const form = document.getElementById("current-form");
  form.classList.add("removing");
  setTimeout(() => {
    form.remove();
    document.getElementById("add-btn").style.display = "block";
  }, 400);
}

// Удаление упражнения с анимацией
function deleteExercise(btn) {
  const card = btn.parentElement;
  card.classList.add("removing");
  setTimeout(() => {
    card.remove();
    const list = document.getElementById("exercises-list");
    if (list.children.length === 0) {
      const listTitle = document.getElementById("list-title");
      const saveBtn = document.getElementById("save-btn");

      // Скрытие с анимацией
      listTitle.classList.remove("fade-slide");
      saveBtn.classList.remove("fade-slide");

      listTitle.classList.add("removing");
      saveBtn.classList.add("removing");

      setTimeout(() => {
        listTitle.style.display = "none";
        saveBtn.style.display = "none";
        listTitle.classList.remove("removing");
        saveBtn.classList.remove("removing");
      }, 400);
    }
  }, 300);
}

// Сохранить тренировку
function saveWorkout() {
  const exercises = [];
  document.querySelectorAll(".exercise-card").forEach(card => {
    const data = {
      name: card.querySelector("h4").innerText,
      desc: card.querySelectorAll("p")[0].innerText,
      duration: card.querySelectorAll("p")[1].innerText,
      reps: card.querySelectorAll("p")[2].innerText
    };
    exercises.push(data);
  });

  console.log("Сохраненные упражнения:", exercises);
  alert("Тренировка сохранена!");
}
