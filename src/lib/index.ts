import { Pool } from 'pg';

const client = new Pool({
	user: 'postgres', // your postgres username
	host: 'localhost',
	database: 'quizmaster',
	password: 'Johnnybanana.', // your postgres password
	port: 5432 // default postgres port
});

export default client;
