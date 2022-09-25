const Player = (mark) => {
    let score = 0;
    return {mark, score} ;
}

const playerX = Player('X');
const playerO = Player('O');

const gameboard = (() => {
    const _gameboard = document.querySelector('.gameboard');

    const array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];

    let _row = 0;
    let _column = 0;

    // Create space div to display gameboard and save row and column # to data attribute
    const display = () => {
        for (const row of array) {
            for (space of row) {
                const newSpace = document.createElement('div');
                newSpace.classList.add('space');
                newSpace.setAttribute('data-row', `${_row}`)
                newSpace.setAttribute('data-column', `${_column}`)
                _gameboard.appendChild(newSpace);
                
                (_column > 1) ? _column = 0 : _column++;
            }
            _row++;
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
        // Return if space has already a mark
        if (e.target.textContent !== '') return;

        if (playerX.active) {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'X';
            e.target.textContent = 'X';
            playerX.active = false;
        } else {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'O';
            e.target.textContent = 'O';
            playerX.active = true;
        }
        // console.table(gameboard.array);



        let countRow = 0;
        let countColumn = 0;
        let countDiagonalLeft = 0;
        let countDiagonalRight = 0;

        match:
        for (let i = 0; i < gameboard.array.length; i++) {
            for (let j = 0; j < gameboard.array[i].length; j++) {
                // Check matches horizontally
                if (gameboard.array[i][j] == 'X') {
                    countRow++
                } else { 
                    countRow = 0;
                }
                // Check matches vertically
                if (gameboard.array[j][i] == 'X') {
                    countColumn++
                } else {
                    countColumn = 0;
                }
                // Check matches diagonally
                if (gameboard.array[i][j] == 'X' && i == j) {
                    countDiagonalLeft++
                }
                if (gameboard.array[i][j] == 'X' && (i + j) == 2) {
                    countDiagonalRight++
                }
                // Display result
                if (countRow == 3 || countColumn == 3 || countDiagonalLeft == 3 || countDiagonalRight == 3) {
                    console.log('wins!');
                    break match;
                }
            }
            // Stop count incrementing when all 3 consecutive values are not on the same row or column
            countRow = 0;
            countColumn = 0;
        }

    }


    return {
        display
    };
})();

displayController.display;

const game = (() => {
    
})();