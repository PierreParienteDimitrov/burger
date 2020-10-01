const connection = require('../config/connection')

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    const arr = []

    for (let i = 0; i < num; i++) {
        arr.push('?')
    }

    return arr.toString()
}


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = []

    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
        const value = ob[key]

        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === 'String' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'"
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(`${key} = ${value}`)
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
    all: function (tableInput, cb) {
        const query = `SELECT * FROM ${tableInput};`
        connection.query(query, function (err, result) {
            if (err) throw err
            cb(result)
        })
    },

    create: function (table, cols, vals, cb) {
        let query = `INSERT INTO ${table}`
        query += ` (${cols.toString()})`
        query += ` VALUES (${printQuestionMarks(vals.length)})`

        connection.query(query, vals, function (err, result) {
            if (err) throw err
            cb(result)
        })
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    udpate: function (table, objColVals, condition, cb) {
        let query = `UPDATE ${table}`
        query += ` SET ${objToSql(objColVals)} WHERE ${condition}`

        connection.query(query, function (err, result) {
            if (err) throw err
            cb(result)
        })
    },
    delete: function (table, condition, cb) {
        let query = `DELETE FROM ${table}`
        query += ` WHERE ${condition}`

        connection.query(query, function (err, result) {
            if (err) throw err
            cb(result)
        })
    }
}

module.exports = orm