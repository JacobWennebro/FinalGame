
const defaultConstants = {
    theme:"blue",
    wallpaper: null,
    setting_fullWidth: false,
    setting_clickSound: true
}

class GameSave {
    public id: number;
    
    public createdAt: number;
    public lastUpdated: number;
    public events: string[];
    public constants: any;

    constructor(id?: number) {
        let SaveObject: GameSave[] = localStorage.saves ? JSON.parse(localStorage.saves) : [];

        if(id != undefined && GameSave.saveExists(id)) { // If the id is passed and the save exists
            this.id = id;
            const save = SaveObject.find(save => save.id === id);
            this.constants = save.constants;
            this.createdAt = save.createdAt;
            this.events = save.events;
        } else if(id != undefined) { // If the id is passed and the save does not exist
            this.id = id;
            SaveObject.push(this);
            this.createdAt = new Date().getTime();
            this.lastUpdated = this.createdAt;
            this.events = [];

            // All constants must be declared here for a default value, even settings.
            this.constants = defaultConstants;

            // Sort the saves
            SaveObject = SaveObject.sort((a, b) => a.id - b.id);
            localStorage.saves = JSON.stringify(SaveObject);
        } else { // If no id is passed
            let curId = SaveObject.length;
            while(GameSave.saveExists(curId)) curId++;
            this.id = curId;
            SaveObject.push(this);
            this.createdAt = new Date().getTime();
            this.lastUpdated = this.createdAt;
            this.events = [];

            // All constants must be declared here for a default value, even settings.
            this.constants = defaultConstants;

            // Sort the saves
            SaveObject = SaveObject.sort((a, b) => a.id - b.id);
            localStorage.saves = JSON.stringify(SaveObject);
        }
    }

    private update() {
        this.lastUpdated = new Date().getTime();

        const SaveObject = localStorage.saves ? JSON.parse(localStorage.saves) : [];

        console.log(this.id);

        SaveObject[SaveObject.findIndex(save => save.id === this.id)] = this;

        console.log(SaveObject);
        localStorage.saves = JSON.stringify(SaveObject);
    }

    // Fetches the SaveObject array
    static fetchAll() {
        const SaveObject: GameSave[] = localStorage.saves ? JSON.parse(localStorage.saves) : [];
        return(SaveObject);
    }

    // Check if a SaveObject or specific save exists, without creating an instance
    static saveExists(id?: number) {
        const SaveObject: GameSave[] = localStorage.saves ? JSON.parse(localStorage.saves) : [];
        // Check if there are game saves
        if(!SaveObject || SaveObject.length === 0) return(false);
        // Otherwise, if no id was provided, there are existing saves so return true
        else if(id === undefined) return(true);

        if(!SaveObject.find((save) => save.id === id)) return(false);
        else return(true);
    }

    delete() {
        let SaveObject = localStorage.saves ? JSON.parse(localStorage.saves) : [];
        SaveObject.splice(SaveObject.findIndex(save => save.id === this.id), 1);
        // Sort the saves
        SaveObject = SaveObject.sort((a, b) => a.id - b.id);
        localStorage.saves = JSON.stringify(SaveObject);
    }

    addEvent(event_id: string) {
        this.events.push(event_id);
        this.update();
    }

    removeEvent(event_id: string) {
        this.events = this.events.filter(e => e !== event_id);
        this.update();
    }
    
    setConstant(constant_id: string, value: string) {
        if(!Object.keys(this.constants).includes(constant_id)) {
            console.error("Tried to save unknown constant.");
            return;
        }

        this.constants[constant_id] = value;
        console.log(this.constants);
        this.update();
    }

    getConstant(constant_id: string) {
        return this.constants[constant_id];
    }

    hasHappened(event_id: string) {
        return this.events.includes(event_id);
    }

    setSetting(setting_id: string, value: boolean | string | number) {
        this.constants[`setting_${setting_id}`] = value;
        this.update();
    }

    getSetting(setting_id: string) {
        return this.constants[`setting_${setting_id}`];
    }

}

export default GameSave;