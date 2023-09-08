// Initialize an empty queue
var queue = [];

// Define the function to add a new item to the queue
function addToQueue(topText, bottomText, eventNum, broadcaster) {
  queue.push({
    topText: topText,
    bottomText: bottomText
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
    alert(item.topText, item.bottomText);
    // Call the alert function with the item's parameters after a 6 second delay
    setTimeout(function() {
      
      
      // Remove the item from the queue
      queue.shift();
      
      // Call the processQueue function again to process the next item in the queue
      processQueue();
    }, 6000);
  }
}

function OnLoad(){
  // Fade out the div
  $("#alert").fadeOut();
}



function alert(top,bottom) {
  document.getElementById("top").textContent = top;
  document.getElementById("bottom").textContent =bottom;
  // Fade in the div
  $("#alert").fadeIn();
  var sound = new Audio("./NewBiomeShort.ogg");

// set the volume to 50%
sound.volume = 0.5;

// set the sound to loop indefinitely
sound.loop = false;

// set the playback rate to 1.5x
sound.playbackRate = 1.5;

// play the sound
sound.play();

  // Wait 7 seconds
  setTimeout(function () {
    // Fade out the div
    $("#alert").fadeOut();
  }, 5000);
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
                Twitch: ["Follow","Cheer", "Sub", "Resub", "GiftSub", "GiftBomb", "Raid"]
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

    if (data.event.type == "Cheer") {
       var bits = data.data.message.bits;
      var topText = "CHEER " + bits + " BITS";
        var bottomText = data.data.message.username;
      addToQueue(topText,bottomText);
        
    }
    if (data.event.type == "Follow") {
       var user = data.data.user_name;
      var topText = "NEW FOLLOWER";
        var bottomText = user;
      addToQueue(topText,bottomText);
        
    }
    
    if (data.event.type == "GiftSub") {
      if (!data.data.fromSubBomb) {
       var topText = "GIFT TO " + data.data.recipientDisplayName;
        var bottomText = data.data.displayName;
      addToQueue(topText,bottomText);
    }
  }
    if (data.event.type == "ReSub") {
       var topText = "RESUB " + data.data.cumulativeMonths + " Months" ;
        var bottomText = data.data.displayName;
      addToQueue(topText,bottomText);
    }
    if (data.event.type == "Sub") {
       var topText = "NEW SUBSCRIBER";
        var bottomText = data.data.displayName;
      addToQueue(topText,bottomText);
    }

    if (data.event.type == "GiftBomb") {
       var topText = "GIFT BOMB OF " + data.data.gifts;
        var bottomText = data.data.displayName;
      addToQueue(topText,bottomText);
    }
    if (data.event.type == "Raid") {
      var  topText = data.data.from_broadcaster_user_name;
        var bottomText = " RAIDED WITH " + data.data.viewers;
        addToQueue(topText, bottomText);
      }
    
});

OnLoad();