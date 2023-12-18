// Get config from import params
const url = new URL(import.meta.url);
const config = {
// this must match the title of the Channel Points reward we want to trigger for
rewardTitle: url.searchParams.get('rewardTitle') || "Flip Screen",
deviceId: url.searchParams.get('deviceId') || 'default',

// this is the number of seconds to display the image (defaults to 5)
seconds: Number(url.searchParams.get('seconds')) || 30
}
console.log(config.rewardTitle);
console.log(config.deviceId);
console.log(config.seconds);


// Streamer.bot WebSocket Client configuration
import "https://cdn.skypack.dev/@streamerbot/client";
const client = new StreamerbotClient({
  host: window.config.host || '127.0.0.1',
  port: window.config.port || 8080,
  endpoint: window.config.endpoint || '/',
});

// Function to capture the main display and show it
async function showScreen() {
  const screenVideoHTML = document.createElement("video");
  screenVideoHTML.id = "screenVideo";
  screenVideoHTML.autoplay = true;
  screenVideoHTML.setAttribute("playsinline", "");
  document.body.appendChild(screenVideoHTML);
  
  (async () => {
      try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          const screenVideo = document.getElementById('screenVideo');
          screenVideo.srcObject = stream;
      } catch (error) {
          console.error('Error accessing screen capture:', error);
      }
  })();
}

showScreen();

// Called when any event is received from Streamerbot, including those subscribed to by other scripts.
client.on('Twitch.RewardRedemption', message => {
  var name = message.data.reward.title;
  if (name === config.rewardTitle) {
    flipScreen();
  }
});

function flipScreen() {
  var screen = document.getElementById('screenVideo');
  
  // Rotate the screen by 180 degrees
  screen.style.transform = 'rotate(180deg)';

  // Wait for 30 seconds and then rotate it back
  setTimeout(function () {
    screen.style.transform = 'rotate(0deg)'; // Rotate back to 0 degrees
  }, (config.seconds * 1000)); // 30,000 milliseconds = 30 seconds
}
