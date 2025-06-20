const root = document.getElementById("root")

const title = document.createElement("div")
title.innerText = "Learn hiragana and katakana"
title.id = "title"

const kana = document.createElement("div")
kana.id = "kana"

kana.innerText = "あ"

const romaji_bar = document.createElement("div")
romaji_bar.id = "romaji-bar"

const romaji = ["a", "i", "u", "e", "o"]

for (let i = 0; i < romaji.length; i++) {
	let btn = document.createElement("div")
	btn.className = "romaji-button"
	btn.innerText = romaji[i]
	romaji_bar.appendChild(btn)
}


root.appendChild(title)

root.appendChild(kana)

root.appendChild(romaji_bar)
