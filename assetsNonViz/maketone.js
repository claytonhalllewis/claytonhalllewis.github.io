//maketone for assets
const kSampleRate = 44100; // Other sample rates might not work depending on the your browser's AudioContext
var kDelay=100; //used in sonification loop 100
const kNumSamples = 4410; //need to adjust to kDelay? no, overlap seems to work
const lenRamp=100; //number of samples in ramp up and down 200
const kPI_2       = Math.PI * 2;
const MAXAMP=.5;
var ctx = new AudioContext();
function playTone(freq,amp) 
{
     //alert("freq "+freq);
     //alert("amp "+amp);
     
     

    var buffer1 = ctx.createBuffer(1, kNumSamples, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    for (var i = 0; i < kNumSamples; i++) 
    {
        buf[i] = .000001*amp*Math.sin(freq *kPI_2 * i / kSampleRate);
	buf[i]=Math.sign(buf[i])*Math.min(Math.abs(buf[i]),MAXAMP);
    }
    //impose ramp at beginning and end
    for (var i=0; i<lenRamp;i++)
    {
	buf[i]=buf[i]*(i/lenRamp);  //ramp up
        buf[kNumSamples-i-1]=buf[kNumSamples-i-1]*(i/lenRamp); //ramp down
    }
    var node = ctx.createBufferSource(0);
    node.buffer = buffer1;
    node.connect(ctx.destination);
    node.start();
}
function shepFreq(angle)
{
	const MAXSHEP=5000;
     	const MINSHEP=200;
	
	return angle*((MAXSHEP-MINSHEP)/kPI_2)+MINSHEP;
}
function shepAmp(angle)
{
	//var clippedAngle=angle%kPI_2;
	//return 1+Math.abs(angle-Math.PI)*(-1/Math.PI);
	if (angle<Math.PI)
		return angle/(Math.PI);
	if (angle<1*Math.PI)
		return (2*Math.PI-angle)/Math.PI
	return 1;
}

function phaseShift(angle,shift)
{
	//var shiftedAngle=angle+shift;
	//if (shiftedAngle>kPI_2)
	//	shiftedAngle=shiftedAngle-kPI_2;
	//return shiftedAngle;
	return (angle+shift)%kPI_2;
}
function playShepTone(angle,amp)
{
    const NST=3;   //number of tones in Shepard bundle
    var buffer1 = ctx.createBuffer(1, kNumSamples, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    var shiftedAngle;
    for (var i = 0; i < kNumSamples; i++) 
    {
	buf[i]=0;
	for (var j=0;j<NST;j++)
	{
		shiftedAngle=phaseShift(angle,j*kPI_2/NST);
		buf[i]=buf[i]+shepAmp(shiftedAngle)*Math.sin(shepFreq(shiftedAngle)*kPI_2*i/kSampleRate);
	}
	buf[i]=.000001*amp*buf[i];
	buf[i]=Math.sign(buf[i])*Math.min(Math.abs(buf[i]),MAXAMP);
        //buf[i] = .005*amp*Math.sin(freq *kPI_2 * i / kSampleRate);
    }
    //impose ramp at beginning and end

    for (var i=0; i<lenRamp;i++)
    {
	buf[i]=buf[i]*(i/lenRamp);  //ramp up
        buf[kNumSamples-i-1]=buf[kNumSamples-i-1]*(i/lenRamp); //ramp down
    }

    var node = ctx.createBufferSource(0);
    node.buffer = buffer1;
    node.connect(ctx.destination);
    node.start();
}






      
  