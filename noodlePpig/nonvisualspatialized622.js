//start with palette

//buttons
//RL UD
//select, delete, run, undo

var headings;
var headingsCursor=0;
var palette;
var paletteCursor=0;
var workspaces=[];
var workspacesCursor=0;
var activeWorkspace=null;
var navColumn="headings";
var lastOp="nav";

var handleKey=function(keyAsString)
{
    if (keyAsString=="/") //slash for select
    {
        buttonS(); //select
    }
    else if (keyAsString=="'")
    {
        buttonR();
    }
    else if (keyAsString=="%")
    {
        buttonL();
    }
    else if (keyAsString=="&")
    {
        buttonU();
    }
    else if (keyAsString=="n")
    {
       buttonNew();
    }

    else if (keyAsString=="(")
    {
        buttonD();
    }
    else if (keyAsString=="d")
    {
       buttonDelete();
    }
    else if (keyAsString=="u")
    {
       buttonUndo();
    }
    else if (keyAsString=="r")
    {
       buttonRun();
    }
    else if (keyAsString=="e")
    {
       buttonEdit();
    }
    else if (keyAsString=="s")
    {
       buttonSave();
    }
    else if (keyAsString=="a")//save as
    {
       buttonSaveAs();
    }
    else
    {
        console.log("unrecognized key <"+keyAsString+">");
    }
}


var buttonR=function()
{
	if(lastOp=="nav")
	{
		moveToNewColumn();
	}
	describeCurrent();
	lastOp="nav";
}
var moveToNewColumn=function()
{
	//console.log("navColumn in R: "+navColumn);
	var ws=activeWorkspace;
	if(navColumn=="palette")
	{
		navColumn="headings";
	}
	else if(navColumn=="headings")
	{
		navColumn="workspace";
		ws.connectors=listConnectors(ws);
        	ws.connectorCursor=0;

	}
	else if(navColumn=="workspace")
	{
		navColumn="connectors";
	}
	else if(navColumn=="connectors")
	{
		navColumn="edge";
	}
	else if(navColumn=="edge")
	{
		followEdge();
		//set current block
		navColumn="workspace";
	}
	else utter("boop invalid nav column");

}
var buttonL=function()
{
	if(lastOp=="nav")
	{
		moveLeftToNewColumn();
	}
	activeWorkspace.connectors=listConnectors(activeWorkspace); //last change
        activeWorkspace.connectorCursor=0;

	describeCurrent();
	lastOp="nav";
}
var moveLeftToNewColumn=function()
{
	//console.log("navColumn in L: "+navColumn);
	var ws=activeWorkspace;
	if(navColumn=="palette")
	{
		utter("boop");
		return;
	}
	else if(navColumn=="headings")
	{
		navColumn="palette";
		paletteCursor=headings[headingsCursor].start;
	}
	else if(navColumn=="workspace")
	{
		navColumn="headings";
	}
	else if(navColumn=="connectors")
	{
		navColumn="workspace";
		ws.connectors=listConnectors(ws); 
        	ws.connectorCursor=0;

	}
	else if(navColumn=="edge")
	{
		navColumn="connectors";
	}
	else utter("boop invalid nav column");

}
var buttonD=function()
{
	if(navColumn=="edge")
	{
		//do nothing if in "edge" column
		utter("boop");
		return;
	}
	if(lastOp=="nav")
	{
		//move to new entity in column
		moveDownInColumn();
	}
	//describe current entity in current column
	describeCurrent();
	lastOp="nav";
}
var moveDownInColumn=function()
{
	var ws=activeWorkspace;
	if(navColumn=="palette")
	{
		if(paletteCursor<headings[headingsCursor].start+headings[headingsCursor].length-1)
		{
			paletteCursor=paletteCursor+1;
		}
	}
	else if(navColumn=="headings")
	{
		var nextHeadingIndex=headingsCursor+1;
		if (nextHeadingIndex<headings.length)
		{
			headingsCursor=nextHeadingIndex;
		}
	}
	else if(navColumn=="workspace")
	{
		console.log("workspaces");
		console.log(workspaces);
		var nextBlockSelector=ws.intermediateRep.blocks[ws.blockCursor].next;
		if (nextBlockSelector!=null)
		{
			ws.blockCursor=nextBlockSelector;
			
		}
		else if (workspacesCursor<(workspaces.length-1))
		{
			console.log("moving down in workspaces");
			workspacesCursor=workspacesCursor+1;
			activeWorkspace=workspaces[workspacesCursor];
			ws=activeWorkspace;
		}
		ws.connectors=listConnectors(ws);
        	ws.connectorCursor=0;
	}
	else if(navColumn=="connectors")
	{
    		if(ws.connectorCursor<ws.connectors.length-1)
        	{
            		ws.connectorCursor=ws.connectorCursor+1;
        	}
    	}
	else utter("boop invalid nav column");
}
var buttonU=function()
{
	if(navColumn=="edge")
	{
		//do nothing if in "edge" column
		utter("boop");
		return;
	}
	if(lastOp=="nav")
	{
		//move to new entity in column
		moveUpInColumn();
	}
	//describe current entity in current column
	describeCurrent();
	lastOp="nav";
}
var moveUpInColumn=function()
{
	var ws=activeWorkspace;
	if(navColumn=="palette")
	{
		if(paletteCursor>headings[headingsCursor].start)
		{
			paletteCursor=paletteCursor-1;
		}
	}
	else if(navColumn=="headings")
	{
		if (headingsCursor>0)
		{
			headingsCursor=headingsCursor-1;
		}
	}
	else if(navColumn=="workspace")
	{
		console.log("workspaces");
		console.log(workspaces);
		if(ws.blockCursor==0)
		{
			if(workspacesCursor>0)
			{
				workspacesCursor=workspacesCursor-1;
				activeWorkspace=workspaces[workspacesCursor];
				ws=activeWorkspace;
			}
		}
		else
		{
			ws.blockCursor=prevBlock(ws,ws.blockCursor);
		}
		ws.connectors=listConnectors(ws);
        	ws.connectorCursor=0;
	}
	else if(navColumn=="connectors")
	{
		 if(ws.connectorCursor>0)
        	{
            		ws.connectorCursor=ws.connectorCursor-1;
        	}
		//else editSpecial(); //does not move cursor
		//work this out to edit things like values of consts
    	}
	else utter("boop invalid nav column");
}


var followEdge=function()
{
	var ws=activeWorkspace;
	var oldConnector=ws.connectors[ws.connectorCursor];
        if (oldConnector.type=="in")
        {
            ws.blockCursor=ws.connectors[ws.connectorCursor].edge.from.blockSelector;
        }
        else
        {
            ws.blockCursor=ws.connectors[ws.connectorCursor].edge.to.blockSelector;
        }
        
        ws.connectors=listConnectors(ws);
        ws.connectorCursor=findConnectorCursor(oldConnector,ws);
}
var describeCurrent=function()
{
	var ws=activeWorkspace;
	if(navColumn=="palette")
	{
		describeBlock("palette",palette.intermediateRep.blocks[paletteCursor]);
	}
	else if (navColumn=="headings")
	{
		describeHeading();
	}
	else if (navColumn=="workspace")
	{
		describeBlock("workspace "+ws.name,ws.intermediateRep.blocks[ws.blockCursor]);
	}
	else if (navColumn=="connectors")
	{
		describeConnector(ws);
	}
	else if(navColumn=="edge")
	{
		if(ws.connectors[ws.connectorCursor].edge=="none")
        	{
            		utter("no edge here");
            		return;
        	}
        	ws.currentEdge=ws.connectors[ws.connectorCursor].edge;
        	describeEdge(ws);
	}
	else utter("boop invalid nav column");
}
var describeHeading=function()
{
	utter("heading "+headings[headingsCursor].name);
}
var buttonS=function()
{
	var ws=activeWorkspace;
	if(navColumn=="palette") //in palette
    	{
        	if(activeWorkspace==null)
        	{
          	  utter("no workspace to add to");
            	return;
        	}
        	utter("adding block "+palette.intermediateRep.blocks[paletteCursor].functionName+" after "+activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].functionName);
	       

    activeWorkspace.placeBlock(palette.intermediateRep.blocks[paletteCursor].functionName, activeWorkspace.blockCursor);
    //check for inputPromptNew or inputOneShot and prompt for name
            if ((palette.intermediateRep.blocks[paletteCursor].functionName=="inputPrompt")||(palette.intermediateRep.blocks[paletteCursor].functionName=="inputOneShot"))

                {
                    //handle stuff not in signature for specials like inputPromptNew
                    var thisBlockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
		   utter("type prompt name");
		setTimeout(function(){
                    var promptName=prompt("prompt name?");
		    utter("prompt added");
                    activeWorkspace.intermediateRep.blocks[thisBlockCursor].extras={};
                    activeWorkspace.intermediateRep.blocks[thisBlockCursor].extras.name=promptName;
activeWorkspace.intermediateRep.blocks[thisBlockCursor].extras.status="fresh";//for one shot
activeWorkspace.blockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
         
        	activeWorkspace.clear();
        	activeWorkspace.draw();
        	activeWorkspace.selectionType="none";},500);
        
                }
		if (palette.intermediateRep.blocks[paletteCursor].functionName=="const")
                {
                    //prompt for value
                    var thisBlockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
		   utter("type value");
		setTimeout(function(){
                    var promptName=prompt("value?");
		    utter("value added");
                    activeWorkspace.intermediateRep.blocks[thisBlockCursor].extras={};
                    activeWorkspace.intermediateRep.blocks[thisBlockCursor].extras.value=promptName;
activeWorkspace.blockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
         
        	activeWorkspace.clear();
        	activeWorkspace.draw();
        	activeWorkspace.selectionType="none";},500);
        
                }

		else
		{
    activeWorkspace.blockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
         
        	activeWorkspace.clear();
        	activeWorkspace.draw();
        	activeWorkspace.selectionType="none";
		}
    	}
    	else if(navColumn=="connectors")
    	{
       		selectConnector(ws);
    	}
    	else if(navColumn=="workspace")
    	{
      	  selectBlock(ws);
    	}
    	else if(navColumn=="edge")
    	{
      	  selectEdge(ws);
    	}
    	lastOp="notNav";
}
var buttonNew=function()
{
	palette.newButtonAction("dummy");
	
}
   
var addWorkspace=function(ws)
{
	workspacesCursor=workspaces.length;
	workspaces[workspaces.length]=ws;
	activeWorkspace=workspaces[workspacesCursor];
}
	


var utter=function(s)
{
    console.log("saying:"+s);
    speakfn(s); //put in for firefox
}
var noodlePrompt=function(label)
{
	utter(label);
	return(prompt(label));
}
var describeBlock=function(prefix,block)
{
    //console.log("describing");
    //console.log(block);
	var description=prefix+" "+block.functionName;
	utter(description);
}
	
var prevBlock=function(ws,wsCursor)
{
	if (wsCursor==0)
	{
		return 0;
	}
	var p=0;
	while (ws.intermediateRep.blocks[p].next!=wsCursor)
	{
		p=ws.intermediateRep.blocks[p].next;
	}
	return p;
}

var listConnectors=function(ws)
{
    var block=ws.intermediateRep.blocks[ws.blockCursor];
    var connectors=[];
    for (var c in block.in)
    {
        var edges=findEdges(ws,c,"in");
        for (e in edges)
        {
            connectors.push({"type":"in","name":c,"edge":edges[e]});
        }
    }
    for (var c in block.out)
    {
        var edges=findEdges(ws,c,"out");
        for (e in edges)
        {
            connectors.push({"type":"out","name":c,"edge":edges[e]});
        }
    }
    //console.log("connectors");
    //console.log(connectors);
    return connectors;
}
var findEdges=function(ws,c,type)
{
    var theBlockSelector=ws.blockCursor;
    var edges=[];
    for (e in ws.intermediateRep.edges)
    {
        if(((type=="in")&&(ws.intermediateRep.edges[e].to.name==c)&&(ws.intermediateRep.edges[e].to.blockSelector==ws.blockCursor))
            ||
            ((type=="out")&&(ws.intermediateRep.edges[e].from.name==c)&&(ws.intermediateRep.edges[e].from.blockSelector==ws.blockCursor)))
        {
            edges.push(ws.intermediateRep.edges[e]);
        }
    }
    if (edges.length==0)
    {
        return ["none"];
    }
    //console.log("edges for"+c);
    //console.log(edges);
    return edges;
}
        
var describeConnector=function(ws)
{
    if(ws.connectors.length==0)
    {
        utter("no connectors on block "+ws.intermediateRep.blocks[ws.blockCursor].functionName);
        return;
    }
    var theConnector=ws.connectors[ws.connectorCursor];
    if (theConnector.type=="in")
    {
        if(theConnector.edge=="none")
        {
            utter("input connector "+ws.connectors[ws.connectorCursor].name+" on block "+ws.intermediateRep.blocks[ws.blockCursor].functionName+" with no edge.");
        }
        else
        {
        utter("input connector "+ws.connectors[ws.connectorCursor].name+" on block "+ws.intermediateRep.blocks[ws.blockCursor].functionName+" with edge from output connector "+theConnector.edge.from.name+" on block "+ws.intermediateRep.blocks[theConnector.edge.from.blockSelector].functionName);
        }
    }
    else
    {
        if(theConnector.edge=="none")
        {
            utter("output connector "+ws.connectors[ws.connectorCursor].name+" on block "+ws.intermediateRep.blocks[ws.blockCursor].functionName+" with no edge.");
        }
        else
        {
        utter("output connector "+ws.connectors[ws.connectorCursor].name+" on block "+ws.intermediateRep.blocks[ws.blockCursor].functionName+" with edge to input connector "+theConnector.edge.to.name+" on block "+ws.intermediateRep.blocks[theConnector.edge.to.blockSelector].functionName);
        }

    }
}
var describeEdge=function(ws)
{
    utter("edge from "+ws.currentEdge.from.name+" on "+ws.intermediateRep.blocks[ws.currentEdge.from.blockSelector].functionName+" to "+ws.currentEdge.to.name+" on "+ws.intermediateRep.blocks[ws.currentEdge.to.blockSelector].functionName);
}
var findConnectorCursor=function(oldConnector,ws)
{
    for (c in ws.connectors)
    {
        if(oldConnector.edge==ws.connectors[c].edge)
        {
            return c;
        }
    }
    alert("error in findConnector");
    return null;
}
    
var selectConnector=function(ws)
{
    
    var thisConnector=ws.connectors[ws.connectorCursor];
    
    var type;
    if(thisConnector.type=="out")
    {
        type="from";
    }
    else
    {
        type="to";
    }
    var name=thisConnector.name;
    //console.log(type+" "+name);
    ws.selectedConnectors[type].name=name;
    ws.selectedConnectors[type].blockSelector=ws.blockCursor;
    ws.selectedConnectors[type].set=true;
    if(ws.selectedConnectors.from.set && ws.selectedConnectors.to.set)
    {
        utter("adding edge from connector "+ws.selectedConnectors.from.name+" on block "+ws.intermediateRep.blocks[ws.selectedConnectors.from.blockSelector].functionName+" to connector "+ws.selectedConnectors.to.name+" on block "+ws.intermediateRep.blocks[ws.selectedConnectors.to.blockSelector].functionName);
    }
    else utter("connector selected");

    ws.addEdgeFromSelections(); //will add if there is a matching connector
    ws.selectionType="none";
}
var selectBlock=function(workspace)
{
    //console.log("selecting in workspace");
    var name=workspace.intermediateRep.blocks[workspace.blockCursor].functionName;
    //console.log(name);
    var blockSelector=workspace.blockCursor;
    //check if block is externalIn
    if (name=="externalIn")
    {
        //if there is a to-connector selected
        //create an out entry in intermediateRep
        //add an edge
        //console.log("processing externalIn");
        //console.log(workspace.selectedConnectors.to);
        if( workspace.selectedConnectors.to.set)
        {
            //add out entry to externalIn block
	    var ws=workspace;
            var connectorName=window.prompt("enter connector name: ");
            utter("adding edge from connector "+connectorName+" on block "+ws.intermediateRep.blocks[blockSelector].functionName+" to connector "+ws.selectedConnectors.to.name+" on block "+ws.intermediateRep.blocks[ws.selectedConnectors.to.blockSelector]);
            workspace.intermediateRep.blocks[blockSelector].out[connectorName]={};
            workspace.placeEdge({"from":{"name":connectorName,"blockSelector":blockSelector},
                            "to":{"name":workspace.selectedConnectors.to.name,
                            "blockSelector":workspace.selectedConnectors.to.blockSelector}});
            workspace.selectedConnectors.to.set=false;
            workspace.selectionType="none";
            return;
        }
    }
    if (name=="externalOut")
    {
        //if there is a from-connector selected
        //create an out entry in intermediateRep
        //add an edge
        //console.log("processing externalOut");
        //console.log(workspace.selectedConnectors.from);
        if( workspace.selectedConnectors.from.set)
        {
            //add in entry to externalOut block
            var connectorName=window.prompt("enter connector name: ");
	    var ws=workspace;
            utter("adding edge from connector "+ws.selectedConnectors.from.name+" on block "+ws.intermediateRep.blocks[ws.selectedConnectors.from.blockSelector]+" to connector "+connectorName+" on block "+ws.intermediateRep.blocks[blockSelector].functionName);
            workspace.intermediateRep.blocks[blockSelector].in[connectorName]={};
            workspace.placeEdge({"to":{"name":connectorName,"blockSelector":blockSelector},
                            "from":{"name":workspace.selectedConnectors.from.name,
                            "blockSelector":workspace.selectedConnectors.from.blockSelector}});
            workspace.selectedConnectors.from.set=false;
            workspace.selectionType="none";
            return;
        }
                
    }
    workspace.selectedBlock.block=workspace.intermediateRep.blocks[workspace.blockCursor];
    //console.log("selectedBlock.block");
    //console.log(workspace.selectedBlock.block);
    workspace.selectedBlock.blockSelector=workspace.blockCursor;
    utter("selecting block");
    workspace.selectionType="block";
}
var selectEdge=function(ws)
{
    utter("selecting edge");
    ws.selectionType="edge";
}
var buttonDelete=function()
{
    var ws=activeWorkspace;
    if (ws.selectionType=="block")
    {
        var blockFunctionName=ws.intermediateRep.blocks[ws.blockCursor].functionName;
        if((blockFunctionName=="externalIn")||(blockFunctionName=="externalOut"))
        {
            utter("can't delete external input and output blocks");
            return;
        }
        utter("deleting");
        var newBlockCursor=ws.intermediateRep.blocks[ws.blockCursor].next;
        describeBlock(ws.name,ws.intermediateRep.blocks[ws.blockCursor]);
        ws.removeBlock(ws.blockCursor);
        ws.blockCursor=newBlockCursor;
        ws.clear(); //needed for non viz? may do some cleanup?
        ws.draw();  //ditto?
    }
    else if (ws.selectionType=="edge")
    {
        utter("deleting");
        describeEdge(ws);
        ws.removeEdge(ws.currentEdge);
        ws.clear();
        ws.draw();
    }
    else
    {
        utter("no deletion, nothing selected");
    }
    ws.selectionType="none";
}
var buttonUndo=function()
{
    var ws=activeWorkspace;
    utter("undoing last action");
    activeWorkspace.undo();
    activeWorkspace.clear(); //see above
    activeWorkspace.draw();
}
var buttonRun=function()
{
    if (!running)
    	utter("running");
    else
	utter("stopping");
    activeWorkspace.runButtonAction("dummy");
}
var buttonEdit=function()
{
	console.log("edit");
	activeWorkspace.editButtonAction("dummy");
}

var buttonSave=function()
{
	console.log("edit");
	activeWorkspace.save();
}
var buttonSaveAs=function()
{
	console.log("edit");
	activeWorkspace.saveAs();
}