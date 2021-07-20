let Livinglife = require("./class.js")
module.exports =class Virus extends Livinglife {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.multiply = 0

    }
    chooseCell(character) {
        super.getNewCoordinates()
        return super.chooseCell(character);
    }

    eat() {
        var emptyCells = super.chooseCell(2)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
       
        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }
            
        }

    }

}





