// script.js — обязательно имя файла такое же, как в index.html
(function () {
  // Защита: если вебап открыт вне Telegram, window.Telegram может быть undefined
  const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  const input = document.getElementById('workout');
  const sendBtn = document.getElementById('sendBtn');
  const closeBtn = document.getElementById('closeBtn');
  const info = document.getElementById('info');

  // Если WebApp доступен — расширяем окно и показываем кнопку Telegram MainButton (опционально)
  if (tg) {
    try { tg.expand(); } catch (e) { /* игнорировать */ }
    info.textContent = "Открыто внутри Telegram WebApp.";
  } else {
    info.textContent = "Открыто в браузере (не в Telegram). Некоторые функции недоступны.";
  }

  // Отправка данных в бота через Telegram.WebApp.sendData
  sendBtn.addEventListener('click', function () {
    const val = input.value.trim();
    if (!val) {
      info.textContent = "Введите название тренировки.";
      return;
    }

    const payload = { action: "add_workout", workout: val, ts: Date.now() };

    if (tg && typeof tg.sendData === 'function') {
      // отправляем строку — бот получит это в handler web_app_data
      tg.sendData(JSON.stringify(payload));
      info.textContent = "Данные отправлены в бота.";
      // по желанию закрыть WebApp
      // tg.close();
    } else {
      info.textContent = "Не удалось отправить: WebApp API недоступен.";
    }
  });

  // Закрыть WebApp (если открыт в Telegram)
  closeBtn.addEventListener('click', function () {
    if (tg && typeof tg.close === 'function') {
      tg.close();
    } else {
      info.textContent = "Невозможно закрыть: не в Telegram.";
    }
  });
})();
