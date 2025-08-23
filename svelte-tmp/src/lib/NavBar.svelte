<script lang="ts">
	let { title } = $props();
</script>

<div id="nav">
	<div id="menu">󰍜</div>
	<h3>{title}</h3>
	<label id="theme-sel" for=""></label>
</div>

<style lang="scss">
	#nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		height: 4rem;
		padding: 0 1rem;

		font-family: 'Hack Nerd Font';

		background: var(--mantle);
		border-bottom: 1px solid var(--surface0);

		/* border: 1px solid red; */
	}

	#nav h3 {
		font-size: 1rem;
		color: var(--blue);

		/* border: 1px solid blue; */
	}

	#menu,
	#theme-sel {
		aspect-ratio: 1/1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.6rem;
		color: var(--surface2);
		cursor: pointer;

		/* border: 1px solid green; */
	}
</style>
