# Traffic light

```` javascript

"use strict";

function getCurrentState(trafficLight) {

  const lightColor= trafficLight.possibleStates[trafficLight.stateIndex];

   return lightColor;
  
};

function getNextStateIndex(trafficLight) {

 const lightColor = getCurrentState(trafficLight);
 
  for (let i = 0; i<lightColor.length; i++){

  if(lightColor == 'green'){
   trafficLight.stateIndex= 1;  
   }

  else if(lightColor=="orange"){
     trafficLight.stateIndex= 2;
  }

   else if(lightColor=== "red"){
    trafficLight.stateIndex = 0;
   }
 }
 return trafficLight.stateIndex;
  
};

// This function loops for the number of seconds specified by the `secs`
// parameter and then returns.
// IMPORTANT: This is not the recommended way to implement 'waiting' in
// JavaScript. You will learn better ways of doing this when you learn about
// asynchronous code.
function waitSync(secs) {
  const start = Date.now();
  while (Date.now() - start < secs * 1000) {
    // nothing do to here
  }
}

function main() {
  const trafficLight = {
    possibleStates: ["green", "orange", "red"],
    stateIndex: 0,
  };

  for (let cycle = 0; cycle < 6; cycle++) {
    const currentState = getCurrentState(trafficLight);
    console.log(cycle, "The traffic light is now", currentState);

    waitSync(1); // Wait a second before going to the next state
    trafficLight.stateIndex = getNextStateIndex(trafficLight);
  }
}

main();

````