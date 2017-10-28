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




var motion;

//using flocking http://flockingjs.org/

var myDrum;
var mySynth;
fluid.registerNamespace("myStuff");

var environment = flock.init();

    // Expose any public functions or constructors as properties on your namesapce.
myStuff.play = function () 
{
        mySynth = flock.synth({
        synthDef: {
                id:"carrier",
                ugen: "flock.ugen.sinOsc",
                freq:440.0,
                mul: 0.1
            }
        });
        myDrum = flock.synth({
        synthDef: {
            id:"drum",
            ugen: "flock.ugen.lfNoise",
          freq: 1000,
          mul: 0
        }
        });
}
myStuff.play();




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
    var noteInterval=150;
    
    environment.start();
    
    mySynth.set("carrier.freq",clipToNote(freq(getCursorCoords(cursor0)[1])));
    
    processDrum(); 
    setTimeout(playTones,noteInterval);
  }
}
function mute()
{
  
  console.log("mute");
  
  environment.stop();
}
var high=true;
function processDrum()
{
  console.log("process drum");
  var y=getCursorCoords(cursor1)[1];
  if (high&&y<200)
  {
    playDrum();
    high=false;
  }
  else if(!high&&y>200)
  {
    playDrum();
    high=true;
  }

  
}
function playDrum()
{
  console.log("play drum");
  myDrum.set("drum.mul",.2);
  setTimeout(function(){myDrum.set("drum.mul",0);},75);
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





