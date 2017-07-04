//sonify at HWK

var t=0;
var orientationCoding="clock";
var running="never";
var drawCtx;
function toggleRun()
{	//alert("running");
	if (running=="never") //have not run before
        {
		running=false;
		mySoundSystem=initSoundSystem();
		setCompassCoding();
         }

	running=!running;

	sonifyField();
	//testSound();
}
function toggleFirst() //what to say
{
	if(audible[0])
		return "first probe off";
	else return "first probe on";
}
function toggleSecond() //what to say
{
	if(audible[1])
		return "second probe off";
	else return "second probe on";
}
function toggleFirstProbe()
{
	toggleProbe(0);
}
function toggleSecondProbe()
{
	toggleProbe(1);
}
function toggleProbe(p)
{
	
	
	if (running=="never")
	{
		for(var i=0;i<2;i++)
			mySoundSystems[i]=initSoundSystem();
		setCompassCoding();
		running=true;
		
		
		sonifyField(); //nb call this just once... control afterwards by setting gain
	}
	audible[p]=!audible[p];
	if (!audible[p])
	{
		mySoundSystems[p].setAmp(0);
		for (var i=0;i<mySoundSystems[p].NST;i++)
            mySoundSystems[p].setShepAmp(i,0);
	}
	//running=!running;
	//sonifyField();
}
var compass=function()
{
	var text="compass";
	if(orientationCoding=="clock")
		text=text+" selected "
	return text;
}
var shepard=function()
{
	var text="shepard";
	if(orientationCoding=="shepard")
		text=text+" selected "
	return text;
}
var amponly=function()
{
	var text="amplitude only";
	if(orientationCoding=="amponly")
		text=text+" selected "
	return text;
}

setCompassCoding=function()
{
	orientationCoding="clock";
	if(running==true)
		for(var i=0;i<2;i++)
			mySoundSystems[i].endShepMode();
	//say("compass");
}
setShepardCoding=function()
{
	orientationCoding="shepard";
	if(running==true)
		for(var i=0;i<2;i++)
			mySoundSystems[i].startShepMode();
	//say("shepard");
}
setAmpOnly=function()
{
	orientationCoding="amponly";
	if(running==true)
		for(var i=0;i<2;i++)
			mySoundSystems[i].endShepMode();
}

function sonifyField() 
{
	var kDelay=5; 
	if (running)
	{
		t=t+.025; 
	    playFieldTones(t);
		setTimeout("sonifyField()",kDelay); //allow time for tone(s) to play						//while program is running
	}
}
function plotAngle(t,a)
{
	drawCtx.fillStyle="#FFFFFF";
	drawCtx.fillRect((10*t)%700,700-100*a,2,2);
}
function plotVec(v)
{
	drawCtx.moveTo(350,350);
	var s=1e6;
	console.log("e.x: "+v.x);
	drawCtx.lineTo(350+s*v.x,350-s*v.y);
	//drawCtx.lineTo(100,100);
	drawCtx.strokeStyle="#FF0000";
	drawCtx.stroke();
	setTimeout((function(x){return function(){eraseVec(x);}})(v),2);
}
function eraseVec(v)
{
	drawCtx.moveTo(350,350);
	var s=1e6;
	console.log("e.x: "+v.x);
	drawCtx.lineTo(350+s*v.x,350-s*v.y);
	//drawCtx.lineTo(100,100);
	drawCtx.strokeStyle="#000000";
	drawCtx.stroke();
}
function playFieldTones(t)
{
	for (var i=0;i<2;i++)
		if(audible[i])
			playFieldTone(t,i);
}


function playFieldTone(t,p) 
{
	var e=capE(PT[p],t);
	//plotVec(e);
	//plotAngle(t,findAngle(e));
	if(orientationCoding=="clock")
	{
		playTone(makeFreq(findAngle(e),p),3*makeAmp(vLen(e),p),p); //only one voice vs 3 for shep
		return;
	}
	else if (orientationCoding=="amponly")
	{
		playTone(makeFreq(Math.PI,p),3*makeAmp(vLen(e),p),p); //only one voice vs 3 for shep
		return;
	}
    playShepTone(findAngle(e),makeAmp(vLen(e),p),p);
}
function findAngle(v)
{
	var a=Math.atan2(v.y,v.x)+Math.PI;
	//console.log("angle is "+a);
	return a;
	
}
function makeFreq(angle,p)
{
	const maxFreq=400; //was 500
	const minFreq=50; //was 100
	//var maxFreq=[400,1000][p]; //different freq range for the two probes
	//var minFreq=[100,600][p];
	//var freq= (((angle%(2*Math.PI))/(2*Math.PI))*(maxFreq-minFreq))+minFreq;
	var freq= ((angle/(2*Math.PI))*(maxFreq-minFreq))+minFreq;
	//console.log("in make freq: "+freq)
	if(p==1)
		freq=4*freq; //2 octaves higher
	return freq;
}
/*
function makeAmp(len,p)
{
	const maxLen=1e-8;  //1e-4
	var amp=len/maxLen;
	console.log("raw amp "+amp);
	amp=(1/14)*(Math.log(amp)+2); //logarithmic scaling for dynamic range
	console.log("amp "+amp);
	return amp;
}
*/
function makeAmp(len,p)
{
	const CAP=1e-6;
	console.log("len is ",len);
	len=Math.min(CAP,len);
	amp=3e7*(len-.75/(Math.pow(vLen(PT[p])+1,2)));
	console.log("amp "+amp);
	return amp;
}

function testSound()
{
	playTone(440,.5);
	setTimeout(function(){playTone(550,.7)},200);
	setTimeout(function(){playTone(440,.7)},400);
	setTimeout(function(){mySoundSystem.startShepMode();},600);
	/*
	setTimeout(function(){playShepTone(0,.5);},700);
	setTimeout(function(){playShepTone(.2,.5);},1700);
	setTimeout(function(){playShepTone(.4,.5);},2700);
	setTimeout(function(){playShepTone(.6,.5);},3700);
	setTimeout(function(){playShepTone(.8,.5);},4700);
	setTimeout(function(){playShepTone(1,.5);},5700);
	setTimeout(function(){playShepTone(1.2,.5);},6700);
	setTimeout(function(){playShepTone(1.4,.5);},7700);
	setTimeout(function(){playShepTone(1.6,.5);},8700);
	setTimeout(function(){playShepTone(1.8,.5);},9700);
	setTimeout(function(){playShepTone(2.0,.5);},10700);
	setTimeout(function(){playShepTone(2.2,.5);},11700);
	setTimeout(mySoundSystem.endShepMode,12700);
	*/
	for(var i=0;i<800;i++)
	{
		//console.log('in caller angle is '+iS*Math.PI/20);
		//var fn=function(){playShepTone(iS*Math.PI/20,.75)};
		//setTimeout(fn,1000+300*i);
		setTimeout((function(ang,amp){return function()
			{
				//plotAngle(ang*200/Math.PI,ang);
				playShepTone(ang,amp);
			}
		})(i*Math.PI/200,.75),1000+60*i);
	}

	//setTimeout(mySoundSystem.endShepMode,1000+20000);
	
}	
