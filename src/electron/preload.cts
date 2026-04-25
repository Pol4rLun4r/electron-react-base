import electron from "electron";

// função handle dos ipcRenderer.invoke
export const ipcInvoke = <Key extends keyof EventPayloadMapping>(
    channels: Key, data?: unknown
) => {
    return electron.ipcRenderer.invoke(channels, data);
}

// funções que o react irá chamar
const api: Api = {
    settings: {
        get: () => ipcInvoke('settings:get'),
        setProgramName: (name) => ipcInvoke('settings:setProgramName', name),
        setTheme: (theme) => ipcInvoke('settings:setTheme', theme)
    }
}

// expondo as APIs do Electron para o renderer process de forma segura
electron.contextBridge.exposeInMainWorld("api", api);