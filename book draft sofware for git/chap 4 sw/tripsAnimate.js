//narrate rules
function narrate()
{
	var out=lookupPlain("narr0","say",mainDb);
	if (out=="NULL")
		return;
	say(out);
	say(lookupPlain("narr1","say",mainDb));
	say(lookupPlain("narr2","say",mainDb));
	say(lookupPlain("narr3","say",mainDb));

}
function say(out)
{
	if (out!="NULL")
	{
		console.log(out);
		var u = new SpeechSynthesisUtterance();
		u.text=out;
		//u.volume=.1; //so can have system volume a little higher
		window.speechSynthesis.speak(u);
	}
}


//visual presentation

function drawDb(db)
{
	eraseParticles();
	//console.log("drawing DB");
	for(var i=0;i<db.length;i++)
		drawTriple(db[i]);
}
function drawTriple(trip)
{
	if (trip[1]=="at")
	{
		var img=image(trip[0]);
		var loc=location(trip[2]);
		//console.log("drawing ",trip[0]);
		draw(img,loc);
	}
	else if(((trip[1]=="hasElectron")||(trip[1]=="hasProton"))&&(trip[2]=="true"))
	{
		//console.log("drawing particle triple ",trip);
		drawParticle(trip);
	}
	else if(trip[1]=="wallImage")
	{
		var img=image(trip[0]);
		img.src=trip[2];
	}
	
}
function image(id) //replace by something in DB
{
	var img=document.getElementById(id);
	//console.log("in image width reads ",img.width);
	//console.log("in image direct",document.getElementById(id).width);
	return img;
}


function location(atom) 
{
	//console.log("atom is ",atom);
	var ans;
	//var locations=
	//{
	//	"leftside":[250,300],
	//	"center": [600,300],
	//	"right":[850,300]
	//};//hack for now to handle places contained in things
	if(isPlace(atom))
	{
		ans=lookupPlain(atom,"location",mainDb);
		//ans=locations[atom];
		//console.log("location of ",atom, " is ",ans);
		return ans;
	}
	if(isPart(atom))
	{
		var offset=lookupPlain(atom,"hasOffset",mainDb);
		var container=findContainer(atom);
		var containerLoc=location(container);
		ans=addOffset(containerLoc,offset);
		//console.log("location of ",atom," is ",ans);
		return ans;
	}
	//thing
	ans=location(lookupPlain(atom,"at",mainDb));
	//console.log("location of ",atom," is ",ans);
	return ans;
}
function isThing(atom)
{
	return (lookupPlain(atom,"at",mainDb)!="NULL");
}
function isPlace(atom)
{
	if (isPart(atom)||isThing(atom))
		return false;
	return true;
}

function isPart(atom)
{
	if(findContainer(atom)!="NULL")
		return true;
	return false;
}
function draw(img,loc)
{
	img.style.left=loc[0]-img.width/2;
	img.style.top=loc[1]-img.height/2;
}

function drawParticle(triple)
{
	//console.log("drawing particle");
	var loc=findParticleLoc(triple);
	//console.log("final particle position ",loc);
	var particle=lookupPlain(triple[1],"hasImage",mainDb);
	addParticle(particle,loc);
	//console.log("end drawing particle");
}
function findParticleLoc(triple)
{
	//console.log("particle triple is ",triple);
	var place=triple[0];
	//console.log("particle place is ",place);
	var offset=lookupPlain(place,"hasOffset",mainDb);
	//console.log("place offset is",offset);
	var container=findContainer(place);
	//console.log("container is ",container)
	var containerLoc=location(container);
	//console.log("container loc is ",containerLoc);
	var particleOffset=lookupPlain(triple[1],"hasOffset",mainDb);
	//console.log("particle offset is ",particleOffset);
	return addOffset(addOffset(containerLoc,offset),particleOffset);
}

function findContainer(place)
{
	//console.log("place is ",place);
	var triple;
	for(var i=0;i<mainDb.length;i++)
	{
		triple=mainDb[i];
		if ((triple[1]=="contains")&&(triple[2]==place))
			return triple[0];
	}
	//console.log("not contained");
	return "NULL";
}
function addOffset(loc,offset)
{
	//console.log("in addOffset");
	//console.log("loc ",loc," offset ",offset);
	return ([loc[0]+offset[0],loc[1]+offset[1]]);
}

function addParticle(src,loc)
{
	var d=document.getElementById("particles");
	var img = document.createElement('img');
	img.style.position="absolute";
	img.style.opacity=.5;
	img.src = src;
	img.style.left=loc[0];
	img.style.top=loc[1];
	d.appendChild(img);
}
function eraseParticles()
{
	var d=document.getElementById("particles");
	while (d.firstChild) 
	{
    	d.removeChild(d.firstChild);
	}
	
}
