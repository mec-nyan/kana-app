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
other_stuff.innerHTML = `<span>Other stuff will be here, i.e. a progress bar, score, etc. I still have yet to decide that. But I wanted to place a placeholder for now.`

top_info.appendChild(other_stuff)


// At the center, we'll show the kana in a big font.
const kana = document.createElement("div")
kana.id = "kana"
kana.innerText = "あ"

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
