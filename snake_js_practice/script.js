const cols = 20;
const rows = 20;
const tileSize = 25;
let board;
let context;

//snake head
let snakeX = 5 * tileSize;
let snakeY = 5 * tileSize;

//food head
let foodX;
let foodY;

//velocity
let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

document.addEventListener("DOMContentLoaded", () => {
  board = document.getElementById("board");
  board.width = cols * tileSize;
  board.height = rows * tileSize;
  context = board.getContext("2d");
  randomFoodLocation();

  document.addEventListener("keydown", changeDirection);

  setInterval(update, 1000 / 10);
});

function randomFoodLocation() {
  foodX = Math.floor(Math.random() * 20) * tileSize;
  foodY = Math.floor(Math.random() * 20) * tileSize;
}

function changeDirection(e) {
  switch (e.code) {
    case "KeyS":
    case "ArrowDown":
      velocityX = 0;
      velocityY = 1;
      break;

    case "KeyW":
    case "ArrowUp":
      velocityX = 0;
      velocityY = -1;
      break;

    case "KeyA":
    case "ArrowLeft":
      velocityX = -1;
      velocityY = 0;
      break;

    case "KeyD":
    case "ArrowRight":
      velocityX = 1;
      velocityY = 0;
      break;
    default:
      break;
  }
}

function update() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  // draw food
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, tileSize, tileSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    randomFoodLocation();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    console.log(i);
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // draw snake
  context.fillStyle = "lime";
  snakeX += velocityX * tileSize;
  snakeY += velocityY * tileSize;
  context.fillRect(snakeX, snakeY, tileSize, tileSize);

  // draw the rest of the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
  }
}
