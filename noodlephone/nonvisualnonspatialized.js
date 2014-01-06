//functions for responding to keypresses
//op is back and forward in palette
//vb is back and forward in blocks
//xc is back and forward in connectors
//e moves onto edge or from edge onto connector 
//w moves back
//start with palette
//1.4.14: adding a layer of headings to organize palette:
//hg back and forward among headings
//palette is the piece associated with current heading
var headings;
var headingsCursor=0;
var palette;
var activeWorkspace=null;

var handleKey=function(keyAsString)
{
    if (keyAsString=="h")
    {
        processH(palette);
    }
    else if (keyAsString=="g")
    {
        processG(palette);
    }
    else if (keyAsString=="p")
    {
        processP(palette);
    }
    else if (keyAsString=="o")
    {
        processO(palette);
    }

    else if (keyAsString=="b")
    {
        processB(activeWorkspace);
    }
    else if (keyAsString=="v")
    {
        processV(activeWorkspace);
    }
    else if (keyAsString=="c")
    {
        processC(activeWorkspace);
    }
    else if (keyAsString=="x")
    {
        processX(activeWorkspace);
    }
    else if (keyAsString=="n")
    {
        palette.newButtonAction("dummy");
    }
    else if (keyAsString=="e")
    {
       processE(activeWorkspace);
    }
    else if (keyAsString=="s")
    {
       processS(activeWorkspace);
    }
    else if (keyAsString=="d")
    {
       processD(activeWorkspace);
    }
    else if (keyAsString=="u")
    {
       processU(activeWorkspace);
    }
    else if (keyAsString=="r")
    {
       processR(activeWorkspace);
    }
    else
    {
        console.log("unrecognized key <"+keyAsString+">");
    }
}
//console.log("handleKey should be defined");
var paletteCursor=0;
var lastMoveType="none";

var utter=function(s)
{
    console.log("saying:"+s);
    if(speakWorker)
       speakfn(s); //put in for firefox
}
function sleep(seconds) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}
var noodlePrompt=function(label)
{
	utter("type "+label);
	sleep(1);
	return prompt(label);
}
var describeHeading=function()
{
	utter("heading "+headings[headingsCursor].name);
}

var describeBlock=function(prefix,block)
{
    //console.log("describing");
    //console.log(block);
	var description=prefix+" "+block.functionName;
	utter(description);
}
	

var processP=function(palette)
{
	if(lastMoveType=="p")
	{
		/*
		var nextPaletteBlockSelector=palette.intermediateRep.blocks[paletteCursor].next;
		if (nextPaletteBlockSelector!=null)
		{
			paletteCursor=nextPaletteBlockSelector;
		}
		*/
		if(paletteCursor<headings[headingsCursor].start+headings[headingsCursor].length-1)
		{
			paletteCursor=paletteCursor+1;
		}
	}
	describeBlock("palette",palette.intermediateRep.blocks[paletteCursor]);
	lastMoveType="p";
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

var processO=function(palette)
{
	if(lastMoveType=="p")
	{
		if(paletteCursor>headings[headingsCursor].start)
		{
			paletteCursor=paletteCursor-1;
		}
	}
	describeBlock("palette",palette.intermediateRep.blocks[paletteCursor]);
	lastMoveType="p";
}
var processH=function(palette)
{
	if(lastMoveType=="h")
	{
		if(headingsCursor<headings.length-1)
		{
			headingsCursor=headingsCursor+1;
			paletteCursor=headings[headingsCursor].start;
		}
	}
	describeHeading();
	lastMoveType="h";
}
var processG=function(palette)
{
	if(lastMoveType=="h")
	{
		if(headingsCursor>0)
		{
			headingsCursor=headingsCursor-1;
			paletteCursor=headings[headingsCursor].start;
		}
	}
	describeHeading();
	lastMoveType="h";
}
var processB=function(ws)
{
	if(lastMoveType=="b")
	{
		var nextBlockSelector=ws.intermediateRep.blocks[ws.blockCursor].next;
		if (nextBlockSelector!=null)
		{
			ws.blockCursor=nextBlockSelector;
		}
	}
    //console.log("in processB");
    //console.log(ws.intermediateRep);
    //console.log(ws.blockCursor);
	describeBlock("workspace "+ws.name,ws.intermediateRep.blocks[ws.blockCursor]);
	lastMoveType="b";
}
var processV=function(ws)
{
	if(lastMoveType=="b")
	{
		ws.blockCursor=prevBlock(ws,ws.blockCursor);
	}
	describeBlock("workspace "+ws.name,ws.intermediateRep.blocks[ws.blockCursor]);
	lastMoveType="b";
}
var processC=function(ws)
{
    var theBlock=ws.intermediateRep.blocks[ws.blockCursor];
    
    if(lastMoveType=="b")
    {
        ws.connectors=listConnectors(ws);
        ws.connectorCursor=0;
    }
    else if (lastMoveType=="c")
    {
        if(ws.connectorCursor<ws.connectors.length-1)
        {
            ws.connectorCursor=ws.connectorCursor+1;
        }
    }
    describeConnector(ws);
    lastMoveType="c";
}
var processX=function(ws)
{
    //var theBlock=ws.intermediateRep.blocks[ws.blockCursor];
    
    if(lastMoveType=="b")
    {
        ws.connectors=listConnectors(ws);
        ws.connectorCursor=0;
    }
    else if (lastMoveType=="c")
    {
        if(ws.connectorCursor>0)
        {
            ws.connectorCursor=ws.connectorCursor-1;
        }
    }
    describeConnector(ws);
    lastMoveType="c";
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
var processE=function(ws)
{
    if (lastMoveType=="c")
    {
        //on a connector
        if(ws.connectors[ws.connectorCursor].edge=="none")
        {
            utter("no edge here");
            return;
        }
        ws.currentEdge=ws.connectors[ws.connectorCursor].edge;
        describeEdge(ws);
        lastMoveType="e";
    }
    else if (lastMoveType=="e")
    {
        //moves from edge onto connector
        //blockcursor and connectorcursor change
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
        describeConnector(ws);
        lastMoveType="c";
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
var processS=function(ws)
{
    if(lastMoveType=="p") //in palette
    {
        if(activeWorkspace==null)
        {
            utter("no workspace to add to");
            return;
        }
        utter("adding block "+palette.intermediateRep.blocks[paletteCursor].functionName+" after "+activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].functionName);
        activeWorkspace.placeBlock(palette.intermediateRep.blocks[paletteCursor].functionName,activeWorkspace.blockCursor);
        activeWorkspace.blockCursor=activeWorkspace.intermediateRep.blocks[activeWorkspace.blockCursor].next;
         
        activeWorkspace.clear();
        activeWorkspace.draw();
        activeWorkspace.selectionType="none";
    }
    else if(lastMoveType=="c")
    {
        selectConnector(ws);
    }
    else if(lastMoveType=="b")
    {
        selectBlock(ws);
    }
    else if(lastMoveType=="e")
    {
        selectEdge(ws);
    }
    lastMoveType="s";
}
    
    
var selectConnector=function(ws)
{
    var thisConnector=ws.connectors[ws.connectorCursor];
    //console.log("selecting connector");
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
var processD=function(ws)
{
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
        ws.clear();
        ws.draw();
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
var processU=function(ws)
{
    utter("undoing last action");
    ws.undo();
    ws.clear();
    ws.draw();
}
var processR=function(ws)
{
    utter("running");
    ws.runButtonAction("dummy");
}