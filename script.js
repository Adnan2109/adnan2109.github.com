let coins = 0;
let level = 1;
const coinsPerLevel = 10; // Coins needed to level up

const coinElement = document.getElementById('coin');
const coinsElement = document.getElementById('coins');
const levelElement = document.getElementById('level');
const progressElement = document.getElementById('progress');

coinElement.addEventListener('click', () => {
    // Add a coin
    coins++;
    coinsElement.textContent = coins;

    // Animate the coin
    coinElement.style.animation = 'none';
    coinElement.offsetHeight; // Trigger reflow
    coinElement.style.animation = null;

    // Check for level up
    if (coins >= coinsPerLevel * level) {
        level++;
        levelElement.textContent = level;
        coins = 0; // Reset coins for the next level
        coinsElement.textContent = coins;
    }

    // Update progress bar
    const progress = (coins / (coinsPerLevel * level)) * 100;
    progressElement.style.width = `${progress}%`;
});
