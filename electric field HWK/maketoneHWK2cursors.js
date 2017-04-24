//maketone for HWK using audioNode oscillator

var ctx;
var clickElement; 

function click() 
{ 
    if (running=="never")
        clickElement = document.getElementById("click"); 
    clickElement.play(); 
} 

if('webkitAudioContext' in window) {
    var ctx = new webkitAudioContext();
}
else ctx = new AudioContext();
var mySoundSystems=[];
function initSoundSystem()
{ 
    var soundSystem={};
    var oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    //oscillator.frequency.value = 220;
    var gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    gainNode.gain.value=0;
    oscillator.start(0);
    soundSystem.setFreq=function(f)
    {
        oscillator.frequency.value=f;
    }
    soundSystem.setAmp=function(a)
    {
        //a=Math.min(a,.75); //remove clip
        gainNode.gain.value=a;
    }
    setupShepardSystem(soundSystem);
    return soundSystem;
}
function setupShepardSystem(ss)
{
    ss.NST=3; //number of tones in Shepard bundle
    var ssNodes=[];
    for(var i=0;i<ss.NST;i++)
    {
        ssNodes[i]={};
        ssNodes[i].osc=ctx.createOscillator();
        ssNodes[i].gain=ctx.createGain();
        ssNodes[i].osc.connect(ssNodes[i].gain);
        ssNodes[i].gain.connect(ctx.destination);
        ssNodes[i].gain.gain.value=0;
        ssNodes[i].osc.start();
    }
    ss.setShepFreq=function(i,f)
    {
        ssNodes[i].osc.frequency.value=f;
    }
    ss.setShepAmp=function(i,a)
    {
        a=Math.min(a,.5);
        ssNodes[i].gain.gain.value=a;
    }
    ss.startShepMode=function()
    {
        ss.setAmp(0);
    }
    ss.endShepMode=function()
    {
        for (var i=0;i<ss.NST;i++)
            ss.setShepAmp(i,0);
    }
}
function playTone(freq,amp,p) 
{
     //console.log("freq "+freq);
     console.log("amp "+amp);
     mySoundSystems[p].setFreq(freq);
     mySoundSystems[p].setAmp(amp);
}
function shepFreq(angle)
{
    //console.log("angle in shepFreq: "+angle);
	const MAXSHEP=500;
    const MINSHEP=100;
	
	return (angle%(2*Math.PI))*((MAXSHEP-MINSHEP)/2*Math.PI)+MINSHEP;
}
function shepAmp(angle)
{
    //console.log("angle in shepAmp: "+angle);
	if (angle<Math.PI)
		return .75*angle/(Math.PI);
	if (angle>Math.PI)
		return (.75*(2*Math.PI-angle))/(Math.PI/2);
	return .75;
}

function shifted(angle,shift)
{
    //console.log("shifted: "+(angle+shift)%(2*Math.PI));
	return (angle+shift)%(2*Math.PI);
}
/*
function playShepTone(angle,amp)
{
    console.log("angle is "+angle);
    for(var i=0;i<mySoundSystem.NST;i++)
    {
        var thisAngle=shifted(angle,i*2*Math.PI/mySoundSystem.NST)
        mySoundSystem.setShepFreq(i,shepFreq(thisAngle));
        mySoundSystem.setShepAmp(i,amp*shepAmp(thisAngle));
        console.log("setting voice "+i+" to amp "+shepAmp(thisAngle)+" freq "+shepFreq(thisAngle));
    }
}
*/
const maxHeight=2;
const standardDeviation=.75;
var mean=Math.PI;
function getNormal(x) //from http://www.ollysco.de/2012/04/gaussian-normal-functions-in-javascript.html
{
            return maxHeight * Math.pow(Math.E, -Math.pow(x - mean, 2) / (2 * (standardDeviation * standardDeviation)));
}
function shepAmp2(freq)
{
    return getNormal(freq);
}
function shepAmp3(angle)
{
    //based on shepard
    //return .5*Math.pow((1+Math.cos(angle-Math.PI)),2); //compressed
    return .5*.5*(1+Math.cos(angle-Math.PI)); //first .5 scales max amp
}

//in the following, the shepFreq function has to assign freqs
//multiplicately, to maintain octave relations between voices
function shepFreq2(angle,p)
{
    //var B=Math.log(2)/((2/6.0)*Math.PI); 
    var B=Math.log(2)/((2/4.0)*Math.PI); 
    var A=50; //freq for 0
    //var A=[50,300][p]; //select base freq
    var freq =A*Math.exp(angle*B);
    if(p==1)
        freq=4*freq;
    return freq;
}

function playShepTone(angle,amp,p)
{
    //console.log("angle is "+angle);
    for(var i=0;i<mySoundSystems[p].NST;i++)
    {
        var thisAngle=shifted(angle,i*2*Math.PI/mySoundSystems[p].NST)
        //if(i==0)
        //    plotAngle(.1*angle*200/Math.PI,thisAngle);
        mySoundSystems[p].setShepFreq(i,shepFreq2(thisAngle,p));
        mySoundSystems[p].setShepAmp(i,amp*shepAmp3(thisAngle));
        //console.log("setting voice "+i+" to amp "+shepAmp3(thisAngle)+" freq "+shepFreq2(thisAngle));
    }
}

    






      
  