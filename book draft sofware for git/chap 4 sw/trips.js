//TRIPS implementation


function applyRules()
{
	for(var i=0;i<rules.length;i++)
		applyRule(rules[i],mainDb);
}
function applyRule(aRule,db)
{
	//console.log("db length before rule ",db.length);
	var cache=[];
	if(testConds(aRule[0],cache,db))
	{
		doActions(aRule[1],cache,db);
		narrate();
	}
	//console.log("db length after rule ",db.length);
}
function testConds(conds,cache,db)
{
	//console.log("conds are ",conds);
	//console.log("conds[0] is ",conds[0]);
	if (conds.length==0)
	{
		//console.log("rule applies-------------");
		return true;
	}
	var theFirstCond=conds[0];
	//console.log("the first cond is ",theFirstCond);
	if (testCond(theFirstCond,cache,db))
	{
			return testConds(conds.slice(1),cache,db);
	}
	//console.log("rule fails----------------");
	return false;
}
function testCond(cond,cache,db)
{
	//console.log("cond is ",cond);
	var val0=eval(cond[0],cache,db);
	var val1=eval(cond[2],cache,db);
	var ans;
	if (cond[1]=="eq")
	{
		ans= (val0==val1);
		//console.log("answer is ",ans);
		return ans;
	}
	else 
		{
			ans= (val0!=val1);
			//console.log("answer is ",ans);
			return ans;
		}
}
function doActions(actions,cache,db)
{
	for(var i=0;i<actions.length;i++)
	{
		doAction(actions[i],cache,db);
		//console.log("length in doActions ",db.length);
	}
}
function doAction(action,cache,db)
{
	var t0=eval(action[0],cache,db);
	var t1=action[1];
	var t2=eval(action[2],cache,db);
	
	var status=filterTriples([t0,t1,t2],db,arity(t1,db));
	//console.log("length pre ",db.length);
	db.push([t0,t1,t2]);
	//if(status=="new")
	//	console.log("adding triple ",t0,t1,t2);
}
function takeAction(triple)
{
	//console.log("action ",triple,"----------------------");
	filterTriples(triple,mainDb,arity(triple[1],mainDb));
	mainDb.push(triple);
}

function eval(expr,cache,db)
{
	//console.log("expr is ",expr);
	if (expr.length==1)
		return expr[0]; //atom
	var head=expr[0];
	if (head=="NULL")
		return "NULL";
	var link=expr[1];
	var val=lookup(head,link,cache,db);
	if (expr.length==2)
		return val;
	return eval([val].concat(expr.slice(2)),cache,db);
}
function lookup(head,link,cache,db)
{
	var cacheHit=lookupAux(head,link,cache);
	//console.log("cache value is ",cacheHit);
	if (cacheHit!="NULL")
	{
		//console.log("cache hit");
		return cacheHit;
	}
	//console.log("cache miss");
	var newBinding=lookupAux(head,link,db);
	if(newBinding=="NULL")
		return "NULL";
	//console.log("adding to cache ",head,link,newBinding);
	cache.push([head,link,newBinding]);
	return newBinding;
}
function lookupAux(head,link,db)
{
	db=shuffleArray(db);
	return lookupPlain(head,link,db);
}
function lookupPlain(head,link,db)
{
	var i;
	for (i=0;i<db.length;i++)
	{
		if((db[i][0]==head)&&(db[i][1]==link))
			return db[i][2];
	}
	return "NULL";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function arity(link,db)
{
	var ans=lookupAux(link,".arity",db);
	if (ans=="NULL")
		return "mm";
	else
		return ans;
}
	



function filterTriples(newTriple,db,arity)
{
	var status="new";
	var thisStatus;
	for(var i=0;i<db.length;i++)
	{
		thisStatus=okTriple(newTriple,db[i],arity);
		if (thisStatus!="ok")
			db.splice(i,1);
		if(thisStatus=="dup")
			status="dup";
	}
	return status;
	
}

function okTriple(newTriple,oldTriple,arity)
{
	//console.log("triples old, new ",oldTriple,newTriple);
	if((newTriple[0]==oldTriple[0])&&(newTriple[1]==oldTriple[1])&&(newTriple[2]==oldTriple[2]))
	{
		//console.log("remove duplicate",oldTriple);
		return "dup";
	}
	var link=newTriple[1];
	//console.log("arity of ",link," is",arity);
	if (arity=="mm")
		return "ok";
	if (link!=oldTriple[1])
		return "ok";
	if (((arity=="1m")||(arity=="11"))&& (newTriple[2]==oldTriple[2]))
	{
		//console.log("remove ",oldTriple);
		return "up";
	}
	
	if (((arity=="m1")||(arity=="11"))&& (newTriple[0]==oldTriple[0]))
	{
		//console.log("remove ",oldTriple);
		return "up";
	}
	
	return "ok";
}







function settle()
{
	for(var i=0;i<100;i++)
		applyRules();
}






/*
var test=["balloon"];
var cache=[];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
console.log("cache is ",cache);
cache=[];
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));;
test=["balloon","contains","hasElectron"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
test=["balloon","contains","hasFoo","more"];
console.log("test is ",test);
console.log(eval(test,cache,mainDb));
console.log("testing rule");
var aRule=[
	[
		[["thing","is","contains","hasElectron"],"eq",["true"]],
		[["thing","is","contains","hasProton"],"eq",["false"]]
	],
	[
		[["electronBalance-surplus"],"appliesTo",["thing","is"]]
	]
];
for (var i=0;i<10;i++)
	applyRule(aRule,mainDb);
console.log("db after rules ",mainDb);
console.log("===========arity tests");
var arityTestDB=
[
	[1,2,3],
	[2,3,4],
	[3,4,5],
	[8,8,8],
	[8,2,8],
	[2,".arity","11"],
	[3,".arity","1m"],
	[4,".arity","m1"]
];
var ariRule0=[
	[
	],
	[
		[[8],2,[8]]
	]

];
var ariRule1=[
	[
	],
	[
		[[8],3,[4]]
	]

];
var ariRule2=[
	[
	],
	[
		[[3],4,[8]]
	]

];
var ariRule3=[
	[
	],
	[
		[[8],8,[8]]
	]

];
applyRule(ariRule3,arityTestDB);
*/


