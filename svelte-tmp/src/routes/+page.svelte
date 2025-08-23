<script lang="ts">
	import Root from '$lib/Root.svelte';
	import TopContainer from '$lib/TopContainer.svelte';
	import Termscreen from '$lib/Termscreen.svelte';
	import MainPane from '$lib/MainPane.svelte';
	import ActionsPane from '$lib/ActionsPane.svelte';
	import OptionButtons from '$lib/OptionButtons.svelte';
	import Start from '$lib/Start.svelte';
	import Footer from '$lib/Footer.svelte';

	import { onMount } from 'svelte';
	import NavBar from '$lib/NavBar.svelte';

	let height = 0;
	let width = 0;

	onMount(() => {
		height = window.innerHeight;
		width = window.innerWidth;
	});
</script>

<Root>
	<NavBar  title="Kana App!"/>

	<MainPane {height} {width}>
		<ActionsPane>
			<OptionButtons />
			<Start />
		</ActionsPane>
	</MainPane>

	<TopContainer>
		<Termscreen />
	</TopContainer>

	<Footer />
</Root>

<style>
</style>
