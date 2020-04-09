class GameLogic {
    //Tetris: width: 10 height: 20
    constructor() {
        let width = 10;
        let height = 20;
        let score = 0;
        let row = [];
        for (let i = 0; i < 20; i++) {
            row.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        this.board = row;
        this.currentTetromino = createTetromino();
        console.log(this.currentTetromino);
        let tetrominos = [createTetromino(), createTetromino(), createTetromino()];
        let bits = [];
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 4; i++) {
                bits.push(tetrominos[j][i])
            }
        }
        this.tetromino = bits;
        this.yPos = 0;
        this.xPos = 4;
        this.tetrominoExists = false;
        this.merged = deepCopy(this.board);
        this.merge();

    }

    merge = () => {
        this.merged = deepCopy(this.board);
        let y = this.yPos;
        let x = this.xPos;
        for (; y < this.yPos + 4; y++) {
            for (; x < this.xPos + 4; x++) {
                this.merged[y][x] = this.currentTetromino[y - this.yPos][x - this.xPos];
                console.log("y - this.yPos");
                console.log(y - this.yPos);
                console.log("x - this.xPos");
                console.log(x - this.xPos);
            }
            x = this.xPos;
        }
    }

    stick = () => {

    }

    makeState = () => {
        return {
            game: this.merged,
            next: this.tetromino,
            score: this.score
        };
    }

    fall = () => {
        this.yPos++;
        this.merge();
    }

    rotate = () => {
        this.yPos--;
        this.merge();
    }

    moveDown = () => {
        this.yPos++;
        this.merge();
    }

    moveRight = () => {
        this.xPos++;
        this.merge();
    }

    moveLeft = () => {
        this.xPos--;
        this.merge();
    }


}

const createStraight = (color) => {
    return [[0, color, 0, 0], [0, color, 0, 0], [0, color, 0, 0], [0, color, 0, 0]]
}

const createSquare = (color) => {
    return [[0, color, color, 0], [0, color, color, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
}

const createT = (color) => {
    return [[color, color, color, 0], [0, color, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
}

const createL = (color) => {
    return [[0, color, 0, 0], [0, color, 0, 0], [0, color, color, 0], [0, 0, 0, 0]]
}

const createS = (color) => {
    return [[0, color, 0, 0], [0, color, color, 0], [0, 0, color, 0], [0, 0, 0, 0]]
}

const createZ = (color) => {
    return [[0, 0, color, 0], [0, color, color, 0], [0, 0, color, 0], [0, 0, 0, 0]]
}

const createJ = (color) => {
    return [[0, 0, color, 0], [0, 0, color, 0], [0, color, color, 0], [0, 0, 0, 0]]
}

const createFunctions = [createStraight, createSquare, createT, createL, createS, createZ, createJ];

const createTetromino = () => {
    let tetromino = Math.floor(Math.random() * 7);
    let randomVal = Math.floor(Math.random() * 7) + 1;
    let aRandomCreateFunction = createFunctions[tetromino];
    return aRandomCreateFunction(randomVal);
}

const deepCopy = (anything) => {
    return JSON.parse(JSON.stringify(anything));
}

export default GameLogic;