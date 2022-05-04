let parkingAreas = [];

// parking area 시작 자연수 좌표
const pStartPoints = [
    {
        x: 3,
        y: 3
    },
    {
        x: 3,
        y: 5
    },
    {
        x: 3,
        y: 7
    }
];

// PA => Parking Area
class ThreeByTwoPA {
    constructor(x, y) {
        this.startX = xCordinates[x];
        this.startY = yCordinates[y];

        this.width = xCordinates[x + 3] - xCordinates[x];
        this.height = yCordinates[y + 2] - yCordinates[y];

        this.lineCol = color(40, 199, 69);
        this.col = color(115, 235, 125);

        let dom = createDiv();
        dom.size(this.width, this.height);
        dom.position(this.startX + divAdjWidth, this.startY + divAdjHeight);
        // dom.addEventListener('touchstart', () => {
        //     dom.position((window.innerWidth - cnvWidth) / 2, (window.innerHeight - cnvHeight) / 2);
        // });
        dom.mousePressed(() => {
            alert('This is parking area! : ' + this.startX + ',' + this.startY);
        });
        this.dom = dom;

        //this.speed = 1;
    }
    
    // move() {
    //     this.startX += random(-this.speed, this.speed);
    //     this.startY += random(-this.speed, this.speed);
    //     this.dom.position(this.startX + divAdjWidth, this.startY + divAdjHeight);
    // }

    display() {
        push();
        stroke(this.lineCol);
        //stroke(51);
        fill(this.col);
        strokeWeight(3);
        rect(this.startX, this.startY, this.width, this.height);
        pop();
    }

    clicked() {
        console.log('clicked'); 
        this.col = color(255, 0, 200);   
    }

}