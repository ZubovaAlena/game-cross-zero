document.querySelector('#name_player111').innerHTML = localStorage.getItem('nameOnePlayer');
document.querySelector('#name_player222').innerHTML = localStorage.getItem('nameTwoPlayer');
let winCounterOnePlayer = 0;
let winCounterTwyPlayer = 0;

document.addEventListener('DOMContentLoaded', function() {

    let modalButtons = document.querySelectorAll('.js-open-modal'),
        overlay      = document.querySelector('.js-overlay-modal'),
        closeButtons = document.querySelectorAll('.js-modal-close');

    modalButtons.forEach(function(item){

        item.addEventListener('click', function(e) {

            let modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function(item){
        item.addEventListener('click', function(e) {
            let parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
});

function makeCounter() {
    let counter = document.getElementById('count').innerHTML;
    counter++;
    document.getElementById('count').innerHTML = counter;
    localStorage.setItem('counter', counter);
}

let cells = document.querySelectorAll('#field td');
let currentPlayer = 'X';
startGame(cells);

function startGame() {
    for (let i = 0 ; i < cells.length ; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', tdClick);
    }
}
function tdClick() {
    this.innerHTML = currentPlayer;
    if (currentPlayer === 'X'){
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    let element1 = document.getElementById('name_player111');
    let element2 = document.getElementById('name_player222');
    if (currentPlayer === 'X') {
        element1.classList.add('css-class-player');
        element2.classList.remove('css-class-player');
    }
    if (currentPlayer === 'O') {
        element2.classList.add('css-class-player');
        element1.classList.remove('css-class-player');
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
            localStorage.setItem('winCounter1', ++winCounterOnePlayer);
            document.getElementById('name_player1').innerHTML = winCounterOnePlayer;
            alert("победили крестики");
            return true;
        }else if(cells[combo[0]].innerHTML === cells[combo[1]].innerHTML && cells[combo[1]].innerHTML === cells[combo[2]].innerHTML && cells[combo[0]].innerHTML !== '' && cells[combo[0]].innerHTML === 'O') {
            localStorage.setItem('winCounter2', ++winCounterTwyPlayer);
            document.getElementById('name_player2').innerHTML = winCounterTwyPlayer;
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

let restart = document.querySelector('#restart');
restart.addEventListener('click', restartGame);

function restartGame() {
    startGame();
}


let bottomOne = document.getElementById('bottom_onePlayer');
let bottomTwo = document.getElementById('bottom_twoPlayer');
bottomOne.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://randomfox.ca/floof/');
    xhr.onload = function () {
        let jsonResponse = xhr.response;
        document.querySelector("#myImage_onePlayer").src = jsonResponse['image'];
    };
    xhr.send();
});

bottomTwo.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://randomfox.ca/floof/');
    xhr.onload = function () {
        let jsonResponse = xhr.response;
        document.querySelector("#myImage_twoPlayer").src = jsonResponse['image'];
    };
    xhr.send();
});