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
	try {
		const { username, password } = await request.json();
		const client = await connect();
		const [rows] = await client.query('SELECT * FROM users WHERE username = ?', [username]);

		const users = rows as User[];
		if (users.length === 0) {
			return json({ success: false, error: 'Invalid username or password' }, { status: 401 });
		}

		const user = users[0];
		const match = await bcrypt.compare(password, user.password);

		await client.end();

		if (!match) {
			return json({ success: false, error: 'Invalid username or password' }, { status: 401 });
		}

		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Login server error:', error);
		return json({ success: false, error: 'Server error' }, { status: 500 });
	}
};
