//sonify for assets

var t=0;
var orientationCoding;
var running="never";
function toggleRun()
{	//alert("running");
	if (running=="never") //have not run before
        {
		running=false;
		//when app starts, lock mousepointer
		var c = document.getElementById("myCanvas");
		c.requestPointerLock = c.requestPointerLock ||
           	c.mozRequestPointerLock ||
           	c.webkitRequestPointerLock;
		c.requestPointerLock();
         }

	running=!running;

	sonifyField();
}

setCompassCoding=function()
{
	orientationCoding="clock";
}
setShepardCoding=function()
{
	orientationCoding="shepard";
}

setShepardCoding();
function sonifyField() 
{
	if (running)
	{
		t=t+.2; 
	        playFieldTone(t);
		setTimeout("sonifyField()",kDelay); //allow time for tone to play						//while program is running
	}
}

function playFieldTone(t) 
{
	var e=capE(PT,t);
	if(orientationCoding=="clock")
	{
		playTone(makeFreq(findAngle(e)),makeAmp(vLen(e)));
		return;
	}
        playShepTone(findAngle(e),makeAmp(vLen(e)));
}
function findAngle(v)
{
	return Math.atan2(v.y,v.x)+2*Math.PI;
	
}
function makeFreq(angle)
{
	const maxFreq=600;
	const minFreq=200;
	return angle*((maxFreq-minFreq)/(2*Math.PI))+minFreq;
}
function makeAmp(len)
{
	const maxLen=1e-10;
	var amp=len/maxLen;
	//console.log("amp "+amp);
	return amp;
}
