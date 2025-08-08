export class Header {
	private header: HTMLElement;
	private menu: HTMLElement;
	private title: HTMLElement;
	private themeSwitch: HTMLLabelElement;
	private theme = "dark";
	private menuHandler: EventListener | null;

	constructor() {
		this.header = document.createElement("div");
		this.header.id = "header";

		this.menu = document.createElement("div");
		this.menu.id = "menu";

		this.title = document.createElement("h3");

		this.themeSwitch = document.createElement("label");
		this.themeSwitch.htmlFor = "theme-switch";
		this.themeSwitch.id = "theme-sel";
		this.themeSwitch.innerText = "";
		this.themeSwitch.addEventListener("click", () => {
			this.toggleTheme();
		});

		this.header.appendChild(this.menu);
		this.header.appendChild(this.title);
		this.header.appendChild(this.themeSwitch);

		this.menuHandler = null;
	}

	private toggleTheme() {
		if (this.theme === "dark") {
			this.theme = "light";
			this.themeSwitch.innerText = "";
		} else {
			this.theme = "dark";
			this.themeSwitch.innerText = "";
		}
	}

	public getElement() {
		return this.header;
	}

	public setTitle(title: string) {
		this.title.innerText = title;
	}

	public setMenuIcon(icon: string) {
		this.menu.innerText = icon;
	}

	public setMenuAction(action: EventListener) {
		if (this.menuHandler) {
			this.menu.removeEventListener("click", this.menuHandler);
		}
		this.menuHandler = action;
		this.menu.addEventListener("click", this.menuHandler);
	}

	public clearMenuAction() {
		if (this.menuHandler) {
			this.menu.removeEventListener("click", this.menuHandler);
		}
		this.menuHandler = null;
	}
}
