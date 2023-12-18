// Get config from import params
const url = new URL(import.meta.url)
const config = {
  roofBool: url.searchParams.get('roof') || 'false',
  timeoutDuration: Number(url.searchParams.get('timeout')) || 30,
  multiBallActive: url.searchParams.get('multion') || 'true',
  multiDefault: Number(url.searchParams.get('multidefault')) || 25,
  multiPermission: Number(url.searchParams.get('permission')) || 1,
  multiSubs: url.searchParams.get('subonly') || 'false',
  explodeLevel: Number(url.searchParams.get('explode')) || 1,
  canvasHeight: Number(url.searchParams.get('height')) || 1080,
  canvasWidth: Number(url.searchParams.get('width')) || 1920,
  multiballMax: Number(url.searchParams.get('multimax')) || 250
}



// Now you can use the 'config' object as needed
console.log("Roof Bool = " + config.roofBool);
console.log("Timeout = " + config.timeoutDuration);
console.log("Multi On = " + config.multiBallActive);
console.log("Multi Default = " +config.multiDefault);
console.log("Explode Level = " + config.explodeLevel);
console.log("Permissions = " + config.multiPermission);
console.log("Sub Allowed = " + config.multiSubs);
console.log("Height = " + config.canvasHeight);
console.log("Width = " + config.canvasWidth);
// Create the <div> element
const divElement = document.createElement("div");
// Set the id attribute
divElement.setAttribute("id", "pen");

// Append the <div> element to the document body
document.body.appendChild(divElement);

// Alias the Matter.js modules for easier usage
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Runner = Matter.Runner;

// Create Matter.js engine and runner
const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  element: divElement,
  engine: engine,
  runner: runner,
  options: {
    width: config.canvasWidth,
    height: config.canvasHeight,
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
const ground = Bodies.rectangle((config.canvasWidth/2),(config.canvasHeight+30), config.canvasWidth, 30, { isStatic: true });
const leftWall = Bodies.rectangle(-30, (config.canvasHeight/2), 30, config.canvasHeight, { isStatic: true });
const rightWall = Bodies.rectangle((config.canvasWidth+30), (config.canvasHeight/2), 30, config.canvasHeight, { isStatic: true });

leftWall.render.fillStyle = "pink";
rightWall.render.fillStyle = "pink";
ground.render.fillStyle = "pink";

World.add(engine.world, [ground, leftWall, rightWall]);

// Assuming you have defined "roofBool" somewhere before this script
if (config.roofBool === "true") {
  const roof = Bodies.rectangle((config.canvasWidth/2), -30, config.canvasWidth, 30, { isStatic: true });
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
  });

  balls.push(ball); // Store the ball body in the array
  World.add(engine.world, ball); // Add the ball body to the Matter.js world

  // Explode the ball before removing it after the timeout duration (if provided)
  if (config.timeoutDuration !== null) {
    const timeoutId = setTimeout(() => {
      explodeBall(ball);
      setTimeout(() => {
        const index = balls.findIndex((b) => b === ball);
        if (index !== -1) {
          clearBall(index);
        }
      }, 1000); // 1000 milliseconds = 1 second
    }, (config.timeoutDuration - 1) * 1000);
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

 // Explode the ball before removing it after the timeout duration (if provided)
 if (config.timeoutDuration !== null) {
  const timeoutId = setTimeout(() => {
    explodeBall(ball);
    setTimeout(() => {
      const index = balls.findIndex((b) => b === ball);
      if (index !== -1) {
        clearBall(index);
      }
    }, 1000); // 1000 milliseconds = 1 second
  }, (config.timeoutDuration - 1) * 1000);
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
  const ballToRemove = balls[index];
  
    World.remove(engine.world, ballToRemove);
    balls.splice(index, 1);
    clearTimeout(ballTimeouts[index]);
    ballTimeouts.splice(index, 1);

}



function explodeBalls() {
  const explosionForce = config.explodeLevel; // Adjust the force value to control the intensity of the explosion

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

function addMultipleBalls(imageUrl, count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => { 
      addEmote(imageUrl);
    }, i);
  }
}

import "https://cdn.skypack.dev/@streamerbot/client";
const client = new StreamerbotClient({
  host: window.config.host || '127.0.0.1',
  port: window.config.port || 8080,
  endpoint: window.config.endpoint || '/',
});




client.on('Twitch.ChatMessage' , data => {
 
  var message = data.data.message.message;
  var user = data.data.message.username;
 
  var emotes = data.data.message.emotes;
  var sub = data.data.message.subscriber;

  emotes.forEach((emotes) => {
    var imageUrl = emotes.imageUrl;
    addEmote(imageUrl);
  });

 var role = data.data.message.role;



  if (message.includes("!multiball") && config.multiBallActive == "true") {

    if ((config.multiSubs == "true" && sub) || config.multiSubs == "false") {

      if (role >= config.multiPermission) {
        var imageUrl = emotes[0].imageUrl;
       

        var input = message.split(" ");
        const num = input[2];
       
        let count;
        if (!num || isNaN(num)) {
          count = config.multiDefault; // Assign the default value of 25
        } else {
          count = parseInt(num, 10); 
        }
          var max = config.multiballMax;
        if (count > max) {
          count = max;
        }



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

  return txt;
}

