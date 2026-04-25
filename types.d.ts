type Theme = 'dark' | 'light'

type Settings = {
    theme?: Theme;
    programName?: string
};

type EventPayloadMapping = {
    // settings
    "settings:get": Settings;
    "settings:setTheme": boolean;
    "settings:setProgramName": string;
}

interface SettingsApi {
    get(): Promise<Settings>;
    setTheme(theme: Settings['theme']): Promise<boolean>;
    setProgramName(name: Settings['programName']): Promise<string>
};

interface Api {
    settings: SettingsApi;
};

interface Window {
    api: Api;
};