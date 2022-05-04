// 전체 주차 구역에 대한 정의(차량이 움직일수 있는 공간)
let parkingCrashPoly = [];
const parkingAreaPoints = [
    {
        x: 1,
        y: 1
    },{
        x: 1,
        y: 11
    },{
        x: 6,
        y: 11
    },{
        x: 6,
        y: 1
    }
];

function setParkingAreaBorderVector() {
    for(let point of parkingAreaPoints) {
        parkingCrashPoly.push(createVector(xCordinates[point.x], yCordinates[point.y]));
    }
}