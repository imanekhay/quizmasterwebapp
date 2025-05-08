<!-- LoginPage.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from './Login';
	import './login.css';

	let username = '';
	let password = '';

	async function handleLogin() {
		console.log('Logging in with username:', username, 'and password:', password);
		const success = await login(username, password);
		if (success) {
			console.log('Login successful');
			goto('/dashboard'); // Redirect to dashboard
		} else {
			console.log('Login failed');
			alert('Invalid username or password');
		}
	}
</script>

<main class="login-container">
	<img src="/logo.png" alt="Quizmaster Logo" class="logo" />

	<input type="text" placeholder="Username" bind:value={username} class="input" />
	<input type="password" placeholder="Password" bind:value={password} class="input" />

	<button class="login-btn" on:click={handleLogin}>LOGIN</button>

	<div class="switch-line">
		<div class="switch-circle"></div>
	</div>

	<button class="signup-btn" on:click={() => goto('/register')}>SIGN UP</button>
</main>
