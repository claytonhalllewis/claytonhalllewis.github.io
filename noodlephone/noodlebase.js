//javascript for noodle
//set up
var inBox=document.getElementById("input");
var outBox=document.getElementById("output");
var nameBox=document.getElementById("name");
var running=false;
var changed=false;
var loopFn;
var reverseTestDef=[{"functionName":"inputPrompt",
			"out":{"listIn":"a0"},"in":{}},
		    {"functionName":"reverse",
			"out":{"listOut":"a1"},
			"in":{"listIn":"a0"}},
		     {"functionName":"outputAlert",
			"in":{"listOut":"a1"},
			"out":{}}
			
		   ];
var defReverse=[{"functionName":"isNull",
		"in":{"listIn":"listIn"},
		"out":{"bool":"b0"}},
		{"functionName":"branch",
		"in":{"input":"listIn","control":"b0"},
		"out":{"ifTrue":"b1","ifFalse":"b2"}},
		{"functionName":"head",
		"in":{"listIn":"b2"},
		"out":{"listOut":"b3"}},
		{"functionName":"tail",
		"in":{"listIn":"b2"},
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
		"out":{"triangle":"a0"}},
		{"functionName":"const",
		"in":{"value":0},
		"out":{"value":"r"}},
		{"functionName":"const",
		"in":{"value":0},
		"out":{"value":"g"}},
		{"functionName":"inputPrompt",
		"in":{},
		"out":{"listIn":"b"}},
		{"functionName":"color",
		"in":{"r":"r","g":"g","b":"b"},
		"out":{"color":"a1"}},
		{"functionName":"paint",
		"in":{"shapeIn":"a0","color":"a1"},
		"out":{"shapeOut":"a2"}},
		{"functionName":"outputShape",
		"in":{"shape":"a2"},
		"out":{}}
		 ];
var shapeSpinTestDef=[{"functionName":"equitri",
		"in":{},
		"out":{"triangle":"a0"}},
		{"functionName":"const",
		"in":{"value":128},
		"out":{"value":"r"}},
		{"functionName":"const",
		"in":{"value":128},
		"out":{"value":"g"}},
		{"functionName":"inputBox",
		"in":{},
		"out":{"listIn":"b"}},
		{"functionName":"fanIn",
		"in":{"in0":"grow","in1":"b"},
		"out":{"result":"a2"}},
		{"functionName":"add",
		"in":{"n0":"b","n1":"a2"},
		"out":{"sum":"grow"}},
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
var boxTestDef=[{"functionName":"inputBox",
		"in":{"htmlID":"inBoxID"},
		"out":{"listOut":"a1"}},
		{"functionName":"outputBox",
		"in":{"listIn":"a1"},
		"out":{"htmlID":"outBoxID"}}
		];
var addTestDef=[{"functionName":"inputBox",
		"in":{"htmlID":"inBoxID"},
		"out":{"listOut":"a1"}},
		{"functionName":"inputBox",
		"in":{"htmlID":"inBox2ID"},
		"out":{"listOut":"a2"}},
		{"functionName":"add",
		"in":{"n0":"a1","n1":"a2"},
		"out":{"sum":"a3"}},
		{"functionName":"outputBox",
		"in":{"listIn":"a3"},
		"out":{"htmlID":"outBoxID"}}
		];
var runTestDef=[{"functionName":"inputBox",
		"in":{"htmlID":"inBoxID"},
		"out":{"listOut":"a1"}},
		{"functionName":"fanIn",
		"in":{"in0":"a3","in1":"a1"},
		"out":{"result":"a2"}},
		{"functionName":"add",
		"in":{"n0":"a1","n1":"a2"},
		"out":{"sum":"a3"}},
		{"functionName":"outputBox",
		"in":{"listIn":"a3"},
		"out":{"htmlID":"outBoxID"}}
		];
var runConstTestDef=[{"functionName":"const",
		"in":{"value":3},
		"out":{"value":"a1"}},
		{"functionName":"fanIn",
		"in":{"in0":"a3","in1":"a1"},
		"out":{"result":"a2"}},
		{"functionName":"add",
		"in":{"n0":"a1","n1":"a2"},
		"out":{"sum":"a3"}},
		{"functionName":"outputBox",
		"in":{"listIn":"a3"},
		"out":{"htmlID":"outBoxID"}}
		];
var run=function(name) //triggered by button
{ 
	if (changed)
	{
		running=!running;
		changed=false;
	}
	else 
	{
		running=true;
		//console.log("running is "+running);at w
        evalNode({"functionName":name,"in":{},"out":{}},{});
		//runTests();
		//reverseExample();	
		//addExample();
		//runExample();
		//runConstExample();
		//shapeExample();	
		//shapeSpinExample();
		//boxExample();
	}
}
var runExample=function()
{
	var env={};
	evalNode({"functionName":"runTestDef","in":{},"out":{}},env);	
} 
var runConstExample=function()
{
	var env={};
	evalNode({"functionName":"runConstTestDef","in":{},"out":{}},env);	
} 
var addExample=function()
{
	var env={};
	evalNode({"functionName":"addTestDef","in":{},"out":{}},env);	
} 
var shapeExample=function()
{
	var env={};
	evalNode({"functionName":"shapeTestDef","in":{},"out":{}},env);	
}
var shapeSpinExample=function()
{
	var env={};
	evalNode({"functionName":"shapeSpinTestDef","in":{},"out":{}},env);	
}
var boxExample=function()
{
	var env={};
	evalNode({"functionName":"boxTestDef","in":{},"out":{}},env);	
}

var reverseExample= function()
{
	var env={};
	evalNode({"functionName":"reverseTestDef","in":{},"out":{}},env);
	
}
var runTests=function()
{
	headTest();
	tailTest();
	isNullTest();
	dictTest();
	makeArgTest();
	evalPrimTest();
	addInputNamesTest();
	addNodeNamesTest();
	inputsAvailTest();
	outputsNotAvailTest();
	concatTest();
}
var dictTest=function()
{
	console.dir(dict);
	 ("check dict");
}
var head=function(arg)
{
	return arg.listIn[0];
}
var headTest=function()
{
	console.log("start headTest");
	var ans=head({"listIn":[1,2,3]});
	if (ans!=1)
	{
		alert("headTest failed");
	}
	console.log("end headTest");
}
		
var tail=function(arg)
{
	arg.listIn.shift();
	return arg.listIn;
}
var tailTest=function()
{
	console.log("start tailTest");
	var ans=tail({"listIn":[1,2,3]});
	if ((ans[0]!=2)||(ans[1]!=3))
	{
		alert("tailTest failed");
	}
	console.log("end tailTest");
}
//{"functionName":"isNull","in":{"input":"IN"},"out":{"list":"b0"}}
var isNull=function(arg)
{
	return (arg.listIn.length==0);
}
var isNullTest=function()
{
	console.log("start isNullTest");
	var ans0=isNull({"input":[1,2,3]});
	var ans1=isNull({"input":[]});
	if(ans0||!ans1)
		alert("isNullTest failed");
	console.log("end isNullTest");
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
var concatTest=function()
{
	console.log("start concatTest");
	var ans=concat({"listIn0":[1,2,3],"listIn1":[4,5]});
	if ((ans[0]!=1)||(ans[4]!=5))
	{
		alert("concatTest failed");
	}
	console.log("end concatTest");
}

var inp=function()
{
	return eval(inBox.value);
}
/*
//special version replaced by prim
var inputPrompt=function(arg)
{
    var val=eval(prompt("input?"));
    var changed=different(val,arg.env[arg.node.out.listIn].value);
    arg.env[arg.node.out.listIn].available=true;	
	arg.env[arg.node.out.listIn].value=val;
	return changed;

    return eval(prompt("input?"));
}
*/
var inputPrompt=function(arg)
{
    return eval(noodlePrompt("input?"));
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
	//console.log("evalNode "+node.functionName);
	if (dict[node.functionName].type=="prim")
		return evalPrim(node,callingEnv);

	else if (dict[node.functionName].type=="def")
		return evalDef(node,callingEnv); 
	else if (dict[node.functionName].type=="special")
		return evalSpecial(node,callingEnv);
	else alert("invalid node functionName");
	//console.log("finish evalNode "+node.functionName);
}
var different=function(oldValue,newValue)
{
	return (oldValue!=newValue);
}
var evalPrim=function(node,callingEnv)
{
	//console.log("entering eval prim "+node.functionName);
	var value=dict[node.functionName].function.apply(null,[makeArg(node,callingEnv)]);
	//console.log("value is "+value);
	var sel;
	var diff;
    //consume inputs
    //for(sel in node.in)
    //{
    //    callingEnv[node.in[sel]].available=false;
    //}
	for (sel in node.out)
	{
        //console.log("edge is "+node.out[sel]);
        //console.log("value in callingEnv is "+callingEnv[node.out[sel]].value);
		diff=different(value,callingEnv[node.out[sel]].value);

		//callingEnv[node.out[sel]].available=diff;
		//console.log("eval of "+node.functionName+" sets avail of "+node.out[sel]+" to "+diff);
		callingEnv[node.out[sel]].value=value; //##redundant if no change
        //console.log(node.functionName+" produces "+value);
        //console.log("now value in callingEnv is "+callingEnv[node.out[sel]].value);
		callingEnv[node.out[sel]].available=true;
        callingEnv[node.out[sel]].changed=diff;

		//console.log("eval of "+node.functionName+" sets avail of "+node.out[sel]+" to "+callingEnv[node.out[sel]].available);
		//console.log("changed is "+diff);
		return diff; //hack: only process first out for prims
	}
}
var evalSpecial=function(node,callingEnv)
{
	//console.log("entering eval special "+node.functionName);
	return dict[node.functionName].function.apply(null,[makeSpecialArg(node,callingEnv)]);
}
var defExample=[{"functionName":"inp","in":{},"out":{"listOut":"b0"}},
		{"functionName":"head","in":{"listIn":"b0"},"out":{"listOut":"b1"}}
		];
var envExample={"b0":{"value":[1,2,3],"available":true},"b1":{"value":1,"available":true}};
var makeSpecialArg=function(node,callingEnv)
{
	var arg={};
	arg.node=node;
	arg.env=callingEnv;
	return arg;
}
var evalPrimTest=function()
{
	console.log("start evalPrimTest");
	evalPrim(defExample[1],envExample);
	var ans=envExample.b1.value;
	if (ans!=1)
	{
		alert("evalPrimTest failed");
	}
	console.log("end evalPrimTest");
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
var makeArgTest=function()
{
	var ans=makeArg(defExample[1],envExample);
	console.dir(ans);
	alert("check makeArg");
}
var fanIn=function(node,callingEnv) //if either of the inputs is available, passes it along
{
//will only be called if at least one is available
//use in0 if it is available and in1 not, or both are avail
//and in0 has changed... else in1
    console.log("in fanin... changed and avail for in0 and in1");
    console.log(callingEnv[node.in.in0].changed);
    console.log(callingEnv[node.in.in0].available);
    console.log(callingEnv[node.in.in1].changed);
    console.log(callingEnv[node.in.in1].available);
    
    var diff;
    var result;
	if ((callingEnv[node.in.in0].available&&!callingEnv[node.in.in1].available)||((callingEnv[node.in.in0].available&&callingEnv[node.in.in1].available)&&callingEnv[node.in.in0].changed))
	{
		result=callingEnv[node.in.in0].value;
	}
    else
    {
        result=callingEnv[node.in.in1].value;
    }
	diff=different(result,callingEnv[node.out.result].value);
    callingEnv[node.out.result].changed=diff;
	callingEnv[node.out.result].value=result;
	callingEnv[node.out.result].available=true;
    console.log("fanin in0 is "+callingEnv[node.in.in0].value+" in1 is "+callingEnv[node.in.in1].value+" result is "+result);
	//console.log("in fanIn setting "+node.out.result+" avail to true");
    return diff;
}
var fanInReady=function(node,env)
{
	//one of the inputs needs to be available 
	//and also not the output
	//console.log("fanInReady "+node.out.result+" "+node.functionName);
	//console.log(node.in.in0);
	//console.log(node.in.in1);

	return (env[node.in.in0].available || env[node.in.in1].available);
}

var evalDef=function(node,callingEnv)
{
	console.log("start evalDef "+node.functionName);
    console.log("at entry to "+node.functionName+" env is ");
    //alert();
    console.log(callingEnv);
	var def=dict[node.functionName].def;
	//console.log("evaluating def for: "+node.functionName);
    console.log("CREATING NEW ENVIRONMENT");
	var newEnv={};
	//add input names to newEnv, with values from callingEnv and available true
	addInputNames(newEnv,node,callingEnv);
	//add node names to newEnv, with values null and available false
	addNodeNames(newEnv,def);
	console.log("local environment at start: ");
    //alert();
    console.log(newEnv);
	//alert("check newEnv");
	changed=true;
	//process nodes while changed true
	evalDefLoop(def,newEnv);
	console.log("end def eval for "+node.functionName);
	var diff;
	for (sel in node.out)
	{
		diff=different(callingEnv[node.out[sel]].value,newEnv[sel].value);
		changed=changed||diff;
		
		callingEnv[node.out[sel]].value=newEnv[sel].value;
        //console.log("setting "+node.out[sel]);
        //console.log(node.functionName+" produces "+newEnv[sel].value);
		//callingEnv[node.out[sel]].available=diff;
		callingEnv[node.out[sel]].available=newEnv[sel].available;
		//console.log("setting "+node.out[sel]+" avail to "+newEnv[sel].available);
        callingEnv[node.out[sel]].changed=diff;
	}
    console.log("at exit from "+node.functionName+" env is ");
    console.log(callingEnv);
    //alert();
	return changed;
}
var evalDefLoop=function(def,newEnv)
{
    var used=[];
    for (var n in def)
    {
        used[n]=false;
    }
    var someoneFired=true;
	//process nodes while changed running and 
	while(running&&someoneFired)
	{
		someoneFired=false;
		var sel;
        console.log("STARTING evaldefloop");
		for (sel in def)
		{
            if(!used[sel])//ignore nodes that are used
            {
			//console.log("evaluating "+def[sel].functionName);
			if(def[sel].functionName=="fanIn")
			{
				if(fanInReady(def[sel],newEnv))
				{
					//console.log("fanIn fires");
					fanIn(def[sel],newEnv);
                    used[sel]=true;
                    someoneFired=true;
				}
			}
			else if (ready(def[sel], newEnv))
			{
                evalNode(def[sel],newEnv);
                used[sel]=true;
                someoneFired=true;
            }
            }
        }
        //console.log(def);
        //alert("end of evaldefloop");
    }
		
		
}
/*old version that sort of does animation
var evalDefLoop=function(def,newEnv)
{
   
	//process nodes while changed running and 
    //console.log("STARTING OUTER EVAL LOOP");
	//if (running&&changed)
	//{
		changed=false;
		var sel;
        console.log("STARTING INNER EVAL LOOP");
		for (sel in def)
		{
			console.log("evaluating "+def[sel].functionName);
			if(def[sel].functionName=="fanIn")
			{
				if(fanInReady(def[sel],newEnv))
				{
					//console.log("fanIn fires");
					fanIn(def[sel],newEnv);
				}
			}
			else if (ready(def[sel], newEnv))
			{
				changed=evalNode(def[sel],newEnv)||changed;
			}
		}
        //console.log("ENDING INNER EVAL LOOP");
        loopFn=function()
        {
            if(running&&changed)
            {
                evalDefLoop(def,newEnv);
            }
        }
		
		setTimeout("loopFn()",5);
	
    //console.log("ENDING OUTER EVAL LOOP");
}
*/
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
        arg.env[arg.node.out.ifTrue].changed=different(val,arg.env[arg.node.out.ifTrue].value);
		arg.env[arg.node.out.ifTrue].value=val;
		arg.env[arg.node.out.ifTrue].available=true;
        arg.env[arg.node.out.ifFalse].available=false;
	}
	else
	{
		//console.log("false branch");
        arg.env[arg.node.out.ifFalse].changed=different(val,arg.env[arg.node.out.ifFalse].value);
		arg.env[arg.node.out.ifFalse].value=val;
		arg.env[arg.node.out.ifFalse].available=true;
        arg.env[arg.node.out.ifTrue].available=false;
	}
	return false; //can't change anything
}
var constant=function(arg)
{
	//console.log("const fires");
	//this is a "special" because it treats its in edge not as an edge but as a value
	var val=arg.node.in.value;
	arg.env[arg.node.out.value].available=true;	
//console.log("setting avail of "+arg.node.out.value+" to "+true);
	arg.env[arg.node.out.value].value=val;
	return false; //const cannot change
}
/*
//special version replaced by prim
var inputBox=function(arg)
{
	console.log("input box fires");
	//this is a "special" because it treats its in edge not as an edge but as an HTML id
	//and gets input from that element
	//"inputBox":{"type":"special","function":inBox,"sig":{"out":["listOut"],"in":["htmlID"]}}
	//var htmlID=arg.node.in.htmlID;
    var htmlID="inBoxID";
	var val=eval(document.getElementById(htmlID).value);
	var changed=different(val,arg.env[arg.node.out.listIn].value);

	//arg.env[arg.node.out.listIn].available=changed;	
//console.log("setting avail of "+arg.node.out.listIn+" to "+different(val,arg.env[arg.node.out.listIn].value));
	arg.env[arg.node.out.listIn].available=true;
    	
console.log("setting avail of "+arg.node.out.listIn+" to "+true);
	arg.env[arg.node.out.listIn].value=val;
	return changed;
}
*/
var inputBox=function(arg)
{
    return eval(document.getElementById("inBoxID").value);
}
var outputBox=function(arg)
{
	//console.log("output box fires");
	//this is a "special" because it treats its out edge not as an edge but as an HTML id
	//and writes output to that element
	//"inputBox":{"type":"special","function":inBox,"sig":{"out":["listOut"],"in":[]}}//htmlID is snuck into in but is NOT in sig
	var htmlID=arg.node.out.htmlID;
	document.getElementById(htmlID).value=arg.env[arg.node.in.listIn].value;
	return false; //can't change anything
}
/*
//special form replaced by prim

var outputShape=function(arg)
{
	console.log("output shape fires");
	//this is a "special" because it treats its out edge not as an edge but as an HTML id
	//and writes output to that element
	//"inputBox":{"type":"special","function":inBox,"sig":{"out":["listOut"],"in":[]}}//htmlID is snuck into in but is NOT in sig
	//var htmlID=arg.node.out.htmlID;
    var htmlID="theCanvasID";
	drawRevised(arg.env[arg.node.in.shape].value,htmlID);
	return false; //can't change anything
}
*/
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

var addInputNamesTest=function()
{
	//console.log("addInputNamesTest");
	var newEnv={};
	addInputNames(newEnv,defExample[1],envExample);
	//console.dir(newEnv);
	alert("check env");
}
//{"functionName":"concat",
//		"in":{"listIn0":"b5","listIn1":"b3"},
//		"out":{"listOut":"b6}}

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
/*
var defExample={"b0":{"functionName":"inp","arg":{}},
		"b1":{"functionName":"head","arg":{"list":"b0"}}
		};
var envExample={"b0":{"value":[1,2,3],"available":true},"b1":{"value":1,"available":true}};
*/
var addNodeNamesTest=function()
{
	console.log("addNodeNamesTest");
	var newEnv={};
	addNodeNames(newEnv,defExample);
	console.dir(newEnv);
	alert("check env");
}


var ready=function(node,env)
{	
	//console.log("checking ready for "+node.functionName);
	//console.log("inputs avail is "+inputsAvail(node,env));
	//console.log("outputs not avail is "+outputsNotAvail(node,env));
	return inputsAvail(node,env);
	//return (inputsAvail(node,env)&&outputsNotAvail(node,env));
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
		if (!env[node.in[inputConnectorNames[a]]].available)
		{
			//console.log(node.functionName+" not ready");
			return false;
		}
	}
	//console.log(node.functionName+" ready");
	return true;
}
/*
var defExample={"b0":{"functionName":"inp","arg":{}},
		"b1":{"functionName":"head","arg":{"list":"b0"}}
		};
var envExample={"b0":{"value":[1,2,3],"available":true},"b1":{"value":1,"available":true}};
*/
var inputsAvailTest=function()
{
	console.log("start inputsAvailTest");
	var envExample1={"b0":{"value":[1,2,3],"available":true},"b1":{"value":1,"available":true}};
	var ans=inputsAvail(defExample[1],envExample1);
	if (!ans)
	{
		alert("inputsAvailTest failed");
	}
	var envExample2={"b0":{"value":[1,2,3],"available":false},"b1":{"value":1,"available":true}};
	ans=inputsAvail(defExample[1],envExample2);
	if (ans)
	{
		alert("inputsAvailTest failed");
	}
	console.log("end inputsAvailTest");
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
		if (env[node.out[outputConnectorNames[anOutput]]].available)
			return false;
	}
	return true;
}
var outputsNotAvailTest=function()
{
	console.log("start outputsNotAvailTest");
	var envExample1={"b0":{"value":[1,2,3],"available":true},"b1":{"value":1,"available":false}};
	var node={"functionName":"foo","in":{},"out":{"x":"b1"}};
	var ans=outputsNotAvail(node,envExample1);
	if (!ans)
	{
		alert("outputsNotsAvailTest failed");
	}
	node={"functionName":"foo","in":{},"out":{"x":"b0"}};

	ans=outputsNotAvail(node,envExample1);
	if (ans)
	{
		alert("outputNotAvailTest failed");
	}
	console.log("end outputNotAvailTest");
}
//headings
//name, start, length
//sounds 0 9
//sound operations 9 4
//list operations 13 5
//input output 18 3
//numerical operations 21 1
//control 22 2
//shapes 24 2
//shape operations 26 7
//examples 33 3
//internal 36 3
//below assigns to vbl in nonvisual.js
headings=[
//name, start, length
{"name":"sounds","start": 0,"length": 9},
{"name":"sound operations","start": 9,"length": 4},
{"name":"list operations","start": 13,"length": 5},
{"name":"input output","start": 18,"length": 3},
{"name":"numerical operations","start": 21,"length": 1},
{"name":"control","start": 22,"length": 2},
{"name":"shapes","start": 24,"length": 2},
{"name":"shape operations","start": 26,"length": 7},
{"name":"examples","start": 33,"length": 3},
{"name":"internal","start": 36,"length": 3}];
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

"attenuate":{"type":"prim", "function":attenuate,"sig":{"out":["bufferOut"],"in":["buffer"]}}, //buffer
"mixSounds":{"type":"prim", "function":mixSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, //buffer0,buffer1
"concatSounds":{"type":"prim", "function":concatSounds,"sig":{"out":["bufferOut"],"in":["buffer0","buffer1"]}}, //buffer0,buffer1 (example dict entry)
"playSound":{"type":"prim", "function":playSound, "sig":{"out":[],"in":["buffer"]}},//no args

"head":{"type":"prim","function":head, "sig":{"out":["listOut"],"in":["listIn"]}},
"tail":{"type":"prim","function":tail,"sig":{"out":["listOut"],"in":["listIn"]}},
"concat":{"type":"prim","function":concat,"sig":{"out":["listOut"],"in":["list0In","list1In"]}},
"isNull":{"type":"prim","function":isNull,"sig":{"out":["bool"],"in":["listIn"]}},
"reverse":{"type":"def","def":defReverse,"sig":{"out":["listOut"],"in":["listIn"]}},
	    
"inputPrompt":{"type":"prim","function":inputPrompt,"sig":{"out":["listIn"],"in":[]}},
"inputBox":{"type":"prim","function":inputBox,"sig":{"out":["listIn"],"in":[]}},
"outputAlert":{"type":"prim","function":outputAlert,"sig":{"out":[],"in":["listOut"]}},
    
"add":{"type":"prim","function":add,"sig":{"out":["sum"],"in":["n0","n1"]}},

"branch":{"type":"special","function":branch,"sig":{"out":["ifTrue","ifFalse"],"in":["input","control"]}},
"fanIn":{"type":"special","function":fanIn,"sig":{"out":["result"],"in":["in0","in1"]}},

"square":{"type":"prim", "function":square,"sig":{"in":[],"out":["square"]}}, 	
"equitri":{"type":"prim", "function":equitri,"sig":{"in":[],"out":["triangle"]}}, 

"color":{"type":"prim", "function":color,"sig":{"in":["r","g","b"],"out":["color"]}},
"outputShape":{"type":"prim","function":outputShape,"sig":{"out":[],"in":["shape"]}}, //no out in the signature
"paint":{"type":"prim", "function":paint, "sig":{"in":["shapeIn","color"],"out":["shapeOut"]}}, 
"rotate":{"type":"prim", "function":rotate,"sig":{"in":["shapeIn","angle"],"out":["shapeOut"]}}, 
"shift":{"type":"prim", "function":shift,"sig":{"in":["shapeIn","dx","dy"],"out":["shapeOut"]}}, 
"zoom":{"type":"prim", "function":zoom,"sig":{"in":["shapeIn","zoom"],"out":["shapeOut"]}}, 
"drawOn":{"type":"prim", "function":drawOn,"sig":{"in":["shape0","shape1"],"out":["shape"]}},

"reverseTestDef":{"type":"def","def":reverseTestDef,"sig":{"out":[],"in":[]}},
"shapeTestDef":{"type":"def","def":shapeTestDef,"sig":{"out":[],"in":[]}},
"shapeSpinTestDef":{"type":"def","def":shapeSpinTestDef,"sig":{"out":[],"in":[]}},

"externalIn":{"type":"external","sig":{}},
"externalOut":{"type":"external","sig":{}},
"const":{"type":"special","function":constant,"sig":{"out":["value"],"in":[]}}, //no in in the signature tho in fact val is put there	
};

	
