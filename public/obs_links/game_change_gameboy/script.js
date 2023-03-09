// initialize client with onConnect handler
const client = new StreamerbotClient({ onConnect });

function onConnect() {
  console.log('Connected to Streamer.bot');

  client.on('Twitch.StreamUpdate', (data) => {
    handleSubAction(data);
  });
}

function handleSubAction(data){
    var oldgame = data.data.oldGame.id;
      var newgame = data.data.game.id;
      console.log(oldgame +"--"+ newgame);
      animateOne(oldgame, newgame)
    }


const gameArtEl = document.getElementsByClassName('cover-art')[0];
const cartridgeEl = document.getElementsByClassName('cartridge')[0];

function animateOne(oldgame, newgame) {
var gameBoxUrl = "https://static-cdn.jtvnw.net/ttv-boxart/" + oldgame + "-100x125.jpg";
  
gameArtEl.style.setProperty('background', "url("+gameBoxUrl+")");
  console.log("Anni1");
  cartridgeEl.classList.add('do-slide-in');
  var anim2 = setTimeout(() => animateTwo(newgame), 4500);
}

function animateTwo(newgame) {
  var gameBoxUrl = "https://static-cdn.jtvnw.net/ttv-boxart/" + newgame + "-100x125.jpg";
  gameArtEl.style.setProperty('background', "url("+gameBoxUrl+")");
  setTimeout(() => cartridgeEl.classList.remove('do-slide-in'), 5500);
  console.log("Anni2");
}