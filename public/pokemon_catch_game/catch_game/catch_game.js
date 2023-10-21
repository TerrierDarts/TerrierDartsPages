// Get a reference to the button and the element you want to animate
const pokemonThrowBallButton = document.getElementById("pokemonCatchAttempt");
const pokemonCatchFailButton = document.getElementById("pokemonCatchFail");
const pokemonCatchWinButton = document.getElementById("pokemonCatchSuccess");
const pokemonShowButton = document.getElementById("pokemonShow");
const pokemonHideButton = document.getElementById("pokemonHide");
const pokemonSprite = document.getElementById("pokemon");
const pokemonBall = document.getElementById("ball");

// Add a click event listener to the button
pokemonThrowBallButton.addEventListener("click", pokemonThrowBall);
pokemonCatchFailButton.addEventListener("click", pokemonCatchFail);
pokemonCatchWinButton.addEventListener("click", pokemonCatchSuccess);
pokemonShowButton.addEventListener("click", pokemonShow);
pokemonHideButton.addEventListener("click", pokemonHide);




const pokemon = document.querySelector(".pokemon");
const ball = document.querySelector(".ball");
const box = document.querySelector(".box");
const text = document.querySelector(".text");
const ballThrow = "../other_assets/catch_sound.mp3";
const escapeSound = "../other_assets/pokemon_out.mp3";
const wobble = "../other_assets/wobble_sound.mp3";


// Animation Functions

async function pokemonThrowBall(user, name, ballId, ballName) {
  ball.style.visibility = "visible";
  ball.style.opacity = "100%";
  ball.style.animation = "catchAttempt 13s 1";
  pokemon.style.animation = "pokemonInBall 11s 1 1.5s"
  typeMessage(user +" used a " + ballName +" on " + name);
  await sleep(1800);
  playAudio(ballThrow);
  await sleep(2100);
  playAudio(wobble);
  await sleep(3100);
  playAudio(wobble);
  await sleep(3100);
  ball.style.animation = "none";
  ball.style.top = "150px";
  ball.style.left = "295px";
  pokemon.style.animation = "none";
  pokemon.style.filter = "brightness(100);"
  pokemon.style.top = "145px"
  pokemon.style.width = "20px"
  pokemon.style.height = "20px"
  pokemon.style.visibility = "hidden"



}



async function pokemonCatchFail() {
  pokemon.style.animation = "pokemonBreakFree 3s 1"
  ball.style.visibility = "hidden";
  playAudio(escapeSound);
  typeMessage("Arrrgghh it appeared to be caught!!!");
  await sleep(3000);

  pokemon.style.filter = "brightness(1);"
  pokemon.style.top = "50px"
  pokemon.style.width = "160px"
  pokemon.style.height = "160px"
  pokemon.style.visibility = "visible"
  pokemon.style.animation = "none";
  await sleep(2000);
  typeMessage("Why not try again? Use !catch and !catch2 to try catch it.");

}

async function pokemonCatchSuccess(user, name) {
  typeMessage(user + " caught the " + name);
  pokemon.style.animation = "pokemonHide 5s";
  box.style.animation = "pokeBoxHide 5s";
  ball.style.animation = "ballFade 5s"
  await sleep(4000);
  text.style.visibility = "hidden";
  pokemon.style.left = "600px";
  box.style.top = "320px";
  ball.style.opacity = "0%";

}

async function pokemonHide() {
  typeMessage("The wild BULBASAUR fled.");
  pokemon.style.animation = "pokemonHide 5s";
  box.style.animation = "pokeBoxHide 5s";
  await sleep(4000);
  text.style.visibility = "hidden";
  pokemon.style.left = "600px";
  box.style.top = "320px";


}

async function pokemonShow(cryUrl, name) {
  pokemon.style.filter = "brightness(1);"
  pokemon.style.top = "50px"
  pokemon.style.width = "160px"
  pokemon.style.height = "160px"
  pokemon.style.visibility = "visible"
  pokemon.style.animation = "pokemonShow 5s";
  box.style.animation = "pokeBoxShow 5s";
  await sleep(4000);
  playAudio(cryUrl);
  pokemon.style.left = "300px";
  box.style.top = "220px";
  text.style.visibility = "visible";
  typeMessage("A wild " + name + " appeared.")
  await sleep(2000);
  typeMessage( "Use !pokeball, !greatball, !ultraball or !masterball to try catch it!");

}



//Inner Functions
/*
function playAudio(audioFile) {
  var audio = new Audio(audioFile);
  audio.volume = 1;
  audio.play();
}
*/

function playAudio(audioFile){
   // Get a reference to the audio element
   var audio = document.getElementById('soundFiles');
   audio.src = audioFile; // Replace 'new_audio.ogg' with your new audio file URL
   audio.load();
   // Attempt to play the audio
   audio.play()
       .then(function() {
           // Playback started successfully
           console.log('Audio playback started successfully.');
       })
       .catch(function(error) {
           // Handle autoplay error
           console.error('Autoplay failed:', error);
       });
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function typeMessage(message) {
  // Get the <text> element by its id
  const textElement = document.getElementById('message');

  // Clear the current content of the <text> element
  textElement.innerHTML = '';

  // Create a function to type out the message character by character
  function typeCharacter(index) {
    if (index < message.length) {
      textElement.innerHTML += message.charAt(index);
      setTimeout(function () {
        typeCharacter(index + 1);
      }, 50); // Adjust the typing speed (in milliseconds) here
    }
  }

  // Start typing the message
  typeCharacter(0);
}


pokemonHide();

// initialize client with onConnect handler
const client = new StreamerbotClient({ onConnect });

function onConnect() {
  console.log('Pokemon Catch Connected to Streamer.bot');
}


client.on('Raw.SubAction', message => {
  console.log(message);
  handleEvent(message);
});

async function handleEvent(message){
  if (message.data.name == "** Spawn Pokemon **") {
    var pokemonIdNumber = message.data.arguments.pokemonIdNumber;
    var name = message.data.arguments.pokemonName;
    var shinyValue = message.data.arguments.shinyValue;
    if(shinyValue == 1)
    {
      var spriteUrl = "../shiny_sprites/" + pokemonIdNumber + ".png"; 
      var name = "Shiny " +  message.data.arguments.pokemonName;
    }
    else{
     var spriteUrl = "../normal_sprites/" + pokemonIdNumber + ".png"; 
     var name = message.data.arguments.pokemonName;
    }
    
    var cryUrl = "../pokemon_cries/" + pokemonIdNumber + ".ogg";
    pokemonSprite.src = spriteUrl;
    await sleep(2000);
    pokemonShow(cryUrl, name);
  }
  if (message.data.name == "** Throw Ball **") {
    var pokemonIdNumber = message.data.arguments.pokemonIdNumber;
    var user = message.data.user.display;
    var name = message.data.arguments.pokemonName;
    var ballId = message.data.arguments.ballId;
    var ballUrl = "../other_assets/" + ballId + ".png";
    pokemonBall.src = ballUrl;
    var ballName = message.data.arguments.ballName;
    var catchValue = message.data.arguments.catchValue;
    pokemonThrowBall(user, name, ballUrl, ballName);
    await sleep(13000);
    if(catchValue == 1)
    {
    pokemonCatchFail();
    }
    if(catchValue == 2)
    {
    pokemonCatchSuccess(user, name);
    }    
  }
}
