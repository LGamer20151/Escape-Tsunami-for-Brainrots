document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".game-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});
