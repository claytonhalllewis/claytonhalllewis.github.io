//onload get canvas, place tiles
var canvas;
var actualCanvas;
var canvasWidth,canvasHeight;
var tileSize=30;
var running;
var MARGIN=30;
window.onload = function() 
{
		
    actualCanvas = document.getElementById("canvas");
    actualCanvas.addEventListener("mousedown", handleClick, false);
    canvasWidth=actualCanvas.width;
    canvasHeight=actualCanvas.height;
    
    canvas = actualCanvas.getContext('2d');
    initializeTypes();
    placeTiles(100);
    drawGrid();
    running=false;

}
function drawGrid()
{
	canvas.clearRect(0, 0, canvasWidth, canvasHeight);
	//console.log("drawing grid");
	var i;
	var j;
	var cell;
	for(i=0;i<SIDE;i++)
		for(j=0;j<SIDE;j++)
		{
			cell=[i,j];
			//console.log("cell type is ",typeInCell(cell));
			if(!empty(cell))
				drawTile(cell,typeInCell(cell));
		}
}

function drawTile(cell,t)
{
	//console.log("drawing tile ",cell[0],cell[1],t);
	drawNTriangle(cell,types[t][0]);
	drawETriangle(cell,types[t][1]);
	drawSTriangle(cell,types[t][2]);
	drawWTriangle(cell,types[t][3]);
}
function topX(cell)
{
	return MARGIN+tileSize*cell[0];
}
function topY(cell)
{
	return MARGIN+tileSize*cell[1];
}
function drawNTriangle(cell,color)
{
	//console.log("color is",color);
	canvas.fillStyle=color;
	canvas.beginPath();
	var x=topX(cell);
	var y=topY(cell);
	canvas.moveTo(x,y);
	canvas.lineTo(x+tileSize,y);
	canvas.lineTo(x+tileSize/2,y+tileSize/2);
	canvas.fill();

}
function process()
{
  if (running)
  {
    //console.log("in process");
    var noteInterval=1;
    if (processRandomTile())
    	drawGrid();
    setTimeout(process,noteInterval);
  }
}




function run()
{
  console.log("in run");
  running=!running;
  if (running)
  {
    process();
   
  }
}
function drawETriangle(cell,color)
{
	canvas.fillStyle=color;
	canvas.beginPath();
	var x=topX(cell);
	var y=topY(cell);
	canvas.moveTo(x+tileSize,y);
	canvas.lineTo(x+tileSize,y+tileSize);
	canvas.lineTo(x+tileSize/2,y+tileSize/2);
	canvas.fill();

}
function drawSTriangle(cell,color)
{
	canvas.fillStyle=color;
	canvas.beginPath();
	var x=topX(cell);
	var y=topY(cell);
	canvas.moveTo(x+tileSize,y+tileSize);
	canvas.lineTo(x,y+tileSize);
	canvas.lineTo(x+tileSize/2,y+tileSize/2);
	canvas.fill();

}
function drawWTriangle(cell,color)
{
	canvas.fillStyle=color;
	canvas.beginPath();
	var x=topX(cell);
	var y=topY(cell);
	canvas.moveTo(x,y);
	canvas.lineTo(x,y+tileSize);
	canvas.lineTo(x+tileSize/2,y+tileSize/2);
	canvas.fill();

}
function getMousePos(e) 
{
    var canvasRect=actualCanvas.getBoundingClientRect();
    var x=Math.floor(e.clientX-canvasRect.left);
    var y=Math.floor(e.clientY-canvasRect.top);
    return {"x":x,"y":y};
    
 }
function handleClick(e)
{
	//console.log("handling click");
	var m=getMousePos(e);
	//console.log("mouse pos",m);
	var cell=findCell(m);
	console.log("cell ",cell);
	var edge=findEdge(m,cell);
	console.log("edge ",edge);
	var t=typeInCell(cell);
	if (t==-1)
	{
		//setCell(cell,randomType());
		//console.log("new type ",typeInCell(cell));
		//drawGrid();
		return;
	}
	
	types[t][edge]=nextColor(types[t][edge]);
	drawGrid();
}

function nextColor(c)
{
	var colorChange=
	{
		"white": "red",
		"red": "blue",
		"blue":"green",
		"green":"yellow",
		"yellow":"white"
	};
	console.log("c is ",c);
	console.log("new color is ",colorChange[c]);
	return colorChange[c];
}
function findCell(p)
{
	var x=Math.floor((p.x-MARGIN)/tileSize);
	var y=Math.floor((p.y-MARGIN)/tileSize);
	return [x,y];
}
function findEdge(p,cell)
{
	var dx=p.x-((cell[0]*tileSize)+MARGIN);
	//console.log("dx ",dx);
	var dy=p.y-((cell[1]*tileSize)+MARGIN);
	//console.log("dy ",dy);
	//console.log("tileSize-dx ",tileSize-dx);
	if(dy>dx)//S or W
	{
		if(dy>(tileSize-dx))
			return 2; //S
		else return 3; //W
	}
	else //N or E
	{
		if(dy>(tileSize-dx))
			return 1; //E
		else return 0; //N
	}
}


