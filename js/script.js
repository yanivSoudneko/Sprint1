'use strict';
const BOMB = '💣';
const FLAG = '🚩'
const NORMAL = '😃'
const SMILE = '🤩'
const SAD = '😭'
var gCell;
var gCountBomb;
var gBoard;
var gLevel = { SIZE: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gLife = 3
var gInterval



function initGame() {
    var elSmile = document.querySelector('.smile')
    elSmile.innerText = '😃'
    resetTime()
    gLife = 3
    gBoard = buildBoard(gLevel.SIZE)
    renderBoard(gBoard)
    renderLife()
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


function cellclicked(elCell, i, j) {
    console.log(gBoard)
    if (gBoard[i][j].isShown) return

    var cell = elCell
    if (gGame.shownCount === 0) {
        getBomb(i, j)
        setTime()
    }


    if (!cell.innerText) {
        gGame.shownCount++
    }
    if (gBoard[i][j].isMine) {
        var elHeart = document.querySelector('.life')
        elHeart.remove()
        gLife--
        if (!gLife) {
            gameOver()
        }

        gBoard[i][j].isShown = true
        cell.innerText = BOMB



    } else {
        var negs = setMinesNegsCount(elCell, i, j)
        gBoard[i][j].isShown = true

        cell.innerText = negs
    }


    if (isVictory()) {
        var elSmile = document.querySelector('.smile')
        elSmile.innerHTML = '🤩'
        alert('You win')
    }
}

function gameOver() {
    var elSmile = document.querySelector('.smile')
    elSmile.innerHTML = '😭'
    resetTime()
    gGame.isOn = false
    initGame()
    alert('You loose')
}





function setMinesNegsCount(clickedCell, clickedI, clickedJ) {
    var count = 0;
    for (var i = clickedI - 1; i <= clickedI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = clickedJ - 1; j <= clickedJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            if (i === clickedI && j === clickedJ) continue;
            if (gBoard[i][j].isMine) {
                count++;

            } else {
                var elNighber = document.querySelector(`.cell-${i}-${j}`)
                expandShown(gBoard, elNighber, i, j)

            }
        }
    }

    gCell.minesAroundCount = count
    return count;
}

function expandShown(board, nighber, clickedI, clickedJ) {

    var count = 0

    for (var i = clickedI - 1; i <= clickedI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = clickedJ - 1; j <= clickedJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === clickedI && j === clickedJ) continue;
            if (gBoard[i][j].isMine) {
                count++;


            }
        }

    }


    nighber.minesAroundCount = count
    nighber.innerText = count
    gBoard[clickedI][clickedJ].minesAroundCount = count
    gBoard[clickedI][clickedJ].isShown = true

}


function isVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isShown) return false
            if (gBoard[i][j].isMarked && !gBoard[i][j].isMine) return false
            if (!gBoard[i][j].isShown && gBoard[i][j].isMine) return false

        }
    }
    return true
}