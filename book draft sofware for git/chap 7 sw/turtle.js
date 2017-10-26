var running=false;
// set up listener and panner position information

//position coords
var xPos = 500;
var yPos = 500;
var zPos = 300;
var heading=0;

var DSCALE=2; //scales turtle coords
var TSCALE=1; //scales turns....other than 1 doesn't make sense?

var delay; //controls timing of steps

// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var panner = audioCtx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'exponential';//linear
panner.refDistance = 500;
panner.maxDistance = 20000;
panner.rolloffFactor = 1; //5 for linear
panner.coneInnerAngle = 360;
panner.coneOuterAngle = 0;
panner.coneOuterGain = 0;
//positionPanner();
/*
console.log(panner);
console.log(panner.orientationX);
panner.orientationX.value = 0; //1
panner.orientationY.value = 0; //0
panner.orientationZ.value = 1; //0
*/
/*
var panner2 = audioCtx.createPanner();
panner2.panningModel = 'HRTF';
panner2.distanceModel = 'linear';
panner2.refDistance = 500;
panner2.maxDistance = 20000;
panner2.rolloffFactor = 5;
panner2.coneInnerAngle = 0;
panner2.coneOuterAngle = 45;
panner2.coneOuterGain = 1;

panner2.orientationX.value = 0; //1
panner2.orientationY.value = 0; //0
panner2.orientationZ.value = 1; //0
*/

var gainNode=audioCtx.createGain();



/*
var listener = audioCtx.listener;

  listener.forwardX.value = 0;
  listener.forwardY.value = 0;
  listener.forwardZ.value = -1;
  listener.upX.value = 0;
  listener.upY.value = 1;
  listener.upZ.value = 0;
  */

var source;
var source2;

/*
// listener will always be in the same place for this demo


  listener.positionX.value = 0;
  listener.positionY.value = 400;
  listener.positionZ.value = -100;
*/

// panner will move as the turtle moves 
function positionPanner() 
{
  if(panner.positionX) {
  panner.positionX.value = xPos;
  panner.positionY.value = yPos;
  panner.positionZ.value = zPos;
} else {
  panner.setPosition(xPos,yPos,zPos);
}
/*
    //panner.setPosition(xPos,yPos,zPos);
    panner.positionX.value = xPos;
    panner.positionY.value = yPos;
    panner.positionZ.value = zPos;
*/
/*
    panner.orientationX.value = Math.cos(radians(h));//heading
    panner.orientationY.value = 0; 
    panner.orientationZ.value = Math.sin(radians(h));//heading
*/
    /*
  
    panner2.positionX.value = xPos;
    panner2.positionY.value = yPos;
    panner2.positionZ.value = zPos;

    panner2.orientationX.value = -Math.cos(radians(heading));
    panner2.orientationY.value = 0; 
    panner2.orientationZ.value = -Math.sin(radians(heading));
    */
}

function configureSource()
{
  var oscillator = audioCtx.createOscillator();
  //oscillator.type = 'sawtooth';
  oscillator.type="sine";
  oscillator.frequency.value = 220; // value in hertz
  source=oscillator;
  //var oscillator2 = audioCtx.createOscillator();
  //oscillator2.type = 'square';
  //oscillator2.frequency.value = 330; // value in hertz
  //source2=oscillator2;
}

function startTurtle()
{
  //console.log("startTurtle");
  xPos=-1000*DSCALE;
  yPos=0;
  zPos=300*DSCALE;
  positionPanner();
  heading=0;
  gainNode.gain.value=.5;
  delay=0;
  //runTurtle();
}
function runTurtle()
{
  triangle(2000);
  triangle(1000);
  triangle(2000);
  turtleStop();
}

function runTriangle()
{
  //console.log("runTriangle");
  startTurtle();
  triangle(2000);
  triangle(2000);
  turtleStop();
}
function triangle(d)
{
  var i;
  for(i=0;i<3;i++)
  {
    forward(d);
    left(120);
  }
  
}
function runSquare()
{
  //console.log("runTriangle");
  startTurtle();
  square(2000);
  square(2000);
  turtleStop();
}
function square(d)
{
  var i;
  for(i=0;i<4;i++)
  {
    forward(d);
    left(90);
  }
}

function runStar()
{
  //console.log("runTriangle");
  startTurtle();
  star(2000);
  star(2000);
  turtleStop();
}
function star(d)
{
  var i;
  for(i=0;i<5;i++)
  {
    forward(d);
    left(144);
  }
}
function runCircle()
{
  //console.log("runTriangle");
  startTurtle();
  circle(2000);
  circle(2000);
  turtleStop();
}
function circle(d)
{
  var numSides=100;
  var side=Math.PI*d/numSides;
  var turnAngle=360/numSides;
  var i;
  for(i=0;i<numSides;i++)
  {
    forward(side);
    left(turnAngle);
  }
}
function runSpiral()
{
  //console.log("runTriangle");
  startTurtle();
  spiral(20,.5,3);
  xPos=-1000*DSCALE;
  yPos=0;
  zPos=300*DSCALE;
  heading=0;
  spiral(20,.5,3);
  turtleStop();
}
function spiral(d,p,t)
{
  for(var i=0;i<36*t;i++)
  {
    forward(d)
    left(10);
    d=p+d;
  }
}

function forward(d)
{ 
  while (d>0)
  {
    step();
    d=d-1;
  }
}
var DELTA=2; //delay for each turtle step
function step()
{
  var headingAsString=heading.toString();
  setTimeout(function(){realStep(headingAsString);},delay);
  delay=delay+DELTA;
}
function realStep(h)
{
    xPos=xPos+DSCALE*Math.cos(radians(h));
    zPos=zPos+DSCALE*Math.sin(radians(h));
    positionPanner();
}
function turtleStop()
{
  setTimeout(function(){gainNode.gain.value=0;},delay);
}
//function left(a)
//{
 // heading=heading+a;
  //alert(heading);
//}
function left(a)
{ 
  while (a>0)
  {
    turnL();
    a=a-TSCALE;
  }
}

function turnL()
{
  //var headingAsString=heading.toString();
  //setTimeout(function(){realTurnL(headingAsString);},delay);
  heading=heading+TSCALE;
  //delay=delay+DELTA;
}
function realTurnL(h)
{
    //console.log(h);
    //positionPanner(h); //?not needed because no longer changing orientation of source?
}

function radians(a)
{
  return a*Math.PI/180;
}

function setup()
 {
    configureSource();
    source.connect(panner);
    panner.connect(gainNode);
    /*
    source2.connect(panner2);
    panner2.connect(gainNode);
    */
    gainNode.gain.value=0;
    gainNode.connect(audioCtx.destination);
    source.start(0);
    //source2.start(0);
    delay=0;
};



