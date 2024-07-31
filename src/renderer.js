import { toHTMLElementOrNull } from "./renderer/utils/Utils";
import { ElResponse, ElRouterAPI } from "./preload/ElectronRouting";

import "./index.css";

/** @type {ElRouterAPI} */
// @ts-ignore
const api = window.api;

/**
 * Complete list of event handlers.
 * Most of them should be event type agnostic.
 */
const eventHandlers = Object.freeze({
	showDashboard() {
		api.get("/dashboard").then((response) => {
			document.body.innerHTML = response.content();
		});
	},
	/** @param {MouseEvent} event */
	showBoard(event) {
		const boardId = toHTMLElementOrNull(event.target)?.dataset.id;
		api.get(`/board/${boardId}`).then((response) => {
			document.body.innerHTML = response.content();
		});
	},
	showBoardForm() {
		const modalArea = document.querySelector("#modal-area");
		if (!(modalArea instanceof HTMLElement)) {
			console.error("MODAL AREA NOT FOUND");
			return;
		}
		api.get("/modals/boardform").then((response) => {
			modalArea.innerHTML = response.content();
			document.querySelector("dialog")?.showModal();
		});
	},
	/** @param {MouseEvent} event */
	closeModal(event) {
		const dialog = toHTMLElementOrNull(event.target)?.closest("dialog");
		dialog?.close();
		dialog?.remove();
	},
	/** @param {SubmitEvent} event */
	async submitModalForm(event) {
		if (!(event.target instanceof HTMLFormElement)) return;
		const formData = new FormData(event.target);
		const values = {};
		formData.forEach((value, key) => {
			values[key] = value;
		});

		let method = event.target.dataset.method;
		if (method !== "post" && method !== "put") {
			console.error(`bad method ${method}`);
			return;
		}
		const action = event.target.attributes.getNamedItem("action")?.value;
		if (!action) {
			console.error("no form action");
			return;
		}
		const response = await api[method](action, values);
		if (response.status() === "200") this.showDashboard();
		else console.error(JSON.parse(response.content()).error);
	},
});

/**
 * List of supported event types for data-[event] elements
 */
const supportedEventTypes = Object.freeze(["click", "submit"]);

/**
 * Applies event listeners to document calling the corresponding handler for each valid element in the stack between it and the target element.
 * Should probably implement some way to stop the bubbling.
 * i.e. return false to stop
 */
supportedEventTypes.forEach((supportedEventType) => {
	document.addEventListener(supportedEventType, (event) => {
		if (!event.target || !(event.target instanceof HTMLElement)) return;
		let eventTarget = event.target.closest(`[data-${supportedEventType}]`);
		while (eventTarget) {
			Object.defineProperty(event, "target", { value: eventTarget });
			// @ts-ignore
			eventHandlers[event.target.dataset[supportedEventType]]?.(event);
			eventTarget =
				event.target.parentElement?.closest(
					`[data-${supportedEventType}]`
				) ?? null;
		}
	});
});

/**
 * Rendering process starting point.
 */
(function init() {
	api.get("/dashboard").then((response) => {
		document.body.innerHTML = response.content();
	});
})();
