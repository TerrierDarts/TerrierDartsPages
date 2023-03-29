const nameT = document.querySelector(".name");
const zoneT = document.querySelector(".zone");
const actT = document.querySelector(".act");
const numT = document.querySelector(".num");
const oval = document.querySelector(".oval");


///Queue System
var queue = [];

function addToQueue(name, zone, act, num) {

  //add item to queue
  queue.push({
    name: name,
    zone: zone,
    act: act,
    num: num
  });
console.log(queue.length);
  if (queue.length === 1) {
    processQueue();
  }
}

function processQueue() {
  if (queue.length > 0) {
    var item = queue[0];
    alert(item.name, item.zone, item.act, item.num);
    setTimeout(function () {
      queue.shift();
      processQueue();

    }, 8000);
  }
}





//Alert Function
function alert(name, zone, act, num) {
  document.getElementById("name").textContent = name;
  document.getElementById("zone").textContent = zone;
  document.getElementById("act").textContent = act;
  document.getElementById("num").textContent = num;
  console.log("SET TEXT");

  // Trigger blueBox animation
  nameT.classList.add("animate");

  // Trigger redBox animation
  zoneT.classList.add("animate");
  // Trigger yellowBox animation
  actT.classList.add("animate");
  // Trigger zoneName animation
  numT.classList.add("animate");
  oval.classList.add("animate");
  var sound = new Audio("./sonic_sound.mp3");

  // set the volume to 50%
  sound.volume = 0.5;

  // set the sound to loop indefinitely
  sound.loop = false;

  // set the playback rate to 1.5x
  sound.playbackRate = 1;

  // play the sound
  sound.play();


  setTimeout(() => {
    nameT.classList.remove("animate");
    zoneT.classList.remove("animate");
    actT.classList.remove("animate");
    numT.classList.remove("animate");
    oval.classList.remove("animate");
  }, 7000);
}


//Websocket Stuff

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
        Twitch: ["Follow", "Cheer", "Sub", "Resub", "GiftSub", "GiftBomb", "Raid"]
      }
    })
  );
});

ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);
  console.log(event.data);
  // handle event response here
  if (!data.event || !data.event.type) return;
  var name = "";
  var zone = "";
  var act = "";
  var num = "";
  switch (data.event.type) {
    case "Cheer":
      var bits = data.data.message.bits;
      name = data.data.message.username;
      zone = "Cheer";
      num = bits;
      act = "AMT";
      addToQueue(name, zone, act, num);
      break;

    case "Follow":
      var user = data.data.user_name;
      name = user;
      zone = "FOLLOWER";
      act = "FLW";
      num = "1";
      addToQueue(name, zone, act, num);
      break;

    case "GiftSub":
      if (!data.data.fromSubBomb) {
        name = data.data.displayName;
        zone = data.data.recipientDisplayName;
        num = "1";
        act = "GFT";
        addToQueue(name, zone, act, num);
      }
      break;

    case "ReSub":
      name = data.data.displayName;
      zone = "RESUBSCRIBE";
      num = data.data.cumulativeMonths;
      act = "MNT";
      addToQueue(name, zone, act, num);
      break;

    case "Sub":
      name = data.data.displayName;
      zone = "SUBSCRIBER";
      num = "1";
      act = "MNT";
      addToQueue(name, zone, act, num);
      break;

    case "GiftBomb":
      name = data.data.displayName;
      zone = "GIFT BOMB";
      num = data.data.gifts;
      act = "GFT";
      addToQueue(name, zone, act, num);
      break;
    case "Raid":
      name = data.data.displayName;
      zone = "RAID";
      num = data.data.viewerCount;
      act = "VWS";
      addToQueue(name, zone, act, num);
      break;
  }
});