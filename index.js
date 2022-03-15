const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let points = 0;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeparts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVel = 0;
let yVel = 0;

let score = 0;

const soundFx = new Audio("powerUp.wav");


//gane loop
function drawGame(){
    changeSnakepos();

    let result = isGameover();
    if (result){
        return;
    }

    clearScreen();

    checkApplecol();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
    
}

function isGameover(){
    let gameOver = false;

    if (xVel===0 && yVel ===0){
        return false;
    }

    //wall check
    if(headX < 0){
        gameOver = true;
    }
    else if(headX == tileCount){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY == tileCount){
        gameOver = true;
    }

    for (let i=0; i < snakeparts.length; i++){
        let part = snakeparts[i];
        if(part.x == headX && part.y === headY){
            gameOver = true;
            break
        }
    }

    //game over text
    if(gameOver){
        ctx.fillStyle = 'red';
        ctx.font = "50px Verdana";
        ctx.textAlign = 'center';
        ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score: " +score, canvas.width - 50, 10)
    ctx.fillText("speed: " +speed, canvas.width - 50, 30)

}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

}

function drawSnake(){

    ctx.fillStyle = 'green'
    for(let i =0; i < snakeparts.length; i++){
        let part = snakeparts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }

    snakeparts.push(new snakePart(headX, headY)); //adds item to the end
    while(snakeparts.length>tailLength){
        snakeparts.shift(); //remove furthest item from snake if more than tail size
    }

    ctx.fillStyle = 'lightgreen'
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize,tileSize)

}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}

function checkApplecol(){
    if (appleX == headX && appleY == headY ){
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        speed=speed+0.5;
        soundFx.play();
    }
}

function changeSnakepos(){
    headX = headX+xVel;
    headY = headY+yVel;
}

document.body.addEventListener('keydown', keyDown);

//input
function keyDown(event){
    //up
    if(event.keyCode ==38){
        if(yVel == 1)
            return;
        yVel = -1;
        xVel = 0;
    }

    //down
    if(event.keyCode ==40){
        if(yVel == -1)
            return;
        yVel = 1;
        xVel = 0;
    }

        //left
    if(event.keyCode ==37){
        if(xVel == 1)
            return;
        yVel = 0;
        xVel = -1;
    }

    //right
    if(event.keyCode ==39){
        if(xVel == -1)
            return;
        yVel = 0;
        xVel = 1;
    }

}


drawGame();