// utils
import { ipcMainHandle } from "../utils.js";

const getSettings = (): EventPayloadMapping['settings:get'] => {
    return {
        programName: 'Bear',
        theme: 'dark'
    }
}

const setName = (name: string): EventPayloadMapping['settings:setProgramName'] => {
    return name
}

const setTheme = (theme: Settings['theme']): EventPayloadMapping['settings:setTheme'] => {
    if (theme !== 'dark' && theme !== 'light') {
        return false
    }
    return true
}

const settingsHandlers = () => {
    ipcMainHandle('settings:get', getSettings);
    ipcMainHandle('settings:setProgramName', setName);
    ipcMainHandle('settings:setTheme', setTheme);
}

export default settingsHandlers;