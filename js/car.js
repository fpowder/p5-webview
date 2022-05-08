// test car
let car = [];

class Car {
    constructor(startPoint, paintColor) {
        this.uuid = 'car1';
        
        this.position = createVector(xCordinates[startPoint.x], yCordinates[startPoint.y]);
        this.width = cnvWidth / 36;
        this.length = this.width * 2;

        this.isAccelerating = false;
        this.rotation = 0;
        

        
    }

}