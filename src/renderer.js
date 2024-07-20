/** @type {MainAPI} */
const mainAPI = window.api;
/** @type {ViewAPI} */
const views = window.views;
import "./index.css";

views.dashboard.get().then((response) => (document.body.innerHTML = response));

const eventHandlers = {
	showDashboard() {
		views.dashboard
			.get()
			.then((response) => (document.body.innerHTML = response));
	},
	/** @param {MouseEvent} event */
	showBoard(event) {
		// alert(event.target.dataset.id);
		views.board
			.get(event.target.dataset.id)
			.then((response) => (document.body.innerHTML = response));
	},
};

const supportedEventTypes = ["click"];

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
