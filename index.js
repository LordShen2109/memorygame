$(document).ready(function () {
  // Shuffle the cards when the page loads
  shuffleCards();

  let flippedCards = []; // Store the currently flipped cards

  $(".card").click(function () {
    // Prevent flipping more than two cards or re-flipping the same card
    if ($(this).hasClass("flipped") || flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    $(this).addClass("flipped");
    flippedCards.push($(this));

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

      const img1 = card1.find(".card-back img").attr("src");
      const img2 = card2.find(".card-back img").attr("src");

      if (img1 === img2) {
        setTimeout(() => {
          card1.css("transition", "opacity 1.5s").css("opacity", "0");
          card2.css("transition", "opacity 1.5s").css("opacity", "0");
          setTimeout(() => {
            card1.css("visibility", "hidden");
            card2.css("visibility", "hidden");
            flippedCards = [];
          }, 1200);
        }, 700);
      } else {
        setTimeout(() => {
          card1.removeClass("flipped");
          card2.removeClass("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });
});

// Function to shuffle the cards
function shuffleCards() {
  const container = $(".container"); // The parent container of the cards
  const cards = $(".card"); // Select all the cards

  // Use an array to store the card elements
  const cardArray = cards.toArray();

  // Fisher-Yates Shuffle Algorithm
  for (let i = cardArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
  }

  // Append the shuffled cards back to the container
  container.empty();
  cardArray.forEach(card => container.append(card));
}
