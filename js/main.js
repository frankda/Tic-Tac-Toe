const circle = {
    row: {0: 0, 1: 0, 2: 0},
    column: {0: 0, 1: 0, 2: 0},
    posDiag: 0,
    negDiag: 0
};

const cross = {
    row: {0: 0, 1: 0, 2: 0},
    column: {0: 0, 1: 0, 2: 0},
    posDiag: 0,
    negDiag: 0
};

// const winConditionStorage = function (shape, inputBoardDimensions) {
//     for (let i = 0; i < inputBoardDimensions; i++) {
//         shape.row.i = 0;
//         shape.column.i = 0;
//         shape.posDiag = 0;

//     }
// };

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
    side.row[_this.row] += 1;
    for (let i = 0; i < Object.keys(side.row).length; i++) {
        if (side.row[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`win`);
            gameover = true;
        };
    };
};

const checkColumn = function (side, _this) {
    side.column[_this.column] += 1;
    for (let i = 0; i < Object.keys(side.column).length; i++) {
        if (side.column[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`win`);
            gameover = true;
        };
    };
};

const checkDiag = function (side, _this) {
    if (_this.row === _this.column) {
        side.posDiag += 1;
    };
    if ((_this.row + _this.column) === 2) {
        side.negDiag += 1;
    };
    if (side.posDiag === 3 || side.negDiag === 3) {
        console.log('win'); 
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
        if (count === 9) {
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

// Variables declaration
const inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
boardDimension = 3;
let circleFirst = true;
let gameover = false;
let count = 0;
let root = document.documentElement;



createCell(3);
const cells = document.querySelectorAll('.cell');

// Start

for (let i = 0; i < cells.length; i++) {
    // Define cell's own row and column no.
    cells[i].row = Math.floor(i / 3);
    cells[i].column = i % 3;

    // Add onclick event for each cell and unbind after clicked
    cells[i].addEventListener('click', function cellOnClick () {
        cellClicking(this);
        this.removeEventListener('click', cellOnClick);
    });
};

