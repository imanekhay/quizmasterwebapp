<script lang="ts">
	export let user: { name: string; quizzesTaken: number };
</script>

<div class="profile">
	<h2>Welcome, {user.name}!</h2>
	<p>Quizzes Taken: {user.quizzesTaken}</p>
</div>

<style>
	.profile {
		padding: 1rem;
		background-color: #efeffd;
		border-radius: 20px;
	}
</style>
