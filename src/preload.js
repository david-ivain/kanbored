const { contextBridge } = require("electron");
const BoardAPI = require("./preload/api/BoardAPI");
const Dashboard = require("./preload/views/Dashboard");

contextBridge.exposeInMainWorld("api", {
	boards: BoardAPI,
});

contextBridge.exposeInMainWorld("views", {
	dashboard: Dashboard,
});
