let Livinglife = require("./class.js")
module.exports = class Antivirus extends Livinglife {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0
        
    }
    chooseCell(character) {
       
        
        super.getNewCoordinates()
        return super.chooseCell(character);
    }
    move() {
        
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            
        }
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
            for (var i in virusArr[i]) {
                if (newX == virusArr[i].x && newY == virusArr[i].y) {
                    virusArr[i].splice(i, 1)
                    console.log(123111111);
                    break
                }
            }

        }

    }
}

