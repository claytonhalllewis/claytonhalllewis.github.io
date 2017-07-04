var running;


//notes
var C3=130.81;
var D3=146.83;
var E3=164.81;
var F3=174.61;
var G3=196;
var A3=220;
var B3=246.94;
var C4=261.63;
var D4=293.66;
var E4=329.63;
var F4=349.23;
var G4=392;
var A4=440;
var B4=493.88;
var C5=523.25;

var scale=
[["C3",130.81],
["C#3",138.59],
["D3",146.83],
["D#3",155.56],
["E3",164.81],
["F3",174.61],
["F#3",185],
["G3",196],
["G#3",207.65],
["A3",220],
["A#3",233.08],
["B3",246.94],
["C4",261.63],
["C#4",277.18],
["D4",293.66],
["D#4",311.13],
["E4",329.63],
["F4",349.23],
["F#4",369.99],
["G4",392],
["G#4",415.3],
["A4",440],
["A#4",466.16],
["B4",493.88],
["C5",523.25],
["D5",587.33],
["E5",629.25],
["F5",698.46],
["G5",783.99],
["A5",880],
["B5",987.77]];


var scaleNonChrom=
[["C3",130.81],

["D3",146.83],
["E3",164.81],
["F3",174.61],

["G3",196],

["A3",220],

["B3",246.94],
["C4",261.63],

["D4",293.66],
["E4",329.63],
["F4",349.23],

["G4",392],

["A4",440],

["B4",493.88],
["C5",523.25],
["D5",587.33],
["E5",629.25],
["F5",698.46],
["G5",783.99],
["A5",880],
["B5",987.77]];



// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var motion;







var source0;
var source1;
var gain;

var drum;

/*
function startRun()
{
  running=true;
  playCurve(.5);
}

//gainNode.gain.exponentialRampToValueAtTime(1.0, audioCtx.currentTime + 2);

function freq(y)
{
  var val=200*Math.exp(Math.log(2)*3*(y+1000)/2000);
  //console.log(y,val);
  return val;
}


      
    source.frequency.exponentialRampToValueAtTime(freq(y),audioCtx.currentTime+t);

  

  

function playTone(y,g)
{
  //var f=freq(y);
    //console.log("y: "+y+" f: "+f);
    gain.gain.value=g;
    source.frequency.value=y;
}
*/

function configureSoundSystem()
{
  console.log("in configureSoundSystem");
  var oscillator0 = audioCtx.createOscillator();
oscillator0.type = 'sine';
oscillator0.frequency.value = 220; // value in hertz
//[0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8] sort of a horn
var imag= new Float32Array([1,0.4,0.4,.2,0,0,0.3,0.2]);   // sine
    var real = new Float32Array(imag.length);  // cos
    var customWave = audioCtx.createPeriodicWave(real, imag);  // cos,sine
    oscillator0.setPeriodicWave(customWave);
source0=oscillator0;
var oscillator1 = audioCtx.createOscillator();
oscillator1.type = 'sine';
oscillator1.frequency.value = 220; // value in hertz
//[0,0.4,0.4,1,1,1,0.3,0.7,0.6,0.5,0.9,0.8] sort of a horn
  imag= new Float32Array([1,0.4,0.4,.2,0,0,0.3,0.2]);   // sine
  real = new Float32Array(imag.length);  // cos
   customWave = audioCtx.createPeriodicWave(real, imag);  // cos,sine
    oscillator1.setPeriodicWave(customWave);
source1=oscillator1;
gain=audioCtx.createGain();
source0.connect(gain);
source1.connect(gain);
gain.gain.value=0;
gain.connect(audioCtx.destination);
source0.start(0);
//source1.start(0);
running=false;
motion=document.getElementById("motion");
//motion.beginElement();
//motion.endElement();
drum=document.getElementById("drum");

}

/*

function restore()
{
  gain.gain.value=1;
}

function stopRun()
{
  gain.gain.value=0;
  running=false;
}



function realStep(y,g)
{
  if (running)
  {
    playTone(y,g);
  }
}
function step(y,g,noteLength)
{
  setTimeout((function(y){return function(){realStep(y,g);};})(y,g),t);
  t=t+noteLength;

}
*/
function freq(y)
{
  var val=100*Math.exp(Math.log(2)*3*(1000-y)/1000);
  //console.log(y,val);
  return val;
}
function playTones()
{
  if (running)
  {
    //console.log("in playTones");
    var noteInterval=100;
    gain.gain.value=.3;
    source0.frequency.value=clipToNote(freq(getCursorCoords(cursor0)[1]));
    //source1.frequency.value=clipToNote(freq(getCursorCoords(cursor1)[1]));
    processDrum();
    setTimeout(playTones,noteInterval);
  }
}
function mute()
{
  //setTimeout(function(){gain.gain.value=0;},t);
  console.log("mute");
  gain.gain.value=0;
}
function processDrum()
{
  console.log("process drum");
  var TOP=250;
  var BOT=150;

  var y=getCursorCoords(cursor1)[1];
  console.log("y is ",y);
  if ((y<TOP)&&(y>BOT))
    playDrum();
}
function playDrum()
{
  console.log("play drum");
  drum.play();
}



function run()
{
  console.log("in run");
  running=!running;
  if (running)
  {
    playTones();
    motion0.beginElement(); 
    motion1.beginElement();   
    cursor0.setAttribute("visibility","visible");
    cursor1.setAttribute("visibility","visible");
   
  }
  else
  {
    motion0.endElement();
    motion1.endElement();
    mute();
  }

}

function clipToNote(f)
{
  var scale=scaleNonChrom;
  var i;
  for(i=0;i<scale.length;i++)
    if(f<scale[i][1])
      return scale[i][1];
  return scale[scale.length-1][1];
}





