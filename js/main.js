// const boardDimension = document.querySelector('#board-dimension');
boardDimension = 3;
const cells = document.querySelectorAll('.cell');
let switchToggler = true;

const circle = {
    row: {0: 0, 1: 0, 2: 0},
    column: {0: 0, 1: 0, 2: 0},
    diag: 0
};

const cross = {
    row: {
        0: 0,
        1: 0,
        2: 0
    }
};

const checkRow = function (side) {
    for (let i = 0; i < Object.keys(side.row).length; i++) {
        if (side.row[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`${side} win`);
        };
    };
};

const checkColumn = function (side) {
    for (let i = 0; i < Object.keys(side.column).length; i++) {
        if (side.column[i] === 3) {    // 3 could be changed to variables if needed
            console.log(`win`);
        };
    };
};

const checkDiag = function (side) {
    if (side.diag === 3) {
        console.log('win');
        
    }
};

const clickOnCell = function () {
    this.style.backgroundColor = 'rgb(209, 110, 110, 0.4)';
    if (switchToggler) {
        circle.row[this.row] += 1;
        circle.column[this.column] += 1;
        if (this.row === this.column) {
            circle.diag += 1;
        };
        checkRow(circle);
        checkColumn(circle);
        checkDiag(circle);
    } else {
        cross.row[this.row] += 1;
    };
    console.log(this.row +'' +this.column);
    

    // After click
    switchToggler = !switchToggler;
    this.removeEventListener('click', clickOnCell);
};


// Start
for (let i = 0; i < cells.length; i++) {
    // Define row and column for each cell
    cells[i].row = Math.floor(i / 3);
    cells[i].column = i % 3;

    // Bind onclick event to each cell
    cells[i].addEventListener('click', clickOnCell);
};