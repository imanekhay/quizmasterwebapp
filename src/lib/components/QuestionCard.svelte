<script lang="ts">
	export let question;
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let allAnswers = [...question.incorrect_answers, question.correct_answer].sort();

	function choose(answer: string) {
		dispatch('answer', answer);
	}
</script>

<div class="question-card">
	<h3>{@html question.question}</h3>
	<ul>
		{#each allAnswers as ans}
			<li>
				<button type="button" on:click={() => choose(ans)}>{@html ans}</button>
			</li>
		{/each}
	</ul>
</div>
