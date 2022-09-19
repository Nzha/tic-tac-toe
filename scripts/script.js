const gameboard = (() => {

    const gameboardArr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const display = () => {
        for (const space in gameboardArr) {
            console.log('works!');
        }
    };

    return {
        display
    };

})();

gameboard.display();