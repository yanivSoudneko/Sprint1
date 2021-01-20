'use strict';
const BOMB = '💣';
const FLAG = '🚩'
var gCell;
var minesAroundCount;
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gLife = 3



function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}



function cellclicked(elCellClick, i, j) {
    var cell = elCellClick
    if (gGame.shownCount === 0) getBomb(i, j)

    var negs = setMinesNegsCount(i, j)

    if (!cell.innerText) {
        gGame.shownCount++
    }
    if (gBoard[i][j].isMine) {
        document.querySelector('.life').removeChild(
            document.querySelector('.life').firstChild
        );
        gLife--
        if (!gLife) {
            gameOver()
        }

        cell.innerText = BOMB
    } else {
        cell.innerText = negs
    }
    console.log(gGame.shownCount, 'show count');
    if (isVictory()) {
        alert('You win')
    }
}


function gameOver() {
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