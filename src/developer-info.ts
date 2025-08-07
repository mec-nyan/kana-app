export class DevInfoOverlay {
	public devInfo: HTMLElement;
	public devInfoBtn: HTMLElement;
	private count = 0;
	private readonly infoFruits = [
		{ fruit: "", class: "cherry" },
		{ fruit: "", class: "peach" },
		{ fruit: "", class: "apple" },
		{ fruit: "", class: "orange" },
		{ fruit: "󱁇", class: "watermelon" },
	];

	constructor() {
		this.devInfo = document.createElement("div");
		this.devInfo.id = "dev-info";
		this.devInfo.className = "hidden";

		this.updateDevInfo();
		window.addEventListener("resize", this.updateDevInfo);

		this.devInfoBtn = document.createElement("div");
		this.devInfoBtn.id = "toggle-dev-info";
		this.devInfoBtn.innerText = this.infoFruits[0].fruit;
		this.devInfoBtn.className = this.infoFruits[0].class;
		this.devInfoBtn.addEventListener("click", this.toggleDevInfo);
	}

	private updateDevInfo = () => {
		this.devInfo.innerHTML = `<span>W: ${window.innerWidth}</br>H: ${window.innerHeight}</span>`;
	};

	private toggleDevInfo = () => {
		if (this.devInfo.className === "") {
			this.devInfo.className = "hidden";
			this.count = 0;
			this.devInfoBtn.innerText = this.infoFruits[0].fruit;
			this.devInfoBtn.className = this.infoFruits[0].class;
			return;
		}

		this.count++;
		if (this.count === this.infoFruits.length) {
			this.count = 0;
			this.devInfoBtn.innerText = this.infoFruits[0].fruit;
			this.devInfoBtn.className = this.infoFruits[0].class;
			this.devInfo.className = "";
			return;
		}
		this.devInfoBtn.innerText = this.infoFruits[this.count].fruit;
		this.devInfoBtn.className = this.infoFruits[this.count].class;
	};

	public destroy() {
		window.removeEventListener("resize", this.updateDevInfo);
		this.devInfoBtn.removeEventListener("click", this.toggleDevInfo);
		this.devInfo.remove();
		this.devInfoBtn.remove();
	}
}
