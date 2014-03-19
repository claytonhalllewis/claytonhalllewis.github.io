

var running=false;


var soundTestDef=[{"functionName":"inputOneShot",
			"in":{},
			"out":{"listIn":"th"},
			"extras":{"status":"fresh","name":"freq"}},
			{"functionName":"const",
			"in":{},
			"extras":{"value":400},
			"out":{"value":"fh"}},
			{"functionName":"one",
			"in":{},
			"out":{"val":"one"}},
			{"functionName":"two",
			"in":{},
			"out":{"val":"two"}},
			{"functionName":"tone",
			"in":{"time":"one","freq":"th"},
			"out":{"buffer":"b0"}},
			{"functionName":"tone",
			"in":{"time":"one","freq":"fh"},
			"out":{"buffer":"b1"}},
			{"functionName":"amplify",
			"in":{"buffer":"b1","factor":"two"},
			"out":{"bufferOut":"b3"}},
			{"functionName":"concatSounds",
			"in":{"buffer0":"b0","buffer1":"b3"},
			"out":{"bufferOut":"b4"}},
			{"functionName":"playSound",
			"in":{"buffer":"b4"},
			"out":{}}
		   ];

var counterTestDef=[{"functionName":"outputBox",
			"in":{"listOut":"a1"},
			"out":{}},
			{"functionName":"counter",
			"out":{"value":"a1"},"in":{},
			"extras":{"interval":10,"status":"fresh"}}
		   ];

var reverseTestDef=[	{"functionName":"outputBox",
			"in":{"listOut":"a1"},
			"out":{}},
			{"functionName":"inputOneShot",
			"out":{"listIn":"a0"},"in":{},
			"extras":{"name":"list to reverse","status":"fresh"}},
		    	{"functionName":"reverse",
			"out":{"listOut":"a1"},
			"in":{"listIn":"a0"}}
		   ];
var defReverse=[{"functionName":"fanOut",
		"in":{"input":"listIn"},
		"out":{"result0":"i0","result1":"i1"}},
		{"functionName":"isNull",
		"in":{"listIn":"i0"},
		"out":{"bool":"b0"}},
		{"functionName":"branch",
		"in":{"input":"i1","control":"b0"},
		"out":{"ifTrue":"b1","ifFalse":"b2"}},
		{"functionName":"fanOut",
		"in":{"input":"b2"},
		"out":{"result0":"b20","result1":"b21"}},
		{"functionName":"head",
		"in":{"listIn":"b20"},
		"out":{"listOut":"b3"}},
		{"functionName":"tail",
		"in":{"listIn":"b21"},
		"out":{"listOut":"b4"}},
		{"functionName":"reverse",
		"in":{"listIn":"b4"},
		"out":{"listOut":"b5"}},
		{"functionName":"concat",
		"in":{"list0In":"b5","list1In":"b3"},
		"out":{"listOut":"b6"}},
		{"functionName":"fanIn",
		"in":{"in0":"b1","in1":"b6"},
		"out":{"result":"listOut"}}
		];

var shapeTestDef=[{"functionName":"equitri",
		"in":{},
		"out":{"triangle":"tr"}},
		{"functionName":"white",
		"in":{},
		"out":{"val":"w"}},
		{"functionName":"const",
		"in":{},
		"extras":{"value":.785},
		"out":{"value":"a"}},
		{"functionName":"half",
		"in":{},
		"out":{"val":"z"}},	
		{"functionName":"square",
		"in":{},
		"out":{"square":"sq"}},
		{"functionName":"zoom",
		"in":{"shapeIn":"sq","zoom":"a"},
		"out":{"shapeOut":"zsq"}},
		{"functionName":"zoom",
		"in":{"shapeIn":"tr","zoom":"z"},
		"out":{"shapeOut":"ztr"}},
		{"functionName":"rotate",
		"in":{"shapeIn":"zsq","angle":"a"},
		"out":{"shapeOut":"s1"}},
		{"functionName":"paint",
		"in":{"shapeIn":"ztr","color":"w"},
		"out":{"shapeOut":"a3"}},
		{"functionName":"drawOn",
		"in":{"shape0":"a3","shape1":"s1"},
		"out":{"shape":"r"}},
		{"functionName":"outputShape",
		"in":{"shape":"r"},
		"out":{}}
		 ];

var shapeSpinTestDef=[{"functionName":"equitri",
		"in":{},
		"out":{"triangle":"a0"}},
		{"functionName":"const",
		"in":{},
		"extras":{"value":128},
		"out":{"value":"r"}},
		{"functionName":"const",
		"in":{},
		"extras":{"value":128},
		"out":{"value":"g"}},
		{"functionName":"const",
		"in":{},
		"extras":{"value":2},
		"out":{"value":"b"}},	
		{"functionName":"counter",
		"in":{},
		"out":{"value":"grow"},
		"extras":{"interval":1,"status":"fresh"}},
		{"functionName":"color",
		"in":{"r":"grow","g":"grow","b":"r"},
		"out":{"color":"a1"}},
		{"functionName":"rotate",
		"in":{"shapeIn":"a0","angle":"grow"},
		"out":{"shapeOut":"rotShape"}},
		{"functionName":"paint",
		"in":{"shapeIn":"rotShape","color":"a1"},
		"out":{"shapeOut":"a3"}},
		{"functionName":"outputShape",
		"in":{"shape":"a3"},
		"out":{}}
		 ];
var run=function(name) //triggered by button
{ 

	running=!running;
	if(running)
	{
	    //console.log("running is "+running);
	    //"extras":{"name":"list to reverse","status":"fresh"}},
            evalNode({"functionName":name,"in":{},"out":{},"extras":{"level":"top"}},{});
	}

}
var head=function(arg)
{
	return arg.listIn[0];
}

		
var tail=function(arg)
{
	arg.listIn.shift();
	return arg.listIn;
}

var fanOut=function(arg)
{
	var result=arg.env[arg.node.in.input].value;
	arg.env[arg.node.in.input].available=false;
	arg.env[arg.node.out.result0].value=result;
	arg.env[arg.node.out.result0].available=true;
	arg.env[arg.node.out.result1].value=result;
	arg.env[arg.node.out.result1].available=true;
}
//{"functionName":"isNull","in":{"input":"IN"},"out":{"list":"b0"}}
var isNull=function(arg)
{
	return (arg.listIn.length==0);
}
var concat=function(arg)
{   var result;
	if (arg.list0In==null)
    {
		result= arg.list1In;
    }
    else
    {
        var newList=[];
        for (var s in arg.list0In)
        {
            newList[s]=arg.list0In[s];
        }
        result= newList.concat(arg.list1In);
    }
    console.log("concat list0In: "+arg.list0In+" list1In: "+arg.list1In+" result: "+result);
    return result;
}
//"add":{"type":"prim","function":add,"sig":{"out":["sum"],"in":["n0","n1"]}},
var add=function(arg)
{
	return arg.n0+arg.n1;
}



//needs to be special so can get at extra field of node
var inputPromptNew=function(arg)
{
	utter(arg.node.extras.name);
	arg.env[arg.node.out.listIn].available="pending";
	setTimeout(function(){inputPromptContinue(arg);},500);
}
var inputPromptContinue=function(arg)
{
	//console.log(arg);
		
//console.log("setting avail of "+arg.node.out.value+" to "+true);
	arg.env[arg.node.out.listIn].value=eval(prompt(arg.node.extras.name));
	arg.env[arg.node.out.listIn].available=true;
}
var inputOneShot=function(arg)
{
	console.log(arg);
	if (arg.node.extras.status=="fresh")
	{
		utter(arg.node.extras.name);
		arg.node.extras.status="used";
		arg.env[arg.node.out.listIn].available="pending";
		setTimeout(function(){inputOneShotContinue(arg);},500);
	}
	//does nothing after the first time
	
}
var inputOneShotContinue=function(arg)
{
	console.log(arg);
		
	//console.log("setting avail of "+arg.node.out.value+" to "+true);
	arg.env[arg.node.out.listIn].value=eval(prompt(arg.node.extras.name));
	arg.env[arg.node.out.listIn].available=true;
		
		
}
//"counter":{"type":"special","function":counter,"sig":{"out":["value"],"in":[],"extras":["value","interval","status"]}},
var counter=function(arg)
{
	if (arg.node.extras.status=="fresh")
	{	
		arg.env[arg.node.out.value].value=0;
		arg.node.extras.status="used";
		arg.env[arg.node.out.value].available=true;
	}
	else
	{
				setTimeout(function(){
		arg.env[arg.node.out.value].value=arg.env[arg.node.out.value].value+1;
		arg.env[arg.node.out.value].available=true;},arg.node.extras.interval);
	}
}

var outputAlert=function(arg)
{
    alert(arg.listOut);
    return("dummy");
}


var evalNode=function(node,callingEnv)
{
	if (!running)
		return;
	console.log("evalNode "+node.functionName);
	console.log("trace.........................................."); //trace
	//alert("trace");
	if (dict[node.functionName].type=="prim")
		evalPrim(node,callingEnv);

	else if (dict[node.functionName].type=="def")
		evalDef(node,callingEnv); 
	else if (dict[node.functionName].type=="special")
		evalSpecial(node,callingEnv);
	else alert("invalid node functionName");
	//console.log("finish evalNode "+node.functionName);
}

var evalPrim=function(node,callingEnv)
{
	console.log("entering eval prim "+node.functionName);
	var value=dict[node.functionName].function.apply(null,[makeArg(node,callingEnv)]);
	//console.log("value is "+value);
	var sel;
	var diff;
    //consume inputs
    for(sel in node.in)
    {
       callingEnv[node.in[sel]].available=false;
    }
	for (sel in node.out)
	{
        //console.log("edge is "+node.out[sel]);
        //console.log("value in callingEnv is "+callingEnv[node.out[sel]].value);
		
		//callingEnv[node.out[sel]].available=diff;
		//console.log("eval of "+node.functionName+" sets avail of "+node.out[sel]+" to "+diff);
		callingEnv[node.out[sel]].value=value; //##redundant if no change
        //console.log(node.functionName+" produces "+value);
        console.log("now value in callingEnv is "+callingEnv[node.out[sel]].value);
		callingEnv[node.out[sel]].available=true;
        

		//console.log("eval of "+node.functionName+" sets avail of "+node.out[sel]+" to "+callingEnv[node.out[sel]].available);
		//console.log("changed is "+diff);
		return; //hack: only process first out for prims
	}
}
var evalSpecial=function(node,callingEnv)
{
	console.log("entering eval special "+node.functionName);
	dict[node.functionName].function.apply(null,[makeSpecialArg(node,callingEnv)]);
}

var makeSpecialArg=function(node,callingEnv)
{
	var arg={};
	arg.node=node;
	arg.env=callingEnv;
	return arg;
}
	
//{"functionName":"concat",
//		"in":{"listIn0":"b5","listIn1":"b3"},
//		"out":{"listOut":"b6}}
var makeArg=function(node,callingEnv)
{
	var arg={};
	var sel;
    console.log("args for "+node.functionName);
	for (sel in node.in)
	{
        console.log(node.in[sel]);
		arg[sel]=callingEnv[node.in[sel]].value;
	}
	return arg;
}
var fanIn=function(node,callingEnv) //if either of the inputs is available, passes it along
{
//will only be called if at least one is available
//use in0 if it is available and in1 otherwise
//consume both inputs

    //console.log("in fanin... avail for in0 and in1");
    //console.log(callingEnv[node.in.in0].available);
    //console.log(callingEnv[node.in.in1].available);
	console.log("fanin firing");
	console.log("trace.........................................."); //trace
	//alert("trace");
    
    var result;
	if (callingEnv[node.in.in0].available)
	{
		result=callingEnv[node.in.in0].value;
	}
    else
    {
        result=callingEnv[node.in.in1].value;
    }
    callingEnv[node.in.in0].available=false;
    callingEnv[node.in.in1].available=false;
	callingEnv[node.out.result].value=result;
	callingEnv[node.out.result].available=true;
    //console.log("fanin in0 is "+callingEnv[node.in.in0].value+" in1 is "+callingEnv[node.in.in1].value+" result is "+result);
	//console.log("in fanIn setting "+node.out.result+" avail to true");
}
var fanInReady=function(node,env)
{
	//one of the inputs needs to be available 
	//and also not the output
	//console.log("fanInReady "+node.out.result+" "+node.functionName);
	//console.log(node.in.in0);
	//console.log(node.in.in1);

	return (((env[node.in.in0].available==true) || (env[node.in.in1].available==true))&&(env[node.out.result].available==false));
}
var inputOneShotReady=function(node,env)
{
	//output not available
	//and status="fresh"
return ((env[node.out.listIn].available==false)&&(node.extras.status=="fresh"));
}

var resetStatus=function(def)
{
/*
var reverseTestDef=[	{"functionName":"outputBox",
			"in":{"listOut":"a1"},
			"out":{}},
			{"functionName":"inputOneShot",
			"out":{"listIn":"a0"},"in":{},
			"extras":{"name":"list to reverse","status":"fresh"}},
		    	{"functionName":"reverse",
			"out":{"listOut":"a1"},
*/
	for(var n in def)
	{
		if((def[n].extras)&&(def[n].extras.status))
		{
			def[n].extras.status="fresh";
		}
	}
}
var evalDef=function(node,callingEnv)
{
	console.log("start evalDef "+node.functionName);
    console.log("at entry to "+node.functionName+" env is ");
    console.log(callingEnv);
    //alert();
	var def=dict[node.functionName].def;
	//console.log("evaluating def for: "+node.functionName);
    //console.log("CREATING NEW ENVIRONMENT");
	//reset all status attributes
	resetStatus(def);
	var newEnv={};
	//add input names to newEnv, with values from callingEnv and available true
	addInputNames(newEnv,node,callingEnv);
	//add node names to newEnv, with values null and available false
	addNodeNames(newEnv,def);
	//console.log("local environment at start: ");
    //alert();
    //console.log(newEnv);
	//alert("check newEnv");
	for (sel in node.in)
	{
		callingEnv[node.in[sel]].available="pending"; //neither available nor consumed
	}
	
	evalDefLoop(0,def,newEnv,node,callingEnv);
	
}

var evalDefLoop=function(start,def,newEnv,node,callingEnv)
{
	if (!running)
		return;
	console.log("trace.........................................."); //trace
	//alert("trace");
   var sel;
   if (start==def.length)
   		start=0;
   console.log("STARTING evaldefloop");
   
   for (sel=start;sel<def.length;sel++)
   {
	//console.log("evaluating "+def[sel].functionName);
	if(def[sel].functionName=="fanIn")
	{
		if(fanInReady(def[sel],newEnv))
		{
			//console.log("fanIn fires");
			fanIn(def[sel],newEnv);
            	 setTimeout(function(){evalDefLoop(sel+1,def,newEnv,node,callingEnv);},1);
            	    	return;
		}
	}
	else if(def[sel].functionName=="inputOneShot")
	{
		if (inputOneShotReady(def[sel],newEnv))
		{
			evalNode(def[sel],newEnv);
            	 setTimeout(function(){evalDefLoop(sel+1,def,newEnv,node,callingEnv);},1);
            	    	return;
		}
	}
	else if (ready(def[sel], newEnv))
	{
		evalNode(def[sel],newEnv);
         	setTimeout(function(){evalDefLoop(sel+1,def,newEnv,node,callingEnv);},1);
         	return;
         }
     	
    }
    if ((start>0)||workPending(newEnv))
    {
    	setTimeout(function(){evalDefLoop(0,def,newEnv,node,callingEnv);},1);
        return;
    }
	console.log("............quiescent");
	for (sel in node.in)
	{
		callingEnv[node.in[sel]].available=false; //now consumed
	}
    console.log("............quiescent2");

	for (sel in node.out)
	{
		callingEnv[node.out[sel]].value=newEnv[sel].value;
      		//console.log("setting "+node.out[sel]);
        	//console.log(node.functionName+" produces "+newEnv[sel].value);
		callingEnv[node.out[sel]].available=newEnv[sel].available;
		//console.log("setting "+node.out[sel]+" avail to"+newEnv[sel].available);
	}
	console.log("............quiescent3");

    	console.log("at exit from "+node.functionName+" env is ");
    	console.log(callingEnv);


	if ((node.extras)&&(node.extras.level))
	{
		//alert("top level ending!");
		running=false;
	}

  
    
    	//console.log(def);
   	//alert("end of evaldefloop");

}
	

var workPending=function(env)
{
	for(var edge in env)
	{
		if (env[edge].available=="pending")
			return true;
	}
	return false;
}

//"b1":{"functionName":"branch","arg":{"input":"IN","control":"b0","ifNot":"b2"}},
var branch=function(arg) //puts value out on one of two paths
{
	//make one of the outputs available
	//console.log(arg);
	//console.log("in branch");
    
	var val=arg.env[arg.node.in.input].value;
	if(arg.env[arg.node.in.control].value)
	{
		//console.log("true branch");
		arg.env[arg.node.out.ifTrue].value=val;
		arg.env[arg.node.out.ifTrue].available=true;
        	arg.env[arg.node.out.ifFalse].available=false;
	}
	else
	{
		//console.log("false branch");
		arg.env[arg.node.out.ifFalse].value=val;
		arg.env[arg.node.out.ifFalse].available=true;
        	arg.env[arg.node.out.ifTrue].available=false;
	}
	arg.env[arg.node.in.control].available=false;
	arg.env[arg.node.in.input].available=false;
}
var constant=function(arg)
{
	//console.log("const fires");
	//this is a "special" because it has an extra as its value
	arg.env[arg.node.out.value].available=true;	
//console.log("setting avail of "+arg.node.out.value+" to "+true);
	arg.env[arg.node.out.value].value=arg.node.extras.value;
}


var outputBox=function(arg)
{
	//console.log("output box fires");
	
	document.getElementById("outputBox").value=arg.listOut;
	return false; //can't change anything
}


var outputShape=function(arg)
{
	//console.log("output shape fires");
    var htmlID="theCanvasID";
	drawRevised(arg.shape,htmlID);
	return "dummy";
}
function drawRevised(drawFn,canvasID) 
{  
      //console.log("drawing");
      var canvas = document.getElementById(canvasID);  
      if (canvas.getContext) {  
       var ctx = canvas.getContext("2d");    
	var p={x:0,y:0};
	for (x=0;x<150;x++)
	{
		for(y=0;y<150;y++)
		{
			p.x=x-75;
			p.y=75-y;
			//console.log(drawFn(p));
			ctx.fillStyle = drawFn(p);
			ctx.fillRect (x, y, 1, 1);  
		}

       }  
    }  
}

	
	
//{"functionName":"concat",
//		"in":{"listIn0":"b5","listIn1":"b3"},
//		"out":{"listOut":"b6}}
var addInputNames=function(newEnv,node,callingEnv)
{
	//these are node names in in of the node
	var aname;
	for (aname in node.in)
	{
		var theEdge=node.in[aname];
		newEnv[aname]={};
		//newEnv[aname].value=callingEnv[theEdge].value;
        newEnv[aname].value=JSON.parse(JSON.stringify(callingEnv[theEdge].value));
		newEnv[aname].available=true;
	}
}

var addNodeNames=function(newEnv,def)
{
	var index;
	var aname;
	for (index in def)
	{
		for (aname in def[index].out)
		{
			var theEdge=def[index].out[aname];
			newEnv[theEdge]={};
			newEnv[theEdge].value=null;
			newEnv[theEdge].available=false;
		}
	}
}



var ready=function(node,env)
{	
	console.log("checking ready for "+node.functionName);
	console.log("inputs avail is "+inputsAvail(node,env));
	console.log("outputs not avail is "+outputsNotAvail(node,env));
	//return inputsAvail(node,env);
	return (inputsAvail(node,env)&&outputsNotAvail(node,env));
}
var inputsAvail=function(node,env)
{
	var a;
	var inputConnectorNames=dict[node.functionName].sig.in;
	//for (a in node.in)
	for (a in inputConnectorNames)
	{
		//console.log("checking "+inputConnectorNames[a]);
		//console.log(node.in[inputConnectorNames[a]]);
		if (env[node.in[inputConnectorNames[a]]].available!=true)
		{
			//console.log(node.functionName+" not ready");
			return false;
		}
	}
	//console.log(node.functionName+" ready");
	return true;
}


var outputsNotAvail=function(node,env)
{
	var anOutput;
	//console.dir(env);
	var outputConnectorNames=dict[node.functionName].sig.out;
	//for (anOutput in node.out)
	for (anOutput in outputConnectorNames)
	{
		//console.log("in outputsNotAvail looking up "+outputConnectorNames[anOutput]);
		//console.log("...and looking up "+node.out[outputConnectorNames[anOutput]]);
		if (env[node.out[outputConnectorNames[anOutput]]].available!=false)
			return false;
	}
	return true;
}


//statement below assigns to vbl in nonvisual.js
headings=[
//name, start, length
{"name":"sounds","start": 0,"length": 10},
{"name":"sound operations","start": 10,"length": 5},
{"name":"list operations","start": 15,"length": 5},
{"name":"input output","start": 20,"length": 3},
{"name":"numbers","start":23,"length":10},
{"name":"numerical operations","start": 33,"length": 4},
{"name":"control","start": 37,"length": 3},
{"name":"shapes","start": 40,"length": 2},
{"name":"shape operations","start": 42,"length": 7},
{"name":"colors","start":49,"length":6},
{"name":"examples","start": 55,"length": 5},
{"name":"internal","start": 60,"length": 2},
{"name":"new","start": 62,"length": 0}
];
var dict={
"noteC":{"type":"prim", "function":noteC,"sig":{"out":["buffer"],"in":[]}},//no args
"noteD":{"type":"prim", "function":noteD,"sig":{"out":["buffer"],"in":[]}},//no args
"noteE":{"type":"prim", "function":noteE,"sig":{"out":["buffer"],"in":[]}},//no args
"noteF":{"type":"prim", "function":noteF,"sig":{"out":["buffer"],"in":[]}},//no args
"noteG":{"type":"prim", "function":noteG,"sig":{"out":["buffer"],"in":[]}},//no args
"noteA":{"type":"prim", "function":noteA,"sig":{"out":["buffer"],"in":[]}},//no args
"noteB":{"type":"prim", "function":noteB,"sig":{"out":["buffer"],"in":[]}},//no args
"noteC5":{"type":"prim", "function":noteC5,"sig":{"out":["buffer"],"in":[]}},//no args
"silence":{"type":"prim", "function":silence,"sig":{"out":["buffer"],"in":[]}},//no args
"tone":{"type":"prim", "function":tone,"sig":{"out":["buffer"],"in":["freq","time"]}}, 

"amplify":{"type":"prim", "function":amplify,"sig":{"out":["bufferOut"],"in":["buffer","factor"]}}, 
"attenuate":{"type":"prim", "function":attenuate,"sig":{"out":["bufferOut"],"in":["buffer"]}}, //buffer
"mixSounds":{"type":"prim", "function":mixSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, //buffer0,buffer1
"concatSounds":{"type":"prim", "function":concatSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, //buffer0,buffer1 (example dict entry)
"playSound":{"type":"prim", "function":playSound, "sig":{"out":[],"in":["buffer"]}},//no args

"head":{"type":"prim","function":head, "sig":{"out":["listOut"],"in":["listIn"]}},
"tail":{"type":"prim","function":tail,"sig":{"out":["listOut"],"in":["listIn"]}},
"concat":{"type":"prim","function":concat,"sig":{"out":["listOut"],"in":["list0In","list1In"]}},
"isNull":{"type":"prim","function":isNull,"sig":{"out":["bool"],"in":["listIn"]}},
"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
	    
"inputOneShot":{"type":"special","function":inputOneShot,"sig":{"out":["listIn"],"in":[],"extras":["name","status"]}},
"inputPrompt":{"type":"special","function":inputPromptNew,"sig":{"out":["listIn"],"in":[],"extras":["name"]}},	
"outputBox":{"type":"prim","function":outputBox,"sig":{"out":[],"in":["listOut"]}},

"const":{"type":"special","function":constant,"sig":{"out":["value"],"in":[],"extras":["value"]}},
"counter":{"type":"special","function":counter,"sig":{"out":["value"],"in":[],"extras":["value","interval","status"]}},
"halfside":{"type":"prim", "function":halfside,"sig":{"out":["val"],"in":[]}},//no args
"half":{"type":"prim", "function":half,"sig":{"out":["val"],"in":[]}},//no args
"quarter":{"type":"prim", "function":quarter,"sig":{"out":["val"],"in":[]}},//no args
"one":{"type":"prim", "function":one,"sig":{"out":["val"],"in":[]}},//no args
"two":{"type":"prim", "function":two,"sig":{"out":["val"],"in":[]}},//no args
"pi":{"type":"prim", "function":pi,"sig":{"out":["val"],"in":[]}},//no args
"hundred":{"type":"prim", "function":hundred,"sig":{"out":["val"],"in":[]}},//no args
"twofiftyfive":{"type":"prim", "function":twofiftyfive,"sig":{"out":["val"],"in":[]}},//no args
    
"add":{"type":"prim","function":add,"sig":{"out":["sum"],"in":["n0","n1"]}},
"times":{"type":"prim","function":times,"sig":{"out":["sum"],"in":["n0","n1"]}},
"minus":{"type":"prim","function":minus,"sig":{"out":["sum"],"in":["n0","n1"]}},
"divide":{"type":"prim","function":divide,"sig":{"out":["sum"],"in":["n0","n1"]}},

"branch":{"type":"special","function":branch,"sig":{"out":["ifTrue","ifFalse"],"in":["input","control"]}},
"fanIn":{"type":"special","function":fanIn,"sig":{"out":["result"],"in":["in0","in1"]}},
"fanOut":{"type":"special","function":fanOut,"sig":{"out":["result0","result1"],"in":["input"]}},

"square":{"type":"prim", "function":square,"sig":{"in":[],"out":["square"]}}, 	
"equitri":{"type":"prim", "function":equitri,"sig":{"in":[],"out":["triangle"]}}, 

"color":{"type":"prim", "function":color,"sig":{"in":["r","g","b"],"out":["color"]}},
"outputShape":{"type":"prim","function":outputShape,"sig":{"out":[],"in":["shape"]}}, //no out in the signature
"paint":{"type":"prim", "function":paint, "sig":{"in":["shapeIn","color"],"out":["shapeOut"]}}, 
"rotate":{"type":"prim", "function":rotate,"sig":{"in":["shapeIn","angle"],"out":["shapeOut"]}}, 
"shift":{"type":"prim", "function":shift,"sig":{"in":["shapeIn","dx","dy"],"out":["shapeOut"]}}, 
"zoom":{"type":"prim", "function":zoom,"sig":{"in":["shapeIn","zoom"],"out":["shapeOut"]}}, 
"drawOn":{"type":"prim", "function":drawOn,"sig":{"in":["shape0","shape1"],"out":["shape"]}},

"white":{"type":"prim", "function":white,"sig":{"out":["val"],"in":[]}},//no args
"black":{"type":"prim", "function":black,"sig":{"out":["val"],"in":[]}},//no args
"red":{"type":"prim", "function":red,"sig":{"out":["val"],"in":[]}},//no args
"blue":{"type":"prim", "function":blue,"sig":{"out":["val"],"in":[]}},//no args
"green":{"type":"prim", "function":green,"sig":{"out":["val"],"in":[]}},//no args
"yellow":{"type":"prim", "function":yellow,"sig":{"out":["val"],"in":[]}},//no args

"reverseTestDef":{"type":"def","def":reverseTestDef,"sig":{"out":[],"in":[]}},
"counterTestDef":{"type":"def","def":counterTestDef,"sig":{"out":[],"in":[]}},
"shapeSpinTestDef":{"type":"def","def":shapeSpinTestDef,"sig":{"out":[],"in":[]}},
"soundTestDef":{"type":"def","def":soundTestDef,"sig":{"out":[],"in":[]}},
"shapeTestDef":{"type":"def","def":shapeTestDef,"sig":{"out":[],"in":[]}},

"externalIn":{"type":"external","sig":{}},
"externalOut":{"type":"external","sig":{}}
};


	
