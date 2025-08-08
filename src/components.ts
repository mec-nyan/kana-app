import { kanaMap } from "./kana/kanas";
import { playKana } from "./utils/sound";
import { DevInfoOverlay } from "./components/devinfo/developer-info";
import { footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { Actions } from "./components/actions/actions";

const header = new Header();


// Show window size in development mode.
const info = new DevInfoOverlay();

// These components should be splitted in separated files,
// maybe.

// We'll have a header, a content-div and a footer.
// The center pane will contain actions (home) and kana/buttons (game).
const center_pane = document.createElement("div");
center_pane.id = "center-pane";


// Container for term-ish info pane.
const top_container = document.createElement("div");
top_container.id = "top-container";

const term = document.createElement("div");
term.id = "term";

// Initial content.
let term_content = [
	"Welcome to kana-app!",
	"",
	"I'll help you learn hiragana and katakana!",
	"",
	"Are you ready?",
];

const actions = new Actions(game_on);
const actionsPane = actions.getElement();
// Game screen.
//
// At the top, we'll place a div with general info.
// Use small letters, like a hw monitor, etc.
const top_info = document.createElement("div");
top_info.id = "top-info";

// Show current mode i.e. "hiragana"/"katakana".
const mode = document.createElement("div");
mode.id = "mode";
mode.className = "info";
mode.innerHTML = `<span>Mode: <span class="info-highlighted">ひらがな</span> (hiragana)</span>`;


// Show info on current drill (number of kanas, kanas left).
const drill_info = document.createElement("div");
drill_info.id = "drill-info";
drill_info.className = "info";


// Display progress on current drill.
const progress = document.createElement("div");
progress.id = "progress";

let percentage = 0;

const progress_tag = document.createElement("div");
progress_tag.className = "info";
progress_tag.innerHTML = `<span>Progress:&nbsp;<span class='info-highlighted'>${percentage}%</span></span>`;

const barContainer = document.createElement("div");
barContainer.id = "bar-container";

const bar = document.createElement("div");
bar.id = "bar";

const bar_inner = document.createElement("div");
bar_inner.id = "inner";
bar_inner.style.width = "100%";

bar.appendChild(bar_inner);
barContainer.appendChild(bar);

progress.appendChild(progress_tag);
progress.appendChild(barContainer);

// We'll use these for our score system.
let kana_count = 0;
let total_score = 0;
let round_score = 0;
let num_hits = 0;
let num_tries = 0
let hinted = false;

const score_display = document.createElement("div");
score_display.id = "score";
score_display.className = "info";
score_display.innerHTML = `<span>Score: <span class='info-highlighted'>${total_score}</span></span>`;


// Compose the info pane:
top_info.appendChild(mode);
top_info.appendChild(drill_info);
top_info.appendChild(progress);
top_info.appendChild(score_display);

// Display a tip.
const tip = document.createElement("div");
tip.id = "tip";
tip.innerHTML = "<em>Tip: touch the hiragana to listen again.</em>"


// At the center, we'll show the kana in a big font.
const kana = document.createElement("div");
kana.id = "kana";

// A simple separator to make it all look nice.
const separator = document.createElement("div");
separator.id = "separator";

// At the bottom, we'll place five "buttons" with the romaji that
// correspond to the row of that kana.
// I.e. if the kana is "か" the row will contain "ka", "ki", "ku", "ke", "ko".
const romaji_bar = document.createElement("div");
romaji_bar.id = "romaji-bar";

// "game" will be the current drill.
let game = {
	rows: [],
};

// We need to know how many kanas are in the current drill.
function count_kanas(game) {
	let count = 0;
	game.rows.forEach(row => {
		count += row.kanas.length;
	});
	return count;
}

// Populate the kanas for this drill.
// In "dev" mode, use less rows to play a quick round.
function make_game(dev = false) {
	let game_map = [...kanaMap];
	if (dev) {
		// Try out sound, let's just use the first five kanas.
		game_map = [kanaMap[0]];
	}
	game_map.forEach(row => {
		let game_row = {
			name: row.name,
			played: false,
			kanas: [],
		};
		row.kanas.forEach(kana => {
			let game_kana = {
				romaji: kana.romaji,
				hiragana: kana.hiragana,
				start: kana.start,
				duration: kana.duration,
				shown: false,
			};
			game_row.kanas = [...game_row.kanas, game_kana];
		})
		game.rows = [...game.rows, game_row];
	})
}

// Check if we've seen each kana in this drill.
function game_played() {
	for (const row of game.rows) {
		if (!row.played) {
			return false;
		}
	}
	return true;
}

// Find out the next kana in the drill.
function next() {
	if (game_played()) {
		// TODO: maybe return somethin more meaningful.
		return [-1, -1];
	}

	// Let's try to find a random row and column.
	// This default value is just a placeholder.
	let row = 0;
	let col = 0;

	// Find a row that still has kanas to display.
	while (true) {
		row = Math.floor(Math.random() * (game.rows.length));
		if (!game.rows[row].played) {
			break;
		}
	}

	// Find a col that hasn't been displayed.
	let row_ref = game.rows[row].kanas;

	while (true) {
		col = Math.floor(Math.random() * (row_ref.length));
		if (!row_ref[col].shown) {
			break;
		}
	}

	// Set this kana to "played" or "seen".
	game.rows[row].kanas[col].shown = true;

	// Check if we've seen all the kanas in this particuar row.
	let row_played = true;

	game.rows[row].kanas.forEach(kana => {
		if (!kana.shown) {
			row_played = false;
			return;
		}
	})

	game.rows[row].played = row_played;

	return [row, col];
}

function makeHandler({ rmj, start, duration }) {
	return function() {
		hint_me(rmj)
		playKana({ start: start, duration: duration });
	}
}

let soundHandler = () => { };

// Show the next screen in the drill.
// Set congrats message if we've completed this round.
// (Maybe that should be somewhere else...)
function next_quest() {
	let [nrow, ncol] = next();
	if (nrow == -1) {
		term_content = [
			"Congratulations!",
			"You've completed this round.",
			"",
			`Score: ${round_score}`,
			`Accuracy: ${Math.floor(100 / num_tries * num_hits)}%`,
		];
		total_score += round_score;
		round_score = 0;
		num_hits = 0;
		num_tries = 0;
		percentage = 0;
		return false;
	}

	// We need to find the "block" to be able to tell if we've got five kanas or just three.
	let block = game.rows[nrow];

	// The row will be displayed as options to select.
	let row = block.kanas;

	// This is the kana we need to guess correctly:
	let current_kana = row[ncol];
	kana.textContent = current_kana.hiragana;

	// First, remove the previous handler.
	kana.removeEventListener("click", soundHandler);
	soundHandler = makeHandler({
		rmj: current_kana.romaji,
		start: current_kana.start,
		duration: current_kana.duration,
	});
	// Show a hint. We'll replace this with audio soon.
	kana.addEventListener("click", soundHandler);

	// If we are in the "ya" block, use some fillers because this row only has three kanas.
	if (block.name === "ya") {
		let filler = { romaji: "", hiragana: "", ignore: true };
		row = [row[0], filler, row[1], filler, row[2]];
	}

	// Clear buttons from the last played row and add the corresponding to the current row.
	romaji_bar.innerHTML = "";
	row.forEach(k => {
		let btn = document.createElement("div");

		btn.classList.add("romaji-button");
		btn.classList.add("no-select");
		btn.addEventListener("contextmenu", (e) => e.preventDefault());
		btn.addEventListener("click", (e) => e.preventDefault());

		btn.innerText = k.romaji;

		// Ignore the "fillers".
		if (k.ignore) {
			btn.classList.add("ignored");
		} else {
			btn.addEventListener("click", () => handleClick(k.romaji, current_kana));
			btn.addEventListener('touchstart', () => {
				btn.classList.add('touched');
			});

			btn.addEventListener('touchend', () => {
				btn.classList.remove('touched');
			});

			btn.addEventListener('touchcancel', () => {
				btn.classList.remove('touched');
			});
		}
		romaji_bar.appendChild(btn);
	})

	playKana({ start: current_kana.start, duration: current_kana.duration });
	return true;
}

// Print a hint (we'll replace this with audio).
function hint_me(rmj) {
	// No points if you asked for a hint haha.
	if (rmj !== "") {
		hinted = true;
	}
}

//
function handleClick(rmj, current) {
	// console.log(`handleClick: ${rmj}`);
	// This to know your accuracy.
	num_tries++;

	// Did you get it right?
	const right = rmj === current.romaji;

	if (right) {
		// console.log(`... right: ${current.hiragana}`);
		// We're moving to the next kana, so...
		if (!hinted) {
			round_score++;
			// console.log(`... not hinted! (score: ${round_score})`);
		} else {
			hinted = false;
			// console.log(`... hinted! (score: ${round_score}`);
		}

		num_hits++;

		drill_info.innerHTML = `<span>Kanas on this drill: <span class="info-highlighted">${kana_count}</span> - \(${kana_count - num_hits} lerf\)</span>`;

		percentage = Math.min(Math.floor(100 / kana_count * num_hits), 100);

		progress_tag.innerHTML = `<span>Progress:&nbsp;<span class='info-highlighted'>${percentage}%</span></span>`;

		bar_inner.style.width = `${100 - percentage}%`;

		// Clear the hint.
		hint_me("");

		// If we've reached the last kana of this drill, return to home.
		if (!next_quest()) {
			// Wait a little bit so the user can see she finished this drill.
			setTimeout(() => {
				homeScreen(root);
			}, 1000);
		}
	} else {
		// Missed. You loose one point.
		round_score--;
	}
	// Refresh the score.
	score_display.innerHTML = `<span>Score: <span class='info-highlighted'>${total_score + round_score}</span></span>`;
}

// Go home.
function goHome() {
	homeScreen(root);
}

// Let's start a new drill!
function game_on(dev = false) {
	info.devInfo.classList.add("in-game");

	// Clear containers.
	root.innerHTML = "";
	top_container.innerHTML = "";
	center_pane.innerHTML = "";

	top_container.appendChild(top_info);
	top_container.appendChild(tip);

	header.setTitle("Let's Go!");
	header.setMenuIcon("");
	header.setMenuAction(goHome);

	center_pane.appendChild(top_container);
	center_pane.appendChild(kana);
	center_pane.appendChild(separator);
	center_pane.appendChild(romaji_bar);
	center_pane.appendChild(info.devInfoBtn);

	root?.appendChild(info.devInfo);

	root?.appendChild(header.getElement());
	root.appendChild(center_pane);
	root.appendChild(footer);

	make_game(dev);
	kana_count = count_kanas(game);
	drill_info.innerHTML = `<span>Kanas on this drill: <span class="info-highlighted">${kana_count}</span> - \(${kana_count} lerf\)</span>`;
	next_quest();
	return;
}


// Animated typing effect.
async function write(content) {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	let output = "";
	for (const line of content) {
		for (let i = 0; i < line.length; ++i) {
			output += line[i];
			if (i + 1 < line.length) {
				term.innerHTML = `<p>${output}_</p>`
			} else {
				term.innerHTML = `<p>${output}<span class="blink">_<span></p>`
			}
			await sleep(50);
		}
		if (line !== "") {
			await sleep(600);
		}
		output += "</br>";
	}
}

// Paint the home/start screen.
export function homeScreen(root: HTMLElement) {
	info.devInfo.classList.remove("in-game");

	root.innerHTML = "";
	center_pane.innerHTML = "";
	top_container.innerHTML = "";

	header.setTitle("Kana App!");
	header.setMenuIcon("󰍜");
	header.clearMenuAction();

	// At the home screen, this container is at the bottom.
	// TODO: rename it.
	top_container.appendChild(term);

	center_pane.appendChild(actionsPane);
	center_pane.appendChild(top_container);
	center_pane.appendChild(info.devInfoBtn);

	// DevInfo is an overlay.
	root.appendChild(info.devInfo);

	root.appendChild(header.getElement());
	root.appendChild(center_pane);
	root.appendChild(footer);

	write(term_content);
}
