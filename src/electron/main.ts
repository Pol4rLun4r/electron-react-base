import { app, BrowserWindow } from "electron";
import path from "path"; //trata os caminhos dentro dos OS

// utils
import { isDev } from "./utils.js";

// quando estiver pronto o electron irá abrir as janelas do app
app.on("ready", () => {
    const mainWindow = new BrowserWindow();

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5173/'); // caminho em desenvolvimento
    } else {
        mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html')) // caminho em produção
    }
})