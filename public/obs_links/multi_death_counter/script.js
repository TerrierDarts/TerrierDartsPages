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

function updateData(t,c,g)
{
 
   document.getElementById("currentGame").innerHTML = c;
   document.getElementById("total").innerHTML = "Total Deaths: "+t;
  document.getElementById("gameboxArt").src = g; 
}





ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);
  if (!data.event || !data.event.type) return;
  if (data.data.name == "** SHOW DEATHS **") {
  console.log(data.data.arguments.deathTotal);
  console.log(data.data.arguments.deathCount);
  console.log(data.data.arguments.game);
  var t = data.data.arguments.deathTotal;
  var c = data.data.arguments.deathCount;
  var g = data.data.arguments.gameBoxArtUrl;
    updateData(t,c,g)
  }
  
  });