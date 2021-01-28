export interface App {
    title: string, icon: string, id: string
}

export interface ConfigTypes {
    computer_username: string,
    desktop_config: {
        wallpaper: string,
        apps: App[]
    }
}