const cells = Array.from(document.querySelectorAll('.cells'));
const button = document.querySelector('.buttonRemove');
const result = document.querySelector('.result');

let currentPlayer = 'X', nextPlayer = 'O';
let player = currentPlayer;

function startGame() {
    cells.map(cell => {
        cell.addEventListener('click', (e) => {
            if (e.target.innerText == '') {
                e.target.innerText = player;
                
                if (checkedWin()) {
                    result.classList.add('animate');
                    result.innerText = `${player} won`;
                }

                changed();
            }
        });
    });
}

function changed() {
    if (player == currentPlayer)
        player = nextPlayer;
    else
        player = currentPlayer;
}

function checkedWin() {
    let winCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winCombo.length; i++) {
        let [pos1, pos2, pos3] = winCombo[i];

        if (cells[pos1].innerText != '' && cells[pos1].innerText == cells[pos2].innerText && cells[pos2].innerText == cells[pos3].innerText)
            return true;
    }

    return false;
}

function restart() {
    cells.forEach(cell => cell.innerText = '');

    result.classList.remove('animate');

    startGame();
}

button.addEventListener('click', restart);

startGame();