export async function login(username: string, password: string) {
	console.log('Attempting to login with username:', username);

	try {
		// Make an API call to the server-side login endpoint
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (!response.ok) {
			console.log('Login failed:', data.error);
			return false;
		}

		console.log('Login successful');
		return true;
	} catch (error) {
		console.error('Error during login:', error);
		return false;
	}
}
