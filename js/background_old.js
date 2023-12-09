var container = document.getElementById("background");
var circleSize = 500, circleNum = 500;
var bounces = 0;
var gSpeed = 10;

circleNum = window.innerWidth * window.innerHeight / (circleSize * circleSize * 0.5);

createAnimation(container.querySelector("div.bubble"));
for (var i = 0; i < circleNum; i++) {
  var bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.background = `-webkit-radial-gradient(rgb(${Math.round(Math.random() * 155)}, ${Math.round(Math.random() * 155)}, ${Math.round(Math.random() * 155)}), rgb(0,0,0) 70%)`;
  container.insertAdjacentElement("afterbegin", bubble);
  createAnimation(bubble);
}

setInterval(function() {
  if (speed < 15) {
    for (var i = 0; i < 12; i++) {
      var bubble = container.querySelectorAll("div.bubble")[container.querySelectorAll("div.bubble").length - 1];
      container.removeChild(bubble);
    }
  }
  speed = 0;
  circleNum = window.innerWidth * window.innerHeight / (circleSize * circleSize * 0.5);
  if (Math.random() > container.querySelectorAll("div.bubble").length / (circleNum * 2)) {
    // Create bubble
    var bubble = document.createElement("div");
    bubble.classList.add("bubble");
    container.insertAdjacentElement("afterbegin", bubble);
    createAnimation(bubble);
    bubble.style.background = `-webkit-radial-gradient(rgb(${Math.round(Math.random() * 155)}, ${Math.round(Math.random() * 155)}, ${Math.round(Math.random() * 155)}), rgba(0,0,0) 70%)`;
  }
  else {
    // Delete bubble
    var bubble = container.querySelectorAll("div.bubble")[container.querySelectorAll("div.bubble").length - 1];
    container.removeChild(bubble);
  }
  bounces = 0;
}, 10000)

function createAnimation(bubble, inputWall, position) {
  bounces++;

  var prevWall = inputWall || 0;
  var position = position || { x: 0, y: 0 };

  // Create random wall bounce location
  var newPosition = {x: 0, y: 0};
  var screen = document.body.getBoundingClientRect();
  var wall = prevWall;
  while (wall == prevWall) {
    wall = Math.floor(Math.random() * 4);
  }
  switch (wall) {
    case 0:
      newPosition.x = 0;
      newPosition.y = Math.round(Math.random() * (screen.height - circleSize));
      break;
    case 1:
      newPosition.x = screen.width - circleSize;
      newPosition.y = Math.round(Math.random() * (screen.height - circleSize));
      break;
    case 2:
      newPosition.y = 0;
      newPosition.x = Math.round(Math.random() * (screen.width - circleSize));
      break;
    default:
    case 3:
      newPosition.y = screen.height - circleSize;
      newPosition.x = Math.round(Math.random() * (screen.width - circleSize));
      break;
  }
  // Generate bubble speed
  var speed = Math.sqrt((position.x - newPosition.x)^2 + (position.y - newPosition.y)^2) / gSpeed;

  // Animate bubble
  bubble.style.transitionDuration = `${speed}s`;
  bubble.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px)`;
  bubble.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
  // bubble.style.background = `radial-gradient(rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255}) 0%, #00000000 75%)`;

  // Handle bounce
  setTimeout(function() {
    if (bubble.parentElement != null) {
      createAnimation(bubble, wall, newPosition);
    }
    else {
      delete bubble;
    }
  }, speed * 1000)
}

var speed = 100;
requestAnimationFrame(
  function loop() {
    speed++;
    requestAnimationFrame(loop)
  }
)