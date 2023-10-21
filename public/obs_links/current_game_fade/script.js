const client = new StreamerbotClient({ onConnect });

function onConnect() {
  console.log("Connected to Streamer.bot");

  client.on("Twitch.StreamUpdate", (data) => {
    console.log(data);
    updateImage(data);
  });
}

function updateImage(data) {
  var cardImages = document.querySelectorAll('.card-image');
  var gameId = data.data.game.id;
  var gameBoxUrl ="https://static-cdn.jtvnw.net/ttv-boxart/" + gameId + "-600x400.jpg";
  
cardImages.forEach(function(cardImage) {
    cardImage.src = gameBoxUrl;
});
}