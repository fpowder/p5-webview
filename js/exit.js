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

        //set entrance collision walls
        let wallOptions = {
            friction: 0.5,
            restitution: 0.5,
            angle: 0,
            isStatic: true
        };

        let startVector = createVector(this.xPoints[0], this.yPoints[0]);
        let endVector = createVector(this.xPoints[2], this.yPoints[2]);

        let sub = Vector.sub(endVector, startVector);

        let xDiff = startVector.x + (sub.x / 2);
        let yDiff = startVector.y + (sub.y / 2)

        this.entranceWall = Bodies.rectangle(xDiff, yDiff, 3/2*spacer, 1/4*spacer, wallOptions);
        
        startVector = createVector(this.xPoints[5], this.yPoints[5]);
        endVector = createVector(this.xPoints[7], this.yPoints[7]);
        sub = Vector.sub(endVector, startVector);
        xDiff = startVector.x + (sub.x / 2);
        yDiff = startVector.y + (sub.y / 2)
        this.entranceWall2 = Bodies.rectangle(xDiff, yDiff, 3/2*spacer, 1/4*spacer, wallOptions);

        World.add(world, this.entranceWall);
        World.add(world, this.entranceWall2);

    }

    render() {

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