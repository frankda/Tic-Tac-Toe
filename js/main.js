const inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
boardDimension = 3;
const cells = document.querySelectorAll('.cell');
let switchToggler = true;

const cellFlip = function (_this) {
    const div = document.createElement('div');
    if (switchToggler) {
        div.setAttribute('class', 'circle');
    } else {
        div.setAttribute('class', 'cross');
    }
    _this.appendChild(div);
    _this.removeEventListener('click', cellFlip);
};

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

const checkRow = function (side, _this) {
    side.row[_this.row] += 1;
    for (let i = 0; i < Object.keys(side.row).length; i++) {
        if (side.row[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`win`);
        };
    };
};

const checkColumn = function (side, _this) {
    side.column[_this.column] += 1;
    for (let i = 0; i < Object.keys(side.column).length; i++) {
        if (side.column[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`win`);
        };
    };
};

const checkDiag = function (side, _this) {
    if (_this.row === _this.column) {
        side.posDiag += 1;
    };
    if ((_this.row + _this.column) === 2) {
        side.negDiag += 1;
    }
    if (side.posdiag === 3 || side.negDiag === 3) {
        console.log('win'); 
    }
};

const cellClicking = function (_this) {
    _this.style.backgroundColor = 'rgb(209, 110, 110, 0.4)';
    if (switchToggler) {
        checkRow(circle, _this);
        checkColumn(circle, _this);
        checkDiag(circle, _this);
    } else {
        checkRow(cross, _this);
        checkColumn(cross, _this);
        checkDiag(cross, _this);
    };
    // After click
    switchToggler = !switchToggler;
    _this.removeEventListener('click', cellClicking);
    console.log('haha');
    
};

// Start
for (let i = 0; i < cells.length; i++) {
    // Define row and column for each cell
    cells[i].row = Math.floor(i / 3);
    cells[i].column = i % 3;

    // Bind onclick event to each cell
    cells[i].addEventListener('click', function () {
        cellClicking(this);
        cellFlip(this);
        // this.removeEventListener('click', arguments.callee);
    });
};