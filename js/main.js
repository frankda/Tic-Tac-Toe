const circle = {};
const cross = {};

const querySetAnimation = function (nodeName, animationName) {
    const node = document.querySelectorAll(nodeName);
    for (let i = 0; i < node.length; i++) {
        node[i].className = node[i].className + ' ' + animationName;
    };
};

const matchSliderValueWithInputText = function (_this) {
    if (_this.className === 'input-box') {
        const inputTextValue = parseInt(_this.value);
        const slidebar = _this.nextSibling.nextSibling;
        slidebar.value = inputTextValue;
        
    } else {
        const slidebarValue = parseInt(_this.value);
        const inputText = _this.previousSibling.previousSibling;
        inputText.value = slidebarValue;
    };
};

const winConditionStorage = function (shape, inputBoardDimensions) {
    shape.row = {};
    shape.column = {};
    for (let i = 0; i < inputBoardDimensions; i++) {
        shape.row[i] = 0;
        shape.column[i] = 0;
    };
    shape.posDiag = 0;
    shape.negDiag = 0;
};

const resetBoard = function () {
    const cellsToBeRemoved = document.querySelectorAll('.cell');
    for (let i = 0; i < cellsToBeRemoved.length; i++) {
        cellsToBeRemoved[i].remove();
    };
    querySetAnimation('header h1', 'flyback');
    querySetAnimation('.hidetop', 'dropback');

    gameover = false;
    count = 0;
    circleFirst = true;
};

const getScore =function () {
    if (circleFirst) {
        oScore += 1;
        const circleMessage = document.querySelector('.player-o p');
        circleMessage.textContent = oScore;
        winner.textContent = 'O';
    } else {
        xScore += 1;
        const crossMessage = document.querySelector('.player-x p');
        crossMessage.textContent = xScore;
        winner.textContent = 'X';
    };
};

const cellFlip = function (_this,) {
    if (!gameover) {
        const div = document.createElement('div');
        if (circleFirst) {
            div.setAttribute('class', 'circle');
        } else {
            div.setAttribute('class', 'cross');
        };
        _this.appendChild(div);
        _this.removeEventListener('click', cellFlip);
    };
};

const checkRow = function (side, _this) {
    console.log(circle);
    
    side.row[_this.row] += 1;
    for (let i = 0; i < Object.keys(side.row).length; i++) {
        if (side.row[i] === inputBoardDimensions) {
            getScore();
            querySetAnimation('.board', 'disappear');
            querySetAnimation('header h1', 'flyup');
            querySetAnimation('.winning', 'dropdown');
            gameover = true;
        };
    };
};

const checkColumn = function (side, _this) {
    side.column[_this.column] += 1;
    for (let i = 0; i < Object.keys(side.column).length; i++) {
        if (side.column[i] === inputBoardDimensions) {    // 3 could be changed to variables if needed
            getScore();
            querySetAnimation('.board', 'disappear');
            querySetAnimation('header h1', 'flyup');
            querySetAnimation('.winning', 'dropdown');
            gameover = true;
        };
    };
};

const checkDiag = function (side, _this) {
    if (_this.row === _this.column) {
        side.posDiag += 1;
    };
    if ((_this.row + _this.column) === (inputBoardDimensions - 1)) {
        side.negDiag += 1;
    };
    if (side.posDiag === inputBoardDimensions || side.negDiag === inputBoardDimensions) {
        getScore();
        querySetAnimation('.board', 'disappear');
        querySetAnimation('header h1', 'flyup');
        querySetAnimation('.winning', 'dropdown');
        gameover = true;
    };
};

const cellClicking = function (_this) {
    if (!gameover) {
        cellFlip(_this);
        count += 1;
        // _this.style.backgroundColor = 'rgb(209, 110, 110, 0.4)';
        if (circleFirst) {
            checkRow(circle, _this);
            checkColumn(circle, _this);
            checkDiag(circle, _this);
        } else {
            checkRow(cross, _this);
            checkColumn(cross, _this);
            checkDiag(cross, _this);
        };
        if (count === (inputBoardDimensions * inputBoardDimensions) && !gameover) {
            querySetAnimation('.board', 'disappear');
            querySetAnimation('header h1', 'flyup');
            querySetAnimation('.draw', 'dropdown');
            console.log('draw'); 
            gameover = true;
        };
        // After click
        circleFirst = !circleFirst;
        _this.removeEventListener('click', cellClicking);
    };
};

// This function can be optimized: only if table size changed run this function
const createGamingBoard = function () {
    // Remove previous gaming board
    const previousBoard = document.querySelector('.board');
    if (previousBoard) {
        previousBoard.remove();
    };

    // Create new gaming board
    root.style.setProperty('--board-height', inputBoardSize + 'vh');
    const wrap = document.querySelector('.wrap');
    const gamingBoardNode = document.createElement('div');
    gamingBoardNode.setAttribute('class', 'board')
    const insertBeforeThisElement = document.querySelector('audio');
    wrap.insertBefore(gamingBoardNode, insertBeforeThisElement);
};

const createCell = function () {
    const board = document.querySelector('.board');

    // Create gaming cells inside gaming board
    root.style.setProperty('--board-dimension', inputBoardDimensions);
    for (let i = 0; i < inputBoardDimensions * inputBoardDimensions; i++) {
        board.innerHTML += '<div class="cell"></div>'
    };
};

const playClickSound = function () {
    sound.play();
};

// Variables declaration
let inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
let inputBoardSize = parseInt(document.querySelector('#board-size').value);
let circleFirst = true;
let gameover = false;
let count = 0;
let root = document.documentElement;
let oScore = 0;
let xScore = 0;
let inputs = document.querySelectorAll('.controler input');
const sound = document.querySelector('#click');
let winner = document.querySelector('.winner');

// Generate gaming board and bind gaming logics on it
const main = function (inputBoardDimensions) {
    createGamingBoard();
    createCell();
    winConditionStorage(circle, inputBoardDimensions);
    winConditionStorage(cross, inputBoardDimensions);
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        // Define cell's own row and column no.
        cells[i].row = Math.floor(i / inputBoardDimensions);
        cells[i].column = i % inputBoardDimensions;

        // Add onclick event for each cell and unbind after clicked
        cells[i].addEventListener('click', function cellOnClick () {
            document.querySelector('header h1').className = '';         // Hard code to reset title location
            document.querySelector('div.winning').className = 'hidetop winning';  
            document.querySelector('div.draw').className = 'hidetop draw';  
            cellClicking(this);
            playClickSound();
            this.removeEventListener('click', cellOnClick);
        });
    };
};

// Bind function to change gmaing board style
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', function inputChange () {
        resetBoard();
        matchSliderValueWithInputText(this);    // Bind function to input so slide input and text input can match each other
        inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
        inputBoardSize = parseInt(document.querySelector('#board-size').value);
        main(inputBoardDimensions);
    });
};

// Default gaming board
main(inputBoardDimensions);

const resetbutton = document.querySelector('.reset-button');
resetbutton.addEventListener('click', function(){
    winConditionStorage(circle, inputBoardDimensions);
    winConditionStorage(cross, inputBoardDimensions);
    resetBoard();
    inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
    main(inputBoardDimensions);
});