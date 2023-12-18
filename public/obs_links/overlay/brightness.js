// Get config from import params
const url = new URL(import.meta.url);
const config = {
// this must match the title of the Channel Points reward we want to trigger for
rewardTitle: url.searchParams.get('rewardTitle') || "Lower The Brightness",
// this is the number of seconds to display the image (defaults to 30)
seconds: Number(url.searchParams.get('seconds')) || 30
}
console.log(config.rewardTitle);
console.log(config.imageUrl);
console.log(config.seconds);


// Streamer.bot WebSocket Client configuration
import "https://cdn.skypack.dev/@streamerbot/client";
const client = new StreamerbotClient({
  host: window.config.host || '127.0.0.1',
  port: window.config.port || 8080,
  endpoint: window.config.endpoint || '/',
});

// Called when any event is received from Streamerbot, including those subscribed to by other scripts.

client.on('Twitch.RewardRedemption' , message => {
    var name = message.data.reward.title;
    console.log("B" + name);
      if (name === config.rewardTitle)
      {
        simulateSequence();
    }
  });

  const blackBackground = document.createElement("div");

function brightnessDown() {
  // Create a black background element
  blackBackground.style.position = "fixed";
  blackBackground.style.top = "0";
  blackBackground.style.left = "0";
  blackBackground.style.width = "100%";
  blackBackground.style.height = "100%";
  blackBackground.style.backgroundColor = "black";
  blackBackground.style.opacity = 0;
  document.body.appendChild(blackBackground);

  // Function to trigger the fade-in effect
function fadeInBackground() {
    let opacity = 0;
    const startTime = Date.now();
    const duration = 5000; // 5 seconds in milliseconds

    function updateOpacity() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      opacity = Math.min(0.8, elapsedTime / duration);
      blackBackground.style.opacity = opacity;

      if (opacity < 1) {
        requestAnimationFrame(updateOpacity);
      }
    }

    requestAnimationFrame(updateOpacity);
  }

  // Trigger the fade-in effect
  setTimeout(fadeInBackground, 0); // Using setTimeout to ensure the effect starts after rendering
}

function brightnessUp() {
  // Create a black background element
  blackBackground.style.position = "fixed";
  blackBackground.style.top = "0";
  blackBackground.style.left = "0";
  blackBackground.style.width = "100%";
  blackBackground.style.height = "100%";
  blackBackground.style.backgroundColor = "black";
  blackBackground.style.opacity = 0.8;
  document.body.appendChild(blackBackground);

  // Function to trigger the fade-in effect
  function fadeInBackground() {
    let opacity = 0;
    const startTime = Date.now();
    const duration = 5000; // 5 seconds in milliseconds

    function updateOpacity() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      opacity = Math.min(0, elapsedTime / duration);
      blackBackground.style.opacity = opacity;

      if (opacity < 1) {
        requestAnimationFrame(updateOpacity);
      }
    }

    requestAnimationFrame(updateOpacity);
  }

  // Trigger the fade-in effect
  setTimeout(fadeInBackground, 0); // Using setTimeout to ensure the effect starts after rendering
}

function overlayShow()
{
// Create the overlay element
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.textContent = "BRIGHTNESS : ▊▊▊▊▊ - - - - -";

    // Create a style element and set its content
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap');

      .overlay {
        color: lime;
        font-size: 60px;
        font-family: 'Pixelify Sans', sans-serif;
         position: fixed;
         left:50%;
         bottom: 10px;
         transform: translate(-50%, -50%);
         margin: 0 auto;
         z-index:1;
      }
    `;

    // Append the overlay and style elements to the body
    document.body.appendChild(overlay);
    document.head.appendChild(style);
  
}

function overlayDown(){
  
const overlay = document.querySelector('.overlay');
    const originalText = overlay.textContent;
    const sequence = ['▊▊▊▊▊———', '▊▊▊▊————', '▊▊▊————', '▊▊—————', '▊——————', '———————'];

    // Function to update the overlay text
    function updateOverlay(index) {
      overlay.textContent = `BRIGHTNESS : ${sequence[index]}`;
    }

    // Function to gradually update the text
    function graduallyUpdateText() {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex < sequence.length) {
          updateOverlay(currentIndex);
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 500); // Delay between each update (1 second)
    }

    // Start the gradual text update after a delay
    setTimeout(graduallyUpdateText, 500); // Start after 2 seconds
}


function overlayUp(){
  
const overlay = document.querySelector('.overlay');
    const originalText = overlay.textContent;
    const sequence = ['———————', '▊——————', '▊▊—————', '▊▊▊————', '▊▊▊▊————', '▊▊▊▊▊———'];


    // Function to update the overlay text
    function updateOverlay(index) {
      overlay.textContent = `BRIGHTNESS : ${sequence[index]}`;
    }

    // Function to gradually update the text
    function graduallyUpdateText() {
      let currentIndex = 0;
      const timer = setInterval(() => {
        if (currentIndex < sequence.length) {
          updateOverlay(currentIndex);
          currentIndex++;
        } else {
          clearInterval(timer);
        }
      }, 500); // Delay between each update (1 second)
    }

    // Start the gradual text update after a delay
    setTimeout(graduallyUpdateText, 500); // Start after 2 seconds
}


function overlayHide()
{
  const elements = document.querySelectorAll('.overlay');
  elements.forEach((element) => {
    element.remove();
  });
  
  
}

// Simulate the sequence with a 30-second delay
function simulateSequence() {
  setTimeout(overlayShow, 0);
  setTimeout(overlayDown, 0); // 10 seconds
  setTimeout(brightnessDown,0); // 15 seconds
  setTimeout(brightnessUp, (config.seconds * 1000)); // 25 seconds
  setTimeout(overlayUp, (config.seconds * 1000)); // 26 seconds
  setTimeout(overlayHide, ((config.seconds +5) * 1000)); // 30 seconds
}

