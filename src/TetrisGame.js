import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { render } from '@testing-library/react';
import PlayerView from './PlayerView';
import GameLogic from './GameLogic';


class TetrisGame extends React.Component {
    constructor(props) {
        super(props);
        this.GameLogic = new GameLogic("asd");
        this.state = {
            game: [[1, 2, 3], [2, 3, 4], [1, 1, 1, 1, 1, 1, 1, 1,]],
            next: [[1, 2, 3], [2, 3, 4], [1, 11, 1]],
            score: 1,
        }
    }
    intervalOccured = () => {
        //this.GameLogic.stick();
        this.GameLogic.fall();
        this.setState(this.GameLogic.makeState());
    }

    handleButtonPressed = (event) => {
        console.log(KeyboardEvent);
        if (event.key === "ArrowUp") {
            this.GameLogic.rotate();
        } else if (event.key === "ArrowRight") {
            this.GameLogic.moveRight();
        } else if (event.key === "ArrowLeft") {
            this.GameLogic.moveLeft();
        } else if (event.key === "ArrowDown") {
            this.GameLogic.moveDown();
        } else if (event.key === "a") {
            setInterval(this.intervalOccured, 100);
        }
        this.setState(this.GameLogic.makeState());
    }

    render = () => {

        return (
            <div tabIndex="0" onKeyDown={this.handleButtonPressed}>
                <PlayerView game={this.state.game} next={this.state.next} score={this.state.score} />
            </div>
        );
    }
}

export default TetrisGame;