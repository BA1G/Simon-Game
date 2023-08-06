// Variable declaration

var userClickedPattern = new Array();
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = new Array();
var userChosenColor;
var level = 0;

// Keyboard Press to Start game

$(document).one("keydown", nextSequence);

// Major function for game to run

function nextSequence() 
{
    randomNumber = Math.floor(Math.random()*4);         // random number btwn 0 - 3
    randomChosenColor = buttonColours[randomNumber];    // chose color w.r.t random number
    gamePattern.push(randomChosenColor);                // push random choosen color in gamePattern
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);  // Animation for button
    playSound(randomChosenColor);                       // play sound for required color
    $("h1").text("Level " + level);                     // change text for h1
    level++;                                            // increase level by 1 everytime function runs

    
 }
 
// Button Click EventListener

$(".btn").on("click" ,function()
{
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

//    Animation for Click

     function animatePress(currentColour)
    {
     $("#"+userChosenColor).addClass("pressed");

     setTimeout(function () {
        $("#"+userChosenColor).removeClass("pressed");
      }, 100);
       }

    // Index for last Element in userClickedPattern

     index = userClickedPattern.length-1;

     checkAnswer(index);

    //  function to check userClickedPattern's sequence w.r.t gamePattern

       function checkAnswer(currentLevel)
       {
        console.log(userClickedPattern);
        console.log(gamePattern);

     if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
     {
       console.log("true");
     }
     else
     {
        console.log("false");
     }
    
    //  to know whether user has finished the required sequence(length)

     if(userClickedPattern.length === gamePattern.length)
     {
        setTimeout( function() 
        {
         nextSequence();
         userClickedPattern= [];
        }
        , 1000);
     }

    //  if the userClickedPattern doesnot match with gamePattern

     if(userClickedPattern[currentLevel] != gamePattern[currentLevel])
     {
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();

        $("body").addClass("game-over");

       setTimeout(function () {
        $("body").removeClass("game-over");
       }, 200);

       $("h1").text("Game Over Press Any Key to Restart")

       startOver();
      
     }

    // function to restart the game after user fails

     function startOver() 
     {
        level= 0;
        gamePattern= [];
        userClickedPattern= [];
        $(document).one("keydown", nextSequence);
     }

       }
    }
);

    // function to play sound w.r.t Specific button

      function playSound(key)
      {

            switch (key) {
                case 'blue':
                    var blue = new Audio('sounds/blue.mp3');
                    blue.play();
                    break;

                case 'green':
                    var green = new Audio('sounds/green.mp3');
                    green.play();
                    break;


                case 'red':
                    var red = new Audio('sounds/red.mp3');
                    red.play();
                    break;

                case 'yellow':
                    var yellow = new Audio('sounds/yellow.mp3');
                    yellow.play();
                    break;

                default:
                    console.log(randomChosenColor);
                    break;
            }
        }
