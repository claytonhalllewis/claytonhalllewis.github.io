
var drag = null;

var canvas = {};
var dPoint;
var pointArray0=[];
var pointArray1=[];
var thePath0;
var cursor0;
var thePath1;
var cursor1;

//dragging using code from https://stackoverflow.com/questions/40276529/spawn-drag-of-svg-elements-approach
//

	
window.onload = function() {
		
    canvas = document.getElementById("canvas");
	
		
	// attach events listeners
	AttachListeners();
	pointArray0[0]=makePoint(150,150,"blue");
	pointArray0[1]=makePoint(200,135,"blue");
	pointArray0[2]=makePoint(250,120,"blue");
	pointArray0[3]=makePoint(300,135,"blue");
	pointArray0[4]=makePoint(350,150,"blue");
	pointArray0[5]=makePoint(380,250,"blue");
	pointArray0[6]=makePoint(350,350,"blue");
	pointArray0[7]=makePoint(300,365,"blue");
	pointArray0[8]=makePoint(250,380,"blue");
	pointArray0[9]=makePoint(200,365,"blue");
	pointArray0[10]=makePoint(150,350,"blue");
	pointArray0[11]=makePoint(120,250,"blue");

	pointArray1[0]=makePoint(750,150,"blue");
	pointArray1[1]=makePoint(800,135,"blue");
	pointArray1[2]=makePoint(850,120,"blue");
	pointArray1[3]=makePoint(900,135,"blue");
	pointArray1[4]=makePoint(950,150,"blue");
	pointArray1[5]=makePoint(980,250,"blue");
	pointArray1[6]=makePoint(950,350,"blue");
	pointArray1[7]=makePoint(900,365,"blue");
	pointArray1[8]=makePoint(850,380,"blue");
	pointArray1[9]=makePoint(800,365,"blue");
	pointArray1[10]=makePoint(750,350,"blue");
	pointArray1[11]=makePoint(720,250,"blue");
	//run();
	thePath0=addPath(pointArray0,"theMotionPath0");
	thePath1=addPath(pointArray1,"theMotionPath1");
	cursor0=document.getElementById("cursor0");
	cursor1=document.getElementById("cursor1");
	console.log("loaded");
	
}





function AttachListeners() {
	
	document.getElementById("run").onclick=run;
    //document.getElementById("svg").onmousedown=Drag;
	document.getElementById("svg").onmouseup=Drag;
	document.getElementById("svg").onmousemove=Drag; //

}


function Drag(e) {
    var t = e.target, id = t.id, et = e.type;  m = MousePos(e);
  	
	if (!drag && (et == "mousedown")) 
	{
		
			drag = t;
			dPoint = m;
	}

 
	if (drag && (et == "mousemove")) 
	{
		drag._x += m.x - dPoint.x;
		
		drag._y += m.y - dPoint.y;
		dPoint = m;
		drag.setAttribute("transform", "translate(" +drag._x+","+drag._y+")");	
		
		setBothPaths();
		

	}
		
    // stop drag
	if (drag && (et == "mouseup")) {
		drag = null;
	}
	//showPointCoords();
}

function getPointCoords(p)
{
	var s=1.;
	var d=10;
	var x=s*(p.getBoundingClientRect().right-d);
	var y=s*(p.getBoundingClientRect().top+d); 
	
	return [x,y];
}


         



		

// adjust mouse position to the matrix of SVG & screen size
function MousePos(event) {
		var p = svg.createSVGPoint();
		p.x = event.clientX;
		p.y = event.clientY;
		var matrix = svg.getScreenCTM();
		p = p.matrixTransform(matrix.inverse());
		return {
			x: p.x,
			y: p.y
		}
}
function makePoint(x,y,color)
{
	var svgns = "http://www.w3.org/2000/svg";
    var svg = document.getElementById('svg');
    var shape = document.createElementNS(svgns, "circle");
    shape.setAttribute("cx", x);
    shape.setAttribute("cy", y);
    shape.setAttribute("r",20);
    shape.setAttribute("fill", color);
    shape.setAttribute("pointer-events","all");
    shape._x=0;
    shape._y=0;
    shape.onmousedown = Drag;
    
    svg.appendChild( shape );
    //shape.xOut=makeNode();
    //shape.xOut.value=x;
    return shape;
}

function getCursorCoords(c)
{
	return getPointCoords(c);
}

