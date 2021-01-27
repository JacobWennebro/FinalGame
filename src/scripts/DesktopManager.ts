import fs from 'fs';
import path from 'path';
import DesktopConfig from '../configs/template/Desktop.json'

export const updateWallpaper = (bgString: string) => {
    console.log(path.join(__dirname, "../../../../../../src/configs/template/Desktop.json"));

    DesktopConfig.wallpaper = bgString;

    fs.writeFile(path.join(__dirname, "../../../../../../src/configs/template/Desktop.json"), JSON.stringify(DesktopConfig, null, 4), () => {
        console.log("Overwrote Desktop.json");
    });
}