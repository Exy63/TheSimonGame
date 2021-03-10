var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function gameOver() {
  $('body').addClass('game-over');
  $('h1').text('Game Over, Press Any Key to Restart');
  setTimeout(function() {
    $('body').removeClass('game-over')
  }, 200);
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $('h1').text('Level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(150).fadeIn(150);

  playSound(randomChosenColour);

}

$('.btn').click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

$(document).keypress(function() {
 if (!started) {
  nextSequence();
  started = true;
};
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');
  if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log('wrong');
    playSound('wrong');
    gameOver();
    startOver();
  }
}
