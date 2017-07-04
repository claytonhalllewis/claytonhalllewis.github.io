function cloneObject(obj) 
{
    if (obj === null || typeof obj !== 'object') 
    {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) 
    {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}
function convert(b)
{
	console.log("converting ",b);
	var lookUp=
	{
		"play":convertPlay,
		"note":convertNote,
		"repeat":convertRepeat,
		"changeable note":convertSelectableNote,
		"concatenate":convertConcatenate,
		"mix":convertMix,
		"multiply":convertMultiply,
		"number":convertNumber,
		"add":convertAdd
	};
	if (!(b.blockname in lookUp))
	{
		if(b.blockname.indexOf("note")!=-1)
			return convertPlayerNote(b);
		console.log("unsupported block type in conversion");
		return "";
	}
	return lookUp[b.blockname](b);
}

function convertPlayerNote(b)
{
	var end=b.blockname.indexOf("note");
	var note=b.blockname.slice(0,end-1);
	//console.log("note is ",note);
	note='"'+note+'"';
	var s={"block":{"@type":"noteDrop","field":		
				{"@name":"NOTE","#text":note}}};
	return s;

}
/*
function convertAnote(b)
{
	var s={"block":{"@type":"A note"}}; 
	return s;
}
function convertBnote(b)
{
	var s={"block":{"@type":"B note"}}; 
	return s;
}
*/
function convertSelectableNote(b)
{
	var sa=b.args[0].value;
	sa='"'+sa+'"';
	var s={"block":{"@type":"noteDrop","field":		
				{"@name":"NOTE","#text":sa}}};
	return s;
}
function convertConcatenate(b)
{
	var sa=convert(b.args[0].value);
	var sb=convert(b.args[1].value);
	var s={"block":{"@type":"concatenate", "value":
				[{"@name":"SOUND A","block":sa.block},{"@name":"SOUND B","block":
				sb.block}]}};
	return s;
}
function convertMix(b)
{
	var sa=convert(b.args[0].value);
	var sb=convert(b.args[1].value);
	var s={"block":{"@type":"mix", "value":
				[{"@name":"SOUND A","block":sa.block},{"@name":"SOUND B","block":
				sb.block}]}};
	return s;
}
function convertMultiply(b)
{
	var sa=convert(b.args[0].value);
	var sb=convert(b.args[1].value);
	var s={"block":{"@type":"multiply", "value":
				[{"@name":"SOUND","block":sa.block},{"@name":"FACTOR","block":
				sb.block}]}};
	return s;
}
function convertNumber(b)
{
	var v=b.args[0].value;
	var s={"block":{"@type":"number","field":
				{"@name":"NUM","#text":v}}};
	return s;
}
function convertAdd(b)
{
	var sa=convert(b.args[0].value);
	var sb=convert(b.args[1].value);
	var s={"block":{"@type":"add","field":	
				{"@name":"OP","#text":"ADD"},
				"value":[{"@name":"A","block":sa.block},			 
				{"@name":"B","block":sb.block}]}};
	return s;
}
function convertPlay(b)
{
	var sb=convert(b.args[0].value);
	var s={"block":{"@type":"play","value":[{"@name":"SOUND","block":sb.block}]}};
	return s;
}
function convertNote(b)
{
	var v=b.args[0].value;
	var s={"block":{"@type":"note","field":{"@name":"NOTE","#text":v}}};
	return s;
}
function convertRepeat(b)
{
	var times=b.args[0].value;
	var body=convertStatements(b.args[1].value);
	var s={"block":{"@type":"repeat","field":{"@name":"TIMES","#text":times},"statement":{"@name":"DO","block":body}}};
	return s;
}
function convertStatements(b)
{
	var s=[];
	var i;
	for(i=0;i<b.length;i++)
	{
		s[i]=convert(b[i]);
	}
	return s;
}
function generateJson(blockList) //from converted JSON
	{
		//console.log("blockList:");
		//console.log(blockList);
		if (blockList.length < 1) 
		{
			say("Workspace empty");
		}
		else if(blockList.length == 1) 
		{
			return expandNest(blockList[0]);
		}
		else if(blockList.length > 1) 
		{
			var json=expandNest(blockList[0]);
			json.block["next"]=generateJson(blockList.slice(1))
			return json;
		}
	}
	function nameOfBlock(aBlock)
	{
		return aBlock.block["@type"];
	}
	function expandNest(aBlock)
	{
		if (nameOfBlock(aBlock)!="repeat")
			return cloneObject(aBlock);
		var json=cloneObject(aBlock);
		//console.log("json:");
		//console.log(json);
		json.block.statement.block=generateJson(aBlock.block.statement.block).block;			
		//console.log(json);
		return json;
	}
	function execute(pgm)// statement list
	{
		var code=convertStatements(pgm);
		//console.log("converted code: ",code);
		var json=generateJson(code);
		var xmlFromJson=json2xml(json);
		var xml_text = '<xml xmlns="http://www.w3.org/1999/xhtml">'+xmlFromJson+'</xml>';
		//console.log(xml_text);
					
		try 
		{
			var xml = Blockly.Xml.textToDom(xml_text)
			//console.log(xml);
		} catch(e) {
				alert(e);
				return;
			   }
					
  					
      				
      		// Create a headless workspace.
      		var workspace = new Blockly.Workspace();
      				
      		Blockly.Xml.domToWorkspace(xml, workspace);

      		var code = Blockly.JavaScript.workspaceToCode(workspace);
		console.log("code: ",code);
      		queueDelay=0;//next sound played starts at no delay
      		eval(code);
      }
