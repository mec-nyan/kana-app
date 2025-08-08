export class Actions {
	private options = [
		{ icon: " ", name: "config" },
		{ icon: "󰋖 ", name: "..." },
		{ icon: " ", name: "..." },
		{ icon: " ", name: "dev" },
	];
	private optionButtons: HTMLElement;
	private actionsPane: HTMLElement;
	private startButton: HTMLElement;

	constructor(cb: (dev: boolean) => void) {
		this.optionButtons = document.createElement("div");
		this.optionButtons.id = "option-buttons";

		this.options.forEach((opt) => {
			const btn = document.createElement("div");
			btn.classList.add("opt");
			btn.addEventListener("click", () => cb(true));
			btn.innerHTML = `<span class="nerd-icon">${opt.icon}</span>`;
			this.optionButtons.appendChild(btn);
		});

		this.actionsPane = document.createElement("div");
		this.actionsPane.id = "actions";

		this.startButton = document.createElement("div");
		this.startButton.id = "start-button";
		this.startButton.innerText = "Start";
		this.startButton.addEventListener("click", () => cb(false));

		this.actionsPane.appendChild(this.optionButtons);
		this.actionsPane.appendChild(this.startButton);
	}

	public getElement() {
		return this.actionsPane;
	}
}
