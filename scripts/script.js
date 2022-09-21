const Player = (name) => {
    let score = 0;
    return {name, score} ;
}

const playerX = Player('X');
const playerO = Player('O');

const gameboard = (() => {
    const _gameboard = document.querySelector('.gameboard');

    const array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];

    let row = 0;
    let column = 0;

    // Add a div to each space to display gameboard
    const display = () => {
        for (const rows of array) {
            for (space of rows) {
                const newSpace = document.createElement('div');

                newSpace.classList.add('space');
                newSpace.setAttribute('data-row', `${row}`)
                newSpace.setAttribute('data-column', `${column}`)
                _gameboard.appendChild(newSpace);
                
                (column > 1) ? column = 0 : column++;
            }
            row++;
        }
    };

    return {
        array,
        display
    };
})();

gameboard.display();

const displayController = (() => {
    const _spaces = document.querySelectorAll('.space');

    _spaces.forEach(space => space.addEventListener('click', display));

    playerX.active = 'true';

    function display(e) {
        if (playerX.active) {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'X';
            e.target.textContent = 'X';
            playerX.active = false;
        } else {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'O';
            e.target.textContent = 'O';
            playerX.active = true;
        }
        console.table(gameboard.array);
    }

    return {
        display
    };
})();

displayController.display;

const game = (() => {
    
})();