<script lang="ts">
	import { kana_map } from "./kanas";
	// Components
	import Root from "$lib/Root.svelte";
	import TopContainer from "$lib/TopContainer.svelte";
	import TopInfo from "$lib/TopInfo.svelte";
	import Footer from "$lib/Footer.svelte";
	import MainPane from "$lib/MainPane.svelte";
	import Kana from "$lib/Kana.svelte";
	import Separator from "$lib/Separator.svelte";
	import RomajiBar from "$lib/RomajiBar.svelte";

	import { onMount } from "svelte";

	let width: number;
	let height: number;

	let updateSize = () => {
		width = window.innerWidth;
		height = window.innerHeight;
	};

	onMount(() => {
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	});

	let currentRow = kana_map[0].kanas;
</script>

<Root>
	<TopContainer>
		<TopInfo />
	</TopContainer>

	<MainPane {width} {height}>
		<Kana kana={currentRow[0].hiragana} />
		<Separator />
		<RomajiBar buttons={currentRow} />
	</MainPane>
	<Footer />
</Root>

<style>
</style>
