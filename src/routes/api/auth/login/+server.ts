// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { connect } from '$lib/database'; // Import the database connection
import type { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';

export const POST = async ({ request }) => {
	const { username, password } = await request.json();

	try {
		const db = await connect();

		const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [
			username
		]);
		if (rows.length === 0) {
			return json({ error: 'Invalid username or password' }, { status: 400 });
		}

		const user = rows[0];
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return json({ error: 'Invalid username or password' }, { status: 400 });
		}

		return json({ message: 'Login successful' });
	} catch (error) {
		console.error(error);
		return json({ error: 'Error logging in' }, { status: 500 });
	}
};
