const client = new StreamerbotClient({ onConnect });

function onConnect() {
  console.log("Connected to Streamer.bot");
}

client.on("Twitch.ChatMessage", (data) => {
  console.log(data);
  var internal = data.data.message.internal;
  //if (internal) {
  //return;
  //}
  var source = data.event.source;
  var message = data.data.message.message;
  var user = `<text id="user">${data.data.message.displayName}:</text>`;
  var color = data.data.message.color ? data.data.message.color : "#DDF900";
  var cheerEmotes = data.data.message.cheerEmotes;
  var nameHTML = `<i id="icon" class="fab fa-twitch" style="color:purple;"></i>`;
  data.data.message.badges.forEach(
    (badges) =>
      (nameHTML += `<img id="badge" class="${badges.name}" title="${badges.name}" src="${badges.imageUrl}">`)
  );
  var nameFinal = `<span id="name" style="color:${color}">${nameHTML}${user}</span>`;
  console.log(nameFinal);

  data.data.message.emotes.forEach((emotes) => {
    var imageUrl = emotes.imageUrl;
    var name = emotes.name;
    var end = emotes.endIndex;
    var start = emotes.startIndex;
    message = message.replace(name, `<img id="emote" src="${imageUrl}">`);
  });

  console.log(message);
  var messageFinal = `<span id="message">${message}</span>`
  var finalAddition = `<div id="chat">${nameFinal} ${messageFinal}</div>`;

  document.getElementById("container").innerHTML += finalAddition;
});


client.on("Twitch.RewardRedemption", (data) => {
  console.log(data);



  //user redeemed name for cost - input
  var user = data.data.user_name;
  var input = data.data.user_input;
  var cost = data.data.reward.cost;
  var name = data.data.reward.title;
  var messageFinal = `${user} redeemed ${name} for ${cost}. ${input}`;
  console.log(messageFinal);

  var finalAddition = `<div id="redeem">${messageFinal}</div>`;

  document.getElementById("container").innerHTML += finalAddition;

});

client.on("YouTube.Message", (data) => {
  console.log(data);

  var message = data.data.message;
  var user = `<text id="user">${data.data.user.name}:</text>`;
  var color = "#E91B18";

  var nameHTML = `<i id="icon" class="fab fa-youtube" style="color:red;"/>`;

  var nameFinal = `${nameHTML} <span id="name" style="color:${color}">${user}</span>`;
  console.log(nameFinal);
  console.log(message);
  var messageFinal = `<span id="message"> ${message}</span>`
  var finalAddition = `<div id="chat">${nameFinal} ${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});


client.on("Twitch.Follow", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.user_name;
  var messageFinal = `${user} just followed the channel`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});

client.on("Twitch.Cheer", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.message.username;
  var bits = data.data.message.bits;
  var messageFinal = `${user} just cheered ${bits} bits`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});


client.on("Twitch.GiftSub", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.displayName;
  var target = data.data.recipientDisplayName;
  var months = data.data.monthsGifted;
  switch (data.data.subTier) {
    case 0:
      var tier = "Prime";
      break;
    case 1:
      var tier = "Tier 1";
      break;
    case 2:
      var tier = "Tier 2";
      break;
    case 3:
      var tier = "Tier 3";
      break;
    default:
      var tier = "Tier 1";
  }
  var messageFinal = `${user} gifted a ${tier} sub to ${target} for ${months} month/s`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});

//GIFT BOMB


client.on("Twitch.Raid", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.from_broadcaster_user_name;
  var viewers = data.data.viewers;
  var messageFinal = `${user} just raided with ${viewers} viewer/s`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});


client.on("Twitch.Sub", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.displayName;
  switch (data.data.subTier) {
    case 0:
      var tier = "using Prime";
      break;
    case 1:
      var tier = "at Tier 1";
      break;
    case 2:
      var tier = "at Tier 2";
      break;
    case 3:
      var tier = "at Tier 3";
      break;
    default:
      var tier = "at Tier 1";
  }
  var messageFinal = `${user} subscribed ${tier}`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});

client.on("Twitch.ReSub", (data) => {
  console.log(data);
  //user redeemed name for cost - input
  var user = data.data.displayName;
  var totalMonths = data.data.cumulativeMonths;
  switch (data.data.subTier) {
    case 0:
      var tier = "using Prime";
      break;
    case 1:
      var tier = "at Tier 1";
      break;
    case 2:
      var tier = "at Tier 2";
      break;
    case 3:
      var tier = "at Tier 3";
      break;
    default:
      var tier = "at Tier 1";
  }
  var messageFinal = `${user} resubscribed ${tier} (${totalMonths} months)`;
  var finalAddition = `<div id="event">${messageFinal}</div>`;
  document.getElementById("container").innerHTML += finalAddition;

});



function handleKeyPress(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    // Prevent the default Enter key behavior (e.g., form submission)
    event.preventDefault();
    
    // Call the function you want to run on Enter key press
    sendMessage();
  }
}


function sendMessage() {
  var messageInput = document.getElementById("textbox");
  var message = messageInput.value;
  console.log("Message Logged:", message);
  // Check if the message is not empty before proceeding
  if (message.trim() !== "") {
    // Your code to send the message here
    console.log("Message to send:", message);
    //postMessage(message)
    client.doAction({ name: "[OBS DOCK] Send Message"},{ "message": message});
    // Clear the input field
    messageInput.value = "";
  } else {
    console.log("Message is empty. Please enter a message.");
  }
}



/*
THIS IS THE SCROLLING STUFF
*/




// Get a reference to the div you want to auto-scroll.
var someElement = document.querySelector('.scroller');
// Create an observer and pass it a callback.
var observer = new MutationObserver(scrollToBottom);
// Tell it to look for new children that will change the height.
var config = { childList: true };
observer.observe(someElement, config);

// First, define a helper function.
function animateScroll(duration) {
  var start = someElement.scrollTop;
  var end = someElement.scrollHeight;
  var change = end - start;
  var increment = 20;
  function easeInOut(currentTime, start, change, duration) {
    // by Robert Penner
    currentTime /= duration / 2;
    if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  }
  function animate(elapsedTime) {
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);
    someElement.scrollTop = position;
    if (elapsedTime < duration) {
      setTimeout(function () {
        animate(elapsedTime);
      }, increment)
    }
  }
  animate(0);
}
// Here's our main callback function we passed to the observer
function scrollToBottom() {
  var duration = 300 // Or however many milliseconds you want to scroll to last
  animateScroll(duration);
}