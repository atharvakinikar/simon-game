var gamePattern=[];
var userClickedPattern = [];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor)
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=(Math.round(Math.random()*3));
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
})

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
        userClickedPattern.splice(0,userClickedPattern.length);
        setTimeout(function(){
            nextSequence()
        },1000)
    }
    
}

else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
}
}

function startover(){
    level=0;
    gamePattern.splice(0,gamePattern.length);
    userClickedPattern.splice(0,userClickedPattern.length);
    started=false;
}


