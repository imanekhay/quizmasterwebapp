<script>
	import { goto } from '$app/navigation';

	export let onLogout = () => {
		goto('/login');
	};
</script>

<button class="logout-btn" on:click={onLogout}> Logout </button>

<style>
	.logout-btn {
		position: absolute;
		top: 30px;
		right: 40px;
		background: #ff4d4f;
		color: white;
		padding: 10px 20px;
		border-radius: 25px;
		border: none;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s;
	}
	.logout-btn:hover {
		background: #d9363e;
	}
</style>
