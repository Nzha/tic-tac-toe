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

const controller = (() => {
    const spaces = document.querySelectorAll('.space');
    const scoreDisplay = document.querySelector('.score-display')    

    spaces.forEach(space => space.addEventListener('click', display));

    player.X.active = 'true';

    function display(e) {
        // Return if space has already a mark
        if (e.target.textContent !== '') return;

        if (player.X.active) {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'X';
            e.target.textContent = 'X';
            e.target.style.color = '#ffd900';
            scoreDisplay.style.color = '#fa5c0c';
            scoreDisplay.textContent = `Player 0's turn`;
            player.X.active = false;
        } else {
            gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'O';
            e.target.textContent = 'O';
            e.target.style.color = '#fa5c0c';
            scoreDisplay.style.color = '#ffd900';
            scoreDisplay.textContent = `Player X's turn`;
            player.X.active = true;
        }
        console.table(gameboard.array);
        game.winner();
    }

    return {
        spaces,
        scoreDisplay,
        display
    };
})();

controller.display;

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
                    controller.scoreDisplay.textContent = 'Player X wins!'
                    break match;
                }
            }
            // Stop count incrementing when all 3 consecutive values are not on the same row or column
            _countRow = 0;
            _countColumn = 0;
        }
    };

    const reset = () => {
        const resetBtn = document.querySelector('#reset');

        resetBtn.addEventListener('click', function() {
            clearArray()
            clearDisplay()
        })

        function clearArray() {
            for (let i = 0; i < gameboard.array.length; i++) {
                for (let j = 0; j < gameboard.array[i].length; j++) {
                    gameboard.array[i][j] = '';
                }
            }
            console.table(gameboard.array);
        }

        function clearDisplay() {
            controller.spaces.forEach(space => {
                space.textContent = '';
            });

            controller.scoreDisplay.textContent = 'Please click on the board to start the game';
            controller.scoreDisplay.style.color = 'inherit';
        }
    };

    return {
        winner,
        reset
    };

})();

game.reset();