'use strict'

function buildBoard(board) {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
            board[i][j] = gCell;

        }
    }
    return board;
}

function renderBoard() {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
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

function renderLife() {
    var strHTML = ''
    for (var i = 0; i < 3; i++) {
        strHTML += `<span class="life"><img src="img/life.gif"></span>`
    }
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = strHTML
}

function resetTime() {
    clearInterval(gInterval)
    document.querySelector('.time').innerText = 0
    gGame.shownCount = 0

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
        Board[i][j].isShown = false
        gGame.markedCount--
            cell.innerText = ''

    } else {
        gBoard[i][j].isMarked = true
        gBoard[i][j].isShown = true
        gGame.markedCount++
            cell.innerText = FLAG
    }
    if (isVictory()) alert('You win')
}






function setTime() {
    var time = Date.now()
    gInterval = setInterval(function() {
        var timeElapsed = (Date.now() - time) / 1000

        document.querySelector('.time').innerText = timeElapsed
    }, 100);
}


