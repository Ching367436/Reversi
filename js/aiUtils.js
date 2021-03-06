"use strict";
function getAvailibleSpots(player, board) {
    let availSpots = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (checkSpotAvailible(i, j, player, board)) {
                availSpots.push([i, j]);
            }
        }
    }
    return availSpots;
}

function getRandomSpot(availSpots) {
    const len = availSpots.length;
    let spot = getRandomNumber(0, len);
    return spot;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i >= 1; --i) {
        const j = getRandomNumber(0, i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function getMaxScoreSpot(avalSpots) {
    let maxSpot = 0;
    let x = avalSpots[0][0];
    let y = avalSpots[0][1];
    let maxScore = stepScore[x][y];
    for (let i = 1; i < avalSpots.length; i++) {
        let x = avalSpots[i][0];
        let y = avalSpots[i][1];
        let score = stepScore[x][y];
        if (maxScore < score) {
            maxScore = score;
            maxSpot = i;
        }
    }
    return maxSpot;
}

function virtualMove(x, y, player, board) {

    const opponent = getOpponent(player);
    // top left
    let dx = -1, dy = -1;

    // treverse throught all dirrections
    while (dx <= 1) {
        dy = -1;
        while (dy <= 1) {
            if (dx === 0 && dy === 0) {
                dy++;
                continue;
            }

            let i = x, j = y;
            i += dx;
            j += dy;
            if (isOutOfChessboard(i, j)) { dy++; continue; }
            if (board[i][j] === opponent) {
                i += dx;
                j += dy;
                if (isOutOfChessboard(i, j)) { dy++; continue; }

                while (board[i][j] === opponent) {
                    i += dx;
                    j += dy;
                    if (isOutOfChessboard(i, j)) { break; }
                }

                if (!isOutOfChessboard(i, j)) {
                    if (board[i][j] === player) {
                        let i = x, j = y;
                        board[i][j] = player;

                        i += dx;
                        j += dy;
                        while (board[i][j] === opponent) {
                            board[i][j] = player;
                            i += dx;
                            j += dy;
                        }
                    }
                }
            }
            dy++;
        }
        dx++;
    }
}


function copyBoard(board) {
    const newBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            newBoard[i][j] = board[i][j];
        }
    }
    return newBoard;
}


function sigmoid(z) {
    return (1 / (1 + Math.exp(-z)));
}