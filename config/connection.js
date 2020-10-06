var mysql = require('mysql')
var connection

if (process.env.JAWSDB_ULR) {
	connection = mysql.createConnection(process.env.JAWSDB_ULR)
} else {
	connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'password',
		database: 'burger_db',
	})
}

connection.connect(function (err) {
	if (err) {
		console.error(err.stack)
		return
	}
	console.log(connection.threadId)
})

module.exports = connection
