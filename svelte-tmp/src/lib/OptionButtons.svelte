<script lang="ts">
	const options = [
		{ icon: " ", name: "options", path: "/options" },
		{ icon: "󰋖 ", name: "...", path: "/help" },
		{ icon: " ", name: "...", path: "" },
		{ icon: " ", name: "dev", path: "/developer" },
	];
</script>

<div id="option-buttons">
	{#each options as { icon, name, path }}
		<div class="opt">
			<a href={path} class="nerd-icon {name}">{icon}</a>
		</div>
	{/each}
</div>

<style>
	@font-face {
		font-family: "HackNerdFontPropo";
		src: local("Hack Nerd Font Propo Regular");
	}

	#option-buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, auto);
		gap: 1rem;

		width: 60%;
		margin-bottom: 1rem;

		/* border: 1px solid lightblue; */
	}

	.opt {
		display: flex;

		width: 100%;
		aspect-ratio: 1/1;
		/* border: 1px solid yellowgreen; */
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;

		background: linear-gradient(to bottom, var(--mantle), var(--crust));
		color: var(--lavender);
		text-shadow: 0px 0px 6px var(--lavender), 0px 0px 12px var(--lavender);

		height: 100%;
		width: 100%;

		font-size: 3rem;
		font-family: "HackNerdFontPropo";
		text-decoration: none;

		border-radius: 8px;
		border: 1px solid var(--crust);

		cursor: pointer;
		/* border: 1px solid orange; */
	}
</style>
