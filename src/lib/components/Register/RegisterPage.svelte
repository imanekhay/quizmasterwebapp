<script lang="ts">
	import { goto } from '$app/navigation'; // This is used for navigation after registration

	import './register.css';

	let username = '';
	let password = '';
	let confirmPassword = '';
	let dob = ''; // Date of birth

	function calculateAge(dateString: string): number {
		const today = new Date();
		const birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	function register() {
		if (!dob) {
			alert('Please enter your date of birth.');
			return;
		}

		const age = calculateAge(dob);
		if (age < 18) {
			alert('You must be at least 18 years old to register.');
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords don't match");
			return;
		}

		fetch('/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify({ username, password, dob }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					goto('/login'); // Navigate to the login page after successful registration
				} else {
					alert('Registration failed');
				}
			})
			.catch((err) => {
				console.error('Error during registration:', err);
				alert('Error during registration');
			});
	}
</script>

<main class="register-container">
	<img src="/logo.png" alt="Quizmaster Logo" class="logo" />

	<input type="text" placeholder="username" bind:value={username} class="input" />
	<input type="password" placeholder="password" bind:value={password} class="input" />
	<input
		type="password"
		placeholder="confirm password"
		bind:value={confirmPassword}
		class="input"
	/>
	<label class="input-label" for="dob">Date of Birth:</label>
	<input id="dob" type="date" bind:value={dob} class="input" />

	<button class="register-btn" on:click={register}>SIGN UP</button>
</main>
