// We'll be manipulating this div.
const root = document.getElementById("root")

// At the top, we'll place a div with general info.
// Use small letters, like a hw monitor, etc.
const top_info = document.createElement("div")
top_info.id = "top-info"

const mode = document.createElement("div")
mode.id = "mode"
mode.className = "info"
mode.innerHTML = `<span>Mode: ひらがな (hiragana)</span>`

top_info.appendChild(mode)

const other_stuff = document.createElement("div")
other_stuff.id = "other_stuff"
other_stuff.className = "info"
other_stuff.innerHTML = `<span>I may place some stats here.</span>`

top_info.appendChild(other_stuff)

const progress = document.createElement("div")
progress.id = "progress"

const progress_tag = document.createElement("div")
progress_tag.className = "info"
progress_tag.innerHTML = "<span>Progress:&nbsp;<span class='perc'>18%</span></span>"

const bar = document.createElement("div")
bar.id = "bar"
const bar_inner = document.createElement("div")
bar_inner.id = "inner"

bar.appendChild(bar_inner)

progress.appendChild(progress_tag)
progress.appendChild(bar)

top_info.appendChild(progress)

const score = 1000

const user_score = document.createElement("div")
user_score.id = "score"
user_score.className = "info"

user_score.innerHTML = `<span>Score: <span class='score'>${score}</span></span>`

top_info.appendChild(user_score)

const kana_map = [
	{
		name: "hg_a",
		kanas: [
			{ romaji: "a", hiragana: "あ" },
			{ romaji: "i", hiragana: "い" },
			{ romaji: "u", hiragana: "う" },
			{ romaji: "e", hiragana: "え" },
			{ romaji: "o", hiragana: "お" },
		],
	}
]

// At the center, we'll show the kana in a big font.
const kana = document.createElement("div")
kana.id = "kana"
kana.innerText = kana_map[0].kanas[3].hiragana

// At the bottom, we'll place five "buttons" with the romaji that
// correspond to the row of that kana.
// I.e. if the kana is "か" the row will contain "ka", "ki", "ku", "ke", "ko".
const romaji_bar = document.createElement("div")
romaji_bar.id = "romaji-bar"

const romaji = ["a", "i", "u", "e", "o"]
for (let i = 0; i < romaji.length; i++) {
	let btn = document.createElement("div")
	btn.className = "romaji-button"
	btn.innerText = romaji[i]
	romaji_bar.appendChild(btn)
}

root.appendChild(top_info)
root.appendChild(kana)
root.appendChild(romaji_bar)
