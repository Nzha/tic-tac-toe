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
    const _gameModeContainer = document.querySelector('.game-mode-container')
    const _gameModes = document.querySelectorAll('.game-mode')
    const _pvp = document.querySelector('#pvp')
    const _pvai = document.querySelector('#pvai')
    const _gameContainer = document.querySelector('.game-container');
    const _menu = document.querySelector('#menu');
    const spaces = document.querySelectorAll('.space');
    const turn = document.querySelector('.turn');

    _gameModes.forEach(_gameMode => _gameMode.addEventListener('click', _display));
    spaces.forEach(space => space.addEventListener('click', update));
    _menu.addEventListener('click', _backToMenu)

    function _display() {
        _gameModeContainer.style.display = 'none';
        _gameContainer.style.display = 'flex';
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
            turn.style.color = '#fa5c0c';
            turn.textContent = `Player O's turn`;
            player.X.active = false;
        } else {
            gameboard.array[`${e.target.dataset.index}`] = 'O';
            e.target.textContent = 'O';
            e.target.style.color = '#fa5c0c';
            turn.style.color = '#ffd900'
            turn.textContent = `Player X's turn`;
            player.X.active = true;
        }

        if (game.winner()) {
            if (game.winner() === 'X') {
                turn.style.color = '#ffd900';
                turn.textContent = 'Player X won!';
            } else {
                turn.style.color = '#fa5c0c';
                turn.textContent = 'Player O won!';
            }

            // Disable click on gameboard
            gameboard.div.style.pointerEvents = 'none';
        }

        if (game.tie()) {
            turn.style.color = 'lightgrey';
            turn.textContent = `It's a tie!`;
        }
    }

    function _backToMenu() {
        game.reset();
        _gameContainer.style.display = 'none';
        _gameModeContainer.style.display = 'flex';
    }

    return {
        spaces,
        turn,
        update
    };
})();

userInterface.update;

const game = (() => {
    const _resetBtn = document.querySelector('#reset');

    _resetBtn.addEventListener('click', reset);

    const winner = () => {
        /**
        * Indexes within the game board
        * [0] [1] [2]
        * [3] [4] [5]
        * [6] [7] [8]
        */
        
        const _winningCombinations = [
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

        let _winner = null;            

        _winningCombinations.forEach((winningCombination, index) => {
            // Win if there is a mark in index 0 and it matches the marks in indexes 1 and 2.
            if (gameboard.array[winningCombination[0]]
                && gameboard.array[winningCombination[0]] === gameboard.array[winningCombination[1]]
                && gameboard.array[winningCombination[0]] === gameboard.array[winningCombination[2]])
                {
                _winner = gameboard.array[winningCombination[0]];
            }
        });
        return _winner;
    };

    const tie = () => {
        const _hasMarks = (el) => el !== '';
        if (gameboard.array.every(_hasMarks) && (!winner())) return true;
    };

    function reset() { 
        function _array() {
            for (let i = 0; i < gameboard.array.length; i++) {
                gameboard.array[i] = '';
            }
        }

        function _display() {
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

        _array();
        _display();
    }

    return {
        winner,
        tie,
        reset
    };

})();

game.reset();

const ai = (() => {

})();