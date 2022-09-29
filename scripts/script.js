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

const controller = (() => {
    const spaces = document.querySelectorAll('.space');
    const players = document.querySelector('.players')  
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');

    spaces.forEach(space => space.addEventListener('click', display));

    player.X.active = 'true';

    function display(e) {
        // Return if space has already a mark
        if (e.target.textContent !== '') return;

        if (player.X.active) {
            gameboard.array[`${e.target.dataset.index}`] = 'X';
            e.target.textContent = 'X';
            e.target.style.color = '#ffd900';
            player2.style.backgroundColor = 'black';
            player1.style.backgroundColor = '#212628';
            player.X.active = false;
        } else {
            gameboard.array[`${e.target.dataset.index}`] = 'O';
            e.target.textContent = 'O';
            e.target.style.color = '#fa5c0c';
            player1.style.backgroundColor = 'black';
            player2.style.backgroundColor = '#212628';
            player.X.active = true;
        }

        let winner = game.winner();

        if (winner) {
            if (winner === 'X') {
                controller.players.style.color = '#ffd900'
            } else {
                controller.players.style.color = '#fa5c0c';
            }

            // Disable click on gameboard
            gameboard.div.style.pointerEvents = 'none';
        }
    }

    return {
        spaces,
        players,
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
                gameboard.array[i] = '';
            }
        }

        function clearDisplay() {
            controller.spaces.forEach(space => {
                space.textContent = '';
            });

            gameboard.div.style.pointerEvents = 'auto';
            controller.players.style.color = 'inherit';
            player.X.active = 'true';
        }
    };

    return {
        winner,
        reset
    };

})();

game.reset();