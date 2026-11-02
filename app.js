document.addEventListener("DOMContentLoaded", () => {
    const playButtons = document.querySelectorAll(".play-btn");
    const welcomeBtn = document.getElementById("welcomeBtn");

    // Create modal container dynamically for running games
    const modal = document.createElement("div");
    modal.id = "gameModal";
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        flex-direction: column;
    `;
    modal.innerHTML = `
        <div style="width: 80%; max-width: 900px; background: #1a1c23; border: 2px solid #00ffcc; border-radius: 8px; overflow: hidden; box-shadow: 0 0 30px rgba(0,255,204,0.3);">
            <div style="background: #15171e; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2d3d;">
                <h3 id="modalGameTitle" style="margin: 0; color: #00ffcc;">Loading Game...</h3>
                <button id="closeModal" style="background: #ff0055; color: white; border: none; padding: 6px 14px; font-weight: bold; cursor: pointer; border-radius: 4px;">Close</button>
            </div>
            <div id="gameScreenContainer" style="width: 100%; height: 500px; background: #0f1015; display: flex; justify-content: center; align-items: center; color: #a0a0b0; font-size: 1.2rem;">
                Initializing Game Engine...
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModalBtn = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalGameTitle");
    const gameScreenContainer = document.getElementById("gameScreenContainer");

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        gameScreenContainer.innerHTML = "";
    });

    welcomeBtn.addEventListener("click", () => {
        alert("Welcome to Galatrix! Select any game card below to start playing instantly.");
    });

    playButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const gameName = e.target.getAttribute("data-game");
            modalTitle.innerText = gameName;
            modal.style.display = "flex";

            // Load interactive canvas or game simulator inside modal
            gameScreenContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h2 style="color: #ffffff; margin-bottom: 10px;">Playing ${gameName}</h2>
                    <p style="color: #a0a0b0; margin-bottom: 20px;">Use your keyboard arrows or WASD to control your character!</p>
                    <canvas id="activeGameCanvas" width="700" height="350" style="background: linear-gradient(to bottom, #4a90e2, #c5dff8); border-radius: 6px; box-shadow: 0 0 15px rgba(0,0,0,0.5);"></canvas>
                </div>
            `;

            // Simple embedded canvas loop so the game actually runs
            const canvas = document.getElementById("activeGameCanvas");
            if (canvas) {
                const ctx = canvas.getContext("2d");
                let posX = 100;
                let obstacleX = 600;
                let score = 0;
                let isOver = false;

                function gameLoop() {
                    if (modal.style.display === "none") return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Ground
                    ctx.fillStyle = "#2e7d32";
                    ctx.fillRect(0, 300, canvas.width, 50);

                    // Player
                    ctx.fillStyle = "#ff0055";
                    ctx.fillRect(posX, 250, 35, 50);

                    // Obstacle
                    ctx.fillStyle = "#333333";
                    ctx.fillRect(obstacleX, 260, 30, 40);

                    obstacleX -= 4;
                    if (obstacleX < -50) {
                        obstacleX = canvas.width + Math.random() * 100;
                        score += 10;
                    }

                    // Score
                    ctx.fillStyle = "#ffffff";
                    ctx.font = "bold 16px sans-serif";
                    ctx.fillText("Score: " + score, 20, 30);

                    requestAnimationFrame(gameLoop);
                }
                gameLoop();
            }
        });
    });
});
