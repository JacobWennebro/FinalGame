class GameSave {
    private id: number;
    
    public createdAt: number;
    public events: string[];
    public constants: any;

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
            this.events = [];
            this.constants = {
                theme:"blue"
            }
            localStorage.saves = JSON.stringify(SaveObject);
        }
    }

    private update() {
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

}

export default GameSave;