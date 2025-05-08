import mysql from 'mysql2/promise';

export async function connect() {
	const connection = await mysql.createConnection({
		user: 'admin',
		host: 'quizmaster.cx2isgogq4d9.eu-north-1.rds.amazonaws.com',
		database: 'quizmaster',
		password: 'Johnnybanana1.'
	});
	return connection;
}
