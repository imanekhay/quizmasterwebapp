import { Pool } from 'pg';

// Configure the PostgreSQL connection
const client = new Pool({
	user: 'postgres', // Your PostgreSQL username
	host: 'localhost', // Host of the PostgreSQL server (localhost if it's running on your machine)
	database: 'quizmaster', // Your database name
	password: 'Johnnybanana1.', // Your PostgreSQL password
	port: 5432 // Default PostgreSQL port
});

// Test the connection
async function testConnection() {
	try {
		await client.connect();
		console.log('Connection to the database was successful!');
	} catch (error) {
		console.error('Error connecting to the database:', error);
	} finally {
		await client.end();
	}
}

// Run the test
testConnection();
