const circle = {};
const cross = {};

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
    gameover = false;
    count = 0;
    circleFirst = true;
};

const getScore =function () {
    if (circleFirst) {
        oScore += 1;
        const circleMessage = document.querySelector('.player-o p');
        circleMessage.textContent = oScore;
    } else {
        xScore += 1;
        const crossMessage = document.querySelector('.player-x p');
        crossMessage.textContent = xScore;
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
            gameover = true;
        };
    };
};

const checkColumn = function (side, _this) {
    side.column[_this.column] += 1;
    for (let i = 0; i < Object.keys(side.column).length; i++) {
        if (side.column[i] === inputBoardDimensions) {    // 3 could be changed to variables if needed
            getScore();
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
        if (count === (inputBoardDimensions * inputBoardDimensions)) {
            console.log('draw'); 
            gameover = true;
        };
        // After click
        circleFirst = !circleFirst;
        _this.removeEventListener('click', cellClicking);
    };
};

const createCell = function (inputBoardDimensions) {
    root.style.setProperty('--board-dimension', inputBoardDimensions);
    const wrap = document.querySelector('.board');
    for (let i = 0; i < inputBoardDimensions * inputBoardDimensions; i++) {
        wrap.innerHTML += '<div class="cell"></div>'
    };
};

const playClickSound = function () {
    sound.play();
};

// Variables declaration
let inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
let circleFirst = true;
let gameover = false;
let count = 0;
let root = document.documentElement;
let oScore = 0;
let xScore = 0;
const sound = document.querySelector('#click');

const main = function (inputBoardDimensions) {
    createCell(inputBoardDimensions);
    winConditionStorage(circle, inputBoardDimensions);
    winConditionStorage(cross, inputBoardDimensions);
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        // Define cell's own row and column no.
        cells[i].row = Math.floor(i / inputBoardDimensions);
        cells[i].column = i % inputBoardDimensions;

        // Add onclick event for each cell and unbind after clicked
        cells[i].addEventListener('click', function cellOnClick () {
            cellClicking(this);
            playClickSound();
            this.removeEventListener('click', cellOnClick);
        });
    };
};

main(inputBoardDimensions);

const boardDimensionInput = document.querySelector('#board-dimension');
boardDimensionInput.addEventListener('input', function(){
    resetBoard();
    inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
    main(inputBoardDimensions);
});

const resetbutton = document.querySelector('.reset-button');
resetbutton.addEventListener('click', function(){
    winConditionStorage(circle, inputBoardDimensions);
    winConditionStorage(cross, inputBoardDimensions);
    resetBoard();
    inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
    main(inputBoardDimensions);
});