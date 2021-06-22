const {
	app,
	BrowserWindow,
	Menu
} = require('electron')
const path = require('path')

Menu.setApplicationMenu(null)

function createWindow() {
	const win = new BrowserWindow({
		width: 1600,
		height: 900,
		frame: false,
		resizable: false,
		icon: path.join(__dirname, 'SummerPockets.ico'),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false
			// preload: path.join(__dirname, 'preload.js')
		}
	})

	win.loadFile('index.html')
	win.maximize();
	// win.openDevTools();
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})