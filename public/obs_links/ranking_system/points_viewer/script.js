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
  
  if (data.data.name == "** Points Visuals **"){
    console.log(event.data);
    var points = data.data.arguments.pointsArgs;
var pfp = data.data.arguments.targetUserProfileImageUrl;
var rank = data.data.arguments.rankArgs;
    var needed = rank*1000;
var name = data.data.arguments.user;
var percent = points / needed;
var crop = 600 * percent;
const progressBar = document.getElementById("front");
    const nameTag = document.getElementById("name");
    document.getElementById("pfp").src = pfp;
nameTag.textContent = name;
    nameTag.style.color = data.data.arguments.userColArgs;
document.getElementById("points").textContent = `${points}/${needed}`;
document.getElementById("rknum").textContent = rank;
progressBar.style.width = `${crop}px`;
    
  }
});