const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBotton = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeBottom.png";
pipeBotton.src = "img/flappy_bird_pipeUp.png";

// Звуковые файлы
const fly = new Audio();
const score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

const gap = 90;

// при нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUP);

function moveUP() {
    yPos -= 25;
    fly.play();
}

//создание блоков
const pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

let score = 0;
//позиция птички
let xPos = 10;
let yPos = 150;
const grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBotton, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        
        pipe[i].x--;
        
        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        //Отслеживания прикосновений
        if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos + bird.height >= cvs.height - fg.height) {
            
            location.reload(); // Перезагрузка  страницы
        }
        if (pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
        
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    
    
    yPos += grav;
    
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт:" + score, 10, cvs.height - 20);
    
    requestAnimationFrame(draw);
}

pipeBotton.onload = draw;



