// We'll be manipulating this div.
const root = document.getElementById("root");

let theme = "dark";
function toggleTheme() {
	if (theme === "dark") {
		theme = "light";
		themeSelector.innerText = "";
	} else {
		theme = "dark";
		themeSelector.innerText = "";
	}
}

const header = document.createElement("div");
header.id = "header";

const menu = document.createElement("div");
menu.id = "menu";
menu.innerText = "󰍜";

const h3 = document.createElement("h3");
h3.innerHTML = "Kana App!";

const themeSelector = document.createElement("div");
themeSelector.id = "theme-sel";
themeSelector.innerText = "";
themeSelector.addEventListener("click", () => {
	toggleTheme();
	// home_screen(root);
});

header.appendChild(menu);
header.appendChild(h3);
header.appendChild(themeSelector);

// TODO: Put this code in the appropriate place.
// >>> Start audio processing.
const audioCtx = new (window.AudioContext)();
let audioBuffer = null;

// Try the first five sounds.
const segments = {
	"a": [0, 0.5],
	"i": [0.5, 0.5],
	"u": [1, 0.5],
	"e": [1.5, 0.5],
	"o": [2, 0.5]
}

fetch("./sounds/jp_sounds.mp3")
	.then(resp => resp.arrayBuffer())
	.then(arrBuf => audioCtx.decodeAudioData(arrBuf))
	.then(data => {
		audioBuffer = data;
		console.log("Audio file has been loaded!");
	})
	.catch(e => console.error(`Error loading audio: ${e}`));

function playHint(romaji) {
	const [start, duration] = segments[romaji];
	playKana({ start: start, duration: duration });
}

function playKana({ start, duration }) {
	if (!audioBuffer) {
		console.error("Audio not loaded yet!");
		return;
	}

	const source = audioCtx.createBufferSource();
	source.buffer = audioBuffer;
	source.connect(audioCtx.destination);
	source.start(0, start, duration);
}
// <<< End audio processing.

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


// Option buttons (duh!).
const option_buttons = document.createElement("div");
option_buttons.id = "option-buttons";

const options = [
	{ icon: " ", name: "config" },
	{ icon: "󰋖 ", name: "..." },
	{ icon: " ", name: "..." },
	{ icon: " ", name: "dev" },
];

options.forEach(opt => {
	const btn = document.createElement("div");
	btn.classList.add("opt");
	btn.addEventListener("click", () => game_on(true));
	btn.innerHTML = `<span class="nerd-icon">${opt.icon}</span>`;
	option_buttons.appendChild(btn);
})


const actions_pane = document.createElement("div");
actions_pane.id = "actions"

const start_button = document.createElement("div");
start_button.id = "start-button";
start_button.innerHTML = "Start";

actions_pane.appendChild(option_buttons);
actions_pane.appendChild(start_button);
start_button.addEventListener("click", () => game_on(false));


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

const bar = document.createElement("div");
bar.id = "bar";
const bar_inner = document.createElement("div");
bar_inner.id = "inner";
bar_inner.style.width = "100%";

bar.appendChild(bar_inner);

progress.appendChild(progress_tag);
progress.appendChild(bar);


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


// Show a hint (we'll be playing the sound soon!).
const hint_display = document.createElement("div");
hint_display.id = "hint";
hint_display.classList.add("info");

hint_display.innerHTML = `<span>Hint:</span>`

// Compose the info pane:
top_info.appendChild(mode);
top_info.appendChild(drill_info);
top_info.appendChild(progress);
top_info.appendChild(score_display);
top_info.appendChild(hint_display)

const duration = 0.56;

// Hiragana chart.
const kana_map = [
	{
		name: "a",
		kanas: [
			{ romaji: "a", hiragana: "あ", start: 0.0, duration: duration },
			{ romaji: "i", hiragana: "い", start: 0.4, duration: duration },
			{ romaji: "u", hiragana: "う", start: 0.9, duration: duration },
			{ romaji: "e", hiragana: "え", start: 1.5, duration: duration },
			{ romaji: "o", hiragana: "お", start: 2.0, duration: duration },
		],
	},
	{
		name: "ka",
		kanas: [
			{ romaji: "ka", hiragana: "か", start: 2.6, duration: duration },
			{ romaji: "ki", hiragana: "き", start: 3.2, duration: duration },
			{ romaji: "ku", hiragana: "く", start: 3.8, duration: duration },
			{ romaji: "ke", hiragana: "け", start: 4.4, duration: duration },
			{ romaji: "ko", hiragana: "こ", start: 5.0, duration: duration },
		]
	},
	{
		name: "sa",
		kanas: [
			{ romaji: "sa", hiragana: "さ", start: 5.6, duration: duration },
			{ romaji: "shi", hiragana: "し", start: 6.0, duration: duration },
			{ romaji: "su", hiragana: "す", start: 6.7, duration: duration },
			{ romaji: "se", hiragana: "せ", start: 7.4, duration: duration },
			{ romaji: "so", hiragana: "そ", start: 8.0, duration: duration },
		]
	},
	{
		name: "ta",
		kanas: [
			{ romaji: "ta", hiragana: "た", start: 8.6, duration: duration },
			{ romaji: "chi", hiragana: "ち", start: 9.2, duration: duration },
			{ romaji: "tsu", hiragana: "つ", start: 9.8, duration: duration },
			{ romaji: "te", hiragana: "て", start: 10.4, duration: duration },
			{ romaji: "to", hiragana: "と", start: 11.0, duration: duration },
		]
	},
	{
		name: "na",
		kanas: [
			{ romaji: "na", hiragana: "な", start: 11.6, duration: duration },
			{ romaji: "ni", hiragana: "に", start: 12.1, duration: duration },
			{ romaji: "nu", hiragana: "ぬ", start: 12.8, duration: duration },
			{ romaji: "ne", hiragana: "ね", start: 13.4, duration: duration },
			{ romaji: "no", hiragana: "の", start: 14.0, duration: duration },
		]
	},
	{
		name: "ha",
		kanas: [
			{ romaji: "ha", hiragana: "は", start: 14.6, duration: duration },
			{ romaji: "hi", hiragana: "ひ", start: 15.2, duration: duration },
			{ romaji: "fu", hiragana: "ふ", start: 15.8, duration: duration },
			{ romaji: "he", hiragana: "へ", start: 16.5, duration: duration },
			{ romaji: "ho", hiragana: "ほ", start: 17.0, duration: duration },
		]
	},
	{
		name: "ma",
		kanas: [
			{ romaji: "ma", hiragana: "ま", start: 17.7, duration: duration },
			{ romaji: "mi", hiragana: "み", start: 18.3, duration: duration },
			{ romaji: "mu", hiragana: "む", start: 18.9, duration: duration },
			{ romaji: "me", hiragana: "め", start: 19.4, duration: duration },
			{ romaji: "mo", hiragana: "も", start: 20.0, duration: duration },
		]
	},
	{
		name: "ya",
		kanas: [
			{ romaji: "ya", hiragana: "や", start: 20.6, duration: duration },
			{ romaji: "yu", hiragana: "ゆ", start: 21.1, duration: duration },
			{ romaji: "yo", hiragana: "よ", start: 21.7, duration: duration },
		]
	},
	{
		name: "ra",
		kanas: [
			{ romaji: "ra", hiragana: "ら", start: 22.3, duration: duration },
			{ romaji: "ri", hiragana: "り", start: 23.0, duration: duration },
			{ romaji: "ru", hiragana: "る", start: 23.5, duration: duration },
			{ romaji: "re", hiragana: "れ", start: 24.1, duration: duration },
			{ romaji: "ro", hiragana: "ろ", start: 24.7, duration: duration },
		]
	},
	{
		name: "wa",
		kanas: [
			{ romaji: "wa", hiragana: "わ", start: 25.3, duration: duration },
			{ romaji: "i", hiragana: "ゐ", start: 0.4, duration: duration },
			{ romaji: "n", hiragana: "ん", start: 25.9, duration: duration },
			{ romaji: "e", hiragana: "ゑ", start: 1.5, duration: duration },
			{ romaji: "wo", hiragana: "を", start: 26.4, duration: duration },
		]
	},
];


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
	let game_map = [...kana_map];
	if (dev) {
		// Try out sound, let's just use the first five kanas.
		game_map = [kana_map[0]];
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

function makeHandler(rmj) {
	return function() {
		hint_me(rmj)

		const validSounds = ["a", "i", "u", "e", "o"];
		if (validSounds.includes(rmj)) {
			console.log(`"${rmj}" is here!`);
			playHint(rmj);
		}
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
	soundHandler = makeHandler(current_kana.romaji);
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
	hint_display.innerHTML = `<span>Hint: <span class="info-highlighted">${rmj}</span></span>`;
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
				home_screen(root);
			}, 1000);
		}
	} else {
		// Missed. You loose one point.
		round_score--;
	}
	// Refresh the score.
	score_display.innerHTML = `<span>Score: <span class='info-highlighted'>${total_score + round_score}</span></span>`;
}

// Footer.
const footer = document.createElement("div");
footer.id = "footer";

const footer_content = document.createElement("span");
footer_content.classList.add("love");

// TODO: Add neovim's logo!
footer_content.innerHTML = "Made in <span class='green'>neo<b>vim</b></span> with 💖 by Nano";

footer.appendChild(footer_content);

// Let's start a new drill!
function game_on(dev = false) {
	console.log("game on");
	root.innerHTML = "";
	top_container.innerHTML = "";
	top_container.appendChild(top_info);
	root.appendChild(top_container);
	root.appendChild(kana);
	root.appendChild(separator);
	root.appendChild(romaji_bar);
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
function home_screen(root) {
	root.innerHTML = "";
	top_container.innerHTML = "";
	top_container.appendChild(term);
	root.appendChild(header);
	root.appendChild(actions_pane);
	root.appendChild(top_container);
	root.appendChild(footer);
	write(term_content);
}

// Let's go!
(function main() {
	home_screen(root);
})()
