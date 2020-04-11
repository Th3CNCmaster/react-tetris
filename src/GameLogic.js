class GameLogic {
    //Tetris: width: 10 height: 20
    constructor() {
        let width = 10;
        let height = 20;
        this.score = 0;
        this.time = 0;
        this.lastTime = 0;
        this.slowness = 10;
        this.gameOver = false;
        // rows
        let row = [];
        row.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
        for (let i = 0; i < 20; i++) {
            row.push([8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]);
        }
        row.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
        row.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
        row.push([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
        this.board = row;
        //console.log(this.currentTetromino);
        this.tetrominos = [createTetromino(), createTetromino(), createTetromino()];
        this.reset();
        this.counter = 0;
        this.rotated = false;

    }

    computeNext = () => {
        let bits = [];
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                bits.push(this.tetrominos[j].shape[i]);
                if (i == 3 && j != 2) {
                    bits.push([0, 0, 0, 0, 0]);
                }
            }
        }
        //console.log("bits");
        //console.log(bits);
        return bits;
    }

    removeFullRows = () => {
        for (let index = 1; index < this.board.length - 3; index++) {
            let row = this.board[index];
            if (detectIfFull(row)) {
                this.removeRowAndShiftEverythingDown(index);
            }
        }
    }


    //takes rowindex
    removeRowAndShiftEverythingDown(rowIndex) {
        // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
        this.board.splice(rowIndex, 1);
        this.board.splice(1, 0, [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]);
        if (!this.gameOver) {
            this.score += 500;
        }
    }



    reset = () => {
        this.xPos = 4;
        this.yPos = 1;
        // look at array push() and unshift()
        this.currentTetromino = this.tetrominos[0];
        this.tetrominos[0] = this.tetrominos[1];
        this.tetrominos[1] = this.tetrominos[2];
        this.tetrominos[2] = createTetromino();
    }

    makeState = () => {
        let merged = deepCopy(this.board);
        if (merge(this.board, this.currentTetromino.shape, this.xPos, this.yPos) != null && this.yPos < this.board.length - 5) {
            merged = merge(this.board, this.currentTetromino.shape, this.xPos, this.yPos);
        } else {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.score = "Game Over! score: " + this.score;
            }

        }
        merged = mergeAndIgnoreCollission(merged, makeShadow(this.currentTetromino.shape), this.xPos, this.yPos + this.fallToBottom());
        merged.splice(0, 1);
        merged.splice(20, 3);
        for (let index = 0; index < merged.length; index++) {
            merged[index].splice(0, 1);
            merged[index].splice(merged[index].length - 1, 1);
        }
        //console.log("this is null ", merged)
        return {
            game: merged,
            next: deepCopy(this.computeNext()),
            score: this.score
        };
    }

    fall = () => {
        if (!this.gameOver) {
            this.counter++;
            this.time++;
            if (this.time > this.lastTime * 1.2 + 700 && this.slowness > 5) {
                this.lastTime = this.time;
                this.slowness--;
            }
            if (this.counter % this.slowness == 0) {
                if (!this.gameOver) {
                    this.score += 10;
                }
                if (!collision(this.board, this.currentTetromino.shape, this.xPos, this.yPos + 1)) {
                    this.yPos++;
                } else {
                    //console.log("collision")
                    this.board = mergeAndIgnoreCollission(this.board, this.currentTetromino.shape, this.xPos, this.yPos);
                    this.removeFullRows();
                    this.reset()
                }
            }
        }
    }

    splash = () => {
        this.score -= 10000;
        let splash = [[], [], [], [], []];
        for (let index = 0; index < 5; index++) {
            for (let otherIndex = 0; otherIndex < 5; otherIndex++) {
                if (Math.floor(Math.random() * 8) + 1 == 4) {
                    splash[index][otherIndex] = Math.floor(Math.random() * 7) + 1;
                } else {
                    splash[index][otherIndex] = 0;
                }
            }
        }
        this.board = mergeAndIgnoreCollission(this.board, splash, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 8) + 7);
    }

    // Used to draw shadow
    fallToBottom = () => {
        let i = 0;
        while (!collision(this.board, this.currentTetromino.shape, this.xPos, this.yPos + i) && i < this.board.length - 5) {
            i++;
        }
        return i - 1;
    }

    rotate = () => {
        let toRotate = deepCopy(this.currentTetromino.shape);
        if (this.currentTetromino.id == 0 || this.currentTetromino.id == 4 || this.currentTetromino.id == 5) {
            if (this.rotated == false) {
                toRotate = rotate2DMatrixClockwise(toRotate);
                if (!collision(this.board, toRotate, this.xPos, this.yPos)) {
                    this.currentTetromino.shape = rotate2DMatrixClockwise(this.currentTetromino.shape);
                    this.rotated = true;
                }
            } else {
                toRotate = rotate2DMatrixClockwise(toRotate);
                toRotate = rotate2DMatrixClockwise(toRotate);
                toRotate = rotate2DMatrixClockwise(toRotate);
                if (!collision(this.board, toRotate, this.xPos, this.yPos)) {
                    this.currentTetromino.shape = rotate2DMatrixClockwise(this.currentTetromino.shape);
                    this.currentTetromino.shape = rotate2DMatrixClockwise(this.currentTetromino.shape);
                    this.currentTetromino.shape = rotate2DMatrixClockwise(this.currentTetromino.shape);
                    this.rotated = false;
                }

            }
        } else if (this.currentTetromino.id == 1) {

        } else {
            toRotate = rotate2DMatrixClockwise(toRotate);
            if (!collision(this.board, toRotate, this.xPos, this.yPos)) {
                this.currentTetromino.shape = rotate2DMatrixClockwise(this.currentTetromino.shape);
            }
        }
    }

    moveDown = () => {
        this.counter = -1;
        this.fall();
    }

    moveRight = () => {
        if (!collision(this.board, this.currentTetromino.shape, this.xPos + 1, this.yPos)) {
            this.xPos++;
        }
    }

    moveLeft = () => {
        if (!collision(this.board, this.currentTetromino.shape, this.xPos - 1, this.yPos)) {
            this.xPos--;
        }
    }


}

const createStraight = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, c, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 0
    };
}

const createSquare = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, c, c, 0],
            [0, 0, c, c, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 1
    };
}

const createT = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, c, c, c, 0],
            [0, 0, c, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 2
    };
}

const createL = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, c, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 3
    };
}

const createS = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, c, 0],
            [0, 0, 0, c, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 4
    };
}

const createZ = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, c, 0, 0],
            [0, c, c, 0, 0],
            [0, c, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 5
    };
}

const createJ = (color) => {
    let c = color;
    return {
        shape: [
            [0, 0, 0, 0, 0],
            [0, 0, c, 0, 0],
            [0, 0, c, 0, 0],
            [0, c, c, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        id: 6
    };
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

// returns a new board that is merged with the tetromino.
// returns null if collision
const mergeAndCollisionCheck = (originalBoard, tetrominoShape, xPos, yPos) => {
    let board = deepCopy(originalBoard);
    for (let y = yPos; y < yPos + tetrominoShape.length; y++) {
        for (let x = xPos; x < xPos + tetrominoShape.length; x++) {
            let tetrominoval = tetrominoShape[y - yPos][x - xPos];
            if (tetrominoval != 0 && board[y][x] != 0) {
                // meaning collision
                return null;
            }
            if (board[y][x] == 0) {
                board[y][x] = tetrominoval;
            }
        }
    }
    //console.log("no collision");
    return board;
}

const collision = (board, tetrominoShape, xPos, yPos) => {
    return mergeAndCollisionCheck(board, tetrominoShape, xPos, yPos) == null
}

const makeShadow = (tetrominoShape) => {
    tetrominoShape = deepCopy(tetrominoShape);
    for (let y = 0; y < tetrominoShape.length; y++) {
        for (let x = 0; x < tetrominoShape.length; x++) {
            let tetrominoval = tetrominoShape[y][x];
            if (tetrominoval != 0) {
                tetrominoShape[y][x] = 9;
            }
        }
    }
    return tetrominoShape;
}

const merge = mergeAndCollisionCheck;

const mergeAndIgnoreCollission = (originalBoard, tetrominoShape, xPos, yPos) => {
    let board = deepCopy(originalBoard);
    for (let y = yPos; y < yPos + tetrominoShape.length; y++) {
        for (let x = xPos; x < xPos + tetrominoShape.length; x++) {
            let tetrominoval = tetrominoShape[y - yPos][x - xPos];
            if (board[y][x] == 0) {
                board[y][x] = tetrominoval;
            }
        }
    }
    return board;
}

// perfect
const rotate2DMatrixClockwise = (toRotate) => {
    let temp = deepCopy(toRotate);
    //console.log("toRotate");
    //console.log(toRotate);
    for (let i = 0; i < toRotate[0].length; i++) {
        for (let j = 0; j < toRotate.length; j++) {
            temp[j][toRotate[0].length - 1 - i] = toRotate[i][j];
        }
    }
    //console.log("temp");
    //console.log(temp);
    return temp;
}

//takes row not index
const detectIfFull = (row) => {
    let numberFull = 0;
    for (let index = 0; index < row.length; index++) {
        if (row[index] == 0) {
            return false;
        }
    }
    return true;
}

export default GameLogic;