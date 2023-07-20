const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roofBool = urlParams.get('roof') || "false";
const timeoutDuration = urlParams.get('timeout') || 60; 
const multiBall = urlParams.get('multiball') || "true";
const multiDefault = urlParams.get('multidefault') || 25;
const explodeLevel = urlParams.get('explode') || 1;
//const multiPermission = urlParams.get("permission") || 1;
//const multiSubs = urlParams.get("subonly") || "false";

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Runner = Matter.Runner;

// Create Matter.js engine and runner
const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  element: document.getElementById("pen"),
  engine: engine,
  runner: runner,
  options: {
    width: 1920,
    height: 1080,
    wireframes: false,
    background: "transparent"
  }
});

// Increase position and velocity iterations
engine.positionIterations = 20;
engine.velocityIterations = 20;

// Create an array to store the ball bodies
let balls = [];
const ballTimeouts = [];

// Create the ground, left wall, and right wall of the pen
const ground = Bodies.rectangle(960, 1080, 1920, 30, { isStatic: true });
const leftWall = Bodies.rectangle(0, 540, 30, 1080, { isStatic: true });
const rightWall = Bodies.rectangle(1920, 540, 30, 1080, { isStatic: true });


leftWall.render.fillStyle = "pink";
rightWall.render.fillStyle = "pink";
ground.render.fillStyle = "pink";

World.add(engine.world, [ground, leftWall, rightWall]);

if (roofBool == "true") {
  const roof = Bodies.rectangle(960, 0, 1920, 30, { isStatic: true });
  roof.render.fillStyle = "pink";
  World.add(engine.world, [roof]);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addBall(imageUrl) {
  const ballRadius = 30;
  const ballColor = getRandomColor();
  const ball = Bodies.circle(Math.random() * 1840 + 40, 1, ballRadius, {
    restitution: 0.8,
    render: {
      sprite: {
        texture: imageUrl,
        xScale: 0.5,
        yScale: 0.5
      },
    },

  },
  );
  balls.push(ball); // Store the ball body in the array
  World.add(engine.world, ball); // Add the ball body to the Matter.js world

  // Clear the ball after the timeout duration (if provided)
  if (timeoutDuration !== null) {
    const timeoutId = setTimeout(() => {
      const index = balls.findIndex((b) => b === ball);
      if (index !== -1) {
        clearBall(index);
      }
    }, timeoutDuration * 1000);
    ballTimeouts.push(timeoutId); // Store the timeout ID for the ball
  }


}

function addEmote(imageUrl) {
  const ballRadius = 30;
  const ballColor = getRandomColor();
  const ball = Bodies.circle(Math.random() * 1840 + 40, 1, ballRadius, {
    restitution: 1,
    render: {
      sprite: {
        texture: imageUrl,
        width: 1,
        height: 1
      },
    },

  },
  );
  balls.push(ball); // Store the ball body in the array
  World.add(engine.world, ball); // Add the ball body to the Matter.js world

  // Clear the ball after the timeout duration (if provided)
  if (timeoutDuration !== null) {
    const timeoutId = setTimeout(() => {
      const index = balls.findIndex((b) => b === ball);
      if (index !== -1) {
        clearBall(index);
      }
    }, timeoutDuration * 1000);
    ballTimeouts.push(timeoutId); // Store the timeout ID for the ball
  }


}

// Start the engine and runner
Runner.run(runner, engine);
Render.run(render);

function clearBalls() {
  // Remove the ball bodies from the Matter.js world
  balls.forEach((ball) => {
    World.remove(engine.world, ball);
  });

  // Clear the balls array
  balls = [];

  // Remove the ball elements from the pen
  const penElement = document.getElementById("pen");
  const ballElements = document.getElementsByClassName("ball");
  while (ballElements.length > 0) {
    penElement.removeChild(ballElements[0]);
  }
}

// Function to clear a specific ball by index
function clearBall(index) {
  World.remove(engine.world, balls[index]);
  balls.splice(index, 1);
  clearTimeout(ballTimeouts[index]);
  ballTimeouts.splice(index, 1);
}

function explodeBalls() {
  const explosionForce = explodeLevel; // Adjust the force value to control the intensity of the explosion

  // Calculate the center position of the pen
  const penCenterX = render.options.width / 2;
  const penCenterY = render.options.height / 2;

  balls.forEach((ball) => {
    // Calculate the direction from the ball to the center
    const direction = Matter.Vector.sub(
      { x: penCenterX, y: penCenterY },
      ball.position
    );
    // Normalize the direction vector
    const normalizedDirection = Matter.Vector.normalise(direction);
    // Apply the explosion force in the normalized direction
    const force = Matter.Vector.mult(normalizedDirection, explosionForce);
    Matter.Body.applyForce(ball, ball.position, force);
  });
}

function addMultipleBalls(imageUrl, count) {
  for (let i = 0; i < count; i++) {
    addBall(imageUrl);
  }
}

// Example usage: addMultipleBalls(imageUrl, 5, 10);


// subscribe to Twitch events
// initialize client with onConnect handler
const client = new StreamerbotClient({ onConnect });

// when connected, subscribe to subaction and register handler function
function onConnect() {
  console.log("Connected to Streamer.bot");
  console.log("Roof Bool = " +roofBool);
  console.log("Timeout = " +timeoutDuration);
  console.log("Multi On = " + multiBallActive);
  console.log("Multi Default = " +multiDefault);
  console.log("Explode Level = " + explodeLevel);
  
}

client.on("YouTube.Message", (data) => {
  console.log(data);
  var message = data.data.message;
  var user = data.data.user.name;
  var mod = Boolean(data.data.user.isModerator);
  var owner = Boolean(data.data.user.isOwner);
  var imageUrl = data.data.user.profileImageUrl;
  //var emotes = data.data.message.emotes;
  //var sub = data.data.message.subscriber;

 // emotes.forEach((emotes) => {
   // var imageUrl = emotes.imageUrl;
   // addEmote(imageUrl);
 // });

  
  if (message.includes("!multiball") && multiBallActive == "true") {
      
         var input = message.split(" ");
        const num = input[1];
      
        let count;
        if (!num || isNaN(num)) {
          count = multiDefault; // Assign the default value of 25
        } else {
          count = parseInt(num, 10); // Parse the third word as an integer
        }

        if(count>250)
        {
          count = 250;
        }


        console.log(count);
        addMultipleBalls(imageUrl, count);
      
    
  }

  if (message.includes("!ball")) {
    addBall(imageUrl);
  }
  if (message.includes("!explode")) {
    explodeBalls();
  }
  if (message.includes("!clear")) {

    if (mod || owner) {
      clearBalls();
    }
  }
});

async function addBallWithImage(user) {
  const imageUrl = await addImage(user);
  addBall(imageUrl);
}

async function addImage(user) {
  var url = "https://decapi.me/twitch/avatar/" + user;
  let resp = await fetch(url);
  let txt = await resp.text();
  console.log(txt);
  return txt;
}