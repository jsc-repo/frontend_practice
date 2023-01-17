const board = document.getElementById("board");
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

let winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

createBoard();

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("cell");
    newDiv.addEventListener("click", handleCellClick);
    newDiv.dataset.cellIndex = i;
    board.appendChild(newDiv);
  }
}

function handleCellClick() {
  const cell = this;
  const cellIdx = cell.dataset.cellIndex;

  if (gameState[cellIdx]) return;
  else if (currentPlayer === "X") {
    gameState[cellIdx] = "X";
    cell.textContent = "X";
    currentPlayer = "O";
  } else {
    gameState[cellIdx] = "O";
    cell.textContent = "O";
    currentPlayer = "X";
  }

  handleWinCondition();
}

function handleWinCondition() {
  let roundWon = false;
  winningCondition.forEach((j, idx) => {
    let a = gameState[j[0]];
    let b = gameState[j[1]];
    let c = gameState[j[2]];

    if (a === "" || b === "" || c === "") {
      return;
    } else if (a === b && b === c) {
      roundWon = true;
    }
  });

  if (roundWon) {
    alert("Game Won!");
    resetGame();
  }

  if (!gameState.includes("")) {
    alert("Draw!");
    resetGame();
  }
}

function resetGame() {
  //   gameState = ["", "", "", "", "", "", "", "", ""];
  setTimeout(() => {
    document.location.reload();
  }, 1500);
}
