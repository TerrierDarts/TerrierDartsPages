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
        hypeRate: ["HeartRatePulse"]
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
  if (data.event.type == "HeartRatePulse") {
    var heartrate = data.data.heartRate;
    //console.log(heartrate);
    var bpm = 300/heartrate;
    document.getElementById("rate").textContent = heartrate;
    setBeat(bpm)
    //This happens on a Chat Message
  }
});

function setBeat(bpm) {
  gsap.to("#heart", 1, {
    animation: bpm
  });
}