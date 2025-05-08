<script>
	let searchTerm = '';

	let categories = [
		{ name: 'Math', path: 'math' },
		{ name: 'Science', path: 'science' },
		{ name: 'Music', path: 'music' },
		{ name: 'History', path: 'history' },
		{ name: 'Film', path: 'film' },
		{ name: 'Literature', path: 'literature' },
		{ name: 'Geography', path: 'geography' },
		{ name: 'Art', path: 'art' },
		{ name: 'Technology', path: 'technology' },
		{ name: 'Sports', path: 'sports' }
	];
</script>

<div class="dashboard">
	<!-- Search Bar -->
	<div class="search-bar">
		<img src="/searchicon.png" alt="Search Icon" width="20" height="20" />
		<input type="text" placeholder="Search for a quiz..." bind:value={searchTerm} />
	</div>

	<!-- Quiz Cards -->
	<div class="quiz-section">
		{#each categories.filter((c) => c.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase())) as category}
			<div class="quiz-card">
				<div class="quiz-header">
					<img src="/quizlogo.png" alt="Quiz Icon" width="50" height="50" />
					<div class="quiz-info">
						<h3>{category.name} Quiz</h3>
					</div>
				</div>

				<!-- Start button -->
				<a href={`/quiz/${category.path}`} class="start-button">Start</a>
			</div>
		{/each}
		{#if categories.filter((c) => c.name
				.toLowerCase()
				.includes(searchTerm.toLowerCase())).length === 0}
			<p style="text-align: center; margin-top: 1rem; color: #999;">No quizzes found.</p>
		{/if}
	</div>
</div>

<style lang="css">
	.dashboard {
		max-width: 1200px;
		margin: 20px auto;
		padding: 1rem;
		background: #ffffff;
		border-radius: 30px;
		overflow: hidden;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	@media (max-width: 600px) {
		.dashboard {
			width: 390px;
			height: 844px;
			padding: 0;
			background: #ffffff;
			border-radius: 30px;
			overflow: hidden;
			box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
			min-height: unset;
		}
	}

	.search-bar {
		margin: 20px;
		display: flex;
		align-items: center;
		background: #efeffd;
		border-radius: 50px;
		padding: 10px 20px;
	}

	.search-bar input {
		border: none;
		background: transparent;
		width: 100%;
		font-size: 14px;
		outline: none;
	}

	.quiz-section {
		padding: 0 20px;
		margin-top: 10px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.quiz-card {
		background: #efeffd;
		border-radius: 26px;
		padding: 20px;
		position: relative;
		box-shadow: 0 4px 10px rgba(130, 34, 255, 0.1);
		transition: transform 0.3s;
	}

	.quiz-card:hover {
		transform: translateY(-5px);
	}

	.quiz-header {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.quiz-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.quiz-info h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: #410095;
	}

	.start-button {
		background: #8322ff;
		color: white;
		padding: 10px 20px;
		border-radius: 25px;
		text-align: center;
		margin-top: 20px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s;
		display: inline-block;
		text-decoration: none;
		text-align: center;
	}

	.start-button:hover {
		transform: scale(1.05);
	}
</style>
