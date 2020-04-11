import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import { render } from '@testing-library/react';
import PlayerView from './PlayerView';

let theOneAndOnlySocket = null;

class MultiplayerTetrisGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dudes: [] };

        if (theOneAndOnlySocket == null) {
            theOneAndOnlySocket = new WebSocket("ws://192.168.1.145:8080");
        }
        this.socket = theOneAndOnlySocket;
        this.socket.onmessage = (event) => {
            const message = event.data;
            const state = JSON.parse(message);
            console.log(state);
            this.setState({ dudes: state });
        }
    }

    handleButtonPressed = (event) => {
        console.log(KeyboardEvent);
        if (event.key === "ArrowUp") {
            this.socket.send("ArrowUp");
        } else if (event.key === "ArrowRight") {
            this.socket.send("ArrowRight");
        } else if (event.key === "ArrowLeft") {
            this.socket.send("ArrowLeft");
        } else if (event.key === "ArrowDown") {
            this.socket.send("ArrowDown");
        } else if (event.key === "s") {
            this.socket.send("s");
        } else if (event.key === "h") {
            this.socket.send("h");
        }
    }

    render = () => {
        const makePlayers = (item) => {
            return (<PlayerView everything={item.everything} />);
        };
        const listItems = this.state.dudes.map(makePlayers);
        return (
            <div tabIndex="0" onKeyDown={this.handleButtonPressed}>
                <div style={{ display: "flex" }}>
                    {listItems}
                </div>
            </div>
        );
    }
}

export default MultiplayerTetrisGame;