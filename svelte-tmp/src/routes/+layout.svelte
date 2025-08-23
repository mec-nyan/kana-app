<script lang="ts">
	import '../app.scss'

	let { children } = $props();
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
</div>
