import { SnakeGame } from "./snake";

describe("SnakeGame coverage tests", () => {
  let game;

  beforeEach(() => {
    game = new SnakeGame();
  });

  test("initial state is correct", () => {
    expect(game.snakeLength).toBe(3);
    expect(game.score).toBe(0);
    expect(game.snakeX).toBe(15);
    expect(game.snakeY).toBe(15);
  });

  test("updateSnake() moves the snake in the set velocity", () => {
    game.setVelocity(1, 0);
    game.updateSnake();
    expect(game.snakeX).toBe(16);
  });

  test("eating food increases score & snake length", () => {
    // Put food exactly where snake will move
    game.foodX = 16;
    game.foodY = 15;
    game.setVelocity(1, 0);
    game.updateSnake();
    expect(game.score).toBe(1);
    expect(game.snakeLength).toBe(4);
  });

  test("collision with self resets the game", () => {
    game.snakeBody = [
      { x: 15, y: 15 },
      { x: 16, y: 15 },
      { x: 17, y: 15 }
    ];
    game.snakeLength = 3;
    game.setVelocity(1, 0);
    game.updateSnake();
    // Next head => 16,15 => collision => reset
    expect(game.snakeX).toBe(15); // reset
    expect(game.score).toBe(0);
    expect(game.snakeBody.length).toBe(0);
  });

  test("wrap-around edges", () => {
    // Right edge
    game.snakeX = 29;
    game.setVelocity(1, 0);
    game.updateSnake();
    expect(game.snakeX).toBe(0); // wrapped

    // Top edge
    game.snakeY = 0;
    game.setVelocity(0, -1);
    game.updateSnake();
    expect(game.snakeY).toBe(29);
  });
});
