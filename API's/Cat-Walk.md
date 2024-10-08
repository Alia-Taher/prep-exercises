# Cat walk (using promises)


```` javascript
"use strict";

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  "https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif";

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    img.style.left = `${startPos}px`;

    const walkInterval = setInterval(() => {
      startPos += STEP_SIZE_PX;
      img.style.left = `${startPos}px`;

      if (startPos >= stopPos) {
        clearInterval(walkInterval);
        resolve();
      }
    }, STEP_INTERVAL_MS);
    
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const walkingCat = img.src;
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = walkingCat;
      resolve()
    }, DANCE_TIME_MS);

  });
}

function catWalk() {
  const img = document.querySelector("img");
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  const repeatIndefinitely = () => {
    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(()=>{
        repeatIndefinitely();
      });
  };
   repeatIndefinitely();
}
window.addEventListener("load", catWalk);

````