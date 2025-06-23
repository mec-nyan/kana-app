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

let score = 0

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

let last_kana = 0

const randomKana = (row, last) => {
	while (true) {
		const i = Math.floor(Math.random() * row.length)
		if (i !== last) {
			last_kana = i
			return row[i]
		}
	}
}

const nextQuest = () => {
	let row = kana_map[0].kanas
	let current_kana = randomKana(row, last_kana)
	kana.textContent = current_kana.hiragana

	romaji_bar.innerHTML = ""
	row.forEach(k => {
		let btn = document.createElement("div")
		btn.className = "romaji-button"
		btn.innerText = k.romaji
		btn.addEventListener("click", () => handleClick(k.romaji, current_kana))
		btn.addEventListener('touchstart', () => {
			btn.classList.add('touched')
		})

		btn.addEventListener('touchend', () => {
			btn.classList.remove('touched')
		})

		btn.addEventListener('touchcancel', () => {
			btn.classList.remove('touched')
		})
		romaji_bar.appendChild(btn)
	})
}

const handleClick = (rmj, current) => {
	const right = rmj === current.romaji
	if (right) {
		score++
		user_score.innerHTML = `<span>Score: <span class='score'>${score}</span></span>`
	}
	nextQuest()
}

nextQuest()
// Footer.
const footer = document.createElement("div")
footer.id = "footer"
const footer_content = document.createElement("span")
footer_content.classList.add("love")
footer_content.innerText = "Made with 💖 by Nano"

footer.appendChild(footer_content)

root.appendChild(top_info)
root.appendChild(kana)
root.appendChild(romaji_bar)
root.appendChild(footer)

// Feedback for touched buttons.
document.querySelectorAll('.romaji-button').forEach(btn => {
	btn.addEventListener('touchstart', () => {
		btn.classList.add('touched')
	})

	btn.addEventListener('touchend', () => {
		btn.classList.remove('touched')
	})

	btn.addEventListener('touchcancel', () => {
		btn.classList.remove('touched')
	})
})
