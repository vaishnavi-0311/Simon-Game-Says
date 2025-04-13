
// ---------------PRELOADER CODE---------------------------
window.onload = function () {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    // Hide preloader and show content after delay
    setTimeout(() => {

        preloader.style.display = 'none';
        content.style.display = 'block';
    }, 1000); // Adjust time as needed
};




document.getElementById("play-btn").addEventListener("click", () => {
   
    document.getElementById("content").style.display = "none";
    document.getElementById("Container").style.display = "block";
});



// -----------------AUDIO CODE----------

function playSound(color) {
    console.log("Playing sound for:", color); // Debug log
    let audio = new Audio(`sounds/${color}.mp3`);

    if (color === "wrong") {
        audio.playbackRate = 4.0; // 2x speed
    }
    audio.play().catch((err) => {
        console.error("audio play failed", err);

    });
}



// /-------------GAME WORK CODE--------------------------
let gameseq = [];
let userseq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.getElementById("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

// Flash of computer

function gameFlash(btn) {           // computer click flash
    btn.classList.add("flash");
    playSound(btn.id);
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

// user click flash

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function playFullSequence() {
    let i = 0;
    let interval = setInterval(() => {
        let color = gameseq[i];
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        i++;
        if (i >= gameseq.length) {
            clearInterval(interval);
        }
    }, 600); // Adjust timing for pacing
}

function levelUp() {

    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randidx = Math.floor(Math.random() * 4);
    let randclr = btns[randidx];
    let randbtn = document.querySelector(`.${randclr}`);


    gameseq.push(randclr);
    console.log("Game sequence:", gameseq);
    // gameFlash(randbtn);
    setTimeout(playFullSequence, 1000);
}

function chck(indx) {

    if (userseq[indx] === gameseq[indx]) {

        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000);

        }

    } else {

        let body = document.querySelector("body");
        h2.innerHTML = `Game Over! <b> Your score ${level} </b> <br> Press any key to start`;
        body.classList.add("bg");
        setTimeout(function () {
            playSound("wrong");
            body.classList.remove("bg");
        }, 500);
        reset();
    }
}


// On user button press

function btnpress() {
    let btn = this;
    userFlash(btn);
    userclr = btn.getAttribute("id");
    playSound(userclr);
    userseq.push(userclr);

    chck(userseq.length - 1);
}

// Add click listeners to all buttons
let allbtns = document.querySelectorAll(".btn");

for (btn of allbtns) {
    btn.addEventListener("click", btnpress)
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


