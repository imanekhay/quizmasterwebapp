<script>
	import { goto } from '$app/navigation';

	export let username = '';

	function goToDashboard() {
		goto('/dashboard');
	}
	function goToProfile() {
		goto('/profile');
	}
</script>

<nav class="navbar">
	<button
		class="navbar-left"
		on:click={goToDashboard}
		aria-label="Go to Dashboard"
		style="cursor:pointer; background:none; border:none; padding:0;"
	>
		<img src="/quizlogo.png" alt="QuizMaster Logo" class="logo" />
		<span class="brand">QuizMaster</span>
	</button>
	<div class="navbar-right">
		{#if username}
			<span class="welcome">Hi, {username}!</span>
			<button class="nav-btn" on:click={goToProfile}>Profile</button>
		{:else}
			<button class="nav-btn" on:click={() => goto('/login')}>Login</button>
		{/if}
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 2rem;
		background: #efeffd;
		box-shadow: 0 2px 8px rgba(130, 34, 255, 0.07);
	}
	.logo {
		width: 36px;
		height: 36px;
		margin-right: 10px;
	}
	.brand {
		font-size: 1.3rem;
		font-weight: bold;
		color: #410095;
	}
	.navbar-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.nav-btn {
		background: #8322ff;
		color: white;
		border: none;
		border-radius: 20px;
		padding: 7px 18px;
		cursor: pointer;
		font-weight: 500;
		transition: background 0.2s;
	}
	.nav-btn:hover {
		background: #410095;
	}
	.welcome {
		color: #410095;
		font-weight: 500;
		margin-right: 0.5rem;
	}
</style>
