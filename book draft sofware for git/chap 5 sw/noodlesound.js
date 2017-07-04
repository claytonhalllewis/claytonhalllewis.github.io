const kSampleRate = 44100; // Other sample rates might not work depending on the your browser's AudioContext
const kNumSamples = 16834;
//const kFreq  = 440;
const kPI_2       = Math.PI * 2;

var FREQS={"C":261.63,"D":	293.66, "E":329.63,	"F": 349.23,"G":392.00,"A":415.30,"B":493.88,"C5": 523.25};

var kFreq=FREQS["C"];

function play_buffersource() {
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            //alert("Your browser sucks because it does NOT support any AudioContext!");
            return;
        }
        window.AudioContext = window.webkitAudioContext;
    }

    var ctx = new AudioContext();

    var buffer1 = ctx.createBuffer(1, kNumSamples, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    for (i = 0; i < kNumSamples; ++i) {
        buf[i] = Math.sin(FREQS["C"] * 1.75*kPI_2 * i / kSampleRate);
    }
    var buffer2 = ctx.createBuffer(1, kNumSamples, kSampleRate);
    buf    = buffer2 .getChannelData(0);
    for (i = 0; i < kNumSamples; ++i) {
        buf[i] = Math.sin(FREQS["D"] * 1.75*kPI_2 * i / kSampleRate);
    }

    var node = ctx.createBufferSource(0);
    node.buffer = buffer1;
    node.connect(ctx.destination);
    node.noteOn(ctx.currentTime + 0.5);

    node = ctx.createBufferSource(0);
    node.buffer = buffer2;
    node.connect(ctx.destination);
    node.noteOn(ctx.currentTime + 2.0);
}
var queueDelay=0;
function playSound(arg)
{
    //console.log("length: ",arg.buffer.length);
    var delayToAdd=1000*arg.buffer.length/kSampleRate;
    setTimeout(function(){nowPlaySound(arg.buffer)},queueDelay);
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
var ctx = new AudioContext();
function playSoundOld(arg) 
{
    

    var buffer1 = ctx.createBuffer(1, arg.buffer.length, kSampleRate);
    var buf    = buffer1.getChannelData(0);
    for (i = 0; i < arg.buffer.length; ++i) {
        buf[i] = arg.buffer[i];
    }
    var node = ctx.createBufferSource(0);
    node.buffer = buffer1;
    node.connect(ctx.destination);
    //node.noteOn(ctx.currentTime + 0.5);
    node.start();
}
var makeTone=function(name)
{
    var buffer=[];
    if (name=="0")
    {
        for (i = 0; i < kNumSamples; ++i) 
        {
            buffer[i] = 0;
        }
        return buffer;
    }

    for (i = 0; i < kNumSamples; ++i) 
    {
        buffer[i] = Math.sin(FREQS[name] *kPI_2 * i / kSampleRate);
    }
    //alert(name+buffer.length);
    buffer=trimClick(buffer);
    return buffer;
}
var trimClick=function(buffer)
{
	for(var i=0;i<500;i++)
		buffer[buffer.length-1-i]=buffer[buffer.length-1-i]*(i/500.0);
	for(var i=0;i<500;i++)
		buffer[i]=buffer[i]*(i/500.0);
	return buffer;
}

var noteC=function()
{
    return makeTone("C");
}
var noteD=function()
{
    return makeTone("D");
}
var noteE=function()
{
    return makeTone("E");
}
var noteF=function()
{
    return makeTone("F");
}
var noteG=function()
{
    return makeTone("G");
}
var noteA=function()
{
    return makeTone("A");
}
var noteB=function()
{
    return makeTone("B");
}
var noteC5=function()
{
    return makeTone("C5");
}
var silence=function()
{
    return makeTone("0");
}
var tone=function(arg)
{
    var buffer=[];
    var numSamples=kSampleRate*arg.time;
    for (i = 0; i < kNumSamples; ++i) 
    {
        buffer[i] = Math.sin(arg.freq *kPI_2 * i / kSampleRate);
    }
    //alert(name+buffer.length);
    buffer=trimClick(buffer);
    return buffer;
}

var concatSounds=function(arg)
{
    //alert("in concat");
    //alert(arg.buffer0.length);
    //alert(arg.buffer1.length);
    var buffer=[];
    buffer=buffer.concat(arg.buffer0,arg.buffer1);
    //alert(buffer.length);
    return buffer;
}
var getSample=function(sound,i)
{
    if (i>=sound.length)
        return 0;
    return sound[i];
}
var mixSounds=function(arg)
{
    var buffer=[];
    var len=Math.max(arg.buffer0.length,arg.buffer1.length);
    for (var i=0;i<len;i++)
    {
        buffer[i]=(getSample(arg.buffer0,i)+getSample(arg.buffer1,i))/2;
    }
    return buffer;
}
var attenuate=function(arg)
{
    var newBuffer=[];
    for(var i in arg.buffer)
    {
        newBuffer[i]=arg.buffer[i]*.25;
    }
    return newBuffer;
}
var amplify=function(arg)
{
    var newBuffer=[];
    for(var i in arg.buffer)
    {
        newBuffer[i]=arg.buffer[i]*arg.factor;
    }
    return newBuffer;
}
function echo(sound)
{
    var delayedSound=concatSounds(makeTone("0"),sound);
    var theEcho=mixSounds(sound, attenuate(delayedSound));
    return theEcho;
}
/* dictionary entries
"tone":{"type":"prim", "function":tone,"sig":{"out":["buffer"],"in":["freq","time"]}}, 
"amplify":{"type":"prim", "function":amplify,"sig":{"out":["bufferOut"],"in":["buffer","factor"]}}, 
"attenuate":{"type":"prim", "function":attenuate,"sig":{"out":["bufferOut"],"in":["buffer"]}}, 
"mixSounds":{"type":"prim", "function":mixSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, 
"concatSounds":{"type:"prim", "function":concatSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, 
"noteC":{"type":"prim", "function":noteC,"sig":{"out":["buffer"],"in":[]}},//no args
"noteD":{"type":"prim", "function":noteD,"sig":{"out":["buffer"],"in":[]}},//no args
"noteE":{"type":"prim", "function":noteE,"sig":{"out":["buffer"],"in":[]}},//no args
"noteF":{"type":"prim", "function":noteF,"sig":{"out":["buffer"],"in":[]}},//no args
"noteG":{"type":"prim", "function":noteG,"sig":{"out":["buffer"],"in":[]}},//no args
"noteA":{"type":"prim", "function":noteA,"sig":{"out":["buffer"],"in":[]}},//no args
"noteB":{"type":"prim", "function":noteB,"sig":{"out":["buffer"],"in":[]}},//no args
"noteC5":{"type":"prim", "function":noteC5,"sig":{"out":["buffer"],"in":[]}},//no args
"silence":{"type":"prim", "function":silence,"sig":{"out":["buffer"],"in":[]}},//no args
"playSound":{"type":"prim", "function":playSound, "sig":{"out":[],"in":["buffer"]}},//no args
*/

