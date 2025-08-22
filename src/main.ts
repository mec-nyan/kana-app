import { registerServiceWorker } from "./service-worker";
// import { homeScreen } from "./components";
// import './styles.scss';

import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

registerServiceWorker();

// We'll be manipulating this div.
// const root = document.getElementById("root");

// Let's go!
/*
(function main() {
	if (root) {
		homeScreen(root);
	}
})()
*/


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
