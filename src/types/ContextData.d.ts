export interface App {
    title: string, icon: string, id: string, 
    
    show?: boolean, maxWidth?: string, maxHeight?: string,
    minHeight?: string, minWidth?: string,
    height?: string, width?: string,
    fullscreen: boolean
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