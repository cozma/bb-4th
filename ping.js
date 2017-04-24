var sphero = require("sphero"),
    bb8 = sphero("2281e9511632479aa43c490a3b902587"); // change BLE address accordingly
var prompt = require('prompt');
var args = process.argv.slice(2);
var distance = null;
var curX = 0;
var curY = 0;
var originX = 0;
var originY = 0;
var direction = 0;

prompt.start();
bb8.connect(function() {
  // roll BB-8 in a random direction, changing direction every second
  // setInterval(function() {
  //   var direction = Math.floor(Math.random() * 360);
  //   bb8.roll(150, direction);
  // }, 1000);

  bb8.streamOdometer();

  bb8.on("odometer", function(data) {
    // if (distance == null){
    //   data.xOdometer.value[0] = 0;
    //   data.yOdometer.value[0] = 0;
    //   distance = 'recorded';
    // }
    if (curX == 0 && originX == 0){
      originX = data.xOdometer.value[0];
      originY = data.yOdometer.value[0];
      console.log("SET originX X TO : " + originX);

    }

    console.log("Current Position:");
    console.log("    units:", data.yOdometer.units);
    console.log("    X value:", data.xOdometer.value[0]);
    console.log("    Y value:", data.yOdometer.value[0]);

    curX = data.xOdometer.value[0] - originX;
    curY = data.yOdometer.value[0] - originY;
    console.log("SET CUR X TO : " + curX);
    console.log("SET CUR Y TO : " + curY);

    ping2('michael');
  });
});

function ping1 (pingPerson) {
  console.log("Driving to Michael's Desk...");
  if (pingPerson == 'michael'){

    if (curX == 0 && curY == 0){
      console.log("First turn to the right...")
      direction = 70;
    }
    if (curX > 300 && curY < 650){
      console.log("Turned to front...")
      direction = 340
    }
    if (curY > 650 && curX < 2500){
      console.log("Turned to right...")
      direction = 70;
    }
    if (curX > 4000){
      console.log("Turned to left...")
      direction = 320;
    }
    console.log("X: " + curX);
    console.log("Y: " + curY);
    bb8.roll(150, direction);
  }
}

  function ping2 (pingPerson) {
    console.log("Driving to Michael's Desk...");
    if (pingPerson == 'michael'){

      if (curX == 0 && curY == 0){
        console.log("First turn to the right...")
        direction = 90;
      }
      if (curX > 300 && curY < 650){
        console.log("Turned to front...")
        direction = 0
      }
      if (curY > 550 && curX < 2500){
        console.log("Turned to right...")
        direction = 85;
      }
      if (curX > 4000){
        console.log("Turned to left...")
        direction = 0;
      }
      console.log("X: " + curX);
      console.log("Y: " + curY);
      bb8.roll(150, direction);
    }
}
