var running=false;


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
["B5",987.77]]


/*
<form>
Note length in ms:
<br>
  <input type="text" id="length0" value=250>
  <br>
  <input type="radio" name="note0" value=C3 checked> C3<br>
  <input type="radio" name="note0" value=D3> D3<br>
  <input type="radio" name="note0" value=E3> E3<br>
  <input type="radio" name="note0" value=F3> F3<br>
  <input type="radio" name="note0" value=G3> G3<br>
  <input type="radio" name="note0" value=A3> A3<br>
  <input type="radio" name="note0" value=B3> B3<br>
  <input type="radio" name="note0" value=C4> C4<br>
  <input type="radio" name="note0" value=D4> D4<br>
  <input type="radio" name="note0" value=E4> E4<br>
  <input type="radio" name="note0" value=F4> F4<br>
  <input type="radio" name="note0" value=G4> G4<br>
  <input type="radio" name="note0" value=A4> A4<br>
  <input type="radio" name="note0" value=B4> B4<br>
  <input type="radio" name="note0" value=C5> C5
</form> 
*/
//build form
//function buildForm(formDivID,n)
function buildForm(formN,n)
{

  var formDivID="form"+formN;
  var formDiv=document.getElementById(formDivID);
  //formDiv.innerHTML="foo";
  //console.log(document.getElementById('form1').innerHTML);
  var formID=formDivID+n;
  var noteLengthBox='Len ms:<br><input type="text" size=4 value=0 id="length'+formN+n+'"><br>';
   var gainBox='Gain (0-1):<br><input type="text" size=4 value=.5 id="gain'+formN+n+'"><br>';
  
  //console.log(noteLengthBox);
  //formDiv.innerHTML=formDiv.innerHTML+noteLengthBox;
  var radioButtons="<form>"+gainBox+noteLengthBox;
  
  var lengthOfScale=scale.length;
  var i, noteName, noteFreq;
  //radioButtons=radioButtons+'<input type="radio" name="note'+formN+n+'" value='+0+' checked>'+"rest"+'<br>'
  
  for (i=0;i<lengthOfScale;i++)
  {
    noteName=scale[lengthOfScale-i-1][0];
    noteFreq=scale[lengthOfScale-i-1][1];
    radioButtons=radioButtons+'<input type="radio" checked name="note'+formN+n+'" value='+noteFreq+'>'+noteName+'<br>'
  }

  radioButtons=radioButtons+'</form>';
  //console.log(radioButtons);
  formDiv.innerHTML=formDiv.innerHTML+ radioButtons;
  //var theButtonsName='note'+formN+n;
  //console.log(theButtonsName);
  //console.log(document.getElementsByName(theButtonsName).length);
  //document.getElementsByName(theButtonsName)[0].checked=true;


}
var nNotes=20;

function buildPage()
{
  //alert("got here");
  var i;
  for(i=0;i<nNotes;i++)
    buildForm(1,i);
  for(i=0;i<nNotes;i++)
    buildForm(2,i);
}



// define other variables

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();







var source;
var gain;
var t;

function startRun()
{
  running=true;
  gain.gain.value=1;
  getParameters();
  t=0;
  runMelody();
  showMelody();
}


  

function playTone(y,g)
{
  //var f=freq(y);
    //console.log("y: "+y+" f: "+f);
    gain.gain.value=g;
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



function restore()
{
  gain.gain.value=1;
}
function rest(restLength)
{
  setTimeout(function(){gain.gain.value=0;},t);
  setTimeout(restore,t+restLength);
  t=t+restLength;
}
function stopRun()
{
  gain.gain.value=0;
  running=false;
}



function runMelody()
{
  var i,j,k;
  for (j=0;j<nRepetitionsG;j++)
  {
    for(i=0;i<nRepetitions1;i++)
    { 
      for(k=0;k<nNotes;k++)
          step(notes1[k],gains1[k],lens1[k]);
    }
    for(i=0;i<nRepetitions2;i++)
    {
      for(k=0;k<nNotes;k++)
          step(notes2[k],gains2[k],lens2[k]);
    }
  }
  mute();
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
function mute()
{
  setTimeout(function(){gain.gain.value=0;},t);
}
var nRepetitions1;
var gains1=[];
var lens1=[];
var notes1=[];

var nRepetitions2;
var gains2=[];
var lens2=[];
var notes2=[];
var nRepetitionsG;

function preset1()
{
  nRepetitions1=5;
  nRepetitions2=5;
  nRepetitionsG=5;
  notes1=[196,246.94,293.66,349.23,293.66,246.94,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81]; 
  lens1=[250,250,500,250,250,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
  gains1=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  notes2=[196,246.94,293.66,349.23,293.66,246.94,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81]; 
  lens2=[250,500,250,250,500,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
  gains2=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  running=true;
  gain.gain.value=1;
  t=0;
  runMelody();
}


function preset2()
{
  nRepetitions1=5;
  nRepetitions2=5;
  nRepetitionsG=5;
  notes1=[196,246.94,293.66,349.23,293.66,246.94,164.81,196,369.99,440,369.99,196,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81];
  lens1=[250,250,250,250,250,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  gains1=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  notes2=[164.81,196,369.99,440,369.99,196,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81];
  lens2=[350,350,350,350,350,350,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  gains2=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  running=true;
  gain.gain.value=1;
  t=0;
  runMelody();
}
function preset3()
{
  nRepetitions1=5;
  nRepetitions2=5;
  nRepetitionsG=5;
  notes1=[164.81,196,369.99,440,369.99,196,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81];
  lens1=[250,250,250,250,250,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  gains1=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  notes2=[164.81,196,369.99,440,369.99,196,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81,130.81];
  lens2=[350,350,350,350,350,350,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  gains2=[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5];
  running=true;
  gain.gain.value=1;
  t=0;
  runMelody();
}

function readRadio(name)
{
    var radios = document.getElementsByName(name);

    for (var i = 0;  i < radios.length; i++) 
    {
      if (radios[i].checked) 
        // do whatever you want with the checked radio
        return radios[i].value;

        
    }
}
function getParameters()
{
  nRepetitions1=parseInt(document.getElementById("nRepetitions1").value);
  var i;
  for(i=0;i<nNotes;i++)
  {
    var gainID="gain1"+i;
    gains1[i]=parseFloat(document.getElementById(gainID).value);
    var lenID="length1"+i;
    lens1[i]=parseFloat(document.getElementById(lenID).value);
    var noteID="note1"+i;
    notes1[i]=readRadio(noteID);
  }
  nRepetitions2=parseInt(document.getElementById("nRepetitions2").value);
  for(i=0;i<nNotes;i++)
  {
    var gainID="gain2"+i;
    gains2[i]=parseFloat(document.getElementById(gainID).value);
    var lenID="length2"+i;
    lens2[i]=parseFloat(document.getElementById(lenID).value);
    var noteID="note2"+i;
    notes2[i]=readRadio(noteID);
  }

  nRepetitionsG=parseInt(document.getElementById("nRepetitionsG").value);
  /*
  console.log("reps: "+nRepetitions1);
  console.log("gain10: ",gains1[0]);
  console.log("gain11: ",gains1[1]);
  console.log("length10: ",lens1[0]);
  console.log("length10: ",lens1[1]);
  console.log("note10: "+notes1[0]);
  console.log("note11: "+notes1[1]);
  */
}



function run()
 {
  if(!running)
  {
    startRun();
  }
  else 
    {
      stopRun();
    }
}
configureSoundSystem();

function showMelody()
{
  var notesText="var notes=["+notes1[0];
  var i;
  for(i=1;i<notes1.length;i++)
    notesText=notesText+","+notes1[i];
  notesText=notesText+"];<br>";

  var lensText="var lens=["+lens1[0];
  
  for(i=1;i<lens1.length;i++)
    lensText=lensText+","+lens1[i];
  lensText=lensText+"];<br>";

  var gainsText="var gains=["+gains1[0];
  
  for(i=1;i<gains1.length;i++)
    gainsText=gainsText+","+gains1[i];
  gainsText=gainsText+"];<br>";

  var melodyOutputArea=document.getElementById("melodyOutputArea1");
  melodyOutputArea.innerHTML=notesText+lensText+gainsText;

  var notesText="var notes=["+notes2[0];
  
  for(i=1;i<notes2.length;i++)
    notesText=notesText+","+notes2[i];
  notesText=notesText+"];<br>";

  var lensText="var lens=["+lens2[0];
  
  for(i=1;i<lens2.length;i++)
    lensText=lensText+","+lens2[i];
  lensText=lensText+"];<br>";

  var gainsText="var gains=["+gains2[0];
  
  for(i=1;i<gains2.length;i++)
    gainsText=gainsText+","+gains2[i];
  gainsText=gainsText+"];<br>";

  var melodyOutputArea=document.getElementById("melodyOutputArea2");
  melodyOutputArea.innerHTML=notesText+lensText+gainsText;


}



