var running=false;
// set up listener and panner position information

//position coords
var xPos = 500;
var yPos = 500;
var zPos = 300;
var heading=0;

var DSCALE=2; //scales turtle coords
var TSCALE=.5; //scales turns....other than 1 doesn't make sense?

var delay; //controls timing of steps

// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var ctx; //canvas context
var firstPoint; //used to mark old points
var oldX;
var oldZ;

function zD(z) //convert to canvas coords
{
  var zC=700-(700/4000)*z;
  zC=Math.max(0,zC);
  zC=Math.min(700,zC);
  return Math.round(zC);
}
function xD(x) //convert to canvas coords
{
  var xC=350+(700/4000)*x;
  xC=Math.max(0,xC);
  xC=Math.min(700,xC);
  return Math.round(xC);
}
function plot(x,z)
{
  if (firstPoint)
    firstPoint=false;
  else
  {
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(oldX,oldZ,4,4);
  }
  ctx.fillStyle = "#FF0000";
  oldX=xD(x);
  oldZ=zD(z);
  ctx.fillRect(oldX,oldZ,4,4);
}

var panner = audioCtx.createPanner();
panner.panningModel = 'HRTF';
panner.distanceModel = 'linear';
panner.refDistance = 500;
panner.maxDistance = 20000;
panner.rolloffFactor = 5;
//panner.coneInnerAngle = 0;
//panner.coneOuterAngle = 180;
//panner.coneOuterGain = 1; //.1 for directional effect

//panner.orientationX.value = 0; //1
//panner.orientationY.value = 0; //0
//panner.orientationZ.value = 1; //0

var panner2 = audioCtx.createPanner();
panner2.panningModel = 'HRTF';
panner2.distanceModel = 'linear';
panner2.refDistance = 500;
panner2.maxDistance = 20000;
panner2.rolloffFactor = 5;
panner2.coneInnerAngle = 0;
panner2.coneOuterAngle = 180;
panner2.coneOuterGain = 1;

panner2.orientationX.value = 1; //1
panner2.orientationY.value = 0; //0
panner2.orientationZ.value = 0; //0

var gainNode=audioCtx.createGain();


var listener = audioCtx.listener;

  listener.forwardX.value = 0;
  listener.forwardY.value = 0;
  listener.forwardZ.value = -1;
  listener.upX.value = 0;
  listener.upY.value = 1;
  listener.upZ.value = 0;

var source;
var source2;


// listener will always be in the same place for this demo


  listener.positionX.value = 0;
  listener.positionY.value = 400;
  listener.positionZ.value = -100;
/*
  function freq(z) //linear
  {
    var MINFREQ=200;
    var MAXFREQ=880;
    var ZRANGE=5000;
    return MINFREQ+(MAXFREQ-MINFREQ)*z/ZRANGE;
  }
  */
  function freq(z)
  {
    
    return 200 + Math.exp((8/4800)*(z-200));

  }

// panner will move as the turtle moves 
function positionPanner(h,x,z) 
{
  
    panner.positionX.value = x;
    //panner.positionZ.value = z; //leave unchanged
    source.frequency.value=freq(z);

    //panner.orientationX.value = Math.cos(radians(h));
    //panner.orientationY.value = 0; 
    //panner.orientationZ.value = Math.sin(radians(h));

    
  
  //panner2.positionX.value = x;
    //panner2.positionZ.value = z; 
    source2.frequency.value=(5/4)*freq(z);

    //panner2.orientationX.value = -Math.cos(radians(h));
    //panner2.orientationY.value = 0; 
    //panner2.orientationZ.value = -Math.sin(radians(h));
    plot(x,z);
}

function configureSource()
{
  var oscillator = audioCtx.createOscillator();
oscillator.type = 'sawtooth';
oscillator.frequency.value = 220; // value in hertz
source=oscillator;
var oscillator2 = audioCtx.createOscillator();
oscillator2.type = 'square';
oscillator2.frequency.value = 330; // value in hertz
source2=oscillator2;
}

function startTurtle()
{
  resetTurtle();
  firstPoint=true;
  gainNode.gain.value=.5;
  delay=0;
}
function resetTurtle()
{
  xPos=-1000*DSCALE;
  yPos=0;
  zPos=300*DSCALE;
  heading=0;
}
function medley()
{
  
  for(var i=0;i<3;i++)
  {
    forward(1000);
    left(90);
    forward(200);
    left(270);
    circle2(100);
    heading=90;
    forward(400);
    heading=0;
    spiral(20,.5,3);
    triangle(1000);
    triangle(500);
    resetTurtle();
  }
  
  turtleStop();
}

function circle2(d)
{
  for (var i=0;i<36;i++)
  {
    forward(d);
    left(10);
  }
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
  forward(d);
  left(120);
  forward(d);
  left(120)
  forward(d);
  left(120);
}
function runSquare()
{
  //console.log("runTriangle");
  startTurtle();
  square(1500);
  square(1500);
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
  forward(1000);
  circle(1800);
  circle(1800);
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
  forward(1000);
  spiral(20,.5,3);
  resetTurtle();
  forward(1000);
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
function runMedley()
{
  startTurtle();
  medley();
  turtleStop();
}
function forward(d)
{ 
  while (d>0)
  {
    step();
    d=d-1;
  }
}
var DELTA=1.5; //delay for each turtle step
function step()
{
  var headingAsString=heading.toString();
  xPos=xPos+DSCALE*Math.cos(radians(heading));
  zPos=zPos+DSCALE*Math.sin(radians(heading));
  var xAsString=xPos.toString();
  var zAsString=zPos.toString();
  setTimeout(function(){realStep(headingAsString,xAsString,zAsString);},delay);
  delay=delay+DELTA;
}
function realStep(h,x,z)
{
    positionPanner(h,x,z);
}
function turtleStop()
{
  setTimeout(function(){gainNode.gain.value=0;},delay);
}
function left(a)
{
  heading=heading+a;
}
/*
function left(a)
{ 
  while (running && a>0)
  {
    turnL();
    a=a-TSCALE;
  }
}

function turnL()
{
  heading=heading+TSCALE;
  var headingAsString=heading.toString();
  var xAsString=xPos.toString();
  var zAsString=zPos.toString();
  setTimeout(function(){realTurnL(headingAsString, xAsString,zAsString);},delay);
  
  delay=delay+DELTA;
}
function realTurnL(h,x,z)
{
    positionPanner(h,x,z);
}
*/
function radians(a)
{
  return a*Math.PI/180;
}

function setup()
 {
  
    var theCanvas=document.getElementById("theCanvas");
    ctx = theCanvas.getContext("2d");
    
    configureSource();
    source.connect(panner);
    //panner.connect(audioCtx.destination);
    gainNode.gain.value=0;
    panner.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
    
    delay=0;
    
  
};



