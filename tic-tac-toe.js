let socket = io('ws://localhost:3001');
console.log(socket);
socket.on('action', (data) => {
    let idRoom = document.querySelector('#idRoom');
    idRoom.innerHTML = data.data.id;
    console.log(data);
});

let inputRoom;
let buttonInputRoom = document.querySelector('#buttonInputRoom');
buttonInputRoom.addEventListener('click', function(e) {
    inputRoom = document.querySelector('#inputRoom').value;
    socket.emit('action', {
        type: 'connectToRoom',
        data: {
            roomId: inputRoom,
            cb: function (data) {
                console.log(data);
            }
        }
    });
    document.querySelector('#inputRoom').value = '';
});

let clientId;
socket.on('action', ({ type = 'gameStart', data = {} }) =>{
    if (type === 'gameStart' && data.client.id !== undefined){
        clientId = data.client.id;
        inputRoom = data.id;
        document.getElementById("roomInput").hidden = true;
    }

});

let button = document.querySelector('#button');
button.addEventListener('click', function(e) {
    let value = document.querySelector('#input').value;
    socket.emit('action', {
        type: 'message',
        value: value,
        data: {
            roomId: inputRoom,
            message: value,
            cb: function(data){
                console.log(data);

            }
        }
    });
    document.querySelector('#input').value = '';
});

socket.on('action', ({ type = 'newMessage', data = {} }) =>{
    if (data.message === undefined || data.message === null) {
        return;
    }
    let newLi = document.createElement('li');
    newLi.innerHTML = data.message;
    list.appendChild(newLi);
});

document.querySelector('table').onclick = (event) => {
    let cell = event.target;
    if (cell.tagName.toLowerCase() != 'td')
        return;
    let line = cell.parentNode.rowIndex;
    let column = cell.cellIndex;

    socket.emit('action', {
        type: 'doStep',
        data: {
            roomId: inputRoom,
            row: line,
            cell: column,
            cb: function (data) {
                console.log(data);
            }
        }
    })
};

let cells = document.querySelectorAll('#field td');
let currentPlayer = 'x';
startGame(cells);

function startGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', tdClick);
    }
}
function tdClick() {
    this.innerHTML = currentPlayer;
    if (currentPlayer === 'x') {
        currentPlayer = 'o';
    } else {
        currentPlayer = 'X';
    }
}

socket.on('action', ({type = 'updateField', data = {}}) => {
    if (type === 'updateField') {
        let arr = [];
        arr[0] = data[0][0];
        arr[1] = data[0][1];
        arr[2] = data[0][2];
        arr[3] = data[1][0];
        arr[4] = data[1][1];
        arr[5] = data[1][2];
        arr[6] = data[2][0];
        arr[7] = data[2][1];
        arr[8] = data[2][2];
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerHTML = arr[i].val;
        }
    }
});

let newGame = document.querySelector('#newGame');
newGame.addEventListener('click', function(e) {
    socket.emit('action', {
        type: 'newGame',
        data: {
            roomId: inputRoom,
            cb: function (data) {
                console.log(data);
            }
        }
    });
    div.removeChild(div);
});

let div = document.createElement('div');
socket.on('action', ({type = 'switchCurrentPlayer', data = {}}) => {
    if (type === 'switchCurrentPlayer'){
        let isCurrent = data.isCurrent;
        if (isCurrent === true) {
            div.innerHTML = "<h1>Ура! ваш ход!</h1>";
            document.querySelector('#tic-tac').appendChild(div);
            for (let i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', tdClick);
            }
        } else {
            div.innerHTML = "<h1>Ход соперника!</h1>";
            document.querySelector('#tic-tac').appendChild(div);
            for (let i = 0; i < cells.length; i++) {
                cells[i].removeEventListener('click', tdClick);
            }
        }
    }
});

socket.on('action', ({type = 'gameOver', data = {}}) => {
    if (type === 'gameOver'){
        let winnerId = data.winnerId;
        console.log(winnerId);
        if (clientId === winnerId){
            alert("Победили крестики!")
        } else {
            alert("Победили нолики!")
        }
    }
});