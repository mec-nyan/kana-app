// Footer.
export const footer = document.createElement("div");
footer.id = "footer";

const footer_content = document.createElement("span");
footer_content.classList.add("love");

// TODO: Add neovim's logo!
footer_content.innerHTML = "Made in <span class='green'>neo<b>vim</b></span> with 💖 by Nano";

footer.appendChild(footer_content);
