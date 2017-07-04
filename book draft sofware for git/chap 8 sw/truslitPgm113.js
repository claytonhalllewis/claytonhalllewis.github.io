var running=false;

// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var ctx; //canvas context
var firstPoint; //used to mark old points
var source;
var gain;
var fx,fy;

var oldX,oldY;

function yD(y) //convert to canvas coords
{
  var yC=350-(700/1000)*y;
  yC=Math.max(0,yC);
  yC=Math.min(700,yC);
  return Math.round(yC);
}
function xD(x) //convert to canvas coords
{
  var xC=350+(700/1000)*x;
  xC=Math.max(0,xC);
  xC=Math.min(700,xC);
  return Math.round(xC);
}
function plot(x,y)
{
  //console.log('plotting');
  if (firstPoint)
    firstPoint=false;
  else
  {
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(oldX,oldY,4,4);
  }
  ctx.fillStyle = "#FF0000";
  oldX=xD(x);
  oldY=yD(y);
  //console.log(oldX,oldY);
  ctx.fillRect(oldX,oldY,4,4);
}



function configureSoundSystem()
{
  var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';
oscillator.frequency.value = 220; // value in hertz
source=oscillator;
gain=audioCtx.createGain();
source.connect(gain);
gain.gain.value=0;
gain.connect(audioCtx.destination);
source.start(0);
}

function setup()
{
    var theCanvas=document.getElementById("theCanvas");
    ctx = theCanvas.getContext("2d");
    
    configureSoundSystem();
    curvatureFlag=true;
    
    running=true;
}
function curveOn()
{
  curvatureFlag=true;
}
function curveOff()
{
  curvatureFlag=false;
}
function rings()
{
  fx=ringsfx;
  fy=ringsfy;
  playCurve(.5);
}
function spiral()
{
  fx=spiralfx;
  fy=spiralfy;
  playCurve(.5);
}
function hellipse()
{
  fx=ellipseHfx;
  fy=ellipseHfy;
  playCurve(.5);
}
function vellipse()
{
  fx=ellipseVfx;
  fy=ellipseVfy;
  playCurve(.5);
}

function run()
 {
  if(!running)
  {
    //pannerData = document.querySelector('.panner-data');
    var theCanvas=document.getElementById("theCanvas");
    ctx = theCanvas.getContext("2d");
    
    configureSoundSystem();
    
    running=true;
    playCurve(.5);
    
  }
  else 
    {
      running=false;
      source.stop();
      //source2.stop();
    }
};
function freq(y)
{
  var val=100*Math.exp(Math.log(2)*3*(y+1000)/2000);
  //console.log(y,val);
  return val;
}

//ellipses
function ellipseHfx(p)
{
  return 400*Math.cos(p);
}
function ellipseHfy(p)
{
  return 200*Math.sin(p);
}
function ellipseVfx(p)
{
  return 200*Math.cos(p);
}
function ellipseVfy(p)
{
  return 400*Math.sin(p);
}

//spiral
function spiralfx(p)
{
  return ((100/(2*Math.PI)))*p*Math.cos(p);
}
function spiralfy(p)
{
  return ((100/(2*Math.PI)))*p*Math.sin(p);
}


//rings
function ringsfx(p)
{
  var radius=50+100*Math.round(p/(2*Math.PI)); 
  return radius*Math.cos(p);
}
function ringsfy(p)
{
  var radius=50+100*Math.round(p/(2*Math.PI)); 
  return radius*Math.sin(p);
}
var curvatureFlag;
const EPSILON=.01;
//setTimeout((function(t,y){return function(){realStep(t,y);};})(t,y),t);
function playCurve(g)
{
  firstPoint=true;
  gain.gain.value=g;
  var END=20; //sec
  //var EPSILON=.01;
  var p=0;
  var SPEED=5; //movement per epsilon sec
  var c=curvature(p);
  //var c=1;
  //var speed=SPEED/c;
  var speed;
  if(curvatureFlag)
    speed=SPEED/(400*c);
  else
    speed=SPEED;
  var t;
  
  var x,y,trialx,trialy,trialS,delX,delY, prevx,prevy,s;
  x=fx(p);
  y=fy(p);
  for (var t=0;t<END;t=t+EPSILON)
  {
    setTimeout((function(x,y){return function(){plot(x,y);};})(x,y),1000*t);
    trialx=fx(p+EPSILON); delX=trialx-x;
    trialy=fy(p+EPSILON); delY=trialy-y;
    trialS=Math.sqrt((delX*delX)+(delY*delY));
    //console.log("trialS: ",trialS);
    p=p+EPSILON*speed/trialS;
    c=curvature(p);
    if(curvatureFlag)
      speed=SPEED/(250*c);
    else
      speed=SPEED;
    //console.log("oldp: ",oldp);
    prevx=x;
    prevy=y;
    x=fx(p);
    y=fy(p);
    delX=x-prevx; delY=y-prevy;
    s=Math.sqrt((delX*delX)+(delY*delY));
    console.log("s,c: ",s,c);

      
    source.frequency.exponentialRampToValueAtTime(freq(y),audioCtx.currentTime+t);

  }
  //gain.gain.linearRampToValueAtTime(0,audioCtx.currentTime+END);
  setTimeout(function(){gain.gain.value=0;},END*1000);
}
function xp(p)
{
  var res=(fx(p+EPSILON)-fx(p))/EPSILON;
  return res;
}
function xpp(p)
{
  var res= (xp(p+EPSILON)-xp(p))/EPSILON;
  console.log("xpp: ",res);
  return res;
}

function yp(p)
{
  return (fy(p+EPSILON)-fy(p))/EPSILON;
}
function ypp(p)
{
  return (yp(p+EPSILON)-yp(p))/EPSILON;
}
function curvature(p)
{
  var res=Math.abs(xp(p)*ypp(p)-yp(p)*xpp(p))/Math.pow((xp(p)*xp(p)+yp(p)*yp(p)),1.5);
  if (res>1)
    return 1;
  return res;
}

