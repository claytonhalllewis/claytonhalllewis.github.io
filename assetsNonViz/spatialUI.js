const UI=
[{name: "tab voicing", type: "list", list:[{name:"screen reader", type:"fn", fn:setScreenReader},
					{name:"self voicing", type: "fn", fn:setSelfVoicing}]},
 {name:"tab start stop",type: "list", list:[{name: "toggle", type: "fn", fn: toggleRun}]},
 {name:"tab probe", type: "list", list: [{name:"announce",type:"fn", fn:announcePosition},
					{name:"reset",type:"fn", fn: resetProbe}]},
 {name:"tab orientation coding", type: "list", list:[{name:"compass", type: "fn", fn:setCompassCoding},
						{name:"Shepard", type: "fn", fn:setShepardCoding}]},
 {name: "tab charge motion", type: "list", list:[{name: "stationary", type: "fn", fn: setStationaryMotion},
						{name:"horizontal", type: "fn", fn:setHorizontalMotion},
						{name:"vertical", type: "fn", fn:setVerticalMotion},
						{name:"circular", type:"fn", fn:setCircularMotion}]}
 
];
var loc=[0];


isInTab=function(loc)
{
	return (loc.length==1);
}
placeAt=function(loc)
{
   console.log("loc is "+loc);
    return (UI[loc[0]].list)[loc[1]];
}

handleSpace=function()
{
   if (isInTab(loc))
   {    
	console.log("loc is before push "+loc);
	loc.push(0);
        console.log("loc is after push "+loc);

	say(placeAt(loc).name);
	return;
   }
   //in list
   var node=placeAt(loc);
   if (node.type=="fn")
   {
	node.fn();
        return;
   }
   console.log("error in handling space");
}
atBottomOfList=function(loc)
{
    return (loc[1]>=UI[loc[0]].list.length-1);
}
    
handleDownArrow=function()
{
    if(isInTab(loc))
    {
	handleSpace(loc);//down in tabs is same as space
	return;
    }
    //in list
    if(atBottomOfList(loc))
    {
	say("at bottom");
        return;
    }
    loc[1]=loc[1]+1;
    say(placeAt(loc).name);
}
atTopOfList=function(loc)
{
	return (loc[1]<=0);
}
handleUpArrow=function()
{
    if(isInTab(loc))
    {
        say("at top");
        return;
    }
    //in list
    if(atTopOfList(loc))
    {
       loc=[loc[0]]; //move up to tab
       say(UI[loc[0]].name);
       return;
    }
    loc[1]=loc[1]-1;
    console.log("in handleUpArrow loc is "+loc);
    var node=UI[loc[0]].list[loc[1]];
    say(node.name);
}
function isAtRight(loc)
{
    return (loc[0]>=UI.length-1);
}
handleRightArrow=function()
{
    if(isAtRight(loc))
    {
	say("at rightmost tab");
        return;
    }
    
    if(isInTab(loc))
    {
        loc[0]=loc[0]+1;
        say(UI[loc[0]].name);
        return;
    }
    //in list
    loc=[loc[0]+1];//go to  next tab
    say(UI[loc[0]].name);
}
isAtLeft=function(loc)
{
	return (loc[0]<=0);
}
handleLeftArrow=function()
{
    if(isAtLeft(loc))
    {
	say("at leftmost tab");
        return;
    }
    
    if(isInTab(loc))
    {
        loc[0]=loc[0]-1;
        say(UI[loc[0]].name);
        return;
    }
    //in list
    loc=[loc[0]-1];//go to  next tab
    say(UI[loc[0]].name);
}
handleQuery=function()
{
	say("Use arrow keys to navigate commands. Use space to execute. Hotkeys are S to toggle start and stop, R to reset the probe position, and P to announce the probe position.");
}
