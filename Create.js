// Меню
function openMenu() {
  document.getElementById("sideMenu").classList.add("active");
}

function closeMenu() {
  document.getElementById("sideMenu").classList.remove("active");
}

// Вернуться назад на главную
function goBack() {
  window.location.href = "index.html";
}

// Добавить упражнение
function addExercise() {
  const container = document.getElementById("exercises-container");

  const exerciseDiv = document.createElement("div");
  exerciseDiv.classList.add("exercise");

  exerciseDiv.innerHTML = `
    <input type="text" placeholder="Название упражнения">
    <textarea placeholder="Описание"></textarea>
    <input type="number" placeholder="Длительность (мин)">
    <input type="number" placeholder="Повторения">
  `;

  container.appendChild(exerciseDiv);
}

// Сохранить тренировку
function saveWorkout() {
  const exercises = [];
  document.querySelectorAll(".exercise").forEach(ex => {
    const inputs = ex.querySelectorAll("input, textarea");
    exercises.push({
      name: inputs[0].value,
      description: inputs[1].value,
      duration: inputs[2].value,
      repetitions: inputs[3].value
    });
  });

  console.log("Сохраненные упражнения:", exercises);
  alert("Тренировка сохранена! (данные пока в консоли)");
}