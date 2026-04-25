import { app, BrowserWindow } from "electron";
import path from "path"; //trata os caminhos dentro dos OS

// utils
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";
import ipcHandlers from "./ipc/index.js";

// criar janela principal
const createMainWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false, // desativa a integração do Node.js para segurança
            sandbox: true, // necessário para contextBridge funcionar corretamente
            preload: getPreloadPath() // caminho para o arquivo preload, que é responsável por expor as APIs do Electron para o renderer process de forma segura
        }
    })

    if (isDev()) {
        win.loadURL('http://localhost:5173/'); // caminho em desenvolvimento
    } else {
        win.loadFile(path.join(app.getAppPath() + '/dist-react/index.html')) // caminho em produção
    }
};

// quando estiver pronto o electron irá abrir as janelas do app
app.whenReady().then(() => {
    // ------- janelas -------

    // cria a janela principal
    createMainWindow();

    // só cria uma nova janela caso nenhuma esteja existindo no momento (util para icone no tray)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
    })

    // ao fechar todas as janelas encerra o programa
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    // -----------------------

    // handlers de IPC (invokes and handles)
    ipcHandlers();
})