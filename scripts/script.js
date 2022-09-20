const Player = (name) => {
    let score = 0;
    return {name, score} ;
}

const playerX = Player('X');
const playerO = Player('O');

const gameboard = (() => {
    const _gameboard = document.querySelector('.gameboard');

    // Create a 3*3 array with 0 as values
    const _array = new Array(3).fill(new Array(3).fill(0));

    // Add a div to each space to display gameboard
    const display = () => {
        for (const row of _array) {
            for (space of row) {
                const newSpace = document.createElement('div');
                newSpace.classList.add('space');
                _gameboard.appendChild(newSpace);
            }
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

    function display() {
        console.log('works');
    }
})();
