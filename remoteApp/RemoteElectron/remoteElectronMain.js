'use strict';

const electron = require("electron");
const url = require("url");
const path = require("path");


// Set environment variables
// process.env.NODE_ENV = "development";
process.env.NODE_ENV = "release";

const { app, BrowserWindow, Menu, ipcMain } = electron;
require('electron-reload')(__dirname);

let mainWindow;

//When main process is ready create renderer processes
app.on("ready", () => {
	// Create main window
	mainWindow = new BrowserWindow({
		resizable: process.env.NODE_ENV == "release" ? false : true,
		'width': 650,
		'height': 660,
	});

	// Load html in the window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file",
		slashes: true
	}))

	require('./ExpressServer.js')(ipcMain, mainWindow);

	// Close main app when main window is closed
	mainWindow.on("closed", () => {
		app.quit();
	})
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
	app.quit()
  }
});
