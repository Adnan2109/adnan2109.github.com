const canvas = document.getElementById("gameCanvas");
if (!canvas) {
    throw new Error("Canvas element not found");
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("2D context not supported");
}

let pacman = { x: 200, y: 200, size: 20, speed: 5, direction: 'right' };

function drawPacman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    // Draw Pac-Man
    let startAngle, endAngle;
    switch (pacman.direction) {
        case 'right':
            startAngle = 0.25 * Math.PI;
            endAngle = 1.75 * Math.PI;
            break;
        case 'left':
            startAngle = 1.25 * Math.PI;
            endAngle = 0.75 * Math.PI;
            break;
        case 'up':
            startAngle = 1.75 * Math.PI;
            endAngle = 1.25 * Math.PI;
            break;
        case 'down':
            startAngle = 0.75 * Math.PI;
            endAngle = 0.25 * Math.PI;
            break;
        default:
            startAngle = 0.25 * Math.PI;
            endAngle = 1.75 * Math.PI;
    }
    
    ctx.arc(pacman.x, pacman.y, pacman.size, startAngle, endAngle);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function movePacman() {
    if (pacman.direction === 'right') pacman.x = Math.min(pacman.x + pacman.speed, canvas.width - pacman.size);
    if (pacman.direction === 'left') pacman.x = Math.max(pacman.x - pacman.speed, pacman.size);
    if (pacman.direction === 'up') pacman.y = Math.max(pacman.y - pacman.speed, pacman.size);
    if (pacman.direction === 'down') pacman.y = Math.min(pacman.y + pacman.speed, canvas.height - pacman.size);
}

function update() {
    movePacman();
    drawPacman();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") pacman.direction = 'right';
    else if (event.key === "ArrowLeft") pacman.direction = 'left';
    else if (event.key === "ArrowUp") pacman.direction = 'up';
    else if (event.key === "ArrowDown") pacman.direction = 'down';
});

update();
