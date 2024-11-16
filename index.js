$(document).ready(function () {
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

      // Get the image source of both cards
      const img1 = card1.find(".card-back img").attr("src");
      const img2 = card2.find(".card-back img").attr("src");

      // Check if the images match
      if (img1 === img2) {
        // Match: Fade out cards by toggling opacity
        setTimeout(() => {
          card1.css("transition", "opacity 1.5s").css("opacity", "0");
          card2.css("transition", "opacity 1.5s").css("opacity", "0");
          setTimeout(() => {
            card1.css("visibility", "hidden");
            card2.css("visibility", "hidden");
            flippedCards = [];
          }, 500); // Delay to allow fade-out animation to complete
        }, 500);
      } else {
        // No Match: Flip both cards back after a short delay
        setTimeout(() => {
          card1.removeClass("flipped");
          card2.removeClass("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });
});
