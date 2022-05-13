
class CrazyCar {
    constructor(paintColor, startPoint) {
        this.uuid = 'crazyCar1';
        
        this.position = createVector(xCenters[startPoint.x], yCenters[startPoint.y]);
        this.width = cnvWidth / 18;
        this.length = this.width * 2;

        this.isAccelerating = false;
        this.rotation = 0;
        this.color = paintColor;
        this.history = [];

        this.accelWay = true; // true: accelerate to forward, false: accelerate to back 

        this.gsapTo;

        // matter body options
        const options = { 
            friction: 0.5,
            restitution: 0.5,
            mass: 50,
            isStatic: false
        };

        this.body = Bodies.rectangle(
            this.position.x,
            this.position.y,
            this.length,
            this.width,
            options
        );
        
        // Matter.Body.translate(this.body, {x: this.position.x, y: this.position.y});
            
        // add to world
        World.add(world, this.body);
        
    }

    update() {
        if(this.isAccelerating) {
            this.accelerate();
        }

        this.rotate(this.rotation);
        this.history.push([this.body.position.x, this.body.position.y]);
        if(this.history.length > exaustClouds) {
            this.history.splice(0, 1);
        }
        this.position.x = this.body.position.x;
        this.position.y = this.body.position.y;
    }

    accelerating(isAccelerating, accelWay) {
        this.isAccelerating = isAccelerating;
        this.accelWay = accelWay;
    }

    accelerate() {
        let force = p5.Vector.fromAngle(this.body.angle);
        this.accelWay === true ? force.mult(0.02) : force.mult(-0.02);
        Body.applyForce(this.body, this.body.position, force);
    }

    rotate(rotation) {
        this.rotation = rotation;
        Body.setAngularVelocity(this.body, rotation);
    }

    randomCrazyWay() {

        const desired = p5.Vector.sub(car.position, crazyCar.position);
        const angle = desired.heading();
        Body.setAngle(this.body, angle);

    }

    getGsapPosition(gsapPosition) {
        console.log(gsapPosition);
    }

    gsapMove(x, y) {

        this.body.onCollide(async (pair) => {
            Body.setStatic(this.body, true);
            this.gsapTo.pause();
            console.log(this.gsapTo);
            console.log(this.body.position);
            console.log(this.position);
            //this.gsapTo.kill();
            console.log(pair);
            // this.body.setStatic = true;
        });

        this.gsapTo = gsap.to(this.body.position, {
            x: xCenters[x], 
            y: yCenters[y],
            duration: 2,
            onUpdate: () => {
                console.log(this.body.position);
                console.log(this.position);
            },
            onStart: () => {
                Body.setStatic(this.body, false);
            }
        });
    }

    matterMove(x, y) {
        // this.body.position.x += 1;
        // let force = p5.Vector.fromAngle(this.body.angle);
        // let force = createVector(1, 0);
        // console.log(force);
        // Body.applyForce(this.body, this.body.position, force);
        //this.break();
        // Body.setPosition(this.body, {x: this.body.position.x + 50 , y: this.body.position.y - 50});
                   
        // let px = 100 + 100 * Math.sin(engine.timing.timestamp * 0.004);
        // Body.setVelocity(this.body, { x: px - this.body.position.x, y: 0 });
        // Body.setPosition(this.body, { x: px, y: this.body.position.y });

        Matter.Body.translate(this.body, { x: x, y: y });
        //this.body.position.x += x;
        this.body.onCollide((pair) => {
            console.log(pair);
            // this.body.setStatic = true;
            Body.setStatic(this.body, true);

            this.body.position.x = pair.bodyB.position.x;
            this.body.position.y = pair.bodyB.position.y;

            Matter.Body.translate(this.body, { x: 0, y: 0 });

        });
    }

    break() {
        console.log(this.body.position.x);
        if(Math.round(this.body.position.x / 100) === 4) {
            this.body.setStatic = true;
            Body.applyForce(this.body, this.body.position, this.body.force * -1);
        }
    }

    render() {
        let angle = this.body.angle;
        push();
        rectMode(CENTER);
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);

        // tires
        fill(54);
        ellipse(
            this.length / 3,
            -this.width / 2,
            this.width / 4,
            this.width / 8
        );
        ellipse(
            this.length / 3,
            this.width / 2,
            this.width / 4,
            this.width / 8
        );
        ellipse(
            -this.length / 3,
            -this.width / 2,
            this.width / 4,
            this.width / 8
        );
        ellipse(
            -this.length / 3,
            this.width / 2,
            this.width / 4,
            this.width / 8
        );
        // car body
        fill(this.color);
        rect(0, 0, this.length, this.width, 5);
        fill(54);
        rect(-this.length / 24, 0, 0.7 * this.length, 0.8 * this.width, 5);
        fill(this.color);
        rect(-this.length / 12, 0, 0.45 * this.length, 0.6 * this.width, 5);
        // headlights
        fill(255, 255, 200);
        ellipse(
            this.length / 2,
            -this.width / 3,
            this.width / 8,
            this.width / 4
        );
        ellipse(
            this.length / 2,
            this.width / 3,
            this.width / 8,
            this.width / 4
        );
        pop();
        push();
        noStroke();
        const carWidth = this.width;
        this.history.forEach(function (h, i) {
            const [x, y] = h;
            push();
            translate(x, y);
            rotate(angle);
            fill(54, i);
            ellipse(
                -carWidth,
                0,
                exaustClouds - i + random(-10, 10),
                exaustClouds - i + random(-3, 3)
            );
            pop();
        });
        pop();


    }

}