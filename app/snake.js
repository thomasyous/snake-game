import dayjs from "dayjs";

// =============================================================
// 1) SnakeGame Class (exported) for testable logic
// =============================================================
export class SnakeGame {
  constructor(tileCount = 30, gridSize = 20) {
    this.tileCount = tileCount;
    this.gridSize = gridSize;

    this.snakeX = 15;
    this.snakeY = 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.snakeBody = [];
    this.snakeLength = 3;

    this.foodX = 10;
    this.foodY = 10;

    this.score = 0;
  }

  updateSnake() {
    this.snakeX += this.velocityX;
    this.snakeY += this.velocityY;

    // Wrap-around edges
    if (this.snakeX < 0) this.snakeX = this.tileCount - 1;
    if (this.snakeX > this.tileCount - 1) this.snakeX = 0;
    if (this.snakeY < 0) this.snakeY = this.tileCount - 1;
    if (this.snakeY > this.tileCount - 1) this.snakeY = 0;

    // Insert new head
    this.snakeBody.unshift({ x: this.snakeX, y: this.snakeY });
    while (this.snakeBody.length > this.snakeLength) {
      this.snakeBody.pop();
    }

    // Check if we ate the food
    if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
      this.snakeLength++;
      this.score++;
      this.foodX = Math.floor(Math.random() * this.tileCount);
      this.foodY = Math.floor(Math.random() * this.tileCount);
    }

    // Check collision with self
    for (let i = 1; i < this.snakeBody.length; i++) {
      if (this.snakeBody[i].x === this.snakeX && this.snakeBody[i].y === this.snakeY) {
        this.resetGame();
        break;
      }
    }
  }

  resetGame() {
    this.snakeLength = 3;
    this.score = 0;
    this.snakeX = 15;
    this.snakeY = 15;
    this.velocityX = 0;
    this.velocityY = 0;
    this.snakeBody = [];
  }

  setVelocity(vx, vy) {
    this.velocityX = vx;
    this.velocityY = vy;
  }
}

// =============================================================
// 2) DOM & Canvas Code (same as original), using the SnakeGame
// =============================================================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const game = new SnakeGame(30, 20);

// For demonstration: show the start time using dayjs
const startTimeEl = document.getElementById("startTime");
const startTime = dayjs().format("HH:mm:ss");
if (startTimeEl) {
  startTimeEl.textContent = `Game started at: ${startTime}`;
}

// Main loop
function mainLoop() {
  game.updateSnake();
  drawEverything();
  setTimeout(mainLoop, 100); // lower = faster
}

function drawEverything() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#7fff00";
  game.snakeBody.forEach(part => {
    ctx.fillRect(part.x * game.gridSize, part.y * game.gridSize, game.gridSize, game.gridSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(game.foodX * game.gridSize, game.foodY * game.gridSize, game.gridSize, game.gridSize);

  // Score
  ctx.fillStyle = "#fff";
  ctx.font = "20px Trebuchet MS";
  ctx.fillText(`Score: ${game.score}`, 10, 25);
}

// Key controls
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowLeft":
      if (game.velocityX !== 1) {
        game.setVelocity(-1, 0);
      }
      break;
    case "ArrowRight":
      if (game.velocityX !== -1) {
        game.setVelocity(1, 0);
      }
      break;
    case "ArrowUp":
      if (game.velocityY !== 1) {
        game.setVelocity(0, -1);
      }
      break;
    case "ArrowDown":
      if (game.velocityY !== -1) {
        game.setVelocity(0, 1);
      }
      break;
  }
});

// Start the game loop
mainLoop();
