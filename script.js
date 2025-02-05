const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");

let score = 0;
let timeLeft = 10;
let gameInterval;
let moveInterval;

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

  // Move the ball every 500ms
  moveInterval = setInterval(moveBall, 500);

  // Update the timer every second
  gameInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearInterval(moveInterval);
      alert(`Game Over! Your score is ${score}`);
    }
  }, 1000);
}

// Event listener for clicking the ball
ball.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBall();
});

// Start the game when the page loads
startGame();
