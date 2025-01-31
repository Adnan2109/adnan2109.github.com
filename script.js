let score = 0;
const scoreElement = document.getElementById('score');
const clickerButton = document.getElementById('clicker');

clickerButton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
});
