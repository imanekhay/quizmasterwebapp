<script lang="ts">
	export let onLogout: () => void;
</script>

<button on:click={onLogout} class="logout-btn">Logout</button>

<style>
	.logout-btn {
		background: #e74c3c;
		color: white;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
