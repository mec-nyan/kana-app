<script lang="ts">
	import '../app.css';
	import { onMount } from "svelte";

	let term: HTMLDivElement;

	// Initial content.
	let {
		term_content = [
			"Welcome to kana-app! ",
			"",
			"I'll help you learn hiragana and katakana!",
			"",
			"Are you ready?",
		],
	} = $props();

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// Animated typing effect.
	async function write(content: Array<string>) {
		let output = "";
		for (const line of content) {
			for (let i = 0; i < line.length; ++i) {
				output += line[i];
				if (i + 1 < line.length) {
					term.innerHTML = `<p>${output}_</p>`;
				} else {
					term.innerHTML = `<p>${output}<span class="blink">_<span></p>`;
				}
				await sleep(35);
			}
			if (line !== "") {
				await sleep(600);
			}
			output += "</br>";
		}
	}

	onMount(() => {
		write(term_content);
	});
</script>

<div id="top-container">
	<div id="term" bind:this={term}></div>
</div>

<style>
	@font-face {
		font-family: "HackNerdFontPropo";
		src: local("Hack Nerd Font Propo Regular");
	}

	#top-container {
		padding: 0.25rem;
		width: 100%;
	}

	#term {
		background: var(--crust);
		color: var(--overlay1);

		width: 100%;
		/* The "terminal" will fit five lines. */
		min-height: calc(1rem + 5lh);
		padding: 0.5rem;

		font-family: "HackNerdFontPropo", monospace;
		font-size: 0.7rem;
	}

	:global(.blink) {
		animation: blink-animation 1s steps(1, start) infinite;
	}

	@keyframes blink-animation {
		0% {
			visibility: visible;
		}
		50% {
			visibility: hidden;
		}
		100% {
			visibility: visible;
		}
	}
</style>
