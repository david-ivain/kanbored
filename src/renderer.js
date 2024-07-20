/** @type {MainAPI} */
const mainAPI = window.api;
/** @type {ViewAPI} */
const views = window.views;
import "./index.css";

views.dashboard.get().then((response) => (document.body.innerHTML = response));
