// subscribe to Twitch events
// initialize client with onConnect handler
const client = new StreamerbotClient({ onConnect });

// when connected, subscribe to subaction and register handler function
function onConnect() {
  console.log("Connected to Streamer.bot");
}

client.on("Twitch.FirstWord", (data) => {
  console.log(event.data);
  if (data.event.type == "FirstWord" && !data.data.message.internal) {
    var user = data.data.message.displayName;

    var username = data.data.message.username;
    
    data.data.message.badges.forEach((badges) => {
      var imageUrl = badges.imageUrl;
      var name = badges.name;
      user =
        `<img id="badge" class="${badges.name}" title="${badges.name}" src="${badges.imageUrl}">` +
        user;
    });

    var message = data.data.message.message;
    if (message.length > 60) {
      message = message.substring(0, 60) + "...";
    }

    data.data.message.emotes.forEach((emotes) => {
      var imageUrl = emotes.imageUrl;
      var name = emotes.name;
      var end = emotes.endIndex;
      var start = emotes.startIndex;
      if (end <= 60) {
        message = message.replace(name, `<img id="emote" src="${imageUrl}">`);
      }
    });

    var broadcaster = data.data.message.channel;

 addToQueue(user, username, broadcaster, message);
  }
});

function animate() {
  gsap.to("#section", 0.2, {
    top: 0,
    position: "fixed",
    ease: Linear.easeNone,
    repeat: 0,
    delay: 1
  });
  setTimeout(soundPop, 500);
  gsap.to("#section", 0.2, {
    top: 320,
    position: "fixed",
    ease: Linear.easeNone,
    repeat: 0,
    delay: 5
  });
}

function soundPop() {
  var audio = new Audio("messenger-type.mp3");
  audio.volume = 1;
  audio.play();
}

async function addImage(user) {
 
  var url = "https://decapi.me/twitch/avatar/" + user;
  let resp = await fetch(url);
  let txt = await resp.text();
  console.log(txt);
  document.getElementById("pic").src = txt;
}


// Initialize an empty queue
var queue = [];

// Define the function to add a new item to the queue
function addToQueue(user, username, broadcaster, message ) {
 
  queue.push({
    user: user,
    username: username,
    broadcaster: broadcaster,
    message: message
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
    walkOn(item.user, item.username, item.broadcaster, item.message);
    // Call the alert function with the item's parameters after a 6 second delay
    setTimeout(function() {
      
      
      // Remove the item from the queue
      queue.shift();
      
      // Call the processQueue function again to process the next item in the queue
      processQueue();
    }, 6000);
  }
}


function walkOn(user, username, broadcaster, message )
{
  
    document.getElementById("message").innerHTML = message;
    document.getElementById("user").innerHTML = user;
    addImage(username);
    document.getElementById("broadcaster").textContent = broadcaster;
    animate();
  
  
}