const inputBoardDimensions = parseInt(document.querySelector('#board-dimension').value);
boardDimension = 3;
const cells = document.querySelectorAll('.cell');
let switchToggler = true;

const cellFlip = function () {
    const div = document.createElement('div');
    if (switchToggler) {
        div.setAttribute('class', 'circle');
    } else {
        div.setAttribute('class', 'cross');
    }
    this.appendChild(div);
    console.log('clicking: ' + this.row + this.column);
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
    if (side.posdiag === 3 || side.negDiag === 3) {
        console.log('win'); 
    }
};

const cellClicking = function () {
    this.style.backgroundColor = 'rgb(209, 110, 110, 0.4)';
    if (switchToggler) {
        circle.row[this.row] += 1;
        circle.column[this.column] += 1;
        if (this.row === this.column) {
            circle.posDiag += 1;
        };
        if ((this.row + this.column) === 2) {
            circle.negDiag += 1;
        }
        checkRow(circle);
        checkColumn(circle);
        checkDiag(circle);
    } else {
        cross.row[this.row] += 1;
        cross.column[this.column] += 1;
        if (this.row === this.column) {
            cross.posDiag += 1;
        };
        if ((this.row + this.column) === 2) {
            cross.negDiag += 1;
        }
        checkRow(cross);
        checkColumn(cross);
        checkDiag(cross);
    };
    console.log(this.row +'' +this.column);
    

    // After click
    switchToggler = !switchToggler;
    this.removeEventListener('click', cellClicking);
};

// Start
for (let i = 0; i < cells.length; i++) {
    // Define row and column for each cell
    cells[i].row = Math.floor(i / 3);
    cells[i].column = i % 3;

    // Bind onclick event to each cell
    cells[i].addEventListener('click', function () {
        let _this = this;
        cellClicking();
    });
    // cells[i].addEventListener('click', cellFlip);
};