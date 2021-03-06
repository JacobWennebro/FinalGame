import React, { Component, KeyboardEvent, MouseEvent, RefObject } from 'react'
import '../style/game.scss'


export default class index extends Component<{}, { x: number, y: number }> {
    Character: RefObject<HTMLDivElement> 
    Map: RefObject<HTMLDivElement> 
    activeTile: HTMLDivElement
    tiles = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [2, 2, 2, 2, 0, 0, 2, 2, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    constructor(props) {
        super(props);

        this.Character = React.createRef();
        this.Map = React.createRef();

        this.CharacterMovement = this.CharacterMovement.bind(this);

        this.state = {
            x: 4,
            y: 6
        }

        document.body.addEventListener("keydown", this.CharacterMovement);

    }

    CharacterMovement(e: KeyboardEventInit) {
        const key = e.key;
        let tile = undefined;
        let x = this.state.x;
        let y = this.state.y;

        try {
            switch(key.toLowerCase()) {
                case "arrowup":
                case "w":
                    tile = this.tiles[this.state.y-1][this.state.x];
                    y--;
                break;
                case "arrowleft":
                case "a":
                    tile = this.tiles[this.state.y][this.state.x-1];
                    x--;
                break;
                case "arrowdown":
                case "s":
                    tile = this.tiles[this.state.y+1][this.state.x];
                    y++;
                break;
                case "arrowright":
                case "d":
                    tile = this.tiles[this.state.y][this.state.x+1];
                    x++;
                break;
            }

            if(tile == undefined || tile == 1 || tile == 2) return;

            this.setState({ x, y });

        } catch(e) { return }

    }

    componentWillUnmount() {
        document.body.removeEventListener("keydown", this.CharacterMovement);
    }

    getTileName(int: number) {
        switch(int) {
            case 0:
                return "grass";
            case 1:
                return "wall";
            case 2:
                return "wall-bottom";
        }
    }

    render() {
        return (
            <div className="game">

                <div className="game__view">
                    <div className="game__view__overlay">
                        <h1>MMO Online</h1>
                        <p>1 player online</p>
                    </div>

                    <div ref={this.Character} className="game__view__character render-as-pixels"></div>

                    <div className="game__view__map" ref={this.Map}>
                        <div style={{transform: `translate(${this.state.x * -1 * 75}px, ${this.state.y * -1 * 75}px)`}} className="game__view__map__container">
                        {this.tiles.map(row => (
                            <>
                                {row.map(tile => (
                                    <div tabIndex={1} key={Math.random()} className={"game__view__map__container__tile render-as-pixels " + this.getTileName(tile)}></div>
                                ))}
                            </>
                        ))}
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
