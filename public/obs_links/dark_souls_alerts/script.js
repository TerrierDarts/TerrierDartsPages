// Initialize an empty queue
var queue = [];

// Define the function to add a new item to the queue
function addToQueue(text) {
  queue.push({
   text : text
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
       alert(item.text);
    // Call the alert function with the item's parameters after a 6 second delay
    setTimeout(function() {
   
      
      // Remove the item from the queue
      queue.shift();
      
      // Call the processQueue function again to process the next item in the queue
      processQueue();
    }, 6000);
  }
}



//https://www.dafont.com/optimusprinceps.font

alert("YOU DIED");
function alert(text) {

  document.getElementById("text").textContent = text;
  const myElement = document.getElementById("text");
   var sound = new Audio("./dark_soul_death.mp3");

// set the volume to 50%
sound.volume = 0.5;

// set the sound to loop indefinitely
sound.loop = false;

// set the playback rate to 1.5x
sound.playbackRate = 1.5;

// play the sound
sound.play();
  // Grow the text of the element until it reaches a width of 100 pixels
    setTimeout(() => {
      growText(myElement, 1400);
    }, 0);
    // Fade in the div
  $("#alert").fadeIn(() => {
    
  });
  // Wait 5 seconds
  setTimeout(function () {
    // Fade out the div
    $("#alert").fadeOut();
  }, 5000);
  shrinkText(myElement,100);
}



function growText(element, maxSize) {
  
  let fontSize = 60;
   
  let interval = setInterval(() => {
    if (element.offsetWidth >= maxSize || fontSize >= 100) {
      clearInterval(interval);
    } else {
      fontSize++;
      element.style.fontSize = fontSize + "px";
   
    }
  }, 55); // Update the font size every 20 milliseconds
}

function shrinkText(element, maxSize) {
  
let fontSize =60;
element.style.fontSize = fontSize + "px";

}



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
  var user = "";
  var text = "";
  if (data.event.type == "Cheer") {
    var bits = data.data.message.bits;
    user = data.data.message.displayName;
    text = user + " Cheered " + bits + " Bits";

    addToQueue(text);
  }
  if (data.event.type == "Follow") {
    user = data.data.user_name;
    text = "NEW FOLLOWER " + user;
    addToQueue(text);
  }

  if (data.event.type == "GiftSub") {
    if (!data.data.fromSubBomb) {
    text =  data.data.displayName + " GIFTED TO " + data.data.recipientDisplayName;

    addToQueue(text);
  }
}
  if (data.event.type == "ReSub") {
    text =  data.data.displayName + " RESUB " + data.data.cumulativeMonths + " Months";

    addToQueue(text);
  }
  if (data.event.type == "Sub") {
     text = data.data.displayName + " NEW SUBSCRIBER";

     addToQueue(text);
  }

  if (data.event.type == "GiftBomb") {
    text = data.data.displayName + " GIFT BOMB OF " + data.data.gifts;
    addToQueue(text);
  }
  if (data.event.type == "Raid") {
    text = data.data.displayName + " RAIDED WITH " + data.data.viewerCount;
    addToQueue(text);
  }
});