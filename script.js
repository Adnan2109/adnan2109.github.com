const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const highScoreDisplay = document.getElementById("high-score");
const slowModeButton = document.getElementById("slow-mode");
const normalModeButton = document.getElementById("normal-mode");
const fastModeButton = document.getElementById("fast-mode");

let score = 0;
let timeLeft = 10;
let gameInterval;
let moveInterval;
let ballSpeed = 500; // Default speed (normal mode)
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// Function to move the ball randomly
function moveBall() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);
  ball.style.left = `${x}px`;
  ball.style.top = `${y}px`;
}

// Function to start the game
function startGame() {
  score = 0;
  timeLeft = 10;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;

  // Clear existing intervals
  clearInterval(gameInterval);
  clearInterval(moveInterval);

  // Move the ball based on the selected speed
  moveInterval = setInterval(moveBall, ballSpeed);

  // Update the timer every second
  gameInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearInterval(moveInterval);
      updateHighScore();
      alert(`Game Over! Your score is ${score}`);
    }
  }, 1000);
}

// Function to update the high score
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }
}

// Event listener for clicking the ball
ball.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBall();
});

// Event listeners for game modes
slowModeButton.addEventListener("click", () => {
  ballSpeed = 1000; // Slow mode
  startGame();
});

normalModeButton.addEventListener("click", () => {
  ballSpeed = 500; // Normal mode
  startGame();
});

fastModeButton.addEventListener("click", () => {
  ballSpeed = 250; // Fast mode
  startGame();
});

// Start the game in normal mode by default
startGame();
