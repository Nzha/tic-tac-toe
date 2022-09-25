// Set up players
const player = (() => {
    const _Player = (mark) => {
        let score = 0;
        return {mark, score} ;
    }
    
    const X = _Player('X');
    const O = _Player('O');

    return {
        X,
        O
    }
})();

// Setup gameboard and display it on webpage
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

// Display marks on gameboard
const displayController = (() => {
    const _spaces = document.querySelectorAll('.space');

    _spaces.forEach(space => space.addEventListener('click', display));

    player.X.active = 'true';

    function display(e) {
        // Return if space has already a mark
        if (e.target.textContent !== '') return;

        if (player.X.active) {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'X';
            e.target.textContent = 'X';
            player.X.active = false;
        } else {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'O';
            e.target.textContent = 'O';
            player.X.active = true;
        }
        // console.table(gameboard.array);

        game.winner();
    }

    return {
        display
    };
})();

displayController.display;

// Get winner
const game = (() => {

    const winner = () => {

        let _countRow = 0;
        let _countColumn = 0;
        let _countDiagonalLeft = 0;
        let _countDiagonalRight = 0;

        match:
        for (let i = 0; i < gameboard.array.length; i++) {
            for (let j = 0; j < gameboard.array[i].length; j++) {
                // Check matches horizontally
                if (gameboard.array[i][j] == 'X') {
                    _countRow++
                } else { 
                    _countRow = 0;
                }
                // Check matches vertically
                if (gameboard.array[j][i] == 'X') {
                    _countColumn++
                } else {
                    _countColumn = 0;
                }
                // Check matches diagonally
                if (gameboard.array[i][j] == 'X' && i == j) {
                    _countDiagonalLeft++;
                }
                if (gameboard.array[i][j] == 'X' && (i + j) == 2) {
                    _countDiagonalRight++;
                }
                // Display result
                if (_countRow == 3 || _countColumn == 3 || _countDiagonalLeft == 3 || _countDiagonalRight == 3) {
                    console.log('wins!');
                    break match;
                }
            }
            // Stop count incrementing when all 3 consecutive values are not on the same row or column
            _countRow = 0;
            _countColumn = 0;
        }
    };

    return {
        winner
    };

})();