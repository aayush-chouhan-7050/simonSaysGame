let gameSqu = [];
let userSqu = [] ;
let buttons = ["yellow", "red", "green","blue"]
let start = false;
let level = 0 ;
let h4 = document.querySelector("h4");
let highScore = [];
let instructionsText = document.getElementById("instructions-text");


function getHighscore(array){
    let max = 0 
    for(let i = 0 ; i<array.length;i++){
        if(max<array[i]){
            max = array[i]
        }
    }
    return max

}
function hideStartButton() {
    document.getElementById("start-button").style.display = 'none';
}

function showStartButton() {
    document.getElementById("start-button").style.display = 'block';
}


document.getElementById("start-button").addEventListener("click", function() {
    if (!start) {
        console.log("Game started");
        start = true;
        levelUp();
        hideStartButton();
        instructionsText.innerHTML = "Watch the sequence and repeat it by clicking the buttons.";
        
    }
    
    
});

function levelUp(){
    
    
    userSqu=[];
    level++;
    let h3 = document.querySelector("h3");
    h4.innerHTML = `Level ${level} <br> Current Highscore - ${getHighscore(highScore)}  `
    let randomidx = Math.floor(Math.random()*4)
    let rancolour = buttons[randomidx]
    let randomBtn = document.querySelector(`.${rancolour}`)
    gameSqu.push(rancolour);
    console.log(`Hint - ${gameSqu}`)
    
    gamebtnFlash(randomBtn);
    

}
function gamebtnFlash(btn){
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    },175)
}
function userFlash(btn){
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash");
    },175)
}
function checkBtn(idx){
    
    if(userSqu[idx]===gameSqu[idx]){
        if(userSqu.length == gameSqu.length){
            setTimeout(levelUp,1000)
        }
        
    }else{
        highScore.push(level)
        

        
        h4.innerHTML = `Game Over ! Your Score was - <i>${level}</i> <br> Press Start to RESTART`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";

        },200)
        showStartButton();
        
        

        reset();

    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    userColour = btn.getAttribute("id")
    userSqu.push(userColour);
    checkBtn(userSqu.length - 1);
}
let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns){
    btn.addEventListener("click",btnPress)
}
function reset(){
    start = false;
    level = 0 ;
    gameSqu = [];
    userSqu = [] ;
    instructionsText.innerHTML = "Game over! Press 'Start Game' to play again.";
    

}