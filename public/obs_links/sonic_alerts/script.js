const blueBox = document.querySelector(".blueBox");
const redBox = document.querySelector(".redBox");
const yellowBox = document.querySelector(".yellowBox");
const zoneName = document.querySelector(".zoneName");
const zone = document.querySelector(".zone");
const number = document.querySelector(".number");
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
        Twitch: ["Follow", "Cheer", "Sub", "Resub", "GiftSub", "GiftBomb"]
      }
    })
  );
});

// Initialize an empty queue
var queue = [];

// Define the function to add a new item to the queue
function addToQueue(topText, bottomText, eventNum, broadcaster) {
  queue.push({
    topText: topText,
    bottomText: bottomText,
    eventNum: eventNum,
    broadcaster: broadcaster
  });

  // If the queue was empty before adding this item, start processing the queue
  if (queue.length === 1) {
    processQueue();
  }
}

// Define the function to process the queue
function processQueue() {
  // If the queue is not empty
  if (queue.length > 0) {
    // Get the first item in the queue
    var item = queue[0];

    // Call the alert function with the item's parameters after a 6 second delay
    setTimeout(function () {
      alert(item.topText, item.bottomText, item.eventNum, item.broadcaster);

      // Remove the item from the queue
      queue.shift();

      // Call the processQueue function again to process the next item in the queue
      processQueue();
    }, 6000);
  }
}




function alert(top, bottom, yelNum, broadcaster) {
  document.getElementById("top").textContent = top;
  document.getElementById("bottom").textContent = bottom;
  document.getElementById("eventNum").textContent = yelNum;
  document.getElementById("userName").textContent = broadcaster;
  console.log("SET TEXT");

  // Trigger blueBox animation
  blueBox.classList.add("animate");

  // Trigger redBox animation
  redBox.classList.add("animate");

  // Trigger yellowBox animation
  yellowBox.classList.add("animate");

  // Trigger zoneName animation
  zoneName.classList.add("animate");

  // Trigger zone animation
  zone.classList.add("animate");

  setTimeout(() => {
    blueBox.classList.remove("animate");
    yellowBox.classList.remove("animate");
    redBox.classList.remove("animate");
    zone.classList.remove("animate");
    zoneName.classList.remove("animate");
  }, 5000);
}

ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);
  console.log(event.data);
  // handle event response here
  if (!data.event || !data.event.type) return;
  var topText = "";
  var bottomText = "";
  var broadcaster = "";
  var eventNum = "";
  switch (data.event.type) {
    case "Cheer":
      var bits = data.data.message.bits;
      topText = data.data.message.username;
      bottomText = "Cheer";
      eventNum = bits;
      broadcaster = "Thank You for the Bits";
      console.log("CHEERS" + eventNum);
      addToQueue(topText, bottomText, eventNum, broadcaster);
      break;

    case "Follow":
      var user = data.data.user_name;
      topText = user;
      bottomText = "NEW FOLLOWER";
      broadcaster = "Thank You for the Follow";
      eventNum = ""
      addToQueue(topText, bottomText, eventNum, broadcaster);
      break;

    case "GiftSub":
      if (!data.data.fromSubBomb) {
        topText = data.data.displayName;
        bottomText = data.data.recipientDisplayName;
        eventNum = "1";
        broadcaster = "Thank you for gifting a Sub";
        addToQueue(topText, bottomText, eventNum, broadcaster);
      }
      break;

    case "ReSub":
      topText = data.data.displayName;
      bottomText = "RESUB";
      eventNum = data.data.cumulativeMonths;
      broadcaster = "Thank you for the Resub";
      addToQueue(topText, bottomText, eventNum, broadcaster);
      break;

    case "Sub":
      topText = data.data.displayName;;
      bottomText = "SUBSCRIBER";
      eventNum = "1";
      broadcaster = "Thank You for Subscribing";
      addToQueue(topText, bottomText, eventNum, broadcaster);
      break;

    case "GiftBomb":
      topText = data.data.displayName;
      bottomText = "GIFT BOMB"
      eventNum = data.data.gifts;
      broadcaster = "Thank you for the Gift Subs";
      addToQueue(topText, bottomText, eventNum, broadcaster);
      break;
  }
});
