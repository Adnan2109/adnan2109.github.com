document.addEventListener('DOMContentLoaded', () => {
    // Load saved state
    let coins = parseInt(localStorage.getItem('coins')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let exp = parseFloat(localStorage.getItem('exp')) || 0;
    let coinValue = parseFloat(localStorage.getItem('coinValue')) || 0.5;
    let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;

    const coinsPerLevel = 10; // Coins needed to level up

    const coinElement = document.getElementById('coin');
    const coinsElement = document.getElementById('coins');
    const levelElement = document.getElementById('level');
    const expElement = document.getElementById('exp');
    const coinValueElement = document.getElementById('coin-value');
    const progressElement = document.getElementById('progress');
    const upgradeButton = document.getElementById('upgrade-coin');
    const upgradeCostElement = document.getElementById('upgrade-cost');

    // Update UI
    const updateUI = () => {
        coinsElement.textContent = coins;
        levelElement.textContent = level;
        expElement.textContent = exp.toFixed(1);
        coinValueElement.textContent = coinValue.toFixed(1);
        upgradeCostElement.textContent = upgradeCost;

        const progress = (exp / (coinsPerLevel * level)) * 100;
        progressElement.style.width = `${progress}%`;
    };

    // Save state to localStorage
    const saveState = () => {
        localStorage.setItem('coins', coins);
        localStorage.setItem('level', level);
        localStorage.setItem('exp', exp);
        localStorage.setItem('coinValue', coinValue);
        localStorage.setItem('upgradeCost', upgradeCost);
    };

    // Coin click event
    coinElement.addEventListener('click', () => {
        exp += coinValue;
        coins += 1;

        // Check for level up
        if (exp >= coinsPerLevel * level) {
            level++;
            exp = 0;
        }

        updateUI();
        saveState();
    });

    // Upgrade coin value
    upgradeButton.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost;
            coinValue *= 2; // Double the coin value
            upgradeCost *= 2; // Double the upgrade cost
            updateUI();
            saveState();
        }
    });

    // Initialize UI
    updateUI();
});
