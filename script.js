
const bike = document.getElementById("bike");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const speedText = document.getElementById("speed");
const message = document.getElementById("message");

let bikeX = 50;
let obstacleY = -100;
let score = 0;
let speed = 4;
let running = true;
let animationId;

function moveBike(direction) {
    if (!running) return;

    bikeX += direction * 7;
    bikeX = Math.max(10, Math.min(90, bikeX));

    bike.style.left = bikeX + "%";
}

// Movimentação pelo teclado
document.addEventListener("keydown", (event) => {
    if (
        event.key === "ArrowLeft" ||
        event.key.toLowerCase() === "a"
    ) {
        moveBike(-1);
    }

    if (
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "d"
    ) {
        moveBike(1);
    }
});

// Verifica colisão
function checkCollision() {
    const bikeRect = bike.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return (
        bikeRect.left < obstacleRect.right - 10 &&
        bikeRect.right > obstacleRect.left + 10 &&
        bikeRect.top < obstacleRect.bottom - 10 &&
        bikeRect.bottom > obstacleRect.top + 10
    );
}

// Finaliza o jogo
function endGame() {
    running = false;
    cancelAnimationFrame(animationId);
    message.style.display = "flex";
}

// Loop principal
function gameLoop() {
    if (!running) return;

    obstacleY += speed;

    if (obstacleY > 550) {
        obstacleY = -100;

        obstacle.style.left =
            (15 + Math.random() * 70) + "%";

        score += 10;

        speed = Math.min(10, 4 + score / 150);

        scoreText.textContent = score;
        speedText.textContent = Math.round(speed);
    }

    obstacle.style.top = obstacleY + "px";

    if (checkCollision()) {
        endGame();
        return;
    }

    animationId = requestAnimationFrame(gameLoop);
}

// Reinicia o jogo
function restartGame() {
    cancelAnimationFrame(animationId);

    bikeX = 50;
    obstacleY = -100;
    score = 0;
    speed = 4;
    running = true;

    bike.style.left = "50%";
    obstacle.style.top = "-100px";
    obstacle.style.left = "40%";

    scoreText.textContent = "0";
    speedText.textContent = "1";

    message.style.display = "none";

    gameLoop();
}

// Inicia o jogo
gameLoop();
