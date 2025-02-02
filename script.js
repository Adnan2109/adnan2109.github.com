document.addEventListener('DOMContentLoaded', () => {
    // Load saved state
    let money = parseFloat(localStorage.getItem('money')) || 0;
    let businesses = JSON.parse(localStorage.getItem('businesses')) || {
        lemonade: { level: 1, income: 1, cost: 10 },
        bakery: { level: 0, income: 5, cost: 50 },
        factory: { level: 0, income: 20, cost: 200 }
    };

    const moneyElement = document.getElementById('money');
    const lemonadeIncomeElement = document.getElementById('lemonade-income');
    const lemonadeCostElement = document.getElementById('lemonade-cost');
    const bakeryIncomeElement = document.getElementById('bakery-income');
    const bakeryCostElement = document.getElementById('bakery-cost');
    const factoryIncomeElement = document.getElementById('factory-income');
    const factoryCostElement = document.getElementById('factory-cost');
    const bakeryElement = document.getElementById('bakery');
    const factoryElement = document.getElementById('factory');

    // Update UI
    const updateUI = () => {
        moneyElement.textContent = money.toFixed(2);
        lemonadeIncomeElement.textContent = businesses.lemonade.income.toFixed(2);
        lemonadeCostElement.textContent = businesses.lemonade.cost.toFixed(2);
        bakeryIncomeElement.textContent = businesses.bakery.income.toFixed(2);
        bakeryCostElement.textContent = businesses.bakery.cost.toFixed(2);
        factoryIncomeElement.textContent = businesses.factory.income.toFixed(2);
        factoryCostElement.textContent = businesses.factory.cost.toFixed(2);

        // Unlock businesses
        if (money >= 50 && businesses.bakery.level === 0) {
            bakeryElement.style.display = 'block';
        }
        if (money >= 200 && businesses.factory.level === 0) {
            factoryElement.style.display = 'block';
        }
    };

    // Save state to localStorage
    const saveState = () => {
        localStorage.setItem('money', money);
        localStorage.setItem('businesses', JSON.stringify(businesses));
    };

    // Upgrade a business
    window.upgradeBusiness = (business) => {
        const biz = businesses[business];
        if (money >= biz.cost) {
            money -= biz.cost;
            biz.level++;
            biz.income *= 1.5; // Increase income by 50%
            biz.cost *= 2; // Double the cost for the next upgrade
            updateUI();
            saveState();
        }
    };

    // Earn money over time
    setInterval(() => {
        money += businesses.lemonade.income * businesses.lemonade.level;
        money += businesses.bakery.income * businesses.bakery.level;
        money += businesses.factory.income * businesses.factory.level;
        updateUI();
        saveState();
    }, 1000);

    // Initialize UI
    updateUI();
});
