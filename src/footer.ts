// Footer.
export function Footer() {
	this.footer = document.createElement("div");
	this.footer.id = "footer";
	this.footer_content = document.createElement("span");
	this.footer_content.classList.add("love");

	// TODO: Add neovim's logo!
	this.footer_content.innerHTML = "Made in <span class='green'>neo<b>vim</b></span> with 💖 by Nano";

	this.footer.appendChild(this.footer_content);
}

