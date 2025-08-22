<script lang="ts">
	let { kana = "@" } = $props();
</script>

<div>{kana}</div>

<style>
	div {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		max-height: 1.2lh;

		font-family: "IPAMincho", "TakaoMincho", "serif", serif;
		font-size: 16rem;

		color: var(--yellow);

		/* border: 2px solid blue; */
	}
</style>
