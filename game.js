const readline = require('readline');

// Tic-Tac-Toe Board
const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
];

// Current player (either "X" or "O")
let currentPlayer = "X";

// Function to display the Tic-Tac-Toe board
function displayBoard() {
  console.log("   1   2   3 ");
  console.log("1  " + board[0].join(" | "));
  console.log("  ---+---+---");
  console.log("2  " + board[1].join(" | "));
  console.log("  ---+---+---");
  console.log("3  " + board[2].join(" | "));
}

// Function to check if a player has won
function checkWin(player) {
  // Check rows, columns, and diagonals
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
      (board[0][i] === player && board[1][i] === player && board[2][i] === player) ||
      (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    ) {
      return true;
    }
  }
  return false;
}

// Function to check if the board is full
function isBoardFull() {
  for (let row of board) {
    for (let cell of row) {
      if (cell === " ") {
        return false;
      }
    }
  }
  return true;
}

// Function to make a move for the player
async function makePlayerMove() {
  console.log(`Player ${currentPlayer}'s turn`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("Enter the row (1, 2, or 3): ", (row) => {
      rl.question("Enter the column (1, 2, or 3): ", (col) => {
        rl.close();
        row = row - 1;
        col = col - 1;

        if (row >= 0 && row < 3 && col >= 0 && col < 3) {
          if (board[row][col] === " ") {
            board[row][col] = currentPlayer;
            displayBoard();
            if (checkWin(currentPlayer)) {
              console.log(`Player ${currentPlayer} wins!`);
              resolve(true);
            } else if (isBoardFull()) {
              console.log("It's a tie!");
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            console.log("Invalid move! That cell is already taken.");
            resolve(false);
          }
        } else {
          console.log("Invalid input! Please enter valid row and column numbers.");
          resolve(false);
        }
      });
    });
  });
}

// Function to make a move for the computer
function makeComputerMove() {
  // Simple computer AI: Randomly pick an available cell
  while (true) {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);

    if (board[row][col] === " ") {
      board[row][col] = currentPlayer;
      displayBoard();
      if (checkWin(currentPlayer)) {
        console.log(`Player ${currentPlayer} wins!`);
        return true;
      } else if (isBoardFull()) {
        console.log("It's a tie!");
        return true;
      }
      return false;
    }
  }
}

// Main game loop
async function playGame() {
  let gameOver = false;

  console.log("Welcome to Tic-Tac-Toe by ABHI!");
  displayBoard();

  while (!gameOver) {
    gameOver = await makePlayerMove();
    if (gameOver) {
      break;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameOver = makeComputerMove();
    if (gameOver) {
      break;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  console.log("Game Over!");
}

// Start the game
playGame();
