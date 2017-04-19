const UI=
[{name: "voicing tab", type: "list", list:[{name:"screen reader", type:"fn", fn:setScreenReader},
					{name:"self voicing", type: "fn", fn:setSelfVoicing}]},
 {name:"start stop tab",type: "list", list:[{name: toggleFirst, type: "nfn", fn: toggleFirstProbe},
                                    {name:toggleSecond,type: "nfn",fn:toggleSecondProbe}]},
 {name:"move tab", type: "list", list: [{name:"first probe move", type: "fn",fn:moveFirstProbe},
                    {name: "second probe move", type: "fn",fn:moveSecondProbe},
                    {name:"announce",type:"fn", fn:announcePosition},
					{name:"reset",type:"fn", fn: resetProbe}]},
 {name:"orientation coding tab", type: "list", list:[{name:"compass", type: "fn", fn:setCompassCoding},
						{name:"Shepard", type: "fn", fn:setShepardCoding}]},
 {name: "charge motion tab", type: "list", list:[{name: "stationary", type: "fn", fn: setStationaryMotion},
						{name:"horizontal", type: "fn", fn:setHorizontalMotion},
						{name:"vertical", type: "fn", fn:setVerticalMotion},
						{name:"circular", type:"fn", fn:setCircularMotion}]}
 
];
//types indicate whether item is a list, a function with a simple name (fn) or a function whose name
//must be obtained by calling a function (nfn) because the name is state dependent
var loc=[0];
var mode="menu";//menu, probe
var audible=[false,false]; //audibility of probesa
var probe; //probe being moved: 0 or 1


isInTab=function(loc)
{
	return (loc.length==1);
}
placeAt=function(loc)
{
   console.log("loc is "+loc);
    return (UI[loc[0]].list)[loc[1]];
}

nameOf=function(node)
{
    if (node.type=="nfn")
        return node.name();
    else if (node.type=="fn")
        return node.name;
    else console.log("bad type in nameOf");
}

handleSpace=function()
{
    if (mode!="menu")
        return; //ignore selection when not in menu mode
    
   if (isInTab(loc))
   {    
	console.log("loc is before push "+loc);
	loc.push(0);
        console.log("loc is after push "+loc);

	say(nameOf(placeAt(loc)));
	return;
   }
   //in list
   var node=placeAt(loc);
   if ((node.type=="fn")||(node.type=="nfn"))
   {
        //alert("select");
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
    if (mode=="menu")
        handleDownArrowInMenu();
    else if (mode="probe")
        moveProbeDown(probe);
    else console.log("invalid mode in downArrow");

}
    
handleDownArrowInMenu=function()
{
    if(isInTab(loc))
    {
	handleSpace(loc);//down in tabs is same as space
	return;
    }
    //in list
    if(atBottomOfList(loc))
    {
	    click();
        loc=[loc[0]];
        say(UI[loc[0]].name);
        return;
    }
    loc[1]=loc[1]+1;
    say(nameOf(placeAt(loc)));
}
atTopOfList=function(loc)
{
	return (loc[1]<=0);
}
handleUpArrow=function()
{
    if (mode=="menu")
        handleUpArrowInMenu();
    else if (mode="probe")
        moveProbeUp(probe);
    else console.log("invalid mode in upArrow");

}

handleUpArrowInMenu=function()
{
    if(isInTab(loc))
    {
        click();
        loc.push(UI[loc[0]].list.length-1);
        say(nameOf(placeAt(loc)));
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
    say(nameOf(node));
}
function isAtRight(loc)
{
    return (loc[0]>=UI.length-1);
}
handleRightArrow=function()
{
    if (mode=="menu")
        handleRightArrowInMenu();
    else if (mode="probe")
        moveProbeRight(probe);
    else console.log("invalid mode in rightArrow");

}
handleRightArrowInMenu=function()
{
    if(isAtRight(loc))
    {
	    click();
        loc=[0]; //wrap around
        say(UI[loc[0]].name);
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
    if (mode=="menu")
        handleLeftArrowInMenu();
    else if (mode="probe")
        moveProbeLeft(probe);
    else console.log("invalid mode in leftArrow");

}
handleLeftArrowInMenu=function()
{
    if(isAtLeft(loc))
    {
	    click();
        loc=[UI.length-1]; //wrap around
        say(UI[loc[0]].name);
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
handleEscape=function()
{
    if(mode!="menu")
    {   
        say("menu");
        mode="menu";
    }
}
var summary="Audio representation of the electric field produced by a moving charge, at the location of probes controlled by the arrow keys. "
+"First use the arrow keys to navigate the available commands, with space to select. "
+"When using the arrow keys to move a probe, press ESCAPE to return to the menu. "
+"You can use two probes to hear what is happening in different locations at the same time. ";
var coding="The amplitude of the field at the position of the probe is indicated by the loudness "
+"of the sound. The orientation is indicated by the pitch of the sound, in one of two ways. "
+"In compass coding the orientation of east has the lowest pitch, increasing to north, west, and south, "
+"to a highest pitch just south of east, and then jumping down again at east. In Shepard coding the "
+"orientation is given using Shepard tones. These seem to get higher as the orientation shifts from east "
+"to north to west, and so on, and seem to get lower as the orientation shifts the other way, "
+"with no apparent jump at east.  "
+"The sound made by the second probe is higher than the sound of the first probe, so you can "
+"tell them apart.";
var motion="The simulation can show four different patterns of motion for a charge located near "
+" the origin of the space (coordinates zero comma zero). For stationary the charge does "
+"not move. For horizontal the charge moves back and forth along the x axis. For vertical "
+"it moves up and down along the y axis. For circular motion it moves in a circle around the origin. ";
var ack0="Thanks to Bill Casson, Hunter Ewen, and especially Derek Riemer for their work on this project, "
+"and thanks also to Sina Bahram for helpful user interface advice. These people are not responsible for the "
+"remaining flaws. Thanks to the ATLAS Institute and the ";
var hwkSpoken="Hansa Wissenshaftskolleg";
var hwkWritten="Hanse-Wissenschaftskolleg";
var ack1=" for support.";
var contact=" Comments and suggestions to "
+"clayton dot lewis at colorado dot e d u will be appreciated. " ;
handleQuery=function()
{
	say("Press S to toggle between self voicing and screen reader mode. "
        +"Hotkeys are 1, and 2, to toggle the two probes on and off, "
        +"R to reset the probe positions,  P to announce the probe positions. Press question mark to repeat these instructions. "
        +"Use arrow keys to navigate the menu. Use space to select. "
        +"overview. "+ summary +" coding of field properties. "+coding+" charge motion "+motion +ack0+hwkSpoken+ack1+contact);
}
say("Simulation of an electric field with auditory representation. Press question mark for instructions.");
