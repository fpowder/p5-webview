// (() => {
//     window.__WEBVIEW_BRIDGE__ = {
//         init: function() {
//             try {
//                 document.addEventListener('message', e => {
//                     console.log(e);
//                 })
//             } catch(e) {
//                 console.log(e);
//             }
//         }
//     };
//     window.__WEBVIEW_BRIDGE__.init();
// })();

// function getCookie(cookie_name) { 
//     var x, y; 
//     var val = document.cookie.split(';'); 
//     for (var i = 0; i < val.length; i++) { 
//         x = val[i].substr(0, val[i].indexOf('=')); 
//         y = val[i].substr(val[i].indexOf('=') + 1); 
//         x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기 
//         if (x == cookie_name) { return unescape(y); // unescape로 디코딩 후 값 리턴 
//         } 
//     } 
// }

// alert(window.innerWidth + '  ' + window.innerHeight);
// alert(getCookie('webView'));

// e-avp 주차장 그리드 width 60, height 168
/*
    width 59 height 143
    또는
    width 143, height 59
*/

// 가로 세로 cell수
let xGridCnt = 7;
let yGridCnt = 12;

// let xGridCnt = 60;
// let yGridCnt = 168;

let aspectRatio = yGridCnt/xGridCnt;
let reverseAspectRatio = xGridCnt/yGridCnt;

// let screenAspect = window.innerHeight / window.innerWidth;
// let reverseScreenAspect = window.innerWidth / window.innerHeight;

let cnvHeight = window.innerHeight * 0.95;
let cnvWidth = cnvHeight * reverseAspectRatio;

if(cnvWidth > window.innerWidth) {
    let reduceRatio = window.innerWidth / cnvWidth;
    cnvWidth = cnvWidth * reduceRatio;
    cnvHeight = cnvHeight * reduceRatio; 
}

//div 요소 위치 조정용 변수
/*
    각 canvas 요소위에 html div요소를 mapping하여, mouse click event를 정의한다.
    div position 요소는 canvas요소의 좌측 margin 너비 만큼, 세로 margin만큼 더해져야 한다.
*/
let divAdjHeight = (window.innerHeight - cnvHeight) / 2;
let divAdjWidth = (window.innerWidth - cnvWidth) / 2;

// let divAdjHeight = (window.innerHeight - cnvHeight) / 2;
// let divAdjWidth = 0;

// 한 cell 변의 길이
let spacer = cnvHeight / yGridCnt;

//자연수 좌표계[(0,0) (1,1)....]를 canvas의 좌표계에 mapping한다. [(0,0) (5.55, 23.34)....]
let xCordinates = [];
let yCordinates = [];

//canvas에 그려전 각 cell의 중심 좌표
let xCenters = [];
let yCenters = [];

for(let x = 0; x <= xGridCnt; x++) {
    xCordinates.push(x * spacer);
    if(x !== xGridCnt) {
        xCenters.push(x * spacer + (spacer / 2));
    }
}

for(let y = 0; y <= yGridCnt; y++) {
    yCordinates.push(y * spacer);
    if(y !== yGridCnt) {
        yCenters.push(y * spacer + (spacer / 2));
    }
}

let canvas;
//matterjs 물리엔진이 적용된 world, engine, body 요소등을 정의
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;
const Runner = Matter.Runner;

//Matter collision event plugin 추가
Matter.use('matter-collision-events');

// 차량뒤 먼지 표현
const exaustClouds = 25;

let world;
let engine;
let runner;
let car;
let crazyCar;

 // for mobile performance set this true 
p5.disableFriendlyErrors = false;
function setup() {
    pixelDensity(1);
    frameRate(60); 
    canvas = createCanvas(cnvWidth, cnvHeight);
    canvas.position((window.innerWidth - cnvWidth) / 2, (window.innerHeight - cnvHeight) / 2, 'fixed');

    // matter js 물리엔진 설저
    /* 
     평면이므로 y축 gravity수치는 0
    */
    engine = Engine.create();
    world = engine.world;
    engine.world.gravity.y = 0;

    // create runner -> maybe don't need
    // runner = Runner.create();
    // Runner.run(runner, engine);   

    //or

    // Matter.Runner.run(engine);

    for(let i = 0; i < pStartPoints.length; i ++) {
        parkingAreas.push(new ThreeByTwoPA(pStartPoints[i].x, pStartPoints[i].y));
    }

    // wall set
    //walls = new Wall(wallStartEndPoints[0]);
    for(let startEndPoint of wallStartEndPoints) {
        let wall = new Wall(startEndPoint);
        //wall.setCrashLine();
        walls.push(wall);
    }

    const redHexVals = [255, 100, 100];
    const blueHexCals = [100, 100, 255];
    car = new Car(redHexVals, {x: 1, y: 1});
    crazyCar = new CrazyCar(blueHexCals, {x: 1, y: 10});
    
    // crazyCar.gsapMove();

    entrance = new Entrance();
    exit = new Exit();
    
    // parking area border
    /* 
        차량이 이동가능한 범위의 벡터를 설정
    */
    //setParkingAreaBorderVector();

}

function draw() {
    background(255);
    
    push();
    // 그리드 맵의 좌표 점찍기
    for(let x = 0; x < width; x += spacer) {
        for(let y = 0; y < (width * aspectRatio); y += spacer) {
            stroke(20);
            ellipse(x + spacer /2, y + spacer /2, 2, 2);
        }
    }
    
    // 그리드 맵의 선 그리기
    for(let yLine = 0; yLine <= cnvHeight; yLine += spacer) {
        stroke(0);
        strokeWeight(0.5);
        line(0, yLine, width, yLine);
        line(yLine, 0, yLine, height);
    }
    strokeWeight(0.5);
    line(width-1, 0, width-1, height-1);
    line(0, height-1, width-1, height-1);
    pop();

    // parkingArea display
    for(let i = 0; i < parkingAreas.length; i++) {
        parkingAreas[i].render();
    }

    Engine.update(engine);

    car.render();
    car.update();

    crazyCar.render();
    crazyCar.update();
    
    // crazyCar.accelerating(true, true);
    // crazyCar.randomCrazyWay();
        
    entrance.render();
    exit.render();

    //parking lot wall display
    for(let wall of walls) {
        wall.render();
    } 

}