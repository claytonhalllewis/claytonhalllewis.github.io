var thisKey;
var utterance="";
var clickElement;

function run()
{
	clickElement=document.getElementById("click");

	//test();

	runIt();

}
function runIt()
{
	//running version:
	structure=[toolbox,[]];
	deletionType="none;"
	insertionPoint=[1];
	insertionType="statement";
	StartPaletteScan();
	say();
}


document.onkeydown = function(e) {
	keycode = e.keyCode;
	e.preventDefault();
	handleKey(keycode);
}

var handleKey=function(keycode)
{
	thisKey=keycode;
	//console.log("key is: ",keycode);
	applyRules(rules);
}



function click() 
{ 
    clickElement.play(); 
} 
var applyRules=function(rules)
{
	for (var i=0;i<rules.length;i++)
	{
		if (applyRule(rules[i]))
		{
			say();
			return;
		}
	}
	console.log("no applicable rule");
}

function describe()
{
	var w=where(cursor);
	if(cursor.length==1)//top level
	{
		enqueueSay("start of workspace");
		return;
	}
	if (InDropdown())
	{
		enqueueSay(w.choice+" choice");
	}
	else if ("blockname" in w)
		enqueueSay(w.blockname+" "+w.type);
	else if ("argname" in w)
	{
		if (w.type=="statements")
		{
			//don't describe value
		}
		else if((w.type=="soundblock")||(w.type=="numberblock"))
		{
			if(w.value!="empty")
				enqueueSay(w.value.blockname);
			else enqueueSay("empty");
		}
		else enqueueSay(w.value);

		enqueueSay(w.argname+" "+w.type);
	}
	else if("heading" in w)
		enqueueSay(w.heading+" heading");
	else enqueueSay("error in describe");
}
function enqueueSay(text)
{
	//console.log(text);
	utterance=utterance+" "+text;
}
function say()
{
	console.log("saying: "+utterance);
	window.speechSynthesis.cancel();
	var u = new SpeechSynthesisUtterance();
	u.text=utterance;
	window.speechSynthesis.speak(u);
	utterance="";
}

report=function(r)
{
	console.log("report: action, cursor and location");
	console.log(r.name);
	console.log(cursor);
	console.log(where(cursor));
}
var applyRule=function(rule)
{
	if(testCond(rule))
	{
		performAction(rule);
		report(rule);
		return true;
	}
	return false;
}
var testCond=function(rule)
{
	for(var i=0;i<rule.cond.length;i++)
		if (!rule.cond[i]())
			return false;
	//console.log("conditions satisfied");
	return true;
}
var performAction=function(rule)
{
	for(var i=0;i<rule.action.length;i++)
		rule.action[i]();
}

var Dot=function() 
{
	return (thisKey==190);  //period
}
var Select=function()
{
	return (thisKey==32); //space
}
var Right=function()
{
	return (thisKey==39);
}
var Left=function()
{
	return (thisKey==37);
}
var Up=function()
{
	return (thisKey==38);
}
var Down=function()
{
	return (thisKey==40);
}
var Enter=function()
{
	return (thisKey==13);  //return
}
var Delete=function()
{
	return (thisKey==8);  //backspace
}
var Minus=function()
{
	return (thisKey==189); //used for undo
}