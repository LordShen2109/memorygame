$(document).ready(function() {
  let flippedCards = [];

  $(".card").click(function() {
    if ($(this).hasClass("flipped") || flippedCards.length >= 2) {
      return; // Prevent flipping more than two cards or flipping an already flipped card
    }

    $(this).addClass("flipped");
    flippedCards.push($(this));

    if (flippedCards.length === 2) {
      // Check if the two flipped cards match
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];

      if (card1.data("match") === card2.data("match")) {
        // Cards match: hide them
        setTimeout(() => {
          card1.addClass("hidden");
          card2.addClass("hidden");
          flippedCards = [];
        }, 500); // Allow the flip animation to complete
      } else {
        // Cards do not match: flip them back
        setTimeout(() => {
          card1.removeClass("flipped");
          card2.removeClass("flipped");
          flippedCards = [];
        }, 1000); // Allow the user to see the unmatched cards briefly
      }
    }
  });
});

