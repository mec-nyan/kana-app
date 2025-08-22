// Let's see how this works.

export interface kana {
	romaji: string;
	hiragana: string;
}

export interface kanaRow {
	name: string;
	kanas: kana[];
}

// Hiragana chart.
// This may go into a "module".
export const kana_map: kanaRow[] = [
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
		],
	},
	{
		name: "sa",
		kanas: [
			{ romaji: "sa", hiragana: "さ" },
			{ romaji: "shi", hiragana: "し" },
			{ romaji: "su", hiragana: "す" },
			{ romaji: "se", hiragana: "せ" },
			{ romaji: "so", hiragana: "そ" },
		],
	},
	{
		name: "ta",
		kanas: [
			{ romaji: "ta", hiragana: "た" },
			{ romaji: "chi", hiragana: "ち" },
			{ romaji: "tsu", hiragana: "つ" },
			{ romaji: "te", hiragana: "て" },
			{ romaji: "to", hiragana: "と" },
		],
	},
	{
		name: "na",
		kanas: [
			{ romaji: "na", hiragana: "な" },
			{ romaji: "ni", hiragana: "に" },
			{ romaji: "nu", hiragana: "ぬ" },
			{ romaji: "ne", hiragana: "ね" },
			{ romaji: "no", hiragana: "の" },
		],
	},
	{
		name: "ha",
		kanas: [
			{ romaji: "ha", hiragana: "は" },
			{ romaji: "hi", hiragana: "ひ" },
			{ romaji: "fu", hiragana: "ふ" },
			{ romaji: "he", hiragana: "へ" },
			{ romaji: "ho", hiragana: "ほ" },
		],
	},
	{
		name: "ma",
		kanas: [
			{ romaji: "ma", hiragana: "ま" },
			{ romaji: "mi", hiragana: "み" },
			{ romaji: "mu", hiragana: "む" },
			{ romaji: "me", hiragana: "め" },
			{ romaji: "mo", hiragana: "も" },
		],
	},
	{
		name: "ya",
		kanas: [
			{ romaji: "ya", hiragana: "や" },
			{ romaji: "yu", hiragana: "ゆ" },
			{ romaji: "yo", hiragana: "よ" },
		],
	},
	{
		name: "ra",
		kanas: [
			{ romaji: "ra", hiragana: "ら" },
			{ romaji: "ri", hiragana: "り" },
			{ romaji: "ru", hiragana: "る" },
			{ romaji: "re", hiragana: "れ" },
			{ romaji: "ro", hiragana: "ろ" },
		],
	},
	{
		name: "wa",
		kanas: [
			{ romaji: "wa", hiragana: "わ" },
			{ romaji: "i", hiragana: "ゐ" },
			{ romaji: "n", hiragana: "ん" },
			{ romaji: "e", hiragana: "ゑ" },
			{ romaji: "wo", hiragana: "を" },
		],
	},
];
