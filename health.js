let Livinglife = require("./class.js")
module.exports =class Health extends Livinglife {
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
    }
    chooseCell(character){
        this.getNewCordinates()
        return super.chooseCell(character);
    }


    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newHealth = new Health(newX, newY, 1);
            healthArr.push(newHealth);
            this.multiply = 0;
        }
    }



}