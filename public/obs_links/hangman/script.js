const WEBSOCKET_URI = "ws://127.0.0.1:8080/";
const ws = new WebSocket(WEBSOCKET_URI);
ws.addEventListener("open", (event) => {
  console.log("Connected to Streamer.bot");

  ws.send(
    JSON.stringify({
      request: "Subscribe",
      id: "123",
      events: {
        Raw: ["SubAction"]
      }
    })
  );
});

ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);

  // handle event response here
  if (!data.event || !data.event.type) return;
  if (data.data.name == "** Hangman Guess **") {
    //console.log(event.data);
    var lives = data.data.arguments.hangmanLivesArgs;
    var guesses = data.data.arguments.hangmanGuessedLettersArgs;
    var dashedWord = data.data.arguments.currentGuess;
    console.log(lives);
    console.log(guesses);
    console.log(dashedWord);
    
    document.getElementById("word").textContent = dashedWord;
    document.getElementById("lives").textContent = "Lives: " + lives; //HERE IS THE LIVES
    document.getElementById("guessed").textContent = guesses;
    
    
  }
   if (data.data.name == "** Hangman Win **") {
    //console.log(event.data);
    var result = "YOU WIN" //HERE IS THE WIN MESSAGE
    var definition = data.data.arguments.hangmanDefinition;
    var dashedWord = data.data.arguments.hangmanSolution;
    console.log(result);
    console.log(definition);
    console.log(dashedWord);
    
    document.getElementById("word").textContent = dashedWord;
    document.getElementById("lives").textContent = result;
    document.getElementById("guessed").textContent = definition;
    
    
  }
  
    if (data.data.name == "** Hangman Loss **") {
    //console.log(event.data);
    var result = "YOU LOST" //HERE IS THE LOSS MESSAGE
    var definition = data.data.arguments.hangmanDefinition;
    var dashedWord = data.data.arguments.hangmanSolution;
    console.log(result);
    console.log(definition);
    console.log(dashedWord);
    
    document.getElementById("word").textContent = dashedWord;
    document.getElementById("lives").textContent = result;
    document.getElementById("guessed").textContent = " ";
    
    
  }
});
