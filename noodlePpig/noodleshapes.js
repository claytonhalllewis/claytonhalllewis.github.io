
var WHITE="rgb(255,255,255)";
var RED="rgb(255,0,0)";
var BLUE="rgb(0,0,255)";
var GREEN="rgb(0,255,0)";
var YELLOW="rgb(255,255,0)";
var BLACK="rgb(0,0,0)";
var size=100;
var HALFSIDE=60;
var HALFHEIGHT=HALFSIDE/Math.sqrt(3);
//fns are of different types:
//shapes: pt -> color
//eq square
//point transforms: pt ->pt (maybe w some other parms)
//eg translate adds offsets to coords of points
//shape transforms shape->shape
//eg shift, rotate, zoom
//combiners shape,shape -> shape
//only use shapes and shape transforms in noodle, at least for now
////////make a color
function color(arg)
{
	var c= "rgb("+(parseInt(arg.r%256))+","+(parseInt(arg.g%256))+","+(parseInt(arg.b%256))+")";
	console.log(c);
	return c;
}
/////////shapes/////////////////////
function square()
{
	return function(p)
	{
		if ((p.x>-HALFSIDE)&&(p.x<HALFSIDE)&&(p.y>-HALFSIDE)&&(p.y<HALFSIDE)) 
			return BLACK;
		return WHITE;
	}
}	
function equitri()
{
	return function(p)
	{
		slope=Math.tan(Math.PI/3);
	
		if ((p.y>-HALFHEIGHT)&&(p.y<slope*p.x+2*HALFHEIGHT)&&(p.y<-slope*p.x+2*HALFHEIGHT))
			return BLACK;
		return WHITE;
	}
}
////////point transforms//////////////////////// 
function translate(dx,dy,p)
{
	return {x:p.x-dx,y:p.y-dy};
}
function turnAngle(angle,p)
{
	ca=Math.cos(-angle);
	sa=Math.sin(-angle);
	return {x:p.x*ca-p.y*sa,y:p.x*sa+p.y*ca};
}

/////////////shape transforms/////////////////////////
///color a shape
paint=function(arg)
{
	return function(p)
	{if (arg.shapeIn(p)==WHITE)
		return WHITE;
	return arg.color;
	}
}
///rotate a shape thru angle a
rotate=function(arg)
{
	return function(p)
	{return arg.shapeIn(turnAngle(arg.angle,p));}
}
///translate s shape by dx,dy
shift=function(arg)
{
	return function(p)
	{return arg.shapeIn(translate(arg.dx,arg.dy,p));}
}
////zoom a shape by factor z
///this presumably has origin trouble: need to zoom before shift
zoom=function(arg)
{
    console.log("zoom arg");
    console.log(arg);
	return function(p)
	{return arg.shapeIn({x:(1/arg.zoom)*p.x,y:(1/arg.zoom)*p.y});}
}
////////////combiners/////////////////////
function drawOn(arg)
{
	return function(p)
	{
		if (arg.shape0(p)!=WHITE)
		{
			return arg.shape0(p);
		}
		else return arg.shape1(p);
	}
}
//<canvas id="canvas" width="150" height="150">  
function draw(drawFn) 
{  
console.log("drawing");
      var canvas = document.getElementById("canvas");  
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
//dictionary entries
/*
"square":{"type:"prim", "function":square}, //no arg
"equitri":{"type:"prim", "function":equitri}, //no arg
"paint":{"type:"prim", "function":paint}, //shape, color
"rotate":{"type:"prim", "function":rotate}, //shape, angle
"shift":{"type:"prim", "function":shift}, //shape, dx, dy
"zoom":{"type:"prim", "function":zoom}, //shape, zoom
"drawOn":{"type:"prim", "function":drawOn}, //shape0, shape1
*/


