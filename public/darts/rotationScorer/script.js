//Websocket Stuff
const WEBSOCKET_URI = "ws://127.0.0.1:5010/";

// subscribe to Darts events
var ws;

function openWS() {
  
ws = new WebSocket(WEBSOCKET_URI);
ws.addEventListener("open", (event) => {
    console.log("Connected to Darts");
});
 
  ws.addEventListener("close", () => {
    console.log("WebSocket closed! Reopening in 10s");
    setTimeout(openWS, 10000);
      });

ws.addEventListener("message", (event) => {
    if (!event.data) return;

    const data = JSON.parse(event.data);
    console.log(event.data);
 
  var startingscore = data.startingScore;

 
document.getElementById("start").textContent= "Leg of " + data.startingScore;
  
  document.getElementById("player").textContent = data.player;
  document.getElementById("remaining").textContent= data.remaining;
  
  document.getElementById("c180").textContent= data.c180;
  document.getElementById("c170").textContent= data.c170;
  document.getElementById("c140").textContent= data.c140;
  document.getElementById("c100").textContent= data.c100;
  var myList = data.previousScores;
  const lastFive = getLastFiveItems(myList);
  document.getElementById("previous").textContent= (lastFive).toString();
 var projected = getProjected(data.remaining,data.average, data.dartsThrown);
console.log(lastFive);
  console.log(projected);
  document.getElementById("projected").textContent = projected + " Darts";
  document.getElementById("average").textContent="Average: " + data.average;
  document.getElementById("darts").textContent= "Darts Thrown: " + data.dartsThrown;
  

  
});
}

function getLastFiveItems(list) {
  const length = list.length;
  const count = length >= 5 ? 5 : length;
  return list.slice(length - count);
}

function getProjected(remaining, average, dartsThrown){
  var dartsNeeded = Math.ceil(remaining/(average/3));
  var projected = dartsNeeded + dartsThrown
  console.log(projected);
  return projected;
  
}

$(document).ready(function() {
  function rotateStats() {
    var stats = $('.stat');
    var currentStat = stats.filter(':visible');
    var nextStat = currentStat.next('.stat');

    if (nextStat.length === 0) {
      nextStat = stats.first();
    }

    currentStat.slideUp(500, function() {
      nextStat.slideDown(500);
    });
  }

  // Initially hide all stat sections except the first one
  $('.stat').hide().first().show();

  // Show the main section
  $('.main').show();

  // Rotate the stat sections every 10 seconds
  setInterval(rotateStats, 15000);
});


openWS();