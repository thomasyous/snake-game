import dayjs from "dayjs";

/*************************************************
  SNAKE GAME JavaScript
*************************************************/

// (Optional) If you want to import style here instead of <link> in index.html:
// import "./style.css";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

/* Game settings */
const gridSize = 20;          // size of each grid cell (in pixels)
const tileCount = 30;         // number of cells (600px / 20px = 30)
const initialSpeed = 100;     // lower means faster updates

/* Snake initial settings */
let snakeX = 15;              
let snakeY = 15;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let snakeLength = 3;

/* Food initial position */
let foodX = 10;
let foodY = 10;

/* Score */
let score = 0;

/* Track the start time using dayjs */
const startTime = dayjs(); // current time
const startTimeDisplay = document.getElementById("startTime");
if (startTimeDisplay) {
  startTimeDisplay.textContent = `Game started at: ${startTime.format("HH:mm:ss")}`;
}

/* Main game loop */
function game() {
  updateSnake();
  drawEverything();
  setTimeout(game, initialSpeed);
}

/* Update snake position, check collisions */
function updateSnake() {
  snakeX += velocityX;
  snakeY += velocityY;

  // Wrap-around edges
  if (snakeX < 0) snakeX = tileCount - 1;
  if (snakeX > tileCount - 1) snakeX = 0;
  if (snakeY < 0) snakeY = tileCount - 1;
  if (snakeY > tileCount - 1) snakeY = 0;

  // Add the new head
  snakeBody.unshift({ x: snakeX, y: snakeY });
  while (snakeBody.length > snakeLength) {
    snakeBody.pop();
  }

  // Check if we ate the food
  if (snakeX === foodX && snakeY === foodY) {
    snakeLength++;
    score++;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  }

  // Check for collision with self
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i].x === snakeX && snakeBody[i].y === snakeY) {
      resetGame();
      break;
    }
  }
}

/* Draw canvas content */
function drawEverything() {
  // Clear
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#7fff00";
  snakeBody.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });

  // Draw food
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize, gridSize);

  // Draw score
  ctx.fillStyle = "#fff";
  ctx.font = "20px Trebuchet MS";
  ctx.fillText(`Score: ${score}`, 10, 25);
}

/* Key controls */
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft":
      if (velocityX === 1) return;
      velocityX = -1;
      velocityY = 0;
      break;
    case "ArrowUp":
      if (velocityY === 1) return;
      velocityX = 0;
      velocityY = -1;
      break;
    case "ArrowRight":
      if (velocityX === -1) return;
      velocityX = 1;
      velocityY = 0;
      break;
    case "ArrowDown":
      if (velocityY === -1) return;
      velocityX = 0;
      velocityY = 1;
      break;
  }
});

/* Reset game */
function resetGame() {
  snakeLength = 3;
  score = 0;
  snakeX = 15;
  snakeY = 15;
  velocityX = 0;
  velocityY = 0;
  snakeBody = [];
}

/* Start the game */
game();
