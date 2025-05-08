export async function registerUser(username: string, password: string, dob: string) {
	try {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username,
				email: username, // Username used as email for simplicity
				password,
				dob
			})
		});

		const data = await res.json(); // Convert response to JSON

		if (!res.ok) {
			alert(data.error || 'Registration failed');
			return false;
		}

		alert('Registration successful!');
		return true;
	} catch (err) {
		console.error('Registration error:', err);
		alert('Something went wrong');
		return false;
	}
}
