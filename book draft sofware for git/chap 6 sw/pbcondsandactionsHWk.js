


var cursor;
var insertionPoint;
var insertionType;
var deletionType;
var deletedItem;
var deletionPoint;
var structure=[];


Execute=function()
{
	execute(structure[1]);
}

Editing=function()
{
	return (cursor[0]==1); //in the workspace
}
Inserting=function()
{
	return (cursor[0]==0); //in the toolbox
}
AtTop=function()
{
	return ((cursor.length==1)&&(cursor[0]==1));
}
OnStatement=function()
{
	var loc=where(cursor);
	if(!("type" in loc))
		return false;
	return (loc.type=="statement");
}
OnBlock=function()
{
	return isBlock(where(cursor));
}
OnHeading=function()
{
	return isHeading(where(cursor));
}

InArgs=function() //was InChoices
{
	var loc=where(cursor)
	return("argname" in loc);
}
EnterArgs=function()  //was EnterChoices
{
	if(where(cursor).args.length==0)
	{
		console.log("no args");
		return;
	}
	cursor[cursor.length]=0;
	describe();
}
NextArg=function()  //was NextChoice
{
	console.log("orig cursor, where ",cursor,where(cursor));
	var parent;
	if(InDropdown())
	{
		
		cursor=butlast(cursor); //retract cursor
	}
	parent=where(butlast(cursor));
	if ("argname" in parent)
		parent=parent.value;
	console.log("parent: ",parent);
	var max=parent.args.length-1;
	var newIndex=last(cursor)+1;
	if (newIndex>max) //wraparound
	{
		click();
		newIndex=0;
	}
	cursor[cursor.length-1]=newIndex;
	describe();
}
PrevArg=function()  //was NextChoice
{
	var parent;
	if(InDropdown())
	{
		
		cursor=butlast(cursor); //retract cursor
	}
	parent=where(butlast(cursor));
	if ("argname" in parent)
		parent=parent.value;
	var newIndex=last(cursor)-1;
	if (newIndex<0) //wraparound
	{
		click();
		newIndex=parent.args.length-1;
	}
	cursor[cursor.length-1]=newIndex;
	describe();
}

InDropdown=function()
{
	//var parent=where(butlast(cursor));
	//return isDropdown(parent);
	return ("choice" in where(cursor));
}
SelectFromDropdown=function()
{
	var parent=where(butlast(cursor));
	var whichChoice=last(cursor);
	parent.value=parent.choices[whichChoice].choice;
	//RetractCursor(); //don't change context, so can try diff choices
	enqueueSay(parent.value+" selected");
}

NotNest=function() //true when on an arg that is not a nest
{
	if(!InArgs())
		return false;
	return (where(cursor).type!="statements");
}

//this section will be more complex when add if then else!
HasNest=function()
{
	return HasNestAux(where(cursor));
}
HasNestAux=function(loc) //on a statement... have to find an arg with the nest
{
	//console.log("loc in HasNestAux",loc);
	var i;
	for(i=0;i<loc.args.length;i++)
	{
		if (loc.args[i].type=="statements")
			return true;
	}
	return false;
}
MoveCursorIntoNest=function() //on a statement... have to find the arg with the nest
{
	var loc=where(cursor)
	var i;
	for(i=0;i<loc.args.length;i++)
	{
		if (loc.args[i].type=="statements")
		{
			cursor[cursor.length]=i; //move into arg
			cursor[cursor.length]=0; //at the first statement
			enqueueSay("start nest. ");
			describe();
			return;
		}	
	}

	console.log("error moving down into nest")
		
}
InNest=function()
{
	var parent=where(butlast(cursor));
	if(!("argname" in parent))
		return false;
	return (parent.type=="statements");
}
AtBottomOfNest=function()
{
	var parent=where(butlast(cursor));
	return (last(cursor)==(parent.value.length-1));
}
MoveCursorDownOutOfNest=function()
{
	cursor=butlast(butlast(cursor));//move out of list and out of arg
	//console.log("$$$$$");
	enqueueSay("end nest.");
	MoveCursorDown(); //so as to handle wraparound
}
PrevStatementHasNest=function() 
{
	var current=last(cursor);
	var prev;
	if (cursor.length==2)//top level
	{
		if(current==0)
			prev=structure[1].length-1; //wraparound
		else prev=current-1;
		return HasNestAux(where(butlast(cursor))[prev]);
	}
	prev=current-1;
	if (prev<0)
		return false; //no wraparound other than at top level
	//console.log("in PrevStatementHasNest: ",where(butlast(cursor)));
	return HasNestAux(where(butlast(cursor)).value[prev]);
}
MoveCursorUpIntoNest=function() //assumes there is a nest there
{
	//console.log("in MoveCursorUpIntoNest");
	//console.log("cursor: ",cursor, where(cursor));
	var parent=where(butlast(cursor)); 
	if(cursor.length!=2)
		parent=parent.value;
	//console.log("parent: ",parent);
	var prev=last(cursor)-1;
	if (prev<0)
	{
		click();
		prev=parent.length-1; //wraparound... will only happen at top level
	}
	cursor[cursor.length-1]=prev; 
	var stmnt=where(cursor);
	//console.log("stmnt: ",stmnt);
	var nest=findNest(stmnt);
	cursor[cursor.length]=nest;
	cursor[cursor.length]=stmnt.args[nest].value.length-1;
	enqueueSay("nest bottom.");
	describe();
}
function findNest(stmnt) //assumes statement has nest; finds last
{
	var i;
	for(i=stmnt.args.length-1;i>-1;i--)
	{
		if (stmnt.args[i].type=="statements")
			return i;
	}
	console.log("error in findNest");
}
AtTopOfNest=function() //assumes in nest
{
	return (last(cursor)==0);
}
MoveCursorUpOutOfNest=function() //assumes in nest
{
	cursor=cursor.slice(0,cursor.length-2); //back to the parent statement
	describe();
}

MoveCursorDown=function() //can be in statement list or dropdown
{
	var parent=where(butlast(cursor));
	var max;
	if (isDropdown(parent))
	{
		max=parent.choices.length-1;
	}
	else if (isStatements(parent))
	{
		max=parent.value.length-1;
	}
	else if (isList(parent))
	{
		max=parent.length-1;
	}
	else console.log("error in MoveCursorDown");
	var newIndex=last(cursor)+1;
	if (newIndex>max)//w
	{
		click();
		newIndex=0; //wraparound
	}
	cursor[cursor.length-1]=newIndex;
	describe();
}
MoveCursorUp=function()
{
	var parent=where(butlast(cursor));
	var end;
	if (isDropdown(parent))
	{
		end=parent.choices.length-1;
	}
	else if (isStatements(parent))
	{
		end=parent.value.length-1;
	}
	else if (isList(parent))
	{
		end=parent.length-1;
	}
	else console.log("error in MoveCursorUp");
	var newIndex=last(cursor)-1;
	if (newIndex<0)//w
	{
		click();
		newIndex=end; //wraparound
	}
	cursor[cursor.length-1]=newIndex;
	describe();
}
ExtendCursor=function()
{
	cursor[cursor.length]=0;
	describe();
}
RetractCursor=function()
{
	cursor=butlast(cursor);
	describe();
}

NextHeadingInPalette=function()
{
	var nextHeading=cursor[1];
	var max=structure[0].length-1;
	var times=max+1;
	while(times>0)
	{
		var nextHeading=nextHeading+1;
		if (nextHeading>max)
		{
			click();
			nextHeading=0; //cycle
		}
		if(headingIsEligible(nextHeading,insertionType))
		{
			cursor=[0,nextHeading];
			describe();
			return;
		}
		times--;
	}
	console.log("error in palette scan");
}
PrevHeadingInPalette=function()
{
	var nextHeading=cursor[1];
	var end=structure[0].length-1;
	var times=end+1;
	while(times>0)
	{
		var nextHeading=nextHeading-1;
		if (nextHeading<0)
		{
			click();
			nextHeading=end; //cycle
		}
		if(headingIsEligible(nextHeading,insertionType))
		{
			cursor=[0,nextHeading];
			describe();
			return;
		}
		times--;
	}
	console.log("error in palette scan");
}
NextBlockInHeading=function() 
{
	var max=structure[0][cursor[1]].blocks.length-1;
	var nextBlock=cursor[2];
	var times=max+1;
	while(times>0)
	{
		var nextBlock=nextBlock+1;
		if (nextBlock>max)
		{
			click();
			nextBlock=0; //wraparound
			//console.log("wraparound");
		}
		if (blockIsEligible([0,cursor[1],nextBlock],insertionType))
		{
			cursor=[0,cursor[1],nextBlock];
			describe();
			return;
		}
		times--;
	}
	console.log("error in scan ahead for eligible blocks")
}
PrevBlockInHeading=function()
{
	var end=structure[0][cursor[1]].blocks.length-1;
	var nextBlock=cursor[2];
	var times=end+1;
	while(times>0)
	{
		var nextBlock=nextBlock-1;
		if (nextBlock<0)
		{
			click();
			nextBlock=end; //wraparound
		}
		if (blockIsEligible([0,cursor[1],nextBlock],insertionType))
		{
			cursor=[0,cursor[1],nextBlock];
			describe();
			return;
		}
		times--;
	} 
	console.log("error in scan back for eligible blocks")
}
StartScanInHeading=function()
{
	var noOfBlocks=structure[0][cursor[1]].blocks.length;
	var i;
	//console.log(noOfBlocks);
	for(i=0;i<noOfBlocks;i++)
		if (blockIsEligible([0,cursor[1],i],insertionType))
		{
			cursor=[0,cursor[1],i];
			describe();
			return;
		}
	console.log("error in StartScanInHeading");
}
OnBlockInPalette=function()
{
	return((cursor[0]==0)&&(cursor.length==3));
}

blockIsEligible=function(curs,type)
{	
	return (where(curs).type==type);
}
headingIsEligible=function(h,type)
{
	for(var i=0;i<structure[0][h].blocks.length;i++)
		if (blockIsEligible([0,h,i],type))
			return true;
	return false;
}
StartPaletteScan=function()
{
	var noOfHeadings=structure[0].length;
	var i;
	for(i=0;i<noOfHeadings;i++)
		if(headingIsEligible(i,insertionType))
		{
			cursor=[0,i];
			enqueueSay("select a "+insertionType+".");
			describe();
			return;
		}
	console.log("error in palette scan");
}

EndInserting=function()
{
	cursor=[1];
	describe();
}
Undo=function()
{
	if(deletionType=="none")
	{
		enqueueSay("nothing to undo");
		return;
	}
	insertionType=deletionType;
	enqueueSay("undoing");
	insertionPoint=deletionPoint;
	InsertAux(deletedItem);
}
function Insert()
{	
	enqueueSay("inserting");
	deletionType="none"; //can't undo deletion after insertion
	InsertAux(where(cursor));
}

function InsertAux(thing)
{
	if(insertionType=="statement")
	{
		//console.log("inserting statement; insertionPoint:");
		//console.log(insertionPoint)
		var statementList;
		if(insertionPoint.length==1)//top level; insert at top
		{
			structure[1].splice(0,0,cloneObject(thing));
			insertionPoint=[1,0];
			return;
		}
		if(insertionPoint.length==2)//top level, in list
		{
			statementList=structure[1];
		}
		else //in nest
		{
			statementList=where(butlast(insertionPoint)).value;
		}
		//console.log("statementList: ",statementList);
		var index=last(insertionPoint);
		statementList.splice(index+1,0,cloneObject(thing));
		insertionPoint[insertionPoint.length-1]++;
	}
	else //inserting a block
	{
		//console.log("in insert; loc of cursor, insertionPoint before");
		//console.log(where(cursor));
		//console.log(insertionPoint);
		var target=where(insertionPoint); //an arg
		//console.log("target");
		//console.log(target);
		target.value=cloneObject(thing);
		//console.log(where(insertionPoint));
	}
}

function EnterProgram()
{
	if(structure[1].length==0)
	{
		enqueueSay("workspace is empty. ")
		insertionType="statement";
		StartPaletteScan();
		return;
	}
	cursor=[1,0];
	describe();
}
function DoEdit()
{
	//console.log("in DoEdit; cursor:");
	//console.log(cursor);
	//console.log(where(cursor));
	if(cursor.length==1)//top level
	{
		insertionType="statement"
		insertionPoint=cursor;
		StartPaletteScan();
		//cursor[cursor.length]=0; //move into statement list
		//describe();
		//return;
	}
	if(InDropdown())
	{
		say("error: in DoEdit for dropdown");
		var parent=where(butlast(cursor));
		parent.value=parent.choices[last(cursor)];
		describe();
		return;
	}
	if (OnStatement())
	{
		insertionType="statement";
		insertionPoint=cursor;
		StartPaletteScan();
		return;
	}
	if (InArgs())
	{
		var arg=where(cursor);
		//console.log("arg: ",arg);
		if(arg.type=="statements")
		{
			insertionType="statement";
			insertionPoint=cursor;
			insertionPoint[insertionPoint.length]=0;
			StartPaletteScan();
			return;
		}
		if((arg.type=="soundblock")||(arg.type=="numberblock"))
		{
			if(arg.value=="empty") //no block there; insert one
			{
				insertionType=arg.type;
				insertionPoint=cursor;
				StartPaletteScan();
				return;
			}
			cursor[cursor.length]=0; //enter args 
			describe();
			return;
		}
		if (arg.type=="numberfield")
		{
			enqueueSay("type a number and press enter");
			say();
			arg.value=prompt("type a number:");
			enqueueSay(arg.value+" entered");
			return;
		}
		if (arg.type=="dropdown")
		{
			cursor[cursor.length]=0;
			describe();
			return;
		}
		console.log("unsupported edit");
		return;
	}
	console.log("error in DoEdit");
}
DeleteStatement=function()
{
	deletionPoint=cursor;
	deletedItem=where(cursor);
	deletionType="statement";
	var statementList=where(butlast(cursor));
	if(!isList(statementList))
		statementList=statementList.value;
	var index=last(cursor);
	statementList.splice(index,1);
	if(last(cursor)==0)
	{
		cursor=butlast(cursor);
	}
	else
	{
		cursor[cursor.length-1]=last(cursor)-1;
	}
	enqueueSay("statement deleted. Type minus to undo");
}
DeleteArg=function()
{
	deletionPoint=cursor;
	deletedItem=where(cursor).value;
	deletionType="block";
	var theArg=where(cursor);
	if((theArg.type=="numberblock")||(theArg.type=="soundblock"))
	{
		theArg.value="empty";
		enqueueSay("block deleted. Type minus to undo");
	}
	else if(theArg.type=="dropdown")
		enqueueSay("can't delete a dropdown");
	else if(theArg.type=="numberfield")
		enqueueSay("can't delete a field");
}
	

