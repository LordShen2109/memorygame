$(document).ready(function () {
    const maxTries = 4; // Maximum number of tries
    let triesLeft = maxTries; // Initialize tries left
    let flippedCards = []; // Store the currently flipped cards
    let matchedPairs = 0; // Count of matched card pairs
    const totalPairs = $(".card").length / 2; // Total pairs in the game

    // Display the initial tries left
    $("#tries").text(triesLeft);

    // Shuffle the cards when the page loads
    shuffleCards();

    // Delegate the click event to the container
    $(".container").on("click", ".card", function () {
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
                // Cards match
                matchedPairs++;
                setTimeout(() => {
                    card1.css("transition", "opacity 1.5s").css("opacity", "0");
                    card2.css("transition", "opacity 1.5s").css("opacity", "0");
                    setTimeout(() => {
                        card1.css("visibility", "hidden");
                        card2.css("visibility", "hidden");
                        flippedCards = [];
                        checkWin(); // Check if the user has won
                    }, 1200);
                }, 700);
            } else {
                // No match, unflip cards
                setTimeout(() => {
                    card1.removeClass("flipped");
                    card2.removeClass("flipped");
                    flippedCards = [];
                    triesLeft--;
                    updateTriesDisplay();
                    checkGameOver();
                }, 1000);
            }
        }
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

    // Function to update the tries display
    function updateTriesDisplay() {
        $("#tries").text(triesLeft);
    }

    // Function to check if the game is over
    function checkGameOver() {
        if (triesLeft <= 0) {
            setTimeout(() => {
                // Hide all cards
                $(".card").css({
                    "transition": "opacity 1.5s",
                    "opacity": "0",
                    "visibility": "hidden"
                });
                displayMessage("You Lost! Try again later!");
            }, 500);
        }
    }

    // Function to check if the user has won
    function checkWin() {
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                displayMessage("You Win! Congratulations!");
            }, 500);
        }
    }

    // Function to display the win or lose message
    function displayMessage(message) {
        $("h1").text(message).css({
            "font-size": "80px",
            "text-align": "center",
            "margin-top": "20px",
            "margin-left": "40px",
            "margin-right": "40px",
            "padding-right": "50px"
        });

        // Remove the tries display
        $(".tries-container").remove();

        // Disable further clicks on cards
        $(".card").off("click");
    }
});



