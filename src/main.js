const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const mustache = require("mustache");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

app.on("window-all-closed", app.quit);

ipcMain.handle("render-template", (event, args) => {
	return fs.promises
		.readFile(
			path.resolve(
				__dirname,
				"mainassets",
				"views",
				args.template + ".mustache"
			),
			"utf-8"
		)
		.then((template) => mustache.render(template, args.data))
		.catch((reason) =>
			mustache.render(
				`<div class="404">
					<h1>Error 404 : Page not found</h1>
					<p>{{error}}</p>
				</div>`,
				{ error: reason }
			)
		);
});
