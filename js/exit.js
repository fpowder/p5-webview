let exit;

class Exit {
    constructor() {

        let startX = xCordinates[6];
        let startY = yCordinates[9];

        let xPoints = [];
        let yPoints = [];

        xPoints.push(startX);
        yPoints.push(startY);

        xPoints.push(startX - (3 / 2 * spacer));
        yPoints.push(startY);

        xPoints.push(startX - (3 / 2 * spacer));
        yPoints.push(startY + (1 / 4 * spacer));

        xPoints.push(startX - (1 / 4 * spacer));
        yPoints.push(startY + (1 / 4 * spacer));

        xPoints.push(startX - (1 / 4 * spacer));
        yPoints.push(startY + (1 / 4 * spacer) + (3 /2 * spacer));

        xPoints.push(startX - (3 / 2 * spacer));
        yPoints.push(startY + (1 / 4 * spacer) + (3 /2 * spacer));

        xPoints.push(startX - (3 / 2 * spacer));
        yPoints.push(startY + (2 * spacer));

        xPoints.push(startX);
        yPoints.push(startY + (2 * spacer));

        xPoints.push(startX);
        yPoints.push(startY);

        this.xPoints = xPoints;
        this.yPoints = yPoints;

        this.poly = [];

        for(let i = 3; i < 5; i++) {
            this.poly.push(createVector(xPoints[i], yPoints[i]));
        }

    }

    display() {

        push();
        beginShape();
        stroke(25, 107, 230);
        strokeWeight(2);
        fill(99, 153, 235);
        for(let i = 0; i < 8; i++) {
            
            vertex(this.xPoints[i], this.yPoints[i]);
            
        }
        endShape(CLOSE);
        pop();

    }
}