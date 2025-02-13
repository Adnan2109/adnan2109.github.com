const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const playAgainButton = document.getElementById('playAgainButton');
const particleContainer = document.getElementById('particleContainer');

const gridSize = 20; // Size of each grid square
const tileCount = canvas.width / gridSize; // Number of tiles in each row/column

let snake = [{ x: 10, y: 10 }]; // Initial snake position
let food = { x: 5, y: 5 }; // Initial food position
let direction = { x: 0, y: 0 }; // Initial direction
let score = 0;
let gameOver = false;
let lastUpdateTime = 0;
const snakeSpeed = 5; // Reduced speed (pixels per second)

// Particle class for effects
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.life = 30;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];

// Draw the game
function drawGame(currentTime) {
    if (gameOver) return;

    const deltaTime = (currentTime - lastUpdateTime) / 1000;
    lastUpdateTime = currentTime;

    // Clear the canvas
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake with a gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'lime');
    gradient.addColorStop(1, 'green');
    ctx.fillStyle = gradient;
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    // Draw the food with a radial gradient
    const foodGradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, 0,
        food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2
    );
    foodGradient.addColorStop(0, 'red');
    foodGradient.addColorStop(1, 'darkred');
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Move the snake
    const head = { x: snake[0].x + direction.x * deltaTime * snakeSpeed, y: snake[0].y + direction.y * deltaTime * snakeSpeed };
    snake.unshift(head);

    // Check for food collision
    if (Math.abs(head.x - food.x) < 0.5 && Math.abs(head.y - food.y) < 0.5) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
        createParticles(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, 'red');
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    // Check for collisions
    if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.slice(1).some(segment => Math.abs(segment.x - head.x) < 0.5 && Math.abs(segment.y - head.y) < 0.5)
    ) {
        gameOver = true;
        finalScoreDisplay.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }

    // Draw particles
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(drawGame);
}

// Create particles for effects
function createParticles(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Place food randomly
function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);

    // Ensure food doesn't spawn on the snake
    if (snake.some(segment => Math.abs(segment.x - food.x) < 0.5 && Math.abs(segment.y - food.y) < 0.5)) {
        placeFood();
    }
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    gameOverScreen.classList.add('hidden');
    placeFood();
}

// Handle keyboard input
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Restart button
restartButton.addEventListener('click', resetGame);

// Play again button
playAgainButton.addEventListener('click', resetGame);

// Start the game loop
requestAnimationFrame(drawGame);
