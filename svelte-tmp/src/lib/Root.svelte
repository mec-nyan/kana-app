<script lang="ts">
	let { children } = $props();
</script>

<div>
	{@render children()}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		background: linear-gradient(
			to bottom,
			var(--base),
			var(--mantle)
		);

		height: 100dvh;
		width: 100dvw;
		/* padding: 2rem; */
		/* border: 4px solid lightblue; */
	}
</style>
