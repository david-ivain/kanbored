import { toHTMLElementOrNull } from "./renderer/utils/Utils";

import "./index.css";

/** @type {Controller} */
const views = window.views;

/**
 * Loads a view from the main process
 * @param { "dashboard" | "board" } view
 * @param {{
 * method: "get" | "post" | "put" | "delete";
 * payload: Object;
 * }} params
 * @param { HTMLElement } target
 */
function loadView(view, params = {}, target = document.body) {
	const defaultParams = { method: "get", payload: {} };
	const mergedParams = { ...defaultParams, ...params };
	views[view]?.[mergedParams.method]?.(mergedParams.payload).then(
		(response) => (target.innerHTML = response)
	);
}

/**
 * Complete list of event handlers.
 * Most of them should be event type agnostic.
 */
const eventHandlers = Object.freeze({
	showDashboard() {
		loadView("dashboard");
	},
	/** @param {MouseEvent} event */
	showBoard(event) {
		loadView("board", {
			payload: { id: toHTMLElementOrNull(event.target)?.dataset.id },
		});
	},
});

/**
 * List of supported event types for data-[event] elements
 */
const supportedEventTypes = Object.freeze(["click"]);

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
			const eventClone = Object.assign({}, event);
			eventClone.target = eventTarget;
			eventHandlers[eventClone.target.dataset.click]?.(eventClone);
			eventTarget = eventClone.target.parentElement?.closest(
				`[data-${supportedEventType}]`
			);
		}
	});
});

/**
 * Rendering process starting point.
 */
(function init() {
	loadView("dashboard");
})();
