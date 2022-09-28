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

    // const array = [
    //     ['', '', ''],
    //     ['', '', ''],
    //     ['', '', '']
    //   ];

    let array = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];

    let _row = 0;
    let _column = 0;

    // // Create space div to display gameboard and save row and column # to data attribute
    // const display = () => {
    //     for (const row of array) {
    //         for (space of row) {
    //             const newSpace = document.createElement('div');
    //             newSpace.classList.add('space');
    //             newSpace.setAttribute('data-row', `${_row}`)
    //             newSpace.setAttribute('data-column', `${_column}`)
    //             _gameboard.appendChild(newSpace);
                
    //             (_column > 1) ? _column = 0 : _column++;
    //         }
    //         _row++;
    //     }
    // };



    // Create space div to display gameboard and save row and column # to data attribute
    const display = () => {
        for (const row of array) {
            const newSpace = document.createElement('div');
            newSpace.classList.add('space');
            // newSpace.setAttribute('data-row', `${_row}`)
            // newSpace.setAttribute('data-column', `${_column}`)
            newSpace.setAttribute('data-row', `${_row}`)
            _gameboard.appendChild(newSpace);
            
            (_column > 1) ? _column = 0 : _column++;
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
            // gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'X';
            gameboard.array[`${e.target.dataset.row}`] = 'X';
            e.target.textContent = 'X';
            e.target.style.color = '#ffd900';
            scoreDisplay.style.color = '#fa5c0c';
            scoreDisplay.textContent = `Player 0's turn`;
            player.X.active = false;
        } else {
            // gameboard.array[`${e.target.dataset.row}`][`${e.target.dataset.column}`] = 'O';
            gameboard.array[`${e.target.dataset.row}`] = 'O';
            e.target.textContent = 'O';
            e.target.style.color = '#fa5c0c';
            scoreDisplay.style.color = '#ffd900';
            scoreDisplay.textContent = `Player X's turn`;
            player.X.active = true;
        }
        // console.table(gameboard.array);
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

        /**
        * Indexes within the game board
        * [0] [1] [2]
        * [3] [4] [5]
        * [6] [7] [8]
        */
        
        const winningCombinations = [
            // Rows
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Columns
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            
            // Diagonals
            [0, 4, 8],
            [2, 4, 6]
          ];

        let winner = null;            

        winningCombinations.forEach((winningCombination, index) => {
            // Win if there is a mark in index 0 and it matches the marks in indexes 1 and 2.
            if (gameboard.array[winningCombination[0]]
                && gameboard.array[winningCombination[0]] === gameboard.array[winningCombination[1]]
                && gameboard.array[winningCombination[0]] === gameboard.array[winningCombination[2]])
                {
                winner = gameboard.array[winningCombination[0]];
            }
        });

        console.log(winner);
        return winner;


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
            // console.table(gameboard.array);
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