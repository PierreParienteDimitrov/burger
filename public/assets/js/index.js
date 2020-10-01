$(function () {

    // Create a New Burger
    $('#create-burger').on('submit', function (event) {
        event.preventDefault();

        const newBurger = {
            burger: $('#create-burger [name=burger]').val().trim()
        }

        // Send the POST request
        $.post('/api/burgers', newBurger, function () {
            console.log('Added a new burger')
            // Reload the page to get the udpated list
            location.reload()
        });

    })
})

