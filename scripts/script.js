const Player = (name) => {
    let score = 0;
    return {name, score} ;
}

const playerX = Player('X');
const playerO = Player('O');

const gameboard = (() => {
    const _gameboard = document.querySelector('.gameboard');
    
    let row = 0;
    let column = 0;

    // Create a 3*3 array with 0 as values
    const _array = new Array(3).fill(new Array(3).fill(0));

    // Add a div to each space to display gameboard
    const display = () => {
        for (const rows of _array) {
            for (space of rows) {
                const newSpace = document.createElement('div');
                newSpace.classList.add('space');
                newSpace.setAttribute('id', `${row} ${column}`)
                _gameboard.appendChild(newSpace);
                
                (column > 1) ? column = 0 : column++;
            }
            row++;
        }
    };

    return {
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
            console.log(e);
            e.target.textContent = 'X';
            playerX.active = false;
        } else {
            e.target.textContent = 'O';
            playerX.active = true;
        }
    }

    return {
        display
    };
})();

displayController.display;