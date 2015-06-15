var SIDE=400; //side of canvas
var SCALE=1/50; //scale for screen coords
//functions that follow are used in visualization of capE
function xC(x) //convert x coord to screen coord
{
	return x*SCALE+SIDE/2;
}
function yC(y) //convert y coord to screen coord
{
	return -1*SCALE*y+SIDE/2;
}

function drawVatP(v,p) //draw a vector v at point p on screen
{
	var VScale=15;//scale to use for vectors on screen
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(xC(p.x), yC(p.y));
	ctx.lineTo(VScale*v.x+xC(p.x), -1*VScale*v.y+yC(p.y));
	ctx.stroke();
}
function drawF(p,t) //draw capE at time t at point p (not very useful)
{
	drawVatP(capE(p,t),p);
}
function drawEUnit(p,t) //draw unit vector oriented with capE at time t at point p
{
	
	var cE=capE(p,t);
	var eUnit=multV(cE,1/vLen(cE));
	//console.log(eUnit);
	drawVatP(eUnit,p);
}
function eraseScreen()
{
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, SIDE, SIDE);
}
function drawField(t) //draw unit vector oriented with capE at a grid of points
{
	eraseScreen();
	for(var x=-10000;x<10000;x=x+500)
		for(var y=-10000;y<10000;y=y+500)
			drawEUnit({"x":x,"y":y},t);
}
