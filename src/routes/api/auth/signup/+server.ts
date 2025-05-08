import { json } from '@sveltejs/kit';
import { connect } from '$lib/database';
import bcrypt from 'bcrypt';

type User = {
	id: number;
	username: string;
	password: string;
	dob: string;
};

export const POST = async ({ request }) => {
	const client = await connect();

	try {
		const { username, password, dob } = await request.json();

		if (!username || !password || !dob) {
			return json({ success: false, error: 'Missing fields' }, { status: 400 });
		}

		const [existingRows] = await client.query('SELECT * FROM users WHERE username = ?', [username]);
		const existingUsers = existingRows as User[];

		if (existingUsers.length > 0) {
			return json({ success: false, error: 'Username already exists' }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await client.query('INSERT INTO users (username, password, dob) VALUES (?, ?, ?)', [
			username,
			hashedPassword,
			dob
		]);

		return json({ success: true }, { status: 201 });
	} catch (error) {
		console.error('Error during signup:', error);
		return json({ success: false, error: 'Server error' }, { status: 500 });
	} finally {
		await client.end();
	}
};
