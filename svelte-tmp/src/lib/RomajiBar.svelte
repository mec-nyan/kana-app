<script lang="ts">
	let { buttons } = $props();

	interface kana {
		romaji: string
		hiragana: string
	};

	let handleClick = (e: Event, btn: kana) => {
		e.preventDefault();
		console.log(btn.romaji);
	};
</script>

<div class="bar">
	{#each buttons as btn}
		<!-- TODO: Check for ignored buttons. -->
		<button
			class="romaji-button no-select"
			oncontextmenu={(e: Event) => e.preventDefault()}
			onclick={(e: Event) => handleClick(e, btn)}
		>
			{btn.romaji}
		</button>
	{/each}
</div>

<style>
	.bar {
		/* border: 2px solid yellow; */

		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.8rem;
		padding: 2rem;
	}

	.romaji-button {
		/* border: 1px solid green; */

		background: hsl(182, 30%, 70%);
		color: hsl(243, 20%, 15%);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.25rem;
		border: none;
		outline: none;
		border-radius: 50%;
		aspect-ratio: 1 / 1;
		width: 100%;
		cursor: pointer;
		transition: all 0.15s ease-in;
	}

	.romaji-button.touched {
		background: hsl(182, 30%, 80%);
		transform: scale(1.25);
	}

	.romaji-button.ignored {
		background: hsl(182, 10%, 24%);
	}
</style>
