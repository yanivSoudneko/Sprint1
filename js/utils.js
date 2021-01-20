'use strict'

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
            };
            board[i][j] = gCell;

        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td class="cell cell-${i}-${j}" onclick="cellclicked(this,${i},${j})" oncontextmenu="putFlag(this,${i},${j})"></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector('.main-container');
    elBoard.addEventListener('contextmenu', e => {
        e.preventDefault();
    });

    elBoard.innerHTML = strHTML;
}

function getBomb(cellI, CellJ) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var getRandomNum = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var getRandomNum1 = getRandomIntInclusive(0, gLevel.SIZE - 1)
        if (getRandomNum === cellI && getRandomNum1 === CellJ) {
            i--
        } else {
            gBoard[getRandomNum][getRandomNum1].isMine = true
        }
    }
}

function setMinesNegsCount(i, j) {
    minesAroundCount = 0;
    for (var k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k > gBoard.length - 1) continue;
        for (var g = j - 1; g <= j + 1; g++) {
            if (g < 0 || g > gBoard[0].length - 1) continue;
            if (k === i && g === j) continue;
            if (gBoard[k][g].isMine) {
                minesAroundCount++;
            }
        }
    }
    gCell.minesAroundCount = minesAroundCount;
    return minesAroundCount;
}




function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



function putFlag(elCell, i, j) {
    var cell = elCell
    if (cell.innerText === FLAG) {

        gBoard[i][j].isMarked = false
        gGame.markedCount--
            cell.innerText = ''

    } else {
        gBoard[i][j].isMarked = true
        gGame.markedCount++
            cell.innerText = FLAG
    }

}