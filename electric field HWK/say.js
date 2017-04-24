//say.js
var VoiceMode="selfVoicing";
say=function(msg)
{
        console.log("saying "+msg);
	if (VoiceMode=="screenReader")
	{
		var div = document.getElementById('liveRegion');
		div.innerHTML = msg;
		console.log("screenReader "+msg);
		return;
	}
	window.speechSynthesis.cancel();
	var u = new SpeechSynthesisUtterance();
	u.text=msg;
	u.volume=.1; //so can have system volume a little higher
	window.speechSynthesis.speak(u);
}
var screenreader=function()
{
	var text="screen reader";
	if(VoiceMode=="screenReader")
		text=text+" selected "
	return text;
}
var selfvoicing=function()
{
	var text="self voicing";
	if(VoiceMode=="selfVoicing")
		text=text+" selected "
	return text;
}
var setSelfVoicing=function()
{
	VoiceMode="selfVoicing";
}
var setScreenReader=function()
{
	VoiceMode="screenReader";
}
var toggleVoicing=function()
{
	
	if (VoiceMode=="selfVoicing")
		VoiceMode="screenReader";
	else VoiceMode="selfVoicing";
	console.log("in toggleVoicing "+VoiceMode);
}