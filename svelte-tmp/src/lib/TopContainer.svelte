<script lang="ts">
	let { children } = $props();
</script>

<div id="top-container">
	{@render children()}
</div>

<style>
	#top-container {
		padding: 0.5rem;
		width: 100%;
	}
</style>
