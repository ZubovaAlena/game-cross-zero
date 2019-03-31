
let cells = document.querySelectorAll('#field td');

for (let i = 0 ; i < cells.length ; i++) {
    cells[i].addEventListener("click", tdClick);
}

let currentPlayer = 'X';

function tdClick() {
    this.innerHTML = currentPlayer;
    if (currentPlayer === 'X'){
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    this.removeEventListener('click',tdClick);
    let winner = checkWinner(cells) === undefined ? false : checkWinner();
    let fullFields = fieldsFullness();
    if (!winner && fullFields){
        alert("ничья");
    }
}

function checkWinner(cells) {
    let combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];
    for (let i = 0; i < combinations.length; i++) {
        let combo = combinations[i];
        if(cells[combo[0]].innerHTML === cells[combo[1]].innerHTML && cells[combo[1]].innerHTML === cells[combo[2]].innerHTML && cells[combo[0]].innerHTML !== '' && cells[combo[0]].innerHTML === 'X'){
            alert("победили крестики");
            return true;
        }else if(cells[combo[0]].innerHTML === cells[combo[1]].innerHTML && cells[combo[1]].innerHTML === cells[combo[2]].innerHTML && cells[combo[0]].innerHTML !== '' && cells[combo[0]].innerHTML === 'O') {
            alert("победили нолики");
            return true;
        }
    }
}

function fieldsFullness() {
    let full = true;
    for (let i = 0; i < cells.length; i++){
        if(cells[i].innerHTML === ''|| cells[i].innerHTML === ''){
            full = false;
        }
    } return full;
}