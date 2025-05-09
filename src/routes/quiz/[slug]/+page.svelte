<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let slug = '';
	$: slug = $page.params.slug;

	const categoryMap: Record<string, number> = {
		math: 19,
		science: 17,
		music: 12,
		history: 23,
		film: 11,
		literature: 10,
		geography: 22,
		art: 25,
		technology: 18,
		sports: 21
	};

	let quizData: any[] = [];
	let selectedAnswers: (string | null)[] = [];
	let currentIndex = 0;
	let loading = true;
	let error = '';
	let quizFinished = false;
	let score = 0;

	function shuffle(array: string[]): string[] {
		return array.sort(() => Math.random() - 0.5);
	}

	function shuffledAnswers(index: number): string[] {
		const q = quizData[index];
		return shuffle([...q.incorrect_answers, q.correct_answer]);
	}

	function selectAnswer(answer: string) {
		selectedAnswers[currentIndex] = answer;
	}

	function nextQuestion() {
		if (currentIndex < quizData.length - 1) {
			currentIndex++;
		} else {
			calculateScore();
			quizFinished = true;
		}
	}

	function calculateScore() {
		score = quizData.reduce((acc, q, idx) => {
			return acc + (selectedAnswers[idx] === q.correct_answer ? 1 : 0);
		}, 0);
	}

	onMount(async () => {
		const categoryId = categoryMap[slug];

		if (!categoryId) {
			error = 'Invalid category';
			loading = false;
			return;
		}

		try {
			const res = await fetch(
				`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`
			);
			const data = await res.json();
			quizData = data.results;
			selectedAnswers = Array(quizData.length).fill(null);
		} catch (err) {
			error = 'Failed to load quiz.';
		} finally {
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Loading quiz...</p>
{:else if error}
	<p>{error}</p>
{:else if quizFinished}
	<div class="results">
		<h2>Quiz Finished!</h2>
		<p>Your Score: {score} / {quizData.length}</p>

		{#each quizData as question, index}
			<div class="result-card">
				<h3>Q{index + 1}: {@html question.question}</h3>
				<p>
					Your answer:
					<span
						class:selected={selectedAnswers[index] === question.correct_answer}
						class:wrong={selectedAnswers[index] !== question.correct_answer}
					>
						{@html selectedAnswers[index] ?? 'No answer'}
					</span>
				</p>
				{#if selectedAnswers[index] !== question.correct_answer}
					<p>
						Correct answer:
						<span class="correct">{@html question.correct_answer}</span>
					</p>
				{/if}
			</div>
		{/each}

		<a href="/dashboard" class="back-button">Back to Dashboard</a>
	</div>
{:else}
	<div class="question-card">
		<h2>Question {currentIndex + 1} / {quizData.length}</h2>
		<div class="question-text">
			{@html quizData[currentIndex].question}
		</div>
		<ul class="answers">
			{#each shuffledAnswers(currentIndex) as answer}
				<button
					type="button"
					class:selected={selectedAnswers[currentIndex] === answer}
					on:click={() => selectAnswer(answer)}
				>
					{@html answer}
				</button>
			{/each}
		</ul>
		<button on:click={nextQuestion} disabled={selectedAnswers[currentIndex] === null}>
			{currentIndex === quizData.length - 1 ? 'Finish' : 'Next'}
		</button>
	</div>
{/if}

<style lang="css">
	.question-card {
		background: #ffffff;
		padding: 2rem;
		border-radius: 24px;
		box-shadow: 0 10px 40px rgba(130, 34, 255, 0.1);
		max-width: 700px;
		margin: 2rem auto;
		text-align: center;
		animation: fadeIn 0.5s ease-in-out;
	}

	.question-text {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 1.5rem;
		color: #410095;
		line-height: 1.5;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding: 0;
		margin-bottom: 2rem;
	}

	.answers button {
		background: #efeffd;
		color: #410095;
		border: 2px solid #8322ff;
		border-radius: 20px;
		padding: 12px 24px;
		margin: 10px 0;
		font-size: 1rem;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.answers button:hover {
		background: #8322ff;
		color: #fff;
	}

	.answers button.selected {
		background: #8322ff;
		color: white;
		font-weight: bold;
		border-color: #410095;
	}
	button {
		background: #410095;
		color: white;
		padding: 12px 30px;
		border-radius: 30px;
		border: none;
		font-size: 16px;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	button:hover:not(:disabled) {
		background: #5d00c9;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.results {
		text-align: center;
		margin-top: 3rem;
		animation: fadeIn 0.5s ease-in-out;
	}

	.results h2 {
		font-size: 24px;
		color: #410095;
	}
	.result-card {
		background: #f8f6ff;
		padding: 1rem;
		margin: 1rem auto;
		border-left: 5px solid #8322ff;
		border-radius: 15px;
		max-width: 700px;
		box-shadow: 0 5px 15px rgba(130, 34, 255, 0.05);
		text-align: left;
	}

	.result-card h3 {
		margin-bottom: 0.5rem;
		color: #410095;
		font-size: 16px;
	}

	.result-card p {
		margin: 5px 0;
		font-size: 14px;
	}

	.result-card span {
		font-weight: 600;
		padding: 2px 6px;
		border-radius: 6px;
	}

	span.selected {
		background: #c6ffe2;
		color: #11693e;
	}

	span.wrong {
		background: #ffd6d6;
		color: #c10000;
	}

	span.correct {
		background: #dbe3ff;
		color: #0028a4;
	}

	.back-button {
		display: inline-block;
		margin-top: 2rem;
		background: #8322ff;
		color: white;
		padding: 10px 25px;
		border-radius: 25px;
		text-decoration: none;
		transition: transform 0.2s ease;
	}

	.back-button:hover {
		transform: scale(1.05);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
