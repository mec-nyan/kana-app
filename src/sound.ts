// TODO: Put this code in the appropriate place.
// >>> Start audio processing.
const audioCtx = new (window.AudioContext)();
let audioBuffer: AudioBuffer;


fetch("/kana-app/sounds/jp_sounds.mp3")
	.then(resp => resp.arrayBuffer())
	.then(arrBuf => audioCtx.decodeAudioData(arrBuf))
	.then(data => {
		audioBuffer = data;
		console.log("Audio file has been loaded!");
	})
	.catch(e => console.error(`Error loading audio: ${e}`));

export function playKana({ start, duration }: { start: number; duration: number }) {
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
