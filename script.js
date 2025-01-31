document.addEventListener('DOMContentLoaded', () => {
    // Load saved state
    let coins = parseInt(localStorage.getItem('coins')) || 0;
    let level = parseInt(localStorage.getItem('level')) || 1;
    let exp = parseFloat(localStorage.getItem('exp')) || 0;
    let coinValue = parseFloat(localStorage.getItem('coinValue')) || 0.5;

    const coinsPerLevel = 10; // Coins needed to level up

    const coinElement = document.getElementById('coin');
    const coinsElement = document.getElementById('coins');
    const levelElement = document.getElementById('level');
    const expElement = document.getElementById('exp');
    const progressElement = document.getElementById('progress');
    const upgradeButton = document.getElementById('upgrade-coin');
    const notificationsElement = document.getElementById('notifications');

    // Function to show notifications
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notificationsElement.appendChild(notification);

        // Remove the notification after the animation ends
        setTimeout(() => {
            notification.remove();
        }, 3000); // Match the fadeOut animation duration
    };

    // Update UI
    const updateUI = () => {
        coinsElement.textContent = coins;
        levelElement.textContent = level;
        expElement.textContent = exp.toFixed(1);
        const progress = (exp / (coinsPerLevel * level)) * 100;
        progressElement.style.width = `${progress}%`;
    };

    // Save state to localStorage
    const saveState = () => {
        localStorage.setItem('coins', coins);
        localStorage.setItem('level', level);
        localStorage.setItem('exp', exp);
        localStorage.setItem('coinValue', coinValue);
    };

    // Coin click event
    coinElement.addEventListener('click', () => {
        exp += coinValue;
        coins += 1;

        // Check for level up
        if (exp >= coinsPerLevel * level) {
            level++;
            exp = 0;
            showNotification(`Level Up! You are now Level ${level}`);
        }

        updateUI();
        saveState();
    });

    // Upgrade coin value
    upgradeButton.addEventListener('click', () => {
        if (coins >= 10) {
            coins -= 10;
            coinValue *= 2; // Double the coin value
            updateUI();
            saveState();
            showNotification(`Coin value upgraded to ${coinValue} exp per click!`);
        } else {
            showNotification("Not enough coins to upgrade!");
        }
    });

    // Initialize UI
    updateUI();
});
