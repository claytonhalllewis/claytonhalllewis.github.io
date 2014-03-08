window.onload = function() {  
    var PaletteWidth=100;
    var PaletteHeight=2550;
    var WorkspaceWidth=300;
    var WorkspaceHeight=600;
	var FieldColor="#eee";
    var paletteX=50;
	var workX=150;
	var verticalSpacing=55;
	var boxWidth=60;
	var Midline=workX;
	var newDef=[];
	var nEdges=0;
    var prevSym=999;
    
	//paper.path("M "+Midline+" 30 l 0 100");//reference mark
	var BlockShapes=
		{
        "externalIn":"m -30 0 l 15 10 l 15 -10 l 15 10 l 15 -10 l 0 20 l -60 0 z",
        "externalOut":"m -30 0 l 0 20 l 15 10 l 15 -10 l 15 10 l 15 -10 l 0 -20 l -60 0 z",
		"branch":" l 10 10 l 10 0 l 0 10 l 10 10 l-60 0 z",
		"fanIn":"m -30 0 l 60 0 l -30 30 z",
		"outputBox": "m -30 0 a 30,30 90 1,0 60,0 z",
        "outputAlert": "m -30 0 a 30,30 90 1,0 60,0 z",
        "outputShape": "m -30 0 a 30,30 90 1,0 60,0 z",
		"inputBox": "m -30 30 a 30,30 90 1,1 60,0 z",
        "inputPrompt": "m -30 30 a 30,30 90 1,1 60,0 z",
		"box": "m -30 0 l 60 0 l 0 30 l -60 0 z"
		};

	var nWork=0;
	//var selectedConnector={"out":{"selected":false,"x":0,"y":0},"in":{"selected":false,"x":0,"y":0}};
    var selectedBlock=null;
    var foo="eggplant";
    var gensym=function()
    {
        prevSym++;
        return prevSym;
    }
    
    var makeBlockFromName=function(name)
    {
        var newBlock={"functionName":name,"in":{},"out":{}};
        var def=dict[name];
        for (var inConn in def.sig.in)
        {
            newBlock.in[def.sig.in[inConn]]="dummy";
        }
        
        for (var outConn in def.sig.out)
        {
            newBlock.out[def.sig.out[outConn]]="dummy";
        }
        //console.log(newBlock);
        return newBlock;
    }
    var colorEdge=function(edge,color)
    {
        var intRegex = /^\d+$/;
        for (var part in edge.shape)
        {
            //console.log(part);
            if(intRegex.test(part))
            {
                edge.shape[part].attr({"stroke":color});
            }
            else return;
        }
    }

    var makePalette=function()
    {
        var workspace={};
        workspace.isPalette=true;
        //workspace.paper = new Raphael(document.getElementById('palette_container'), PaletteWidth, PaletteHeight);  
        //var paletteField=workspace.paper.rect(0,0,PaletteWidth,PaletteHeight)
        //paletteField.attr("fill", FieldColor);
        workspace.nBlocks=0;
        workspace.x=paletteX;
    workspace.intermediateRep=buildPaletteFromDict();
    workspace.updatePalette=function(intermediateRep)
    {
        workspace.intermediateRep=intermediateRep;
        //workspace.clear(); ##have to do something here besides graphics??
        //workspace.draw(); 
    }
    //"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
        workspace.draw=function()
        {
            drawFromIntermediateRep(workspace);
        }
        workspace.clear=function()
        {
            //workspace.paper.clear();
            //wsField=workspace.paper.rect(0,0,PaletteWidth,PaletteHeight);
            //wsField.attr("fill", FieldColor);
            workspace.nBlocks=0;
        }
        workspace.newButtonAction=function(evt)
        {
            //mObj=JSON.parse(JSON.stringify(jsonObject))
            //console.log("setting activeWorkspace");
            activeWorkspace=makeWorkspace(JSON.parse(JSON.stringify(NewIntermediateRep)),"workspace_container_container",WorkspaceWidth,WorkspaceHeight,workX);
            activeWorkspace.name=noodlePrompt("name of new function?");
            activeWorkspace.draw();
            activeWorkspace.selectedBlock.blockSelector=0;
            //NewIntermediateRep.blocks[0].shape[0].attr({"stroke":"#ff0000"});
        }

        
        return workspace;
    }
    
    var makeWorkspace=function(intermediateRep,container,width,height,xPosition)
    {
        var workspace={};
        workspace.isPalette=false;
        workspace.intermediateRep=intermediateRep;
        workspace.commandStack=[];
        workspace.confirmationToggle=true;
        workspace.blockCursor=0;
        workspace.connectorCursor=0;
        workspace.connectors=[];
        //when true buttons prompt for confirmation rather than acting
        workspace.selectedConnectors={"from":{"set":false},"to":{"set":false}};
        workspace.selectedEdge=null;
        workspace.selectedBlock={"block":null,"blockSelector":null};
        var wsContainer = document.createElement('div');
        //document.getElementById('workspace_container_container').appendChild(wsContainer);
        document.getElementById(container).appendChild(wsContainer);
        workspace.paper=new Raphael(wsContainer,width,height);
        var wsField=workspace.paper.rect(0,0,width,height);
        wsField.attr("fill", FieldColor);
        workspace.discard=function()
        {
            wsContainer.parentNode.removeChild(wsContainer);
        }
        workspace.discardButtonAction=function(evt)
        {
            if (workspace.confirmationToggle)
            {
                alert("are you sure?");
            }
            else
            {
                workspace.discard();
            }
            workspace.confirmationToggle=!workspace.confirmationToggle;
        }

        workspace.runButtonAction=function(evt)
        {
            //run(); //for test
            ///* real code is here
            workspace.save();
            console.log(dict[workspace.name]);
            var def=dict[workspace.name].def;
            console.log(def);
            if (def.length==1) //just one block
            {
                run(def[0].functionName);
            }
            else
            {
                run(workspace.name);
            }
            //*/
            
        }

        workspace.editSelectedBlock=function()
        {
            //console.log("editSelectedBlock");
            //console.log(workspace);
            //[{"functionName":"isNull",
            //	"in":{"listIn":"listIn"},
            //	"out":{"bool":"b0"}},
            //example dictionary entry: 
            //"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
            if (workspace.selectedBlock.block==null)
                return;
            var name=workspace.selectedBlock.block.functionName;
            if (dict[name].type!="def")
                return;
            var newWorkspace=makeWorkspace(makeIntermediateRep(name),"workspace_container_container",WorkspaceWidth,WorkspaceHeight,workX);
            newWorkspace.name=name;
            newWorkspace.draw();
        }
        workspace.editButtonAction=function(evt)
        {
            //console.log("editButtonAction");
            workspace.editSelectedBlock();
        }

        
        workspace.saveButtonAction=function(evt)
        {
            //console.log("saveButtonAction");
            if (workspace.confirmationToggle)
            {
                alert("are you sure?");
            }
            else
            {
                workspace.save();
            }
            workspace.confirmationToggle=!workspace.confirmationToggle;
        }
        workspace.save=function()
        {
            console.log('saving');
            updateDictionary(workspace.name,dictionaryEntryFromIntermediateRep(workspace.intermediateRep));
            //console.log("saved dict: ");
            //console.log(dict);
            palette.updatePalette(buildPaletteFromDict());
        
        }

        
        workspace.saveAsButtonAction=function(evt)
        {
            //console.log("saveButtonAction");
            if (workspace.confirmationToggle)
            {
                alert("are you sure?");
            }
            else
            {
                workspace.saveAs();
            }
            workspace.confirmationToggle=!workspace.confirmationToggle;
        }
        workspace.saveAs=function()
        {
            workspace.name=prompt("enter name");
            updateDictionary(workspace.name,dictionaryEntryFromIntermediateRep(workspace.intermediateRep));
            //console.log(dict);
            //discard button gets rid of workspace
        
        }


        
        workspace.nBlocks=0;
        workspace.x=xPosition;
        workspace.draw=function()
        {
            drawFromIntermediateRep(workspace);
        }
        
        workspace.supersededEdges=function(edge)
        {
            var supersededEdges=[];
            for (var e in workspace.intermediateRep.edges)
            {
                var existingEdge=workspace.intermediateRep.edges[e];
                if ((existingEdge.to.blockSelector==edge.to.blockSelector)&&(existingEdge.to.name==edge.to.name))
                {
                    //console.log("superseding edge");
                    supersededEdges.push(existingEdge);
                }
            }
            return supersededEdges;
        }
        
        workspace.addEdgeFromSelections=function()
        {
            if(workspace.selectedConnectors.from.set && workspace.selectedConnectors.to.set)
            {
                //going to add an edge
                
                var newEdge={"from":{"name":workspace.selectedConnectors.from.name,"blockSelector":workspace.selectedConnectors.from.blockSelector},
                "to":{"name":workspace.selectedConnectors.to.name,"blockSelector":workspace.selectedConnectors.to.blockSelector}};
            
                workspace.placeEdge(newEdge);
                workspace.selectedConnectors.from.set=false;
                workspace.selectedConnectors.to.set=false;
                workspace.clear();
                workspace.draw();
            }
        }
        
        workspace.deleteSelection=function(evt)
        {
            
            if (workspace.selectedBlock.block!=null)
            {
                //console.log("delete selected block");
                workspace.removeBlock(workspace.selectedBlock.blockSelector);
                workspace.clear();
                workspace.draw();
            }
            else if (workspace.selectedEdge!=null)
            {
                //console.log("delete selected edge");
                workspace.removeEdge(workspace.selectedEdge.data);
                workspace.clear();
                workspace.draw();
            }
        }
                       
            
        workspace.deleteBlock=function(blockSelector) //deletes block only, not edges
        {
            var b=0;
            while(workspace.intermediateRep.blocks[b].next!=blockSelector)
            {
                b=workspace.intermediateRep.blocks[b].next;
            }
            workspace.intermediateRep.blocks[b].next=workspace.intermediateRep.blocks[blockSelector].next;
            delete workspace.intermediateRep.blocks[blockSelector];
        }
        workspace.removeEdge=function(edge) //remove form pushes; delete for does not
        {
            workspace.commandStack.push({"command":"removeEdge","edge":edge});
            workspace.deleteEdge(edge);
        }

        
        workspace.deleteEdge=function(edge)
        {
            for (var e in workspace.intermediateRep.edges)
            {
                if ((workspace.intermediateRep.edges[e].from.blockSelector==edge.from.blockSelector)&&
                (workspace.intermediateRep.edges[e].from.name==edge.from.name)&&
                (workspace.intermediateRep.edges[e].to.blockSelector==edge.to.blockSelector)&&
                (workspace.intermediateRep.edges[e].to.name==edge.to.name))
                {
                    //console.log("deleting an edge");
                    //console.log(workspace.intermediateRep.edges[e]);
                    delete workspace.intermediateRep.edges[e];
                    return;
                }
            }
        }
        workspace.removeBlock=function(blockSelector) //deletes edges and then block; pushes
        {
            var ordinalPosition=workspace.findOrdinalPosition(blockSelector);
            var blockFunctionName=workspace.intermediateRep.blocks[blockSelector].functionName;
            if((blockFunctionName=="externalIn")||(blockFunctionName=="externalOut"))
            {
                //console.out("can't delete external");
                return;
            }
            
            for (var e in workspace.intermediateRep.edges)
            {
                if((workspace.intermediateRep.edges[e].from.blockSelector==blockSelector)||
                (workspace.intermediateRep.edges[e].to.blockSelector==blockSelector))
                {
                    workspace.removeEdge(workspace.intermediateRep.edges[e]);
                }
            }
            workspace.commandStack.push({"command":"removeBlock","name":blockFunctionName,"blockSelector":blockSelector,"ordinalPosition": ordinalPosition});
            workspace.deleteBlock(blockSelector);
        
        }
            
        workspace.findOrdinalPosition=function(blockSelector)
        {
            var b=0;
            var position=0;
            while (b!=blockSelector)
            {
                position++;
                b=workspace.intermediateRep.blocks[b].next;
            }
            return position;
        }
        
        workspace.placeBlock=function(functionName,prevBlock) //place form pushes
        {
            workspace.commandStack.push({"command":"placeBlock","name":functionName,"prevBlock":prevBlock});
            workspace.insertBlockByPrev(functionName,null,prevBlock);
        }
        
        workspace.insertBlockByPrev=function(functionName,blockSelector,prevBlock)
        {
            if (blockSelector==null)
                blockSelector=gensym();
            workspace.intermediateRep.blocks[blockSelector]=makeBlockFromName(functionName);
            workspace.intermediateRep.blocks[blockSelector].next=workspace.intermediateRep.blocks[prevBlock].next;
            workspace.intermediateRep.blocks[prevBlock].next=blockSelector;
        }
            
        workspace.replaceBlockByPosition=function(functionName,blockSelector,ordinalPosition)
        {
            //only used by undo so does not need to be undoable
            var prevBlock=0;
            for (var b=0;b<(ordinalPosition-1); b++)
            {
                prevBlock=workspace.intermediateRep.blocks[prevBlock].next;
            }
            workspace.insertBlockByPrev(functionName,blockSelector,prevBlock);
        }
        workspace.placeEdge=function(edge)
        {
            
                //check if there's already an edge to the to connector and delete it
                var supersededEdges=workspace.supersededEdges(edge);
                for (var s in supersededEdges)                {
                    workspace.removeEdge(supersededEdges[s]);
                }
            workspace.commandStack.push({"command":"placeEdge","edge":edge});
            workspace.insertEdge(edge);
        }
        workspace.insertEdge=function(edge)
        {
            workspace.intermediateRep.edges[gensym()]=edge;
        }
        workspace.undo=function()
        {
            var theCommand=workspace.commandStack.pop();
            //console.log(theCommand);
            if (theCommand.command=="removeEdge")
            {
                workspace.insertEdge(theCommand.edge);
            }
            else if (theCommand.command=="placeEdge")
            {
                workspace.deleteEdge(theCommand.edge);
            }
            else if (theCommand.command=="removeBlock")
            {
                workspace.replaceBlockByPosition(theCommand.name,theCommand.blockSelector,theCommand.ordinalPosition);
            }
            else if (theCommand.command=="placeBlock")
            {
                var blockSelector=workspace.intermediateRep.blocks[theCommand.prevBlock].next;
                workspace.deleteBlock(blockSelector);
            }
            else
            {
                
                alert("invalid command");
            }
        }
        workspace.undoButtonAction=function(evt)
        {
            //console.log("undoButtonAction");
            workspace.undo();
            workspace.clear();
            workspace.draw();
        }

        workspace.clear=function()
        {
            workspace.paper.clear();
            wsField=workspace.paper.rect(0,0,width,height);
            wsField.attr("fill", FieldColor);
            workspace.nBlocks=0;
        }
        activeWorspace=workspace;
        return workspace;
    }
    
	var makeConnector=function(name,type,x,y,workspace, blockSelector)
	{
        workspace.intermediateRep.blocks[blockSelector][name]={"coords":{"x":x,"y":y}};
		var connector=workspace.paper.text(x, y,name);
		connector.attr("stroke",FieldColor);
		var showConnector=function(evt)
		{
			connector.attr("stroke","#000");
		}
		var hideConnector=function(evt)
		{
			connector.attr("stroke",FieldColor);
		}
		connector.hover(showConnector,hideConnector);
		connector.activate=function()//for connectors in work area
		{
			connector.mouseup(function(evt)
			{   
                workspace.selectedConnectors[type].name=name;
                workspace.selectedConnectors[type].blockSelector=blockSelector;
				workspace.selectedConnectors[type].set=true;
				workspace.addEdgeFromSelections(); //will add if there is a matching connector
			});
		}

		return connector;
	}
		//
	//[{"functionName":"isNull",
	//	"in":{"listIn":"listIn"},
	//	"out":{"bool":"b0"}},
	

		
	//example dictionary entry: 
	//"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
    
	var drawEdge=function(edge,workspace)
	{
        //console.log("edge:");
        //console.log(edge);
        var intermediateRep=workspace.intermediateRep;
        var paper=workspace.paper;
        var edgeDrawn={};
        edgeDrawn.data=edge;
        edgeDrawn.shape=paper.set();
        var inX=intermediateRep.blocks[edge.to.blockSelector][edge.to.name].coords.x;
        var inY=intermediateRep.blocks[edge.to.blockSelector][edge.to.name].coords.y; 
        var outX=intermediateRep.blocks[edge.from.blockSelector][edge.from.name].coords.x;
        var outY=intermediateRep.blocks[edge.from.blockSelector][edge.from.name].coords.y;
		if(inY>outY) //descending
		{
			if (Math.abs(inX-outX)<2) //vertical... put in a kink
			{
				var deltaY=outY-inY;
				edgeDrawn.shape.push(paper.path("M "+outX+" "+outY+" L "+(inX+.1*deltaY)+" "+(inY+deltaY/2)));
				edgeDrawn.shape.push(paper.path("M "+(outX+.1*deltaY)+" "+(inY+deltaY/2)+" L "+inX+" "+inY));
			}
			else
				edgeDrawn.shape.push(paper.path("M "+outX+" "+outY+" L "+inX+" "+inY));
		}

		else if (inX +outX<2*Midline)
		{
			var verticalRadius=20+(outY-inY)/2;
			var horizontalRadius=verticalRadius/2;
			edgeDrawn.shape.push(paper.path("M "+outX+" "+outY+" A "+horizontalRadius+","+verticalRadius+" 10 1,1 "+inX+","+inY));
		}
		else
		{
			var verticalRadius=20+(outY-inY)/2;
			var horizontalRadius=verticalRadius/2;
			edgeDrawn.shape.push(paper.path("M "+outX+" "+outY+" A "+horizontalRadius+","+verticalRadius+" -10 1,0 "+inX+","+inY));
		}
        
        var selectEdge=function(evt)
			{
                //console.log("edge selected");
                if (workspace.selectedBlock.block!=null)
                {
                    workspace.selectedBlock.block.shape[0].attr({"stroke":"#000000"});
                    workspace.selectedBlock.block=null;
                }
                if (workspace.selectedEdge!=null)
                {
                    //workspace.selectedEdge.shape[0].attr({"stroke":"#000000"});
                    colorEdge(workspace.selectedEdge,"#000000");
                }
                workspace.selectedEdge=edgeDrawn;
                //edgeDrawn.shape[0].attr({"stroke":"#ff0000"});
                colorEdge(edgeDrawn,"#ff0000");
			}
        edgeDrawn.shape.mouseup(selectEdge);
		
	}
	
	var drawBlock=function(name,x,y,workspace,intermediateRep,blockSelector)//get signature from dict
	{
		var block=makeBlockFromName(name);
		block.shape=workspace.paper.set();
		block.shape.push(workspace.paper.path("M "+x+" "+y+findShape(name)));
		block.shape.push(workspace.paper.text(x, y+15, name));
		block.connectors=makeConnectors(name,x,y,workspace,blockSelector);
		block.activateForPalette=function()
		{
			var selectBlock=function(evt)
			{
                //console.log("selecting in palette");
				activeWorkspace.placeBlock(name,activeWorkspace.selectedBlock.blockSelector);
                activeWorkspace.clear();
                activeWorkspace.draw();
			}
			block.shape.mouseup(selectBlock);
		}
		block.activateForWorkspace=function()
		{
            //console.log(block.connectors);
			for (var i in block.connectors.in)
			{
				block.connectors.in[i].activate();
			}
			for (var i in block.connectors.out)
			{
				block.connectors.out[i].activate();
			}
            var selectBlock=function(evt)
            {
                //console.log("selecting in workspace");
                //console.log(name);
                activeWorkspace=workspace;
                //check if block is externalIn
                if (name=="externalIn")
                {
                    //if there is a to-connector selected
                    //create an out entry in intermediateRep
                    //add an edge and redraw
                    //console.log("processing externalIn");
                    //console.log(workspace.selectedConnectors.to);
                    if( workspace.selectedConnectors.to.set)
                    {
                        //add out entry to externalIn block
                        var connectorName=window.prompt("enter connector name: ");
                        workspace.intermediateRep.blocks[blockSelector].out[connectorName]={};
                        workspace.placeEdge({"from":{"name":connectorName,"blockSelector":blockSelector},
                            "to":{"name":workspace.selectedConnectors.to.name,
                            "blockSelector":workspace.selectedConnectors.to.blockSelector}});
                        workspace.selectedConnectors.to.set=false;
                        workspace.clear();
                        workspace.draw();
                        return;
                    }
                }
                if (name=="externalOut")
                {
                    //if there is a from-connector selected
                    //create an out entry in intermediateRep
                    //add an edge and redraw
                    //console.log("processing externalOut");
                    //console.log(workspace.selectedConnectors.from);
                    if( workspace.selectedConnectors.from.set)
                    {
                        //add out entry to externalIn block
                        var connectorName=window.prompt("enter connector name: ");
                        workspace.intermediateRep.blocks[blockSelector].in[connectorName]={};
                        workspace.placeEdge({"to":{"name":connectorName,"blockSelector":blockSelector},
                            "from":{"name":workspace.selectedConnectors.from.name,
                            "blockSelector":workspace.selectedConnectors.from.blockSelector}});
                        workspace.selectedConnectors.from.set=false;
                        workspace.clear();
                        workspace.draw();
                        return;
                    }
                
                }
                
                if (workspace.selectedBlock.block!=null)
                {
                    workspace.selectedBlock.block.shape[0].attr({"stroke":"#000000"});
                }
                if (workspace.selectedEdge!=null)
                {
                    //workspace.selectedEdge.shape[0].attr({"stroke":"#000000"});
                    colorEdge(workspace.selectedEdge,"#000000");
                    workspace.selectedEdge=null;
                }
                workspace.selectedBlock.block=block;
                //console.log("selectedBlock.block");
                //console.log(workspace.selectedBlock.block);
                workspace.selectedBlock.blockSelector=blockSelector;
                block.shape[0].attr({"stroke":"#ff0000"});
                //console.log(workspace.selectedBlock);
            }
            block.shape.mouseup(selectBlock);
		}
        block.delete=function()
        {
            deleteBlock(intermediateRep,blockSelector);
        }
		return block;
	}
	var findShape=function(name)
	{
		return BlockShapes[name]||BlockShapes["box"];
		//gives box if no match for name
	}	
    
	//example dictionary entry: 
	//"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
    //(name,type,x,y,workspace, blockSelector)
	var makeConnectors=function(name,x,y,workspace,blockSelector)//need name to special case branch 
	{
		var connectors={"in":[],"out":[]};
		var sig=dict[name].sig; //get signature from dict using name
		//place in (top) and out (bottom) connectors from sig
		//special case branch's side connector
		var id;
		if (name=="branch")
		{
			connectors.out[connectors.out.length]=makeConnector("ifTrue","from",x-29,y+36,workspace, blockSelector);
			connectors.out[connectors.out.length]=makeConnector("ifFalse","from",x+29,y+36,workspace, blockSelector);
			connectors.in[connectors.in.length]=makeConnector("input","to",x,y-5,workspace, blockSelector);
			connectors.in[connectors.in.length]=makeConnector("control","to",x+23,y+5,workspace, blockSelector);
			return connectors;
		}
        var inConnList=workspace.intermediateRep.blocks[blockSelector].in;
        var inConnListLength=Object.keys(inConnList).length;
        var iShadow=0;
		for(var i in inConnList)
		{
			connectors.in[connectors.in.length]=makeConnector(i,"to",x+xPlacement(iShadow,inConnListLength),y-5,workspace, blockSelector);
            iShadow++
		}
        var outConnList=workspace.intermediateRep.blocks[blockSelector].out;
        var outConnListLength=Object.keys(outConnList).length;
        iShadow=0;
		for(var i in workspace.intermediateRep.blocks[blockSelector].out)
		{
			connectors.out[connectors.out.length]=makeConnector(i,"from",x+xPlacement(iShadow,outConnListLength),y+36,workspace, blockSelector);
            iShadow++;
		}
		return connectors;
	}
	var xPlacement=function(i,n)
	{
		if (n==1)
		{
			return 0;
		}
        //console.log("xPlacement n:");
        //console.log(i);
		var spacing=boxWidth/(n-1);
        return i*spacing-boxWidth/2;
	}
    
	var makeBlockInWorkspace=function(intermediateRep, blockSelector,workspace)
	{
		var name=intermediateRep.blocks[blockSelector].functionName;
		var block=drawBlock(name,workspace.x,(workspace.nBlocks+1)*verticalSpacing,workspace,intermediateRep,blockSelector);
		workspace.nBlocks++;
        if (workspace.isPalette)
        {
            block.activateForPalette();
        }
        else
        {
            block.activateForWorkspace();
        }
		return block;
	}

	
    
    var drawFromDefinition=function(name,workspace)
    {
        var intermediateRep=makeIntermediateRep(name);
        drawFromIntermediateRep(intermediateRep,workspace);
    }
    
    var makeIntermediateRep=function(name)
	{
        //console.log(name);
		var def=dict[name].def;
		var intermediateRep={"blocks":{},"edges":{}};
        //add external blocks
        addExternalBlocksToIntermediateRep(intermediateRep,name);
		for (var i in def)  //add the blocks
		{
            
            intermediateRep.blocks[parseInt(i)+1]=def[i];
            intermediateRep.blocks[parseInt(i)+1].next=parseInt(i)+2;
		}
		//add edges
        addEdgesToIntermediateRep(name,intermediateRep);
        //console.log(intermediateRep);
        return intermediateRep;
    }   
    
    //defReverse=[{"functionName":"isNull",
	//	"in":{"listIn":"listIn"},
	//	"out":{"bool":"b0"}},

    var addExternalBlocksToIntermediateRep=function(intermediateRep,name)
    {
        //console.log(name);
        var sig=dict[name].sig;
        var def=dict[name].def;
        intermediateRep.blocks[0]={"functionName":"externalIn","in":{},"out":makeDefOutFromSig(sig)};
        intermediateRep.blocks[0].next=1;
        var numBlocksInDef=def.length;
        intermediateRep.blocks[numBlocksInDef+1]={"functionName":"externalOut","out":{},"in":makeDefInFromSig(sig)};
        intermediateRep.blocks[numBlocksInDef+1].next=null;
    }
    var makeDefOutFromSig=function(sig)
    {
        var defOut={};
        for(var i in sig.in)
        {
            defOut[sig.in[i]]=sig.in[i];
        }
        //console.log("defOut:");
        //console.log(defOut);
        return defOut;
    }
     var makeDefInFromSig=function(sig)
    {
        var defIn={};
        for(var i in sig.out)
        {
            defIn[sig.out[i]]=sig.out[i];
        }
        //console.log("defIn:");
        //console.log(defIn);
        return defIn;
    }
    var addEdgesToIntermediateRep=function(name,intermediateRep)
    {
		var edges=collectEdges(intermediateRep);
		//add edges... each has a from: and a to: which have a blockSelector: and a connector:
        for (i in edges)
		{
			intermediateRep.edges[i]=edges[i];
		}
	}
   

	var collectEdges=function(intermediateRep)
	{
        //an edge has a from: and a to: each of which has a blockSelector: and a connector:
		var edges=[];
		var b0;
		var b1;
		var i;
		var o;
        var blocks=intermediateRep.blocks;
		for (b0 in blocks) //loop over blocks in intermediate rep
		{
		for (i in blocks[b0].in) //loop over input connectors in block
		{
			for (b1 in blocks) //loop over blocks again in intermediate rep
			{
				for (o in blocks[b1].out) //loop over output connectors in block
				{
					//console.log("in "+blocks[b0].in[i]+" out "+blocks[b1].out[o]);
					if (blocks[b0].in[i]==blocks[b1].out[o]) //found connected connectors
					{
						//console.log("making edge");
						edges.push({"from":{"blockSelector":b1,"name":o},"to":{"blockSelector":b0,"name":i}});
					}
				}			
			}
		}
		}
		return edges;

	}
//example of a def
	//var defReverse=[{"functionName":"isNull",
	//	"in":{"listIn":"listIn"},
	//	"out":{"bool":"b0"}},
	//	{"functionName":"branch",
	//	"in":{"input":"listIn","control":"b0"},
	//	"out":{"ifTrue":"b1","ifFalse":"b2"}},
	//	{"functionName":"head",
	//	"in":{"listIn":"b2"},
	//	"out":{"listOut":"b3"}},
	//	{"functionName":"tail",
	//	"in":{"listIn":"b2"},
	//	"out":{"listOut":"b4"}},
	//	{"functionName":"reverse",
	//	"in":{"listIn":"b4"},
	//	"out":{"listOut":"b5"}},
	//	{"functionName":"concat",
	//	"in":{"list0In":"b5","list1In":"b3"},
	//	"out":{"listOut":"b6"}},
	//	{"functionName":"fanIn",
	//	"in":{"in0":"b1","in1":"b6"},
	//	"out":{"result":"listOut"}}
	//	];
	
	//example dictionary entry: 
	//"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
var externalEdge=function(intermediateRep,e)
{
    var thisEdge=intermediateRep.edges[e];
    var fromBlock=intermediateRep.blocks[thisEdge.from.blockSelector];
    if (fromBlock.functionName=="externalIn")
        return true;
    var toBlock=intermediateRep.blocks[thisEdge.to.blockSelector];
    if (toBlock.functionName=="externalOut")
        return true;
    return false;
}
var makeBlockInDef=function(intermediateRep,b,sig,edgeNameList)
{
    var thisBlockInIR=intermediateRep.blocks[b];
    var blockInDef={"functionName":thisBlockInIR.functionName,
                    "in":{},"out":{}};
    copyExtras(thisBlockInIR,blockInDef);
    for (var e in intermediateRep.edges)
    {
        if(intermediateRep.edges[e].from.blockSelector==b)
        {
            //edge comes from this block
            //external edge?
            if(externalEdge(intermediateRep,e))
            {
                blockInDef.out[intermediateRep.edges[e].from.name]=intermediateRep.edges[e].to.name;
                sig.out.push(intermediateRep.edges[e].to.name);
            }
            else
            {
                //console.log("processing internal edge from this block");
                var connectorName=intermediateRep.edges[e].from.name;
                //console.log(connectorName);
                //blockInDef.out[connectorName]=thisBlockInIR.out[connectorName].edgeName;
                blockInDef.out[connectorName]=edgeNameList[b][connectorName];
                //console.log("value name");
                //console.log(blockInDef.out[connectorName]);
            }
        }
        if(intermediateRep.edges[e].to.blockSelector==b)
        {
            //edge goes to this block
            //external edge?
            if(externalEdge(intermediateRep,e))
            {
                //##multiple edges in from external conn?
                blockInDef.in[intermediateRep.edges[e].to.name]=intermediateRep.edges[e].from.name;
                sig.in.push(intermediateRep.edges[e].from.name);
            }
            else
            {
                //console.log("processing internal edge to this block");
                var thisEdge=intermediateRep.edges[e];
                var connectorName=thisEdge.from.name;
                //var originBlockInIR=intermediateRep.blocks[thisEdge.from.blockSelector];
                //blockInDef.in[intermediateRep.edges[e].to.name]=originBlockInIR.out[connectorName].edgeName;
                blockInDef.in[intermediateRep.edges[e].to.name]=edgeNameList[thisEdge.from.blockSelector][connectorName];
            }
        }
    }
    //console.log("blockInDef");
    //console.log(blockInDef);
    return blockInDef;
}
var copyExtras=function(thisBlockInIR,blockInDef)
{
    console.log("copying extras");
    console.log(thisBlockInIR);
    if (thisBlockInIR.extras)
    {
        console.log("found some");
        blockInDef.extras=thisBlockInIR.extras;
    }
}


var dictionaryEntryFromIntermediateRep=function(intermediateRep)
{
    console.log("assigning edge names");
    var edgeNameList=[];
    for(var b in intermediateRep.blocks)
    {
        edgeNameList[b]={};
        for (var c in intermediateRep.blocks[b].out)
        {
            //intermediateRep.blocks[b].out[c].edgeName=gensym();
            edgeNameList[b][c]=gensym();
        }
    }
    //console.log("look for edge names");
    //console.log(intermediateRep);
    var newEntry={"type":"def","def":[],"sig":{"out":[],"in":[]}};
    var b=0;
    while(b!=null)
    {
        //console.log("building def");
        //console.log(b);
        //provide unique names for out connectors to use for names for edges
        //(edges from same connector have to have same name in def)
        
        var thisBlockInIR=intermediateRep.blocks[b];
        if ((thisBlockInIR.functionName!="externalIn")&&(thisBlockInIR.functionName!="externalOut"))
        {
            newEntry.def.push(makeBlockInDef(intermediateRep,b,newEntry.sig,edgeNameList));
        }
        b=intermediateRep.blocks[b].next;
    }
    return newEntry;
}
var updateDictionary=function(name,entry)
{
    dict[name]=entry;
}
var drawFromIntermediateRep=function(workspace)
{
    //console.log("workspace name");
    //console.log(workspace.name);
    workspace.paper.text(20, 10, workspace.name);
    var b=0;
    while(b!=null)
    {
        //console.log("drawing");
        //console.log(b);
        makeBlockInWorkspace(workspace.intermediateRep,b,workspace);
        b=workspace.intermediateRep.blocks[b].next;
    }
    
    for (var e in workspace.intermediateRep.edges)
    {
        drawEdge(workspace.intermediateRep.edges[e],workspace);
    }
    
}
 var buildPaletteFromDict=function()
    {
        var intermediateRep={"blocks":{}};
        var nBlocks=0;
        for (var f in dict)
        {
            //console.log("fn is "+f);
            var def=dict[f];
            intermediateRep.blocks[nBlocks]={"functionName":f,"in":inSigFromDef(def),"out":outSigFromDef(def),"next":nBlocks+1};
            nBlocks=nBlocks+1;
        }
        intermediateRep.blocks[nBlocks-1].next=null;
        //console.log("palette");
        //console.log(intermediateRep);
        return intermediateRep;
    }
    var inSigFromDef=function(def)
    {
        var inSig={};
        for (var conn in def.sig.in)
        {
            inSig[def.sig.in[conn]]="dummy";
        }
        return inSig;
    }
    var outSigFromDef=function(def)
    {
        var outSig={};
        for (var conn in def.sig.out)
        {
            outSig[def.sig.out[conn]]="dummy";
        }
        return outSig;
    }

    
    palette=makePalette();
    //palette.draw();
    
    var keyboardListener=function(evt)
    {
	evt = evt || window.event;
            //var keyAsString=String.fromCharCode(evt.keyCode);
            //above worked in chrome... trying below for firefox
            //var keyAsString=String.fromCharCode(evt.charCode)
            var keyAsString=String.fromCharCode(evt.keyCode).toLowerCase();

            //console.log("keydown");
            //console.log(evt.keyCode);
            //console.log("<"+keyAsString+">");
	    if(evt.keyCode==191) //slash for select
		keyAsString="/";
            handleKey(keyAsString);
    }
    document.onkeydown=keyboardListener;
        
        
    var NewIntermediateRep=
    {"blocks":
        {
            0:{"functionName":"externalIn","in":{},"out":{},"next":1},
            1:{"functionName":"externalOut","in":{},"out":{},"next":null}
        },
        "edges":{}
    };
    
        
        
        
        
        
   // 0:{"functionName":"externalIn","in":{},"out":{},"next":1},
   // 1:{"functionName":"inputPrompt","in":{"listOut":"dummy"},"out":{},"next":2},
   // 2:{"functionName":"head","in":{"listIn":"dummy"},"out":{"listOut":"dummy"},"next":3},
    
   
    
    
    
    //activeWorkspace=makeWorkspace(NewIntermediateRep,"workspace_container_container",WorkspaceWidth,WorkspaceHeight,workX);
    //activeWorkspace.draw();
    /* test of working from a def, undo
    var workspace=makeWorkspace(makeIntermediateRep("reverse"),"workspace_container_container",WorkspaceWidth,WorkspaceHeight,workX);
	workspace.draw();
    alert("check");
    workspace.clear();
    console.log(workspace.intermediateRep);
    //var b=window.prompt("enter block no: ");
    var b=2;
    workspace.removeBlock(b);
    console.log(workspace.intermediateRep);
    workspace.draw();
    workspace.undo(); //replace block
    console.log(workspace);
    workspace.clear();
    workspace.draw();
    workspace.undo(); //replace edge 1
    console.log(workspace.intermediateRep);
    workspace.clear();
    workspace.draw();
    workspace.undo(); //replace edge 2
    console.log(workspace.intermediateRep);
    workspace.clear();
    workspace.draw();
    workspace.undo(); //replace edge 3
    console.log(workspace.intermediateRep);
    workspace.clear();
    workspace.draw();
    workspace.undo(); //replace edge 4
    console.log(workspace.intermediateRep);
    workspace.clear();
    workspace.draw();
    workspace.undo(); //replace edge 5
    console.log(workspace.intermediateRep);
    workspace.clear();
    workspace.draw();
    */

	
	
}  