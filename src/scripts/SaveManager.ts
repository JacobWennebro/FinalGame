class GameSave {
    private id: number;
    
    public createdAt: number;
    public lastUpdated: number;
    public events: string[];
    public constants: any;
    
    private defaults = {
        theme:"blue",
        setting_clickSound: "true"
    }

    constructor(id?: number) {
        const SaveObject: GameSave[] = localStorage.saves ? JSON.parse(localStorage.saves) : [];

        if(id != undefined) {
            this.id = id;
            const save = SaveObject[id];
            this.constants = save.constants;
            this.createdAt = save.createdAt;
            this.events = save.events;
        } else {
            this.id = SaveObject.length;
            SaveObject.push(this);
            this.createdAt = new Date().getTime();
            this.lastUpdated = this.createdAt;
            this.events = [];

            // All constants must be declared here for a default value, even settings.
            this.constants = this.defaults;

            localStorage.saves = JSON.stringify(SaveObject);
        }
    }

    private update() {
        this.lastUpdated = new Date().getTime();

        const SaveObject = localStorage.saves ? JSON.parse(localStorage.saves) : [];

        console.log(this.id);

        SaveObject[this.id] = this;

        console.log(SaveObject);
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