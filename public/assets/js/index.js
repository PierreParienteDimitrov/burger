$(function () {
	$('.devour').on('click', function (event) {
		// event.preventDefault();
		const devoured = $(this).data('newdevoured')
		const id = $(this).data('id')
		// alert(`clicked ${devoured} ${id}`);

		const newBurgerState = {
			devoured: devoured,
		}

		$.ajax(`/api/burgers/${id}`, {
			type: 'PUT',
			data: newBurgerState
		}).then(function () {
			console.log(`Changed devoured to ${devoured}`)
			location.reload()
		})
	});

	// Create a New Burger
	$('#create-burger').on('submit', function (event) {
		event.preventDefault()

		const newBurger = {
			burger: $('#create-burger [name=burger]').val().trim(),
		}

		// Send the POST request
		$.post('/api/burgers', newBurger, function () {
			console.log('Added a new burger')
			// Reload the page to get the udpated list
			location.reload()
		})
	});
});
