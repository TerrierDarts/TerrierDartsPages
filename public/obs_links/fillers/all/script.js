const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roofBool = urlParams.get('roof') || "false";
const timeoutDuration = urlParams.get("timeout") || 60; 
const multiBallActive = urlParams.get("multion") || "true";
const multiDefault = urlParams.get("multidefault") || 25;
const multiPermission = urlParams.get("permission") || 1;
const multiSubs = urlParams.get("subonly") || "false";
const explodeLevel = urlParams.get('explode') || 1;
const canvasHeight = urlParams.get('height') || 1080;
const canvasWidth = urlParams.get('width') || 1920;

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
    width: canvasWidth,
    height: canvasHeight,
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
// Create the ground, left wall, and right wall of the pen
const ground = Bodies.rectangle((canvasWidth/2),(canvasHeight+30), canvasWidth, 30, { isStatic: true });
const leftWall = Bodies.rectangle(-30, (canvasHeight/2), 30, canvasHeight, { isStatic: true });
const rightWall = Bodies.rectangle((canvasWidth+30), (canvasHeight/2), 30, canvasHeight, { isStatic: true });


leftWall.render.fillStyle = "pink";
rightWall.render.fillStyle = "pink";
ground.render.fillStyle = "pink";

World.add(engine.world, [ground, leftWall, rightWall]);

if (roofBool == "true") {
  const roof = Bodies.rectangle((canvasWidth/2), -30, canvasWidth, 30, { isStatic: true });
  roof.render.fillStyle = "pink";
  World.add(engine.world, [roof]);
}

function addBall(imageUrl) {
  const ballRadius = 30;
 
  const ball = Bodies.circle(Math.random() * 1840 + 40, 1, ballRadius, {
    restitution: 0.8,
    render: {
      sprite: {
        texture: imageUrl,
        xScale: (ballRadius * 2) / 300,
        yScale: (ballRadius * 2) / 300
      },
    },

  },
  );
  balls.push(ball); // Store the ball body in the array
  World.add(engine.world, ball); // Add the ball body to the Matter.js world

  // Clear the ball after the timeout duration (if provided)
if (timeoutDuration !== null) {
  const timeoutId = setTimeout(() => {
    explodeBall(ball);
    setTimeout(() => {
      const index = balls.findIndex((b) => b === ball);
      if (index !== -1) {
        clearBall(index);
      }
    }, 1000); // 1000 milliseconds = 1 second
  }, (timeoutDuration - 1) * 1000);
  ballTimeouts.push(timeoutId); // Store the timeout ID for the ball
}


}

function addEmote(imageUrl) {
  const ballRadius = 30;
  const ball = Bodies.circle(Math.random() * 1840 + 40, 1, ballRadius, {
    restitution: 0.8,
    render: {
      sprite: {
        texture: imageUrl,
       },
    },

  },
  );
  balls.push(ball); // Store the ball body in the array
  World.add(engine.world, ball); // Add the ball body to the Matter.js world

  // Clear the ball after the timeout duration (if provided)
if (timeoutDuration !== null) {
  const timeoutId = setTimeout(() => {
    explodeBall(ball);
    setTimeout(() => {
      const index = balls.findIndex((b) => b === ball);
      if (index !== -1) {
        clearBall(index);
      }
    }, 1000); // 1000 milliseconds = 1 second
  }, (timeoutDuration - 1) * 1000);
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
    setTimeout(() => { 
      addEmote(imageUrl);
    }, i);
  }
}


function explodeBall(ball) {
  const explosionForce = 0.25; // Adjust the force value to control the intensity of the explosion

  // Calculate the center position of the pen
  const penCenterX = render.options.width / 2;
  const penCenterY = render.options.height / 2;

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
}




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
  console.log("Permissions = " + multiPermission);
  console.log("Sub Allowed = " + multiSubs);
  console.log("Height = " + canvasHeight);
  console.log("Width = " + canvasWidth );
}

client.on("Twitch.ChatMessage", (data) => {
  //console.log(data);
  var message = data.data.message.message;
  var user = data.data.message.username;
  var role = data.data.message.role;
  var emotes = data.data.message.emotes;
  var sub = data.data.message.subscriber;
 
  emotes.forEach((emote) => {
    var imageUrl = emote.imageUrl;
    console.log(imageUrl);
    addEmote(imageUrl);
  });
  console.log(message);
  console.log(multiBallActive);
  if (message.includes("!multiball") && multiBallActive == "true") {
    console.log(multiSubs);
    console.log(sub);
    if ((multiSubs == "true" && sub) || multiSubs == "false") {
      console.log(role);
      console.log(multiPermission);
      if (role >= multiPermission) {
        var imageUrl = emotes[0].imageUrl;
        console.log(imageUrl);

        var input = message.split(" ");
        const num = input[2];
        console.log(num);
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
    }
  }

  if (message.includes("!ball")) {
    addBallWithImage(user);
  }
  if (message.includes("!explode")) {
    explodeBalls();
  }
  if (message.includes("!clear")) {
    if (role == 3 || role == 4) {
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