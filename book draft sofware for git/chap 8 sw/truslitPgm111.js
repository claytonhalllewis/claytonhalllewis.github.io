var running=false;
// set up listener and panner position information

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
var D5=587.33;
var E5=629.25;
var F5=698.46;
var G5=783.99;
var A5=880;
var B5=987.77;



// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var source;
var gain;
var t;

const REPS=3; //play each melody this many times


  

function playTone(y)
{
  //var f=freq(y);
    //console.log("y: "+y+" f: "+f);
    source.frequency.value=y;
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


function mute()
{
  setTimeout(function(){gain.gain.value=0;},t);
}
function stopRun()
{
  gain.gain.value=0;
  running=false;
}

function addButtons()
{
  addButton(runT3,"play","");
  addLabel("Truslit Figure 3, score 3");
  addButton(runT4,"play","");
  addLabel("Truslit Figure 3, score 4");
  addButton(runTf41,"play","");
  addLabel("Truslit Figure 4, score 1");
  addButton(runTf42,"play","");
  addLabel("Truslit Figure 4, score 2");
  addButton(runTf43,"play","");
  addLabel("Truslit Figure 4, score 3");
  addButton(runTf44,"play","");
  addLabel("Truslit Figure 4, score 4");
  addButton(runTf45,"play","");
  addLabel("Truslit Figure 4, score 5");
  addButton(runTf46,"play","");
  addLabel("Truslit Figure 4, score 6");
}

function addButton(fn,label,text)
{
  var btn = document.createElement("BUTTON");        // Create a <button> element
  var lab = document.createTextNode(label);       // Create a text node
  btn.appendChild(lab);
  var ctlsDiv=document.getElementById("controls");                                
  //document.body.appendChild(btn); 
  ctlsDiv.appendChild(btn); 
  btn.addEventListener("click",fn);
  if (text=="br")
    ctlsDiv.appendChild(document.createElement("br"));
  else
    ctlsDiv.appendChild(document.createTextNode(text));
}
function addLabel(text)
{
  var ctlsDiv=document.getElementById("controls");  
  ctlsDiv.appendChild(document.createTextNode(text));                              
  ctlsDiv.appendChild(document.createElement("br"));
}
function runT3()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyT3();
  t=0;
}
function runT4()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyT4();
  t=0;
}
function runTf41()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf41();
  t=0;
}
function runTf42()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf42();
  t=0;
}
function runTf43()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf43();
  t=0;
}
function runTf44()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf44();
  t=0;
}
function runTf45()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf45();
  t=0;
}
function runTf46()
{
  var n;
  for(n=0;n<REPS;n++)
    melodyTf46();
  t=0;
}



function melodyT3()
{
  //truslit #3
  var q=300;
  var e=150;
  var l=1000;
  q=2*q;
  e=2*e;
  l=2*l;
  var notes=[G4,A4,B4,C5,G4,E4,G4,C5,E5,D5,B4,G4,B4,D5,F5,A5,G5,F5,D5,B4,G4,F4,D4,G3];
  var lens=[e,e,e,q,q,e,e,e,e,q,q,e,e,e,e,e,e,e,e,e,e,e,e,l];
  var i;
  for(i=0;i<notes.length;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyT4()
{
  //truslit #4
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[E4,F4,A4,C5,D5,E5,D5,C5,B4,A4,F4,E4,E4,F4,A4,C5,E5,F5,A5,F5,A5,E5,D5,C5,B4,A4,G4,F4,E4,F4,B4,C5,D5,C5,B4,A4,F4,E4,A3,A3,B3,D4,F4,A4,B4,E5];
  var lens=[qd,e,e,e,e,e,e,e,e,e,q,q,e,e,e,e,q,q,q,q,e,e,e,e,e,e,e,e,qd,e,e,e,e,e,e,e,e,e,h,e,e,e,e,q,q,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyTf41()
{ 
  //truslit fig 4 no 1 nb transposed up an octave; removing coda note in loop for repetition
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,E3,A3,C4,G4,B4,F5,B4,G4,C4,A3,E3,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;-1
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyTf42()
{
  //truslit fig 4 no 2 nb transposed up an octave (removed coda in loop)
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,G3,C4,E4,G4,C5,C5,G4,E4,C4,G3,C3,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyTf43()
{
  //truslit fig 4 no 3 nb transposed up an octave (removed coda note in loop)
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,G3,C4,E4,G4,C5,D5,C5,G4,E4,C4,G3,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyTf44()
{
  //truslit fig 4 no 4 nb transposed up an octave (removed code note in loop)
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,G3,C4,E4,G4,C5,F5,C5,G4,E4,C4,G3,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}

function melodyTf45()
{
  //truslit fig 4 no 5 nb transposed up an octave (removed coda note in loop)
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,G3,C4,G4,C5,F5,B5,A5,F5,C5,G4,C4,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}
function melodyTf46()
{
  //truslit fig 4 no 6 nb transposed up an octave (removed coda note in loop)
  var h=1200;
  var q=600;
  var qd=900;
  var e=300;
  var l=2000;
  var rate=1.5;
  h=h/rate;
  q=q/rate;
  qd=qd/rate;
  e=e/rate;
  l=l/rate;
  
  var notes=[C3,G3,C4,G4,C5,F5,B5,A5,F5,C5,G4,F5,C5,G4,E4,C4,G3,E3,C3];
  var lens=[e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,e,l];
  console.log("notes: ",notes.length," values: ",lens.length);
  var i;
  for(i=0;i<notes.length-1;i++)
    step(notes[i],lens[i]);
  mute();
}





function realStep(t,y)
{
  if (running)
  {
    gain.gain.value=1;
    playTone(y);
    
  }
}
function step(y,noteLength)
{
  setTimeout((function(t,y){return function(){realStep(t,y);};})(t,y),t);
  t=t+noteLength;

}






function run()
 {
    configureSoundSystem();
    addButtons();
    
    t=0;
    running=true;
  
};



