const express = require('express')
const app = express()

// Import the model (cat.js) to use its database functions.
const cat = require('../models/cats')

// Create all our routes and set up logic within those routes where required.
app.get('/', function (req, res) {
    cat.all(function (data) {
        const hbsObject = {
            cats: data
        }
        console.log(hbsObject)
        res.render(index, hbsObject)
    })
})

app.post('/api/cats', function (req, res) {
    cat.create([
        'name', 'sleepy'
    ], [
        req.body.name, req.body.sleepy
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId })
    })
})

app.put('/api/cats/:id', function (req, res) {
    const condition = `id = ${req.params.id}`

    cat.update({
        sleepy: req.body.sleepy
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end()
        }
    })
})

app.delete('/api/cats/"id', function (req, res) {
    const condition = `id = ${req.params.id}`

    cat.delete(condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end()
        }
    })
})

module.exports = app;