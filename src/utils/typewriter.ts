// Animated typing effect.
export async function write(content: string[], term: HTMLElement, root: HTMLElement) {
	function sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	block(root);

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

	free();
}

// Block until all the text has been printed out.
function block(root: HTMLElement) {
	const blocker = document.createElement("div");
	blocker.id = "blocker";
	blocker.style.position = "fixed";
	blocker.style.top = "0";
	blocker.style.left = "0";
	blocker.style.width = "100svw";
	blocker.style.height = "100svh";
	blocker.style.background = "transparent";
	blocker.style.opacity = "0.5";
	blocker.style.pointerEvents = "all";
	blocker.style.zIndex = "9999";
	root.appendChild(blocker);
}

function free() {
	const blocker = document.getElementById("blocker");
	if (blocker) {
		blocker.remove();
	}
}
