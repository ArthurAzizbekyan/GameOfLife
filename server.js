var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(8080);

function generator(matLen, gr, grEat, pr, st, vir, ant, ) {

    let matrix = []

    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < st; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
        for (let i = 0; i < vir; i++) {
            let x = Math.floor(Math.random() * matLen);
            let y = Math.floor(Math.random() * matLen);
            if (matrix[x][y] == 0) {
                matrix[x][y] = 5;
            }
        }
        for (let i = 0; i < ant; i++) {
            let x = Math.floor(Math.random() * matLen);
            let y = Math.floor(Math.random() * matLen);
            if (matrix[x][y] == 0) {
                matrix[x][y] = 6;
            }
          
        }

        io.sockets.emit("send matrix", matrix)
        return matrix;

    }


}

matrix = generator(15, 20, 15, 20, 10, 3, 4,);

io.sockets.emit('send matrix', matrix);

grassArr = []
grassEaterArr = []
predatorArr = []
stoneArr = []
virusArr = []
antivirusArr = []
healthArr = []


Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Stone = require("./stone")
Virus = require("./virus")
Antivirus = require("./antivirus")


function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y)
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                var gr = new Stone(x, y)
                stoneArr.push(gr)
            } else if (matrix[y][x] == 5) {
                var gr = new Virus(x, y)
                virusArr.push(gr)
            } else if (matrix[y][x] == 6) {
                var ant = new Antivirus(x, y)
                antivirusArr.push(ant)
            } 


        }
    }
    io.sockets.emit("send matrix", matrix)

}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }

    for (var i in stoneArr) {
        if (predatorArr.length > 5) {
            stoneArr[i].eat();
        }
    }
    for (var i in virusArr) {

        virusArr[i].eat();
    }
    for (var i in antivirusArr) {
        antivirusArr[i].eat();
        antivirusArr[i].move();
    }
    
    io.sockets.emit("send matrix", matrix)

}
setInterval(game, 1000)

io.on('connection', function (socket) {
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    createObject(matrix)
}

)
function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    virusArr = [];
    stoneArr = [];
    antivirusArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

var statistics = {}

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.virus = virusArr.lenght;
    statistics.antivirus = antivirusArr.lenght;
    statistics.stone = stoneArr.lenght;

    fs.writeFileSync("statistics.json",
        JSON.stringify(statistics))
}, 1000)


weath = "winter"

setInterval(function () {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }

    io.sockets.emit('weather', weath)
}, 4000)