// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player ship setup
const playerWidth = 50;
const playerHeight = 30;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 10;
let playerSpeed = 5;

// Bullet setup
const bulletWidth = 5;
const bulletHeight = 10;
let bullets = [];

// Enemy setup
const enemyWidth = 40;
const enemyHeight = 30;
let enemies = [];
let enemySpeed = 2;
let enemyDirection = 1; // 1 for moving right, -1 for left

// Control the game
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

// Handle key events
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === " " || e.key === "Spacebar") {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === " " || e.key === "Spacebar") {
        spacePressed = false;
    }
}

// Draw the player
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerHeight);
    ctx.fillStyle = "#00f";
    ctx.fill();
    ctx.closePath();
}

// Draw the bullets
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.rect(bullet.x, bullet.y, bulletWidth, bulletHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
    });
}

// Update bullet position
function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= 5; // Move bullet upwards

        // Remove bullets that go off screen
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

// Draw the enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.rect(enemy.x, enemy.y, enemyWidth, enemyHeight);
        ctx.fillStyle = "#ff00ff";
        ctx.fill();
        ctx.closePath();
    });
}

// Update enemies position
function updateEnemies() {
    for (let enemy of enemies) {
        enemy.x += enemySpeed * enemyDirection;

        // Change direction if the enemy hits a wall
        if (enemy.x <= 0 || enemy.x + enemyWidth >= canvas.width) {
            enemyDirection *= -1;
            enemies.forEach(e => e.y += 20); // Move enemies down when hitting the wall
        }
    }
}

// Collision detection (bullet hits enemy)
function detectCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (
                bullets[i].x < enemies[j].x + enemyWidth &&
                bullets[i].x + bulletWidth > enemies[j].x &&
                bullets[i].y < enemies[j].y + enemyHeight &&
                bullets[i].y + bulletHeight > enemies[j].y
            ) {
                // Remove enemy and bullet
                enemies.splice(j, 1);
                bullets.splice(i, 1);
                i--;
                break;
            }
        }
    }
}

// Control the player movement
function movePlayer() {
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
}

// Shoot a bullet
function shootBullet() {
    if (spacePressed) {
        bullets.push({
            x: playerX + playerWidth / 2 - bulletWidth / 2,
            y: playerY,
        });
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();

    movePlayer();
    shootBullet();
    updateBullets();
    updateEnemies();
    detectCollisions();

    requestAnimationFrame(gameLoop);
}

// Create enemies at random positions
function createEnemies() {
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: Math.random() * (canvas.width - enemyWidth),
            y: Math.random() * 100,
        });
    }
}

createEnemies();
gameLoop();
