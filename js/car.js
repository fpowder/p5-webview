// test car
let car = [];

class Car {
    constructor(startPoint, endPoint) {
        this.uuid = 'car1';

        this.curX = xCordinates[1] + (spacer / 2);
        this.curY = yCordinates[9] + (spacer / 2);

        this.currentPosition = {
            x: this.curX,
            y: this.curY
        }

        this.lastPosition = {
            x: this.curX,
            y: this.curY
        }

        // car size => 2 cell by 1 cell
        this.length = 2 * spacer;
        this.width = 1 * spacer;

        this.speed = 1;
        this.direction;

        this.rect;
    }

    exit() {
        let exitCollision = collideRectPoly(this.curX, this.curY, this.length, this.width, exit.poly);
        if(exitCollision) {
            this.length -= 1;
        }
    }

    remove() {
        console.log(this.length);
        if(this.length <= 0) {
            this.length = 0;
        }
    }

    move() {
        this.curX = mouseX;
        this.curY = mouseY;
        let hit = collideRectPoly(this.curX, this.curY, this.length, this.width, parkingCrashPoly);
        console.log(hit);
    }

    display() {
        push();
        stroke(20, 20, 128);
        strokeWeight(2);
        fill(98, 23, 133);
        this.rect = rect(this.curX, this.curY, this.length, this.width);
        pop();
    }
}