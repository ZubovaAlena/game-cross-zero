
let cells = document.querySelectorAll('#field td');

for (let i = 0 ; i < cells.length ; i++) {
    cells[i].addEventListener("click", tdClick);
}

let currentPayer = 'X';

function tdClick() {
    this.innerHTML = currentPayer;
    if (currentPayer === 'X'){
        currentPayer = 'O';
    } else {
        currentPayer = 'X';
    }
    this.removeEventListener('click',tdClick)
}

