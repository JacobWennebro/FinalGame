class GameSave {
    private SaveObject = localStorage.saves ? JSON.parse(localStorage.saves) : [];
    private Save = {
        createdAt: new Date().getTime(),
        events: []
    }

    constructor() {
        this.SaveObject.push(this.Save)
        localStorage.saves = JSON.stringify(this.SaveObject);
    }

    parse() {
        
    }
}

export { GameSave }