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
  if (data.data.name == "** Update Numbers **") {
    console.log(event.data);
    const drawresultstring = data.data.arguments.drawResult;
    animateBalls(drawresultstring);
  }
});

// Function to animate the balls with numbers
function animateBalls(numbers) {
  var ballElements = document.getElementsByClassName("ball");
  var digits = numbers.split(",").map(Number);

  // Reset all balls to initial state
  function resetBalls() {
    for (var i = 0; i < ballElements.length; i++) {
      var ball = ballElements[i];
      var digit = ball.querySelector(".digit");

      // Remove the 'set' class
      digit.classList.remove("set");

      // Reset to hidden visibility and empty digit
      ball.style.visibility = "hidden";
      ballElements[i].style.backgroundColor = "white";
      digit.textContent = "";
    }
  }

  // Animate the balls with delays
  function animate(index) {
    if (index >= ballElements.length) {
      setTimeout(function () {
        resetBalls();
      }, 7000);
      return;
    }

    var ball = ballElements[index];
    var digit = ball.querySelector(".digit");

    // Set the visibility of the current ball to visible
    ball.style.visibility = "visible";
   

    // Generate random numbers every 50ms until the final number is set
    var interval = setInterval(function () {
      var randomNumber = Math.floor(Math.random() * 60) + 1;
      digit.textContent = randomNumber;
    }, 50);

    // After 2000ms, set the final number and add the 'set' class
    setTimeout(function () {
      clearInterval(interval);
      digit.textContent = digits[index];
      digit.classList.add("set");
 // Change the background color
    ballElements[index].style.backgroundColor = getColor(digits[index]);
      animate(index + 1);
    }, 2000);
  }

  // Start the animation after a delay of 2 seconds
  setTimeout(function () {
    resetBalls();
    animate(0);
  }, 2000);
}

function getColor(number) {
  switch (true) {
    case number >= 1 && number <= 9:
      return "hotpink";
    case number >= 10 && number <= 19:
      return "gold";
    case number >= 20 && number <= 29:
      return "crimson";
    case number >= 30 && number <= 39:
      return "green";
    case number >= 40 && number <= 49:
      return "mediumorchid";
    case number >= 50 && number <= 59:
      return "cyan";
    case number >= 60 && number <= 69:
      return "olivedrab";
    case number >= 70 && number <= 79:
      return "orange";
    case number >= 80 && number <= 89:
      return "silver";
    case number >= 90 && number <= 99:
      return "tomato";
    default:
      return "white"; // Default color if number is not within specified ranges
  }
}