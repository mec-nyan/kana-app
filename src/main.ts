import { registerServiceWorker } from "./service-worker";
import { homeScreen } from "./components";
import './styles.scss';

registerServiceWorker();

// We'll be manipulating this div.
const root = document.getElementById("root");

// Let's go!
(function main() {
	if (root) {
		homeScreen(root);
	}
})()
