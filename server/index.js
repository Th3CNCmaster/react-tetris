// old way of importing 3rd party code. needed by node js
import WebSocket from 'ws';
import GameLogic from '../src/GameLogic.js';

const wss = new WebSocket.Server({ port: 8080 });
const gls = [];
const dudes = [];

// should return list of all states
const computeAllStates = () => {
    const states = [];
    for (let index = 0; index < gls.length; index++) {
        states.push(gls[index].makeState());
    }
    return states;
}

const sendAllStatesToAllDudes = () => {
    const states = computeAllStates();
    for (let index = 0; index < dudes.length; index++) {
        dudes[index].send(JSON.stringify(states));
    }
}

const sendOneStateToAllDudes = () => {
    const states = computeAllStates();
    for (let index = 0; index < dudes.length; index++) {
        dudes[index].send(JSON.stringify(states));
    }
}


// todo improve, start ONE interval OUTSIDE that falls ALL game logics
// at the same time, instead of specific interval for each dude
const intervalOccured = () => {
    let change = false;
    for (let index = 0; index < gls.length; index++) {
        change = change || gls[index].fall();
    }
    if (change) {
        sendAllStatesToAllDudes();
    }
}

setInterval(intervalOccured, 100);
const dudeConnected = (dude) => {
    console.log("dudes.length");
    console.log(dudes.length);
    dudes.push(dude);
    let gl = new GameLogic();
    gls.push(gl);


    const messageFromDude = (message) => {
        if (message === "ArrowUp") {
            gl.rotate();
        } else if (message === "ArrowRight") {
            gl.moveRight();
        } else if (message === "ArrowLeft") {
            gl.moveLeft();
        } else if (message === "ArrowDown") {
            gl.moveDown();
        } else if (message === "s") {
            let costS = 20000;
            if (gl.score >= costS) {
                gl.score -= costS;
                for (let index = 0; index < gls.length; index++) {
                    if (gls[index] != gl) {
                        gls[index].splash();
                    }
                }
            }
        } else if (message === "h") {
            let costH = 10000;
            if (gl.score >= costH) {
                gl.score -= costH;
                for (let index = 0; index < gls.length; index++) {
                    if (gls[index] != gl) {
                        gls[index].createHole();
                    }
                }
            }

        } else {
            throw "unsupported message " + message
        }
        sendAllStatesToAllDudes();
    }

    dude.on('message', messageFromDude);

};

wss.on('connection', dudeConnected);