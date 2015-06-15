var t=0;
function sonifyField() 
{
	if (running)
	{
		t=t+.2; //.5
	        playFieldTone(t);
		setTimeout("sonifyField()",kDelay); //allow time for tone to play						//while program is running
	}
}

function playFieldTone(t) //shepard tone version
{
	var e=capE(PT,t);
	playShepTone(findAngle(e),makeAmp(vLen(e)));
	//alert("there");
	//playShepTone(t,100); //test
}
/*
function playFieldTone(t)
{
	var e=capE(PT,t);
	var freq=makeFreq(findAngle(e));
	playTone(freq,makeAmp(vLen(e)));
}
*/
function findAngle(v)
{
	return Math.atan2(v.y,v.x)+2*Math.PI;
	/*
	if (v.x==0)
	{
		if (v.y>0)
			return Math.pi/2;
		else return 3*Math.pi/2;
	}
	var angle=Math.atan(v.y/v.x)+2*Math.PI;
	//alert("in findAngle "+angle);
	return angle;
	*/
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
