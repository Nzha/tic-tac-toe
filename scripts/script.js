const gameboard = (() => {

    const gameboardDiv = document.querySelector('.gameboard');

    // Create a 3*3 array with 0 as values
    const array = new Array(3).fill(new Array(3).fill(0));

    // Add a div to each space to display gameboard
    const display = () => {
        for (const row of array) {
            for (space of row) {
                const newSpace = document.createElement('div');
                newSpace.classList.add('space');
                gameboardDiv.appendChild(newSpace);
            }
        }
    };

    return {
        display
    };

})();

gameboard.display();