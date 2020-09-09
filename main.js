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
  speed: 3,
  traffic: 3
};

// вычисляем оптимальное количество линий
function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

// Объявляем функции ========
function startGame() {
  start.classList.add('hide');

  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = 'transparent url("./image/enemy2.png") center / cover no-repeat';
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car); // вставить дочерний элемент
  setting.x = car.offsetLeft; // Управление автомобилем с помощью отступа слева
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame); //современный метод анимации

}

function playGame() {
  // Если (пока) setting.start строго равен true, перезапускается анимация
  if (setting.start) { // (setting.start === true) тоже самое
    moveRoad(); // движение дороги
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) { // (keys.ArrowLeft === true)
      setting.x -= setting.speed; // если кнопка зажата, уменьшаем значение х (-= опер. присвоение setting.x = setting.x - setting.speed)
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { // 2е условие - ограничение передвижения, получаем ширину дороги - ширина авто
      setting.x += setting.speed; // если кнопка зажата, увеличиваем значение х
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed;
    }
    car.style.left = setting.x + 'px'; // Добавляем результат в стили
    car.style.top = setting.y + 'px';
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

function moveRoad() {
  let lines = document.querySelectorAll('.line'); // получаем все линии
  lines.forEach(function (line) {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }

  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function (item) {
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';
    if (item >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
  });


}