
let headImg = new Image();
headImg.src = "cobra.png"; // cabeça da cobra

let bodyImg = new Image();
bodyImg.src = "corpo_cobra.png"; // corpo da cobra

let foodImg = new Image();
foodImg.src = "comida.png"; // imagem da comida

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 37.5;
let snake = [];

let imagensCarregadas = 0;
const totalImagens = 3;
let jogo;

function verificarCarregamento() {
  imagensCarregadas++;
  if (imagensCarregadas === totalImagens) {
    jogo = setInterval(iniciarJogo, 80);
  }
}

headImg.onload = verificarCarregamento;
bodyImg.onload = verificarCarregamento;
foodImg.onload = verificarCarregamento;

snake[0] = { x: 8 * box, y: 8 * box };
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};

function criarBG() {
  const gradiente = context.createLinearGradient(0, 0, 512, 512);
  gradiente.addColorStop(0, "black");
  gradiente.addColorStop(1, "black");
  context.fillStyle = gradiente;
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) context.drawImage(headImg, snake[i].x, snake[i].y, box, box);
    else context.drawImage(bodyImg, snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.drawImage(foodImg, food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';

  if (event.keyCode == 65 && direction != 'right') direction = 'left';
  if (event.keyCode == 87 && direction != 'down') direction = 'up';
  if (event.keyCode == 68 && direction != 'left') direction = 'right';
  if (event.keyCode == 83 && direction != 'up') direction = 'down';
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Game Over :(');
      return;
    }
  }

  criarBG();
  criarCobrinha();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

/* ===== CONTROLE POR TOQUE (MOBILE) ===== */
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", function (e) {
  let touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

canvas.addEventListener("touchend", function (e) {
  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;
  let diffX = touchEndX - touchStartX;
  let diffY = touchEndY - touchStartY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0 && direction !== "left") direction = "right";
    else if (diffX < 0 && direction !== "right") direction = "left";
  } else {
    if (diffY > 0 && direction !== "up") direction = "down";
    else if (diffY < 0 && direction !== "down") direction = "up";
  }
}, { passive: true });
