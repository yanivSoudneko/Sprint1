'use strict';
const BOMB = '💣';
const FLAG = '🚩'
var gCell;
var gCountBomb;
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gLife = 3



function initGame() {
    gLife = 3
    gGame.shownCount = 0
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);
}

function pickLevel(level) {
    if (level === 'easy') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
    } else if (level === 'medium') {
        gLevel.SIZE = 8
        gLevel.MINES = 12
    } else if (level === 'expert') {
        gLevel.SIZE = 12
        gLevel.MINES = 30
    }
    initGame()
}



function cellclicked(elCellClick, i, j) {
    var cell = elCellClick
    if (gGame.shownCount === 0) getBomb(i, j)

    var negs = setMinesNegsCount(i, j)

    if (!cell.innerText) {
        gGame.shownCount++
    }
    if (gBoard[i][j].isMine) {
        document.querySelector('.life').removeChild(document.querySelector('.life').firstChild);
        gLife--
        console.log(gLife);
        if (!gLife) {
            gameOver()
        }


        cell.innerText = BOMB
    } else {
        cell.innerText = negs
        showNegs()
    }
    console.log(gGame.shownCount, 'show count');
    if (isVictory()) {
        alert('You win')
    }
}


function gameOver() {
    initGame()
    console.log('Game Over !');
}





function isVictory() {
    var elSmile = document.querySelector('.smile')
    var score = gGame.markedCount + gGame.shownCount
    var board = gLevel.SIZE * gLevel.SIZE
    if (score === board) {
        elSmile.innerHTML = `<img src="happy.png" />`
        return true

    } else return false
}