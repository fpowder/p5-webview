let walls = [];

const wallStartEndPoints =[
    {
        start: { x: 6, y: 0 },
        end: { x: 7, y: 11 }
    },
    {
        start: { x: 0, y: 0 },
        end: { x: 6, y: 1 }
    },
    {
        start: { x: 0, y: 1 },
        end: { x: 1, y: 11}
    }, 
    {
        start: { x: 0, y: 11 },
        end: { x: 7, y: 12 }
    } 
];  

class Wall {
    constructor(startEndPoint) {
        this.wall = startEndPoint;

        // 벽 객체가 생성됨과 동시에 matter 물리엔진 적용
        /*

        */
        let wallOptions = {
            friction: 0.5,
            restitution: 0.5,
            isStatic: true
        };
        let width = spacer * (this.wall.end.x - this.wall.start.x);
        let height = spacer * (this.wall.end.y - this.wall.start.y);
        this.body = Bodies.rectangle(xCordinates[this.wall.start.x], yCordinates[this.wall.start.y], width, height, wallOptions);
        World.add(world, this.body);

    }

    display() {
        push();
        for(let j = 0; j < this.wall.end.x - this.wall.start.x; j++) {

            for(let k = 0; k < this.wall.end.y - this.wall.start.y; k++) {
                stroke(47, 48, 48);
                strokeWeight(2);
                fill(93, 97, 97);
                rect(xCordinates[this.wall.start.x + j], yCordinates[this.wall.start.y + k], spacer, spacer);
            }   
        }
        pop();
    }
}