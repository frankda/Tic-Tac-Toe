const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function(){
        this.style.backgroundColor = 'green';
    });
};