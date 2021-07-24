
var socket = io();
side = 30;
function setup() {
    // frameRate(6);
    createCanvas(15 * side, 15 * side);
    background('#acacac');


}

weath = "spring"

socket.on("weather", function (data) {
    weath = data;
    console.log(weath);
    
})

function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
            if(weath == "summer"){
                fill("green");  
            }
            if(weath =="winter"){
                fill("white");  
            }
            if (weath =="spring"){
                fill("#61bd4f")
            }
            if(weath =="autumn"){
                fill("#333300")
            }

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
                fill("#0cede6");
                rect(x * side, y * side, side, side);
            }
        }
    }
}


socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}