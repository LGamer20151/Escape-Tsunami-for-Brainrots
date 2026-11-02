document.addEventListener("DOMContentLoaded", () => {
    const welcomeBtn = document.getElementById("welcomeBtn");
    
    welcomeBtn.addEventListener("click", () => {
        alert("Welcome to Galatrix! Choose any game card below to start playing unblocked.");
    });

    const playButtons = document.querySelectorAll(".play-btn");
    
    playButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const gameName = e.target.getAttribute("data-game");
            launchGame(gameName);
        });
    });
});

function launchGame(gameTitle) {
    // Simulating loading an unblocked iframe or game instance
    console.log(`Launching ${gameTitle}...`);
    alert(`Loading ${gameTitle} in unblocked mode! Enjoy your session.`);
}
