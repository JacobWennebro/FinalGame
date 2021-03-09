import React, { Component, KeyboardEvent, MouseEvent, RefObject } from 'react'
import '../style/game.scss'
import Maps from '../assets/Maps.json'

export default class index extends Component<{}, { x: number, y: number, map_id: number }> {
    Character: RefObject<HTMLDivElement> = React.createRef(); 
    Map: RefObject<HTMLDivElement> = React.createRef();
    MapContainer: RefObject<HTMLDivElement> = React.createRef();
    MusicObject: HTMLAudioElement

    constructor(props) {
        super(props);

        this.ClickMovement = this.ClickMovement.bind(this);
        this.updateMap = this.updateMap.bind(this);

        this.state = {
            map_id: 0,
            x: Maps[0].spawn[0],
            y: Maps[0].spawn[1]
        }

        this.MusicObject = new Audio('./assets/audio/ADVENTUREGAME_MUSIC.mp3');
        this.MusicObject.volume = 0.1;
        this.MusicObject.play();
        this.MusicObject.loop = true;

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
                    tile = Maps[this.state.map_id].tiles[this.state.y-1][this.state.x];
                    y--;
                break;
                case "arrowleft":
                case "a":
                    tile = Maps[this.state.map_id].tiles[this.state.y][this.state.x-1];
                    x--;
                break;
                case "arrowdown":
                case "s":
                    tile = Maps[this.state.map_id].tiles[this.state.y+1][this.state.x];
                    y++;
                break;
                case "arrowright":
                case "d":
                    tile = Maps[this.state.map_id].tiles[this.state.y][this.state.x+1];
                    x++;
                break;
            }

            if(tile == undefined || tile == 1 || tile == 2) return;

            this.setState({ x, y });

        } catch(e) { return }

    }

    ClickMovement(e: MouseEvent<HTMLDivElement>) {
        try {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const mapRect = this.Map.current.getBoundingClientRect();

            const addX = (Math.round(rect.left - mapRect.left) / 75);
            const addY = (Math.round(rect.top - mapRect.top) / 75);

            if(addX != 0) {
                this.Character.current.setAttribute("data-state", addX > 0 ? "left" : "right");
            } else if(addY != 0) {
                this.Character.current.setAttribute("data-state", addY > 0 ? "bottom" : "top");
            }

            const x = this.state.x + addX;
            const y = this.state.y + addY;

            const distance = Math.abs(addX) + Math.abs(addY);

            this.MapContainer.current.style.transition = `transform ${distance/3}s linear`;

            const tile = Maps[this.state.map_id].tiles[y][x];
    
            if(
                tile == undefined || 
                [1, 2, 5].includes(tile)
            ) return;
    
            this.setState({ x, y });
            this.Character.current.classList.add("walking")

            setTimeout(() => {
                this.Character.current.classList.remove("walking");
            }, (distance/3)*1000);

        } catch(e) {
            return;
        }
    }
    

    componentWillUnmount() {
        this.MusicObject.pause();
    }

    getTileName(int: number) {
        switch(int) {
            case 0:
                return "grass";
            case 1:
                return "wall";
            case 2:
                return "wall-bottom";
            case 3:
                return "stair-left";
            case 4:
                return "stair-right";
            case 5:
                return "water";
        }
    }

    updateMap(id: number) {
        this.setState({
            map_id: id,
            x: Maps[id].spawn[0],
            y: Maps[id].spawn[1]
        });
    }

    render() {
        return (
            <div className="webpage game">

                <div className="game__view">
                    <div className="game__view__overlay">

                        <div className="game__view__overlay__stats">
                            <h1>MMO Online</h1>
                            <p>Lobby #1 | 1 player online</p>
                        </div>

                        <div className="game-profile">


                            <div className="game-profile__health">
                                <ul>
                                    <li><div className="heart"></div></li>
                                    <li><div className="heart"></div></li>
                                    <li><div className="heart"></div></li>
                                    <li><div className="heart"></div></li>
                                    <li><div className="heart"></div></li>
                                </ul>
                            </div>

                        </div>

                        <div className="game-chat">

                        </div>

                    </div>

                    <div ref={this.Character} className="game__view__character render-as-pixels"></div>

                    <div className="game__view__map" ref={this.Map}>
                        <div ref={this.MapContainer} style={{transform: `translate(${this.state.x * -1 * 75}px, ${this.state.y * -1 * 75}px)`}} className="game__view__map__container">
                        {Maps[this.state.map_id].tiles.map(row => (
                            <>
                                {row.map(tile => (
                                    <div onClick={this.ClickMovement} tabIndex={1} key={Math.random() + row.toString() + tile} className={"game__view__map__container__tile render-as-pixels " + this.getTileName(tile)}></div>
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
