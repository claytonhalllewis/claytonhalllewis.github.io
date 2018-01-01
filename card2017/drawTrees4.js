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
    
    //placeTiles(400);
    drawRow(0,[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]);
    drawRow(1,[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]);
    drawRow(3,[0,2,1,1,1,3,0,2,1,1,1,3,0,2,1,0,0,2,1,1,1,3,0,0]);
    drawRow(4,[0,4,0,0,0,1,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0]);
    drawRow(5,[0,0,0,0,2,0,0,1,0,0,0,1,0,0,1,0,0,5,3,0,2,6,0,0]);
    drawRow(6,[0,0,0,2,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0]);
    drawRow(7,[0,0,2,1,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0]);
    drawRow(8,[0,0,4,4,4,4,0,0,4,4,4,0,0,4,4,4,0,0,4,4,4,0,0,0]);
    drawRow(10,[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]);
    drawRow(11,[1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6]);
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
	for(i=0;i<WD;i++)
		for(j=0;j<HT;j++)
		{
			cell=[i,j];
			//console.log("cell type is ",typeInCell(cell));
			if(!empty(cell))
				drawTree(cell,typeInCell(cell));
		}
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
	var t=typeInCell(cell);
	setCell(cell,nextType(t));
	drawGrid();
}
function nextType(t)
{
	var ans=t+1;
	if (ans>6)
		ans=0;
	return ans;
}
function findCell(p)
{
	var x=Math.floor((p.x-MARGIN)/(tileSize/2));
	var y=Math.floor((p.y-MARGIN)/tileSize);
	return [x,y];
}
//type 0 empty
//type 1 filled rectangle
//type 2 SE triangle
//type 3 SW triangle
//type 4 roof
//type 5 house
function drawTree(cell,t)
{
	if (t==1)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell);
		var y=topY(cell);
		canvas.moveTo(x,y);
		canvas.lineTo(x+tileSize/2,y);
		canvas.lineTo(x+tileSize/2,y+tileSize);
		canvas.lineTo(x,y+tileSize);
		canvas.fill();
	}
	else if (t==2)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell)+tileSize/2;
		var y=topY(cell);
		canvas.moveTo(x,y);
		canvas.lineTo(x,y+tileSize);
		canvas.lineTo(x-tileSize/2,y+tileSize);
		canvas.fill();
	}
	else if (t==3)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell);
		var y=topY(cell);
		canvas.moveTo(x,y);
		canvas.lineTo(x+tileSize/2,y+tileSize);
		canvas.lineTo(x,y+tileSize);
		canvas.fill();
	}
	else if (t==4)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell);
		var y=topY(cell);
		canvas.moveTo(x,y);
		canvas.lineTo(x+tileSize/2,y);
		canvas.lineTo(x+tileSize/2,y+tileSize/2);
		canvas.lineTo(x,y+tileSize/2);
		canvas.fill();
	}
	else if (t==5)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell)+tileSize/2;
		var y=topY(cell)+tileSize/2;
		canvas.moveTo(x,y);
		canvas.lineTo(x,y+tileSize/2);
		canvas.lineTo(x-tileSize/2,y+tileSize/2);
		canvas.fill();
	}
	else if (t==6)
	{
		canvas.fillStyle="green";
		canvas.beginPath();
		var x=topX(cell);
		var y=topY(cell)+tileSize/2;
		canvas.moveTo(x,y);
		canvas.lineTo(x+tileSize/2,y+tileSize/2);
		canvas.lineTo(x,y+tileSize/2);
		canvas.fill();
	}

}


function topX(cell)
{
	return MARGIN+(tileSize/2)*cell[0];
}
function topY(cell)
{
	return MARGIN+tileSize*cell[1];
}

function process()
{
  if (running)
  {
    //console.log("in process");
    var noteInterval=5;
    if (aStep())
    	drawGrid();
    setTimeout(process,noteInterval);
  }
}
function drawRow(r,vals)
{
	var i;
	for(i=0;i<WD;i++)
		setCell([i,r],vals[i]);
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


