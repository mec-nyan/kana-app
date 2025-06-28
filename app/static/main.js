// We'll be manipulating this div.
const root = document.getElementById("root");

const top_container = document.createElement("div");
top_container.id = "top-container";

const term = document.createElement("div");
term.id = "term";

let term_content = [
	"Welcome to kana-app!",
	"",
	"I'll help you learn hiragana and katakana!",
	"",
	"Are you ready?",
];


// Temproral "start" screen.
const option_buttons = document.createElement("div");
option_buttons.id = "option-buttons";

const options = [
	{ icon: " ", name: "config" },
	{ icon: " ", name: "dev" },
	{ icon: " ", name: "..." },
	{ icon: " ", name: "..." },
];

options.forEach(opt => {
	const btn = document.createElement("div");
	btn.classList.add("opt");
	btn.addEventListener("click", () => game_on(true));
	btn.innerHTML = `<span class="nerd-icon">${opt.icon}</span>`;
	option_buttons.appendChild(btn);
})


const start = document.createElement("div");
start.id = "start"
const start_button = document.createElement("div");
start_button.id = "start-button";
start_button.innerHTML = "Start";
start.appendChild(option_buttons);
start.appendChild(start_button);
start_button.addEventListener("click", () => game_on(false));

// At the top, we'll place a div with general info.
// Use small letters, like a hw monitor, etc.
const top_info = document.createElement("div");
top_info.id = "top-info";

const mode = document.createElement("div");
mode.id = "mode";
mode.className = "info";
mode.innerHTML = `<span>Mode: <span class="info-highlighted">ひらがな</span> (hiragana)</span>`;

top_info.appendChild(mode);

const other_stuff = document.createElement("div");
other_stuff.id = "other_stuff";
other_stuff.className = "info";

top_info.appendChild(other_stuff);

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
bar_inner.style.width = 0;

bar.appendChild(bar_inner);

progress.appendChild(progress_tag);
progress.appendChild(bar);

top_info.appendChild(progress);

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

top_info.appendChild(score_display);

const hint_display = document.createElement("div");
hint_display.id = "hint";
hint_display.classList.add("info");

hint_display.innerHTML = `<span>Hint:</span>`

top_info.appendChild(hint_display)

const kana_map = [
	{
		name: "a",
		kanas: [
			{ romaji: "a", hiragana: "あ" },
			{ romaji: "i", hiragana: "い" },
			{ romaji: "u", hiragana: "う" },
			{ romaji: "e", hiragana: "え" },
			{ romaji: "o", hiragana: "お" },
		],
	},
	{
		name: "ka",
		kanas: [
			{ romaji: "ka", hiragana: "か" },
			{ romaji: "ki", hiragana: "き" },
			{ romaji: "ku", hiragana: "く" },
			{ romaji: "ke", hiragana: "け" },
			{ romaji: "ko", hiragana: "こ" },
		]
	},
	{
		name: "sa",
		kanas: [
			{ romaji: "sa", hiragana: "さ" },
			{ romaji: "shi", hiragana: "し" },
			{ romaji: "su", hiragana: "す" },
			{ romaji: "se", hiragana: "せ" },
			{ romaji: "so", hiragana: "そ" },
		]
	},
	{
		name: "ta",
		kanas: [
			{ romaji: "ta", hiragana: "た" },
			{ romaji: "chi", hiragana: "ち" },
			{ romaji: "tsu", hiragana: "つ" },
			{ romaji: "te", hiragana: "て" },
			{ romaji: "to", hiragana: "と" },
		]
	},
	{
		name: "na",
		kanas: [
			{ romaji: "na", hiragana: "な" },
			{ romaji: "ni", hiragana: "に" },
			{ romaji: "nu", hiragana: "ぬ" },
			{ romaji: "ne", hiragana: "ね" },
			{ romaji: "no", hiragana: "の" },
		]
	},
	{
		name: "ha",
		kanas: [
			{ romaji: "ha", hiragana: "は" },
			{ romaji: "hi", hiragana: "ひ" },
			{ romaji: "fu", hiragana: "ふ" },
			{ romaji: "he", hiragana: "へ" },
			{ romaji: "ho", hiragana: "ほ" },
		]
	},
	{
		name: "ma",
		kanas: [
			{ romaji: "ma", hiragana: "ま" },
			{ romaji: "mi", hiragana: "み" },
			{ romaji: "mu", hiragana: "む" },
			{ romaji: "me", hiragana: "め" },
			{ romaji: "mo", hiragana: "も" },
		]
	},
	{
		name: "ya",
		kanas: [
			{ romaji: "ya", hiragana: "や" },
			{ romaji: "yu", hiragana: "ゆ" },
			{ romaji: "yo", hiragana: "よ" },
		]
	},
	{
		name: "ra",
		kanas: [
			{ romaji: "ra", hiragana: "ら" },
			{ romaji: "ri", hiragana: "り" },
			{ romaji: "ru", hiragana: "る" },
			{ romaji: "re", hiragana: "れ" },
			{ romaji: "ro", hiragana: "ろ" },
		]
	},
	{
		name: "wa",
		kanas: [
			{ romaji: "wa", hiragana: "わ" },
			{ romaji: "_i", hiragana: "ゐ" },
			{ romaji: "n", hiragana: "ん" },
			{ romaji: "_e", hiragana: "ゑ" },
			{ romaji: "wo", hiragana: "を" },
		]
	},
];


// At the center, we'll show the kana in a big font.
const kana = document.createElement("div");
kana.id = "kana";

const separator = document.createElement("div");
separator.id = "separator";

// At the bottom, we'll place five "buttons" with the romaji that
// correspond to the row of that kana.
// I.e. if the kana is "か" the row will contain "ka", "ki", "ku", "ke", "ko".
const romaji_bar = document.createElement("div");
romaji_bar.id = "romaji-bar";

let game = {
	rows: [],
};

function count_kanas(game) {
	let count = 0;
	game.rows.forEach(row => {
		count += row.kanas.length;
	});
	return count;
}

const make_game = (dev = false) => {
	let game_map = [...kana_map];
	if (dev) {
		game_map = [kana_map[0], kana_map[1]];
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
				shown: false,
			};
			game_row.kanas = [...game_row.kanas, game_kana];
		})
		game.rows = [...game.rows, game_row];
	})
}


const game_played = () => {
	for (const row of game.rows) {
		if (!row.played) {
			return false;
		}
	}
	return true;
}

const next = () => {
	if (game_played()) {
		return [-1, -1];
	}
	let row = 0;
	let col = 0;
	// Find a row.
	while (true) {
		row = Math.floor(Math.random() * (game.rows.length));
		if (!game.rows[row].played) {
			break;
		}
	}
	let row_arr = game.rows[row].kanas;
	// Find a col.
	while (true) {
		col = Math.floor(Math.random() * (row_arr.length));
		if (!row_arr[col].shown) {
			break;
		}
	}

	game.rows[row].kanas[col].shown = true;
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

const nextQuest = () => {
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
	let block = game.rows[nrow];
	let row = block.kanas;
	let current_kana = row[ncol];

	kana.textContent = current_kana.hiragana;
	kana.addEventListener("click", () => hint_me(current_kana.romaji));

	if (block.name === "ya") {
		let filler = { romaji: "", hiragana: "", ignore: true };
		row = [row[0], filler, row[1], filler, row[2]];
	}

	romaji_bar.innerHTML = "";
	row.forEach(k => {
		let btn = document.createElement("div");
		btn.classList.add("romaji-button");
		btn.classList.add("no-select");
		btn.addEventListener("contextmenu", (e) => e.preventDefault());
		btn.addEventListener("click", (e) => e.preventDefault());
		btn.innerText = k.romaji;
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
	return true;
}

const hint_me = (rmj) => {
	hinted = true;
	hint_display.innerHTML = `<span>Hint: <span class="info-highlighted">${rmj}</span></span>`;
}

const handleClick = (rmj, current) => {
	num_tries++;
	const right = rmj === current.romaji;
	if (right) {
		if (!hinted) {
			round_score++;
		} else {
			hinted = false;
		}
		num_hits++;
		other_stuff.innerHTML = `<span>Kanas on this drill: <span class="info-highlighted">${kana_count}</span> - \(${kana_count - num_hits} lerf\)</span>`;
		score_display.innerHTML = `<span>Score: <span class='info-highlighted'>${total_score + round_score}</span></span>`;
		percentage = Math.min(Math.floor(100 / kana_count * num_hits), 100);
		progress_tag.innerHTML = `<span>Progress:&nbsp;<span class='info-highlighted'>${percentage}%</span></span>`;
		bar_inner.style.width = `${percentage}%`;
		hint_me("");
		if (!nextQuest()) {
			lets_do_it();
		}
	} else {
		round_score--;
		score_display.innerHTML = `<span>Score: <span class='score'>${total_score + round_score}</span></span>`;
	}
}

// Footer.
const footer = document.createElement("div");
footer.id = "footer";
const footer_content = document.createElement("span");
footer_content.classList.add("love");
// TODO: Add neovim's logo!
footer_content.innerHTML = "Made in <span class='green'>neo<b>vim</b></span> with 💖 by Nano";

footer.appendChild(footer_content);

const game_on = (dev = false) => {
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
	other_stuff.innerHTML = `<span>Kanas on this drill: <span class="info-highlighted">${kana_count}</span> - \(${kana_count} lerf\)</span>`;
	console.log(`kana count: ${kana_count}`);
	nextQuest();
	return;
}

const lets_do_it = () => {
	console.log("let's do it!");
	root.innerHTML = "";
	top_container.innerHTML = "";
	top_container.appendChild(term);
	write(term_content);
	root.appendChild(top_container);
	root.appendChild(start);
	root.appendChild(footer);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const write = async (content) => {
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

// TODO: Congrats! Confetti!
lets_do_it();
