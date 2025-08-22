<script lang="ts">
	let percentage = $state(0);
	let kana_count = $state(0);
	let total_score = $state(0);
	let round_score = $state(0);
	let num_hits = $state(0);
	let num_tries = $state(0);
	let hinted = $state(false);
</script>

<div id="top-info">
	<div class="info">
		<span
			>Mode: <span class="info-highlighted">ひらがな</span> (hiragana)</span
		>
	</div>
	<div class="drill-info"></div>
	<div id="progress">
		<div class="info">
			<span
				>Progress:&nbsp;<span class="info-highlighted"
					>{percentage}%</span
				></span
			>
		</div>
		<div id="bar">
			<div id="inner"></div>
		</div>
	</div>
	<div id="score-display" class="info">
		<span>Score: <span class="info-highlighted">{total_score}</span></span>
	</div>
	<div id="hint" class="info">
		<span>Hint:</span>
	</div>
</div>

<style>
	#top-info {
		/* border: 1px solid orange; */

		background: hsl(243, 10%, 10%);
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.25rem;
		border-radius: 5px;
	}

	#mode {
	}

	#progress {
		/* border: 2px solid orange; */
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	.info-highlighted {
		color: hsl(182, 30%, 50%);
	}

	#bar {
		background: linear-gradient(
			to right,
			hsl(262, 30%, 50%),
			hsl(222, 30%, 50%),
			hsl(182, 30%, 50%),
			hsl(142, 30%, 50%)
		);
		width: 100%;
		height: 0.2rem;
		/* border-radius: 0.2rem; */
		margin-left: 0.5rem;
		position: relative;
		bottom: 0.15rem;
		overflow: hidden;
		display: flex;
		justify-content: right;
	}

	#inner {
		height: 100%;
		background: hsl(243, 20%, 25%);
	}

	.info {
		font-size: 0.7rem;
		margin-bottom: 0.2rem;
		color: hsl(243, 20%, 50%);
	}
</style>
