
let cells = document.querySelectorAll('#field td');

for (let i = 0 ; i < cells.length ; i++) {
    cells[i].addEventListener("click", tdClick);
}

function tdClick() {
    if (this.innerHTML === 'X') {
        this.innerHTML = '';
    } else {
        this.innerHTML = 'X';
    }
    return false;
}

