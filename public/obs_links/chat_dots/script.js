const list = document.getElementById('group');
var count = 1; 

var divs = document.getElementsByTagName('element');
/* put them in a circle */
for (var i = 0; i < divs.length; i++) {
  divs[i].style.position = 'absolute';
  divs[i].style.width = '40px'; 
  divs[i].style.height = '40px';
  divs[i].style.borderRadius = '50%';
  divs[i].style.top = '60%';
  divs[i].style.left = '50%';
  divs[i].style.transform = 'translate(-50%, -50%) rotate(' + (i * 36) + 'deg) translate(0, -200px)';
}
function changeColour(color)
{
 switch (count) {
  
  case 1:
    console.log(count);
     document.querySelector('.dot.g').style.backgroundColor = color;
    count++;
    break;
  case 2:
    console.log(count);
     document.querySelector('.dot.h').style.backgroundColor = color;
    count++;
    break;
  case 3:
    console.log(count);
     document.querySelector('.dot.i').style.backgroundColor = color;
    count++;
    break;
  case 4:
    console.log(count);
     document.querySelector('.dot.j').style.backgroundColor = color;
    count++;
    break;
  case 5:
    console.log(count);
     document.querySelector('.dot.a').style.backgroundColor = color;
    count++;
    break;
  case 6:
    console.log(count);
     document.querySelector('.dot.b').style.backgroundColor = color;
    count++;
    break;
  case 7:
    console.log(count);
     document.querySelector('.dot.c').style.backgroundColor = color;
    count++;
    break;
  case 8:
    console.log(count);
     document.querySelector('.dot.d').style.backgroundColor = color;
    count++;
    break;
  case 9:
    console.log(count);
     document.querySelector('.dot.e').style.backgroundColor = color;
    count++;
    break;
  case 10:
    console.log(count);
     document.querySelector('.dot.f').style.backgroundColor = color;
    count = 1;
    break;
}

  
  
}
var rotation = 0;
function rotateSquare() {
  rotation = rotation - 36;
  list.style.transform = 'rotate(' + rotation + 'deg)';
  
}
/*
var button = document.createElement('button');
button.innerHTML = 'Rotate';
button.onclick = rotateSquare;
document.body.appendChild(button);
 */

const WEBSOCKET_URI = "ws://127.0.0.1:8080/";

const ws = new WebSocket(WEBSOCKET_URI);
ws.addEventListener("open", (event) => {
  console.log("Connected to Streamer.bot");

  ws.send(
    JSON.stringify({
      request: "Subscribe",
      id: "123",
      events: {
         Twitch: ["ChatMessage"]
      }
          
    })
  );
});

ws.addEventListener("message", (event) => {
  if (!event.data) return;

  const data = JSON.parse(event.data);
  console.log(data);
  if(data.event?.type=="ChatMessage" && !data.data.message.internal)
    {
      console.log("MessageSent");
      var color = data.data.message.color;
      changeColour(color);
      rotateSquare();
      
      
      
    }
  
});