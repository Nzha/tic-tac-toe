const gameboard = (() => {

    const array = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const display = () => {
        for (const row of array) {
            for (space of row) {
                console.log(space);
            }
        }
    };

    return {
        display
    };

})();

gameboard.display();