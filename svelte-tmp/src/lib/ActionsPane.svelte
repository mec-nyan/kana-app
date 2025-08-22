<script lang="ts">
	let { children } = $props();
</script>

<div id="actions-pane">
	{@render children()}
</div>

<style>
	#actions-pane {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		/* border: 1px solid crimson; */
	}
</style>
