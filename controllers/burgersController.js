const express = require('express');
const app = express();

// Import the model (cat.js) to use its database functions.
const burger = require('../models/burgers');

// Create all our routes and set up logic within those routes where required.
app.get('/', function (req, res) {
	burger.all(function (data) {
		const hbsObject = {
			burgers: data,
		};
		// console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

app.post('/api/burgers', function (req, res) {
	// console.log('-----------------------');
	// console.log(req.body.burger);

	burger.create(['burger_name'], [req.body.burger], function (result) {
		// Send back the ID of the new quote
		res.json({ id: result.insertId });
	});
});

app.put('/api/burgers/:id', function (req, res) {
	const condition = `id = ${req.params.id}`;

	// console.log('-----------------');
	// console.log(condition);
	console.log('-----------------');
	console.log(req.body.devoured);

	burger.udpate(
		{
			devoured: req.body.devoured,
		},
		condition,
		function (result) {
			if (result.changedRows == 0) {
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		},
	);
});

// app.put('/api/cats/:id', function (req, res) {
//     const condition = `id = ${req.params.id}`

//     cat.update({
//         sleepy: req.body.sleepy
//     }, condition, function (result) {
//         if (result.changedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end()
//         }
//     })
// })

// app.delete('/api/cats/"id', function (req, res) {
//     const condition = `id = ${req.params.id}`

//     cat.delete(condition, function (result) {
//         if (result.changedRows == 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end()
//         }
//     })
// })

module.exports = app;
