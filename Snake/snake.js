const cvs = document.getElementById("snake");
const moda = document.getElementById("moda");
const modb = document.getElementById("modb");
const newgame = document.getElementById("newgame");

const ctx = cvs.getContext("2d");

// create the unit
const box = 30;
let ballRadius = 15;
// create the snake

let mod = 0;
//mod = 2 rắn xuất hiện bên kia tương khi đụng tường
//mod =1 rắn đụng tường or đụng vào thân thì dừng lại
let snake = [];
snake[0] = {
    x : 10 * box,
    y : 10 * box
};
let score = 0;
let d;
let food = {
    x : Math.floor(Math.random()*20+1) * box+15,
    y : Math.floor(Math.random()*20+1) * box+15
}
moda.addEventListener("click", gamea);
modb.addEventListener("click", gameb);
newgame.addEventListener("click", newGame);
document.addEventListener("keydown",direction);

function newGame() {
    score =0;
    mod = 0;
    snake = [];
    snake[0] = {
        x : 10 * box,
        y : 10 * box
    };
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    d ="";
    draw();

    food = {
        x : Math.floor(Math.random()*20+1) * box+15,
        y : Math.floor(Math.random()*20+1) * box+15
    }
}
function  gamea() {
    document.getElementById('moda').style.background = "red"
    document.getElementById('modb').style.background = "#ffff"
    mod = 2;
}
function  gameb() {
    document.getElementById('moda').style.background = "#ffff"
    document.getElementById('modb').style.background = "red"
    mod = 1;
}
function collision(head,array){
    if(array.length>1)
        for(let i = 0; i < array.length-1; i++){
            if(head.x === array[i+1].x && head.y === array[i+1].y){
                return true;
            }
        }
    return false;
}
function direction(event){
    if(mod!=0) {
        let key = event.keyCode;
        if (key == 37 && d != "RIGHT") {
            d = "LEFT";
        } else if (key == 38 && d != "DOWN") {
            d = "UP";
        } else if (key == 39 && d != "LEFT") {
            d = "RIGHT";
        } else if (key == 40 && d != "UP") {
            d = "DOWN";
        }
    }
}
function  drawScore() {
    ctx.strokeStyle = "black";
    ctx.font = "20px Georgia";
    ctx.fillText("SCORE "+score, 0,655 );
    ctx.font = "30px Verdana";
}
function drawBall() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(food.x, food.y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}
function draw() {

    console.log(snake.length);
    ctx.clearRect(0, 0, cvs.width, cvs.height);


    ctx.strokeStyle = "white";
    for(let i =0; i< cvs.width/box; i++ ){
        ctx.beginPath();
        ctx.moveTo(0+30, 30*i);
        ctx.lineTo(cvs.width-30, 30*i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(30*i, 30);
        ctx.lineTo(30*i, cvs.width-30);
        ctx.stroke();
    }

    for(let i =0; i< snake.length ; i++){
        ctx.fillStyle = ( i === 0 )? "red" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    drawBall();
    drawScore();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    switch (d) {
        case 'LEFT':
            console.log("left");
            snakeX -= box;
            break;
        case 'UP':
            console.log("up");
            snakeY -= box;
            break;
        case 'RIGHT':
            console.log("right");
            snakeX += box;
            break;
        case 'DOWN':
            console.log("down");
            snakeY += box;
            break;
    }
    if(snakeX === food.x -15 && snakeY === food.y -15){
        score++;
        food = {
            x : Math.floor(Math.random()*20+1) * box+15,
            y : Math.floor(Math.random()*20+1) * box+15
        }
        // we don't remove the tail
    }else  snake.pop();

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    if(mod===1){
        if(snakeX <box){
            newHead = {
                x : snakeX+20*30,
                y : snakeY
            }
        }

        if(snakeX > 20 * box){
            newHead = {
                x : 30,
                y : snakeY
            }
        }
        if(snakeY < box){
            newHead = {
                x : snakeX,
                y : snakeY+20*30
            }
        }

        if(snakeY > 20*box){
            newHead = {
                x : snakeX,
                y : 30
            }
        }
    }else if(mod ===2){
        if(snakeX < box || snakeX > 20 * box || snakeY < box || snakeY > 20*box || collision(newHead,snake)){
            ctx.strokeStyle = "black";
            ctx.font = "20px Georgia";
            ctx.fillText("Game over!", 300, 300);
            ctx.font = "30px Verdana";
            clearInterval(game);
        }
    }
    snake.unshift(newHead);
}
let game = setInterval(draw,500);