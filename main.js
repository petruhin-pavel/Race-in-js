// Переменные ===============
const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'); // Создаем елемент (div)

car.classList.add('car'); // добавляем класс
// Обработчики событий =====

// onclick устарел, замена addEventListener
/* start.onclick = function () { 
  start.classList.add('hide'); // Добавляем класс hide элементу start
}; */

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

// Перенные (кнопки)=============
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

// Переменные (настройки игры (стоп или пауза))
const setting = {
  start: false,
  score: 0,
  speed: 3
};

// Объявляем функции ========
function startGame() {
  start.classList.add('hide');
  setting.start = true;
  gameArea.appendChild(car); // вставить дочерний элемент
  requestAnimationFrame(playGame); //современный метод анимации

}

function playGame() {
  // Если (пока) setting.start строго равен true, перезапускается анимация
  if (setting.start) /* (setting.start === true) тоже самое */ {
    requestAnimationFrame(playGame);
  }

}

function startRun(event) {
  event.preventDefault(); // Позволяет отключить стандартную реакцию браузера на нажате кнопки (например стрелки не будут скролить страницу)
  keys[event.key] = true; // реакция на нажате кнопки
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false; // реакция на нажате кнопки
}