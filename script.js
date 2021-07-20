var socket = io();
side = 30;
function setup() {
    // frameRate(6);
    createCanvas(15 * side, 15 * side);
    background('#acacac');


}

function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#EF2E05");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#0d024d");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 7) {
                fill("#FFC133");
                rect(x * side, y * side, side, side);
            }

        }
    }
}


setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 100
)


