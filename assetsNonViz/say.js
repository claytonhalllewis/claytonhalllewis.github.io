//say.js
var VoiceMode="selfVoicing";
say=function(msg)
{
        console.log("saying "+msg);
	if (VoiceMode=="screenReader")
	{
		var div = document.getElementById('liveRegion');
		div.innerHTML = msg;
		console.log("screenreader "+msg);
		return;
	}
	var utt = new SpeechSynthesisUtterance(msg);
	window.speechSynthesis.speak(utt);
}
var setSelfVoicing=function()
{
	VoiceMode="selfVoicing";
}
var setScreenReader=function()
{
	VoiceMode="screenReader";
}