var w = window.innerWidth;
var h = window.innerHeight;
var ratio = window.innerHeight*window.innerWidth;
var canvasWidth = w;
var canvasHeigth = h;

var dataPoints = [];
var radius = h*0.004; //ratio*0.000002; //w * 0.002;
var origin = new Path.Circle(new Point(canvasWidth*0.7, canvasHeigth*0.45), 1.2*radius);
origin.fillColor = 'black';
origin.opacity = 0.7;

spawn(canvasWidth*0.33, canvasHeigth*0.45, 50);

var connection1 = new Path();
connection1.strokeColor = 'black';
connection1.strokeWidth = 0.4;
// connection1.smooth();
connection1.dashArray = [10, 12];
initialConnection();

function initialConnection() {
  connection1.removeSegments();
  connection1.add(dataPoints[0].position);
  connection1.add(origin.position);
  connection1.add(new Point((dataPoints[0].position.x + origin.position.x)/2, (dataPoints[0].position.y + origin.position.y)/2 - 10));
  connection1.add(dataPoints[0].position);
  connection1.add(new Point((dataPoints[0].position.x + origin.position.x)/2, (dataPoints[0].position.y + origin.position.y)/2 + 10));
  connection1.add(origin.position);
  connection1.add(new Point((dataPoints[0].position.x + origin.position.x)/2, (dataPoints[0].position.y + origin.position.y)/2 - 5));
  connection1.add(dataPoints[0].position);
  connection1.add(new Point((dataPoints[0].position.x + origin.position.x)/2, (dataPoints[0].position.y + origin.position.y)/2 + 1));
  connection1.add(origin.position);
}


var connections = new Path();
connections.strokeColor = 'black';
connections.strokeWidth = 0.01;
for (var i = 0; i < dataPoints.length; i++) {
  for (var j = 0; j < dataPoints.length; j++) {
    connections.add(dataPoints[i].position);
    connections.add(dataPoints[j].position);
  }
}

function spawn (centerX, centerY, number) {
  for (var i = 0; i < number; i++) {
    var sparsityX = canvasWidth * 0.05;
    var sparsityY = canvasHeigth * 0.05;
    centerX += Math.random()*(sparsityX + sparsityX) - sparsityX;
    centerY += Math.random()*(sparsityY + sparsityY) - sparsityY;
    var center = new Point(centerX, centerY);
    dataPoints.push(new Path.Circle(center, radius));
    dataPoints[i].fillColor = 'black';
    dataPoints[i].opacity = 0.5;
  }
}

function onFrame(event) {
// Your animation code goes in here
maxJitter = 0.7;//0.2;
minJitter = -0.7; //-0.2;
connections.removeSegments();
for (var i = 0; i < dataPoints.length; i++){
dataPoints[i].position = new Point(dataPoints[i].position.x, dataPoints[i].position.y + Math.random()*(maxJitter - minJitter) + minJitter);
for (var j = 0; j < dataPoints.length; j++) {
  connections.add(dataPoints[i].position);
  connections.add(dataPoints[j].position);
}
}
initialConnection();

}

function onMouseMove(event) {
var mousePos = event.point;
var precision = 7.5;
for (var i = 0; i < dataPoints.length; i++) {
if (Math.round(mousePos.x) > Math.round(dataPoints[i].position.x) - precision && Math.round(mousePos.x) < Math.round(dataPoints[i].position.x) + precision
&& Math.round(mousePos.y) > Math.round(dataPoints[i].position.y) - precision && Math.round(mousePos.y) < Math.round(dataPoints[i].position.y) + precision) {
  dataPoints[i].opacity = 1;
} else {
  dataPoints[i].opacity = 0.5;
}
}

}

function onResize(event) {

}
