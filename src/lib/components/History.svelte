<script lang="ts">
	let history = [
		{ category: 'Math', score: '8/10' },
		{ category: 'Science', score: '6/10' }
	];
</script>

<div class="history">
	<h2>📚 Quiz History</h2>
	<ul>
		{#each history as item}
			<li>{item.category}: {item.score}</li>
		{/each}
	</ul>
</div>

<style>
	.history {
		background: #efeffd;
		padding: 1rem;
		border-radius: 20px;
		margin-top: 1rem;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}
	.history ul {
		list-style: none;
		padding: 0;
	}
	.history li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #ddd;
	}
</style>
