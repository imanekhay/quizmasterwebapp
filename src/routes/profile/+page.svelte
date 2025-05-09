<script>
	import Profile from '$lib/components/Profile.svelte';
	import { onMount } from 'svelte';

	let username = '';

	onMount(() => {
		username = localStorage.getItem('username') || '';
	});
</script>

<Profile {username} />
