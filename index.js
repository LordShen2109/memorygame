$(document).ready(function () {
  let flippedCards = []; // Store flipped cards

  $(".card").click(function () {
    // Prevent flipping more than 2 cards or re-flipping the same card
    if ($(this).hasClass("flipped") || flippedCards.length >= 2) {
      return;
    }

    // Flip the card
    $(this).addClass("flipped");
    flippedCards.push($(this));

    if (flippedCards.length === 2) {
      // Get the image source of the flipped cards
      const card1 = flippedCards[0];
      const card2 = flippedCards[1];
      const img1 = card1.find(".card-back img").attr("src");
      const img2 = card2.find(".card-back img").attr("src");

      // Check if the images match
      if (img1 === img2) {
        // Match: Hide cards after a short delay
        setTimeout(() => {
          card1.addClass("hidden");
          car
