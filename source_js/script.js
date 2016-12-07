var init_canvas = function() {
  var canvas = document.getElementById("map");
  canvas.height = canvas.width /2;
  var brush;

  /* left column */

  // groceries
  brush = canvas.getContext("2d");
  brush.fillStyle="#367c2b";
  brush.fillRect(0, 0, 600 - 10, 1100 - 10);

  // produce
  brush = canvas.getContext("2d");
  brush.fillStyle="#76c043";
  brush.fillRect(0, 1100, 600 - 10, 300);

  /* right column */

  // repair
  brush = canvas.getContext("2d");
  brush.fillStyle="#007dc6";
  brush.fillRect(2500, 0, 300, 500);

  // garden
  brush = canvas.getContext("2d");
  brush.fillStyle="#007dc6";
  brush.fillRect(2500, 900, 300, 500);

  /* top row */

  // infants
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(600, 0, 300 - 10, 200);

  // shoes
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(900, 0, 300 - 10, 200);

  // crafts
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1300, 0, 300 - 10, 200);

  // electronics
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1600, 0, 300 - 10, 200);

  // sports
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1900, 0, 300 - 10, 200);

  // car
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(2200, 0, 300 - 10, 200);

  /* middle row */

  // clothes
  brush = canvas.getContext("2d");
  brush.fillStyle="#007dc6";
  brush.fillRect(700, 300, 500 - 10, 800);

  // appliances
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1300, 300, 300 - 10, 400 - 10);

  // jewelery
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1300, 700, 300 - 10, 400);

  // home
  brush = canvas.getContext("2d");
  brush.fillStyle="#007dc6";
  brush.fillRect(1700, 300, 400 - 10, 800);

  // hardware
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(2200, 300, 300 - 10, 400 - 10);

  // toys
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(2200, 700, 300 - 10, 400);

  /* bottom row */

  // checkout
  brush = canvas.getContext("2d");
  brush.fillStyle="#ffc220";
  brush.fillRect(700, 1200, 800 - 10, 200);

  // pharmacy
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1600, 1200, 300 - 10, 200);

  // beauty
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(1900, 1200, 300 - 10, 200);

  // pets
  brush = canvas.getContext("2d");
  brush.fillStyle="#78b9e7";
  brush.fillRect(2200, 1200, 300 - 10, 200);

/*

  var top = 20;
  var left = 20;
  var height = 35;
  var width = 400;

  for(var aisle = 0 ; aisle < 14 ; aisle++) {
    var rect = canvas.getContext("2d");
    rect.rect(left, top, width, height);
    rect.stroke();
    top += height + 20;
  }

*/

};
