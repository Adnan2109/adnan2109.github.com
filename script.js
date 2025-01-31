document.addEventListener('DOMContentLoaded', () => {
    const car = document.getElementById('car');
    const gameContainer = document.querySelector('.game-container');
    const scoreElement = document.getElementById('score');
    const gameOverElement = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const restartButton = document.getElementById('restart');

    let score = 0;
    let isGameOver = false;
    let carPosition = 125; // Initial car position (center)

    // Move car left and right
    document.addEventListener('keydown', (e) => {
        if (isGameOver) return;

        if (e.key === 'ArrowLeft' && carPosition > 0) {
            carPosition -= 10;
        } else if (e.key === 'ArrowRight' && carPosition < 250) {
            carPosition += 10;
        }

        car.style.left = `${carPosition}px`;
    });

    // Generate obstacles and coins
    function createObstacle() {
        if (isGameOver) return;

        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${Math.random() * 250}px`;
        gameContainer.appendChild(obstacle);

        let obstaclePosition = 0;
        const obstacleInterval = setInterval(() => {
            if (obstaclePosition > 600) {
                clearInterval(obstacleInterval);
                gameContainer.removeChild(obstacle);
            } else if (checkCollision(car, obstacle)) {
                gameOver();
                clearInterval(obstacleInterval);
            } else {
                obstaclePosition += 5;
                obstacle.style.top = `${obstaclePosition}px`;
            }
        }, 20);
    }

    function createCoin() {
        if (isGameOver) return;

        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = `${Math.random() * 250}px`;
        gameContainer.appendChild(coin);

        let coinPosition = 0;
        const coinInterval = setInterval(() => {
            if (coinPosition > 600) {
                clearInterval(coinInterval);
                gameContainer.removeChild(coin);
            } else if (checkCollision(car, coin)) {
                score += 10;
                scoreElement.textContent = score;
                gameContainer.removeChild(coin);
                clearInterval(coinInterval);
            } else {
                coinPosition += 5;
                coin.style.top = `${coinPosition}px`;
            }
        }, 20);
    }

    // Check for collisions
    function checkCollision(car, element) {
        const carRect = car.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        return !(
            carRect.top > elementRect.bottom ||
            carRect.bottom < elementRect.top ||
            carRect.left > elementRect.right ||
            carRect.right < elementRect.left
        );
    }

    // Game over logic
    function gameOver() {
        isGameOver = true;
        finalScoreElement.textContent = score;
        gameOverElement.style.display = 'block';
    }

    // Restart game
    restartButton.addEventListener('click', () => {
        location.reload();
    });

    // Game loop
    setInterval(createObstacle, 2000);
    setInterval(createCoin, 1500);
});
