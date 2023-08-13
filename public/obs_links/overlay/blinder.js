// Get config from import params
const url = new URL(import.meta.url);
const config = {
// this must match the title of the Channel Points reward we want to trigger for
actionName: url.searchParams.get('actionName') || "Blinder",

// this is the URL of the image we want to display
imageUrl: url.searchParams.get('imageUrl') || "https://terrierdarts.co.uk/obs_links/overlay/white.png", 

// this is the number of seconds to display the image (defaults to 5)
seconds: Number(url.searchParams.get('seconds')) || 10
}
console.log(config.actionName);
console.log(config.imageUrl);
console.log(config.seconds);
// Will subscribe to these events, mapped directly to the websocket subscription request.
;

window.streamerbot.subscribeTo({
  Raw: [ "Action" ]
});

// Called when any event is received from Streamerbot, including those subscribed to by other scripts.
window.streamerbot.onMessage(message => {
   //console.log("Action Redeemed");
  //const data = JSON.stringify(message);
  //console.log(data);
  var action = message.data.name;
  //console.log("Name: " + action);
    if (action === config.actionName)
    { 
  
    showImage();
  }
});

function showImage() {
  // Create our image element
  const imgElement = document.createElement("img");

  // Modify the image element src to point at the configured image URL
  imgElement.src = config.imageUrl;
  imgElement.style.display = "block";
  imgElement.style.margin = "auto";
  imgElement.style.position = "absolute";
  imgElement.style.top = "0";
  imgElement.style.bottom = "0";
  imgElement.style.left = "0";
  imgElement.style.right = "0";


  // Append the image element to the HTML document
  document.body.appendChild(imgElement);
        console.log("SHOWING IMAGE");
  // Set a timeout to remove the image after the configured amount of time
  setTimeout(() => {
    imgElement.remove();
  }, config.seconds * 1000)
}