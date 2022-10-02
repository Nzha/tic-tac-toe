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
    const div = document.querySelector('.gameboard');

    let array = [
        '', '', '',
        '', '', '',
        '', '', ''
        ];

    let _index = 0;

    // Create space div to display gameboard and save row and column # to data attribute
    const display = () => {
        for (const row of array) {
            const newSpace = document.createElement('div');
            newSpace.classList.add('space');
            newSpace.setAttribute('data-index', `${_index}`)
            div.appendChild(newSpace);
            _index++;
        }
    };

    return {
        div,
        array,
        display
    };
})();

gameboard.display();

const userInterface = (() => {
    const pvp = document.querySelector('#pvp')
    const gameModeContainer = document.querySelector('.game-mode-container')
    const gameContainer = document.querySelector('.game-container');
    const spaces = document.querySelectorAll('.space');
    const turn = document.querySelector('.turn');
    const menu = document.querySelector('#menu');

    pvp.addEventListener('click', display)
    spaces.forEach(space => space.addEventListener('click', update));
    menu.addEventListener('click', backToMenu)

    function display() {
        gameModeContainer.style.display = 'none';
        gameContainer.style.display = 'flex';
    }

    player.X.active = 'true';
    turn.textContent = `Player X's turn`;
    turn.style.color = '#ffd900'

    function update(e) {
        // Return if space has already a mark
        if (e.target.textContent !== '') return;

        if (player.X.active) {
            gameboard.array[`${e.target.dataset.index}`] = 'X';
            e.target.textContent = 'X';
            e.target.style.color = '#ffd900';
            turn.textContent = `Player O's turn`;
            turn.style.color = '#fa5c0c'
            player.X.active = false;
        } else {
            gameboard.array[`${e.target.dataset.index}`] = 'O';
            e.target.textContent = 'O';
            e.target.style.color = '#fa5c0c';
            turn.textContent = `Player X's turn`;
            turn.style.color = '#ffd900'
            player.X.active = true;
        }

        let winner = game.winner();

        if (winner) {
            if (winner === 'X') {
                turn.textContent = 'Player X won!';
                turn.style.color = '#ffd900'
            } else {
                turn.textContent = 'Player O won!';
                turn.style.color = '#fa5c0c'
            }

            // Disable click on gameboard
            gameboard.div.style.pointerEvents = 'none';
        }
    }

    function backToMenu() {
        game.reset();
        gameContainer.style.display = 'none';
        gameModeContainer.style.display = 'flex';
    }

    return {
        spaces,
        turn,
        update
    };
})();

userInterface.update;

const game = (() => {
    const resetBtn = document.querySelector('#reset');
    resetBtn.addEventListener('click', reset);

    function reset() { 
        function clearArray() {
            for (let i = 0; i < gameboard.array.length; i++) {
                gameboard.array[i] = '';
            }
        }

        function clearDisplay() {
            userInterface.spaces.forEach(space => {
                space.textContent = '';
            });

            gameboard.div.style.pointerEvents = 'auto';

            if (player.X.active) {
                userInterface.turn.textContent = `Player X's turn`;
                userInterface.turn.style.color = '#ffd900';
            } else {
                userInterface.turn.textContent = `Player O's turn`;
                userInterface.turn.style.color = '#fa5c0c';
            }
        }

        clearArray();
        clearDisplay();
    }

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
        return winner;
    };

    return {
        winner,
        reset
    };

})();

game.reset();