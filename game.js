const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("scoreVal");
const levelEl = document.getElementById("levelVal");

let score = 0;
let level = 1;
let isGameOver = false;

// Player configuration
let player = {
    x: 150,
    y: 340,
    width: 35,
    height: 50,
    speed: 7,
    color: "#ff0055"
};

// Tsunami wave configuration
let tsunami = {
    x: -350,
    y: 0,
    width: 300,
    height: 450,
    baseSpeed: 1.5,
    speed: 1.5
};

// Arrays for obstacles and collectibles
let obstacles = [];
let collectibles = [];
let obstacleTimer = 0;
let collectibleTimer = 0;

let keys = {};

// Input listeners
window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (e.key === " " && isGameOver) {
        resetGame();
    }
});

window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function spawnObstacle() {
    obstacles.push({
        x: canvas.width + 50,
        y: 355,
        width: 30,
        height: 35,
        color: "#333333"
    });
}

function spawnCollectible() {
    const memes = ["SKIBIDI", "RIZZ", "SIGMA", "GYATT", "FANUM"];
    collectibles.push({
        x: canvas.width + 50,
        y: 280 + Math.random() * 50,
        width: 30,
        height: 30,
        text: memes[Math.floor(Math.random() * memes.length)]
    });
}

function update() {
    if (isGameOver) return;

    // Player movement
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        player.x += player.speed;
    }

    // Screen bounds
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) {
        player.x = canvas.width - player.width;
    }

    // Dynamic tsunami speed scaling with score
    tsunami.speed = tsunami.baseSpeed + (score * 0.005);
    tsunami.x += tsunami.speed;

    // Check if tsunami catches player
    if (tsunami.x + tsunami.width > player.x) {
        isGameOver = true;
    }

    // Handle obstacles
    obstacleTimer++;
    if (obstacleTimer > 110) {
        spawnObstacle();
        obstacleTimer = 0;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 4;

        // Obstacle collision
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            // Slow down player on hit
            player.x -= 25;
            obstacles.splice(i, 1);
        } else if (obstacles[i] && obstacles[i].x < -50) {
            obstacles.splice(i, 1);
            score += 5;
            scoreEl.innerText = score;
            if (score % 50 === 0) {
                level++;
                levelEl.innerText = level;
            }
        }
    }

    // Handle collectibles
    collectibleTimer++;
    if (collectibleTimer > 80) {
        spawnCollectible();
        collectibleTimer = 0;
    }

    for (let i = collectibles.length - 1; i >= 0; i--) {
        collectibles[i].x -= 3.5;

        // Collectible pickup
        if (
            player.x < collectibles[i].x + collectibles[i].width &&
            player.x + player.width > collectibles[i].x &&
            player.y < collectibles[i].y + collectibles[i].height &&
            player.y + player.height > collectibles[i].y
        ) {
            score += 15;
            scoreEl.innerText = score;
            collectibles.splice(i, 1);
        } else if (collectibles[i] && collectibles[i].x < -50) {
            collectibles.splice(i, 1);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = "#2e7d32";
    ctx.fillRect(0, 390, canvas.width, 60);
    ctx.fillStyle = "#1b5e20";
    ctx.fillRect(0, 390, canvas.width, 10);

    // Draw obstacles
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });

    // Draw collectibles
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 11px sans-serif";
    collectibles.push(); // safety
    collectibles.forEach(item => {
        ctx.fillRect(item.x, item.y, item.width, item.height);
        ctx.fillStyle = "#000000";
        ctx.fillText(item.text, item.x - 5, item.y - 8);
        ctx.fillStyle = "#ffd700";
    });

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("SIGMA", player.x + 2, player.y - 6);

    // Draw Tsunami Wave
    ctx.fillStyle = "rgba(0, 150, 255, 0.85)";
    ctx.fillRect(tsunami.x, tsunami.y, tsunami.width, tsunami.height);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("MEGA TSUNAMI", tsunami.x + 30, 60);

    // Game Over Overlay
    if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff0055";
        ctx.font = "bold 32px sans-serif";
        ctx.fillText("WIPED OUT BY THE TSUNAMI", 180, 190);

        ctx.fillStyle = "#ffffff";
        ctx.font = "18px sans-serif";
        ctx.fillText("Press SPACEBAR to Try Again", 310, 240);
    }
}

function resetGame() {
    player.x = 150;
    tsunami.x = -350;
    score = 0;
    level = 1;
    scoreEl.innerText = score;
    levelEl.innerText = level;
    obstacles = [];
    collectibles = [];
    isGameOver = false;
}

function loop() {

---
*This answer is long, so it stops here. Tap **Continue** or type "continue" to get the rest.*
