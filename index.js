$(document).ready(function () {
    const card = $('.card');

    card.on('click', function () {
        $(this).toggleClass('flipped');
    });
});
