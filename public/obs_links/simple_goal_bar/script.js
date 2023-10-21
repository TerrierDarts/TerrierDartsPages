const WEBSOCKET_URI = "ws://127.0.0.1:8080/";
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

ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);
  
  // handle event response here
  if (!data.event || !data.event.type) return;
  
  if (data.data.name == "** Dono Goal **"){
    console.log(event.data);
    var name = data.data.arguments.goalName;
    var amount = data.data.arguments.goalAmount;
    var target = data.data.arguments.goalTarget;
    document.getElementById("points").textContent = `£${amount.toFixed(2)}/£${target}`;
    document.getElementById("name").textContent = name;
    var percent = amount/target;
    console.log(percent)
    if(percent > 1)
      {
        percent = 1
      }
    var crop = 350* percent;
    const progressBar = document.getElementById("front");
    progressBar.style.width = `${crop}px`;
    var colour = data.data.arguments.barColourHtml;
    console.log(colour);
    progressBar.style.backgroundColor = colour;
      
  }
});