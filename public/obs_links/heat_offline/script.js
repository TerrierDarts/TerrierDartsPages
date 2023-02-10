var theThing = document.querySelector("#thing");
var container = document.querySelector("#contentContainer");

//Doing the math on the click
container.addEventListener("click", function (event) {
  var widthN = document.getElementById("width").value;
  var heightN = document.getElementById("height").value;
  var xPosition = ((event.clientX - 11) / widthN) * 2;
  var yPosition = ((event.clientY - 190) / heightN) * 2;
  console.log("X=" + xPosition + ", Y=" + yPosition);
  //this is sending it to the function so it can go back to SB
  SendClick(xPosition, yPosition);
});
//setting Canvas Size
function updateCanvas() {
  gsap.to("#contentContainer", 0.2, {
    width: document.getElementById("width").value / 2,
    height: document.getElementById("height").value / 2
  });
  console.log("Canvas Update");
}

//Start of Websocket Stuff
const WEBSOCKET_URI = document.getElementById("url").value;

// subscribe to Twitch events
const ws = new WebSocket(WEBSOCKET_URI);
ws.addEventListener("open", (event) => {
  console.log("Connected to Streamer.bot");

  ws.send(
    JSON.stringify({
      request: "Subscribe",
      id: "123",
      events: {
        Raw: ["SubAction"]
      }
    })
  );
});
//Sending info back to SB
function SendClick(x, y) {
  var user = document.getElementById("user").value;
  var alt = document.getElementById("alt").checked;
  var ctrl = document.getElementById("ctrl").checked;
  var shift = document.getElementById("shift").checked;
  if (user == "") {
    user = "535833752";
  }
  ws.send(
    JSON.stringify({
      request: "DoAction",
      action: {
        name: "[Heat] Message"
      },

      args: {
        message:
          '{ "type": "click", "x": "' +
          x +
          '", "y": "' +
          y +
          '","modifiers": {"alt": ' +
          alt +
          ',"ctrl": ' +
          ctrl +
          ',"shift":' +
          shift +
          '},"id": "' +
          user +
          '"}'
        //'{"x":'+x+', "y":'+y+',"id":"click","type":"click"}',
      },
      id: "123"
    })
  );
  console.log("message Sent:");
}