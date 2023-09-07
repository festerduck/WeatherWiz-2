const cursor = document.getElementById("cursor");
const cursorBallBig = document.querySelector(".circle-big");
const cursorBallSmall = document.querySelector(".circle-small");

let posS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let posB = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let mouse = { x: posS.x, y: posS.y };
const speed = 0.1;
let fpms = 60 / 1000;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const xSetBallSmall = gsap.quickSetter(cursorBallSmall, "x", "px");
const ySetBallSmall = gsap.quickSetter(cursorBallSmall, "y", "px");
const xSetBallBig = gsap.quickSetter(cursorBallBig, "x", "px");
const ySetBallBig = gsap.quickSetter(cursorBallBig, "y", "px");

gsap.ticker.add((time, deltaTime) => {
  let delta = deltaTime * fpms;
  let dt = 1.0 - Math.pow(1.0 - speed, delta);

  posS.x += mouse.x - posS.x;
  posS.y += mouse.y - posS.y;
  posB.x += (mouse.x - posB.x) * dt;
  posB.y += (mouse.y - posB.y) * dt;
  xSetBallSmall(posS.x);
  ySetBallSmall(posS.y);
  xSetBallBig(posB.x);
  ySetBallBig(posB.y);
});
