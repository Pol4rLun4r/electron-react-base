import electron, { WebFrameMain } from "electron";
import { pathToFileURL } from "url";

// utils
import { getUIPath } from "./pathResolver.js";

// função para verificar se o ambiente é de desenvolvimento
export const isDev = (): boolean => {
    return process.env.NODE_ENV === 'development'
};

export function validateEventFrame(frame: WebFrameMain) {
    if (isDev() && new URL(frame.url).host === 'localhost:5123') {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Malicious event');
    }
}

export const ipcMainHandle = <Key extends keyof EventPayloadMapping>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channels: Key, handle: (args: any) => EventPayloadMapping[Key]
) => {
    electron.ipcMain.handle(channels, (event, args) => {
        if (!event.senderFrame) {
            throw new Error('Malicious event');
        }
        validateEventFrame(event.senderFrame);
        return handle(args);
    });
};