export interface App {
    title: string, icon: string, id: string
}

export interface ConfigTypes {
    computer_username: string
    production: boolean
    game_state: string
    desktop_config: {
        wallpaper: string
        apps: App[]
    }
}