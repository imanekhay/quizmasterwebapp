<script lang="ts">
	export let searchTerm: string;
	export let onInput;
</script>

<div class="search-bar">
	<img src="/searchicon.png" alt="Search Icon" width="20" height="20" />
	<input
		type="text"
		placeholder="Search for a quiz..."
		bind:value={searchTerm}
		on:input={onInput}
	/>
</div>

<style>
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
</style>
