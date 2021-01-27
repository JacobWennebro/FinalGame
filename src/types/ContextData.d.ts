export default interface ContextData {
    computer_username: String,
    desktop_config: {
        wallpaper: String,
        apps: {title: String, icon: String, id: String}[]
    }
}