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
const round_items = 3

const user_score = document.createElement("div")
user_score.id = "score"
user_score.className = "info"

user_score.innerHTML = `<span>Score: <span class='score'>${score}</span></span>`

top_info.appendChild(user_score)

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
			{ romaji: "wi", hiragana: "ゐ" },
			{ romaji: "n", hiragana: "ん" },
			{ romaji: "we", hiragana: "ゑ" },
			{ romaji: "wo", hiragana: "を" },
		]
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
	let row_index = Math.floor(score / round_items) + 7
	let block = kana_map[row_index % kana_map.length]
	let row = [...block.kanas]
	let current_kana = randomKana(row, last_kana)
	kana.textContent = current_kana.hiragana

	if (block.name === "ya") {
		let filler = { romaji: "", hiragana: "", ignore: true }
		row = [row[0], filler, row[1], filler, row[2]]
	}

	romaji_bar.innerHTML = ""
	row.forEach(k => {
		let btn = document.createElement("div")
		btn.className = "romaji-button"
		btn.innerText = k.romaji
		if (k.ignore) {
			btn.classList.add("ignored")
		} else {
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
		}
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
