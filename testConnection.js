import mysql from 'mysql2/promise';

async function connect() {
	const connection = await mysql.createConnection({
		user: 'admin',
		host: 'quizmaster.cx2isgogq4d9.eu-north-1.rds.amazonaws.com',
		database: 'quizmaster',
		password: 'Johnnybanana1.'
	});
	return connection;
}

// Example usage of the connect function
connect()
	.then((connection) => {
		console.log('Database connected successfully');
		connection.end(); // Close the connection after use
	})
	.catch((error) => {
		console.error('Error connecting to the database:', error);
	});
