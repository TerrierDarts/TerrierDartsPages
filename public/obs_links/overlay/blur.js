// Get config from import params
const url = new URL(import.meta.url);
const config = {
// this must match the title of the Channel Points reward we want to trigger for
actionName: url.searchParams.get('actionName') || "[HTML] Need Glasses",

// this is the URL of the image we want to display
imageUrl: url.searchParams.get('imageUrl') || "https://terrierdarts.co.uk/obs_links/overlay/black.png", 

// this is the number of seconds to display the image (defaults to 30)
seconds: Number(url.searchParams.get('seconds')) || 30
}
console.log(config.actionName);
console.log(config.imageUrl);
console.log(config.seconds);
// Will subscribe to these events, mapped directly to the websocket subscription request.
;

// Streamer.bot WebSocket Client configuration
import "https://cdn.skypack.dev/@streamerbot/client";
const client = new StreamerbotClient({
  host: window.config.host || '127.0.0.1',
  port: window.config.port || 8080,
  endpoint: window.config.endpoint || '/',
});
client.on('Raw.Action' , message => {

  var action = message.data.name;
  //console.log("Name: " + action);
    if (action === config.actionName)
    { 
  
    showImage();
  }
});

function showImage() {
  
  const blurOverlay = document.createElement('div');
  blurOverlay.style.position = 'fixed';
  blurOverlay.style.top = '0';
  blurOverlay.style.left = '0';
  blurOverlay.style.width = '100%';
  blurOverlay.style.height = '100%';
  blurOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Adjust the opacity and color as needed
  blurOverlay.style.filter = 'blur(5px)'; // Adjust the blur amount as needed
  
  // Append the blur overlay to the document's body
  document.body.appendChild(blurOverlay);


 
        console.log("SHOWING BLUR");
  // Set a timeout to remove the image after the configured amount of time
  setTimeout(() => {
    document.body.removeChild(blurOverlay);
  }, config.seconds * 1000)
}