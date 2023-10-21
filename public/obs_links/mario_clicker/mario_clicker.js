const WEBSOCKET_URI = "ws://127.0.0.1:8080/";

// subscribe to Twitch events
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

const mario_sprite = document.querySelector(".sprite__mario");
const block_sprite = document.querySelector(".sprite__block");
const root = document.documentElement;
let coins = 0;
let mario_fire = true;

document.addEventListener("click", (e) => {
  this.handleJump(event);
});

function handleEvent(event) {
  toggleMarioFire(event.type);
}

function toggleMarioFire(type) {
  if (!mario_fire && type == "click") {
    setMarioFire();
    mario_fire = true;
  } else if (mario_fire && type == "click") {
    setSuperMario();
    mario_fire = false;
  }
}

function setMarioFire() {
  root.style.setProperty("--cap-shirt-line", "#3F3F3F");
  root.style.setProperty("--cap-shirt-color", "#FFFFFF");
  root.style.setProperty("--cap-shirt-shadow", "#DADB9E");
  root.style.setProperty("--cap-deco-color", "#FEFF81");
  root.style.setProperty("--cap-deco-shadow", "#FFDA00");
  root.style.setProperty("--cap-deco-light", "#FFFFFF");
  root.style.setProperty("--hair-color", "#212121");
  root.style.setProperty("--eyes-color", "#212121");
  root.style.setProperty("--outer-eyes-color", "#FFFFFF");
  root.style.setProperty("--skin-color", "#FFCFBD");
  root.style.setProperty("--skin-shadow", "#FF5B00");
  root.style.setProperty("--skin-gloves-line", "#894D00");
  root.style.setProperty("--overall-color", "#FF0000");
  root.style.setProperty("--overall-shadow", "#C60000");
  root.style.setProperty("--overall-deco", "#FFFFFF");
  root.style.setProperty("--overall-line", "#3E0000");
  root.style.setProperty("--shoes-color", "#894D00");
  root.style.setProperty("--shoes-line", "#212121");
  root.style.setProperty("--shoes-deco", "#FEFF81");
  root.style.setProperty("--gloves-color", "#FFFFFF");
  root.style.setProperty("--white", "#FFFFFF");
}

function setSuperMario() {
  root.style.setProperty("--cap-shirt-line", "#212121");
  root.style.setProperty("--cap-shirt-color", "#FF0065");
  root.style.setProperty("--cap-shirt-shadow", "#BB0058");
  root.style.setProperty("--cap-deco-color", "#FFDA4E");
  root.style.setProperty("--cap-deco-shadow", "#E49A00");
  root.style.setProperty("--cap-deco-light", "#FFFFFF");
  root.style.setProperty("--hair-color", "#212121");
  root.style.setProperty("--eyes-color", "#212121");
  root.style.setProperty("--outer-eyes-color", "#FFFFFF");
  root.style.setProperty("--skin-color", "#FFCFBD");
  root.style.setProperty("--skin-shadow", "#FF5A58");
  root.style.setProperty("--skin-gloves-line", "#894D00");
  root.style.setProperty("--overall-color", "#55DDC9");
  root.style.setProperty("--overall-shadow", "#187B96");
  root.style.setProperty("--overall-deco", "#FFFFFF");
  root.style.setProperty("--overall-line", "#1A2487");
  root.style.setProperty("--shoes-color", "#894D00");
  root.style.setProperty("--shoes-line", "#212121");
  root.style.setProperty("--shoes-deco", "#FFCFBD");
  root.style.setProperty("--gloves-color", "#FFFFFF");
  root.style.setProperty("--white", "#FFFFFF");
}

function handleJump(event) {
  setTimeout(() => {
    mario_sprite.classList.add("sprite__mario--jump");
    block_sprite.classList.add("sprite__block--push");
    newCoin();
  }, 1);

  mario_sprite.classList.remove("sprite__mario--jump");
  block_sprite.classList.remove("sprite__block--push");
}

function newCoin() {
  const count_div = document.querySelector(".ui__num");
  coins++;
  count_div.innerText = coins;
  const coin = document.createElement("div");
  coin.setAttribute("class", "sprite sprite__coin");
  document.body.appendChild(coin);
  setTimeout(function () {
    document.body.removeChild(coin);
  }, 500);
  
  var coinMod = coins % coins1up;
  if(coinMod === 0)
  {
       ws.send(JSON.stringify(
   {
     request: "DoAction",
      action: {
        name: "[Heat] Mario 1UP"
      },

      args: {
        coinCount: coins,
        user: user

      },
      id: "123"
     
    }));
  console.log("1 up");
}
}
// listen to events
ws.addEventListener("message", (event) => {
  console.log(event.data);
  if (!event.data) return;

  const data = JSON.parse(event.data);

  // handle event response here
  if (!data.event || !data.event.type) return;
  switch (data.event.type) {
    case "SubAction":
      if ((data.data.name === "** Mario Jump **")) {
        
       user = data.data.arguments.user
        if(data.data.arguments.user == "TerrierDarts")
          {
            setMarioFire()
          }
          else{
            setSuperMario()
          }
		  coins1up = data.data.arguments.oneUpAmount; 
        this.handleJump(event);
      }

      break;
  }
});

//let jump = new Jump();
