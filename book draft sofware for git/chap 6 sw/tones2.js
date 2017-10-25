const kSampleRate = 44100; // Other sample rates might not work depending on the your browser's AudioContext

//var ctx = new AudioContext();
if (!window.AudioContext) 
{
        if (window.webkitAudioContext) 
        {
            window.AudioContext = window.webkitAudioContext;
        }

}

var ctx = new window.AudioContext();
var queueDelay=0;


function playDirect(let)
{
    const FREQS =
    {
        "C":261.63,
        "D":293.66,
        "E":329.63,
        "F":349.23,
        "G":392.00,
        "A":440.00,
        "B":493.88,
        "C five":523.25
    }
    if(!let in FREQS)
        return;
    var freq=FREQS[let];
    setTimeout(function(){playTone(freq,1,.5)},queueDelay);
    queueDelay=queueDelay+500;
}

function noteA()
{
	//alert("noteA");
	setTimeout(function(){playTone(440,1,.5)},queueDelay);
	queueDelay=queueDelay+500;
}
function noteB()
{
	//alert("noteB");
	setTimeout(function(){playTone(493.88,1,.5)},queueDelay);
	queueDelay=queueDelay+500;
}
function playTone(freq,amp,lenSec) 
{
     //alert("freq "+freq);
     //alert("amp "+amp);
     
     
    const kNumSamples = lenSec*kSampleRate;
    const lenRamp=100; //number of samples in ramp up and down 200
    const kPI_2       = Math.PI * 2;

    var buffer1 = ctx.createBuffer(1, kNumSamples, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    for (var i = 0; i < kNumSamples; i++) 
    {
        buf[i] = amp*Math.sin(freq *kPI_2 * i / kSampleRate);
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
function playSound(sound)
{
	var delayToAdd=1000*sound.length/kSampleRate;
	setTimeout(function(){nowPlaySound(sound)},queueDelay);
	queueDelay=queueDelay+delayToAdd;
}
function nowPlaySound(sound) 
{
    
    var buffer1 = ctx.createBuffer(1, sound.length, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    for (var i = 0; i < sound.length; i++) 
    {
        buf[i] = sound[i];
    }
    
    var node = ctx.createBufferSource(0);
    node.buffer = buffer1;
    node.connect(ctx.destination);
    node.start();
}

function mix(soundA,soundB)
{
	//find longer sound; add shorter to it; return longer
	var longerSound;
	if (soundA.length>soundB.length)
	{
		longerSound=soundA;
		shorterSound=soundB;
	}
	else
	{
		longerSound=soundB;
		shorterSound=soundA;
	}
	for (var i=0;i<shorterSound.length;i++)
		longerSound[i]=longerSound[i]+shorterSound[i];
	return longerSound;
}

function concatenate(soundA,soundB)
{
   for (var i=0; i < soundB.length; i++) 
   {
      soundA.push( soundB[i] );
   }
   soundB=null;
   return soundA;
}

function attenuate(sound,factor)
{
	for(var i=0;i<sound.length;i++)
		sound[i]=sound[i]*factor;
	return sound;
}
//note
function note(letter)
{
	const FREQS =
	{
		"C":261.63,
		"D":293.66,
		"E":329.63,
		"F":349.23,
		"G":392.00,
		"A":440.00,
		"B":493.88,
		"C five":523.25
	}
     
    const lenSec=.5; //length of note
    const amp=1; //amplitude of note
    const kNumSamples = lenSec*kSampleRate;
    const lenRamp=100; //number of samples in ramp up and down
    const kPI_2       = Math.PI * 2;

    var sound=[];
    for (var i = 0; i < kNumSamples; i++) 
    {
        sound[i] = amp*Math.sin(FREQS[letter] *kPI_2 * i / kSampleRate);
    }
    //impose ramp at beginning and end
    for (var i=0; i<lenRamp;i++)
    {
	sound[i]=sound[i]*(i/lenRamp);  //ramp up
        sound[kNumSamples-i-1]=sound[kNumSamples-i-1]*(i/lenRamp); //ramp down
    }
    return sound;
}


