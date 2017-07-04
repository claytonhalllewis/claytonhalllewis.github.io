var ctx;
var imgData;
const SIDE= 200;
var color=[0,0,0];//global set by scene fn


var setUpCanvas=function()
{
	var canvas = document.getElementById("canvas");  
	ctx = canvas.getContext("2d"); 
	imgData=ctx.createImageData(SIDE,SIDE);
	for (var i=0;i<imgData.data.length;i+=4)
	{
		imgData.data[i]=255;
		imgData.data[i+1]=255;
		imgData.data[i+2]=255;
		imgData.data[i+3]=255;   //set alpha once and for all
	}
}


function frame()
{
	for(var y=0;y<SIDE;y++)
	{
		putpixel(0,y,[0,0,0]); 
		putpixel(SIDE-1,y,[0,0,0]);
	}
	for(var x=0;x<SIDE;x++)
	{
		putpixel(x,0,[0,0,0]); 
		putpixel(x,SIDE-1,[0,0,0]);
	}
}
function putpixel(x,y,c)
{
	var i=4*(y*SIDE+x);
	imgData.data[i]=c[0];
	imgData.data[i+1]=c[1];
	imgData.data[i+2]=c[2];
}
	function zoomOut(v)
	{
		var k=3.0;
		//var k=1;
		var ans={};
		ans.vp=mult4(k,v.vp);
		ans.nw=mult4(k,v.nw);
		ans.ne=mult4(k,v.ne);
		ans.se=mult4(k,v.se);
		ans.sw=mult4(k,v.sw);
		return ans;
	}

	function mult4(k,v)
	{
		//k=1; //test to see if it is the scaling that's the problem... it is
		var ans={}
		ans.t=v.t;//don't scale t
		ans.x=k*v.x;
		ans.y=k*v.y;
		ans.z=k*v.z;
		ans.w=k*v.w;
		return ans;
	}


function draw(sceneFn,vIn) //scene and viewer
{
	//var v=zoomOut(vIn);
	v=vIn;
	var deltaX=mult(1.0/SIDE,subtract(v.ne,v.nw)); //step across viewer retina
	//console.log(deltaX);
	var deltaY=mult(1.0/SIDE,subtract(v.sw,v.nw)); //step down on viewer retina
	//console.log(deltaY);
	//console.log(dot(deltaX,deltaY));
	var imgPoint=v.nw; //start at NW corner of viewer retina
	var imgPointL;
	for(var y=0;y<SIDE;y++)
	{
		imgPointL=imgPoint; //left end of row
		for(var x=0;x<SIDE;x++)
		{
			//putpixel(x,y,[0,255,255]); //debug
			putpixel(x,y,cast(sceneFn,v.vp,imgPoint));
			imgPoint=add(imgPoint,deltaX);
		}
		imgPoint=add(imgPointL,deltaY);
	}
	frame();
	ctx.putImageData(imgData,0,0);
}
var oldd=0; //global with meaningless init; distance to last hit
//handling color and distance
//cast needs to set oldd and return color
//inshape returns bool and sets color
//darken does shading based on distance //?not working now?
//wcolor changes color based on w coord //?not working now?
//use global for oldd
//use global for color
const MAXLAMBDA =10;
const JUMP= 0.025;
function cast(inshape,vp, sp) //global oldd gets modified
{
	var dp=mult(JUMP,subtract(sp,vp));
	var p=vp;
	var i;
	//var lambda;
	//console.log(vp);
	//console.log(sp);
	
	//for(lambda=0.0;lambda<MAXLAMBDA;lambda+=JUMP)
	for(i=0;i<300;i++) //300 is 15/.05
	{
		//p=mix(vp,sp,lambda);
		p=add(p,dp);
		if(inshape(p)) //a hit... sets color
		{
			
			if(i<oldd)
			{
				color=darken(color); //darkens color if surface is approaching
			}
			oldd=i;
			
			//color=wcolor(p,color);//shade for w
			
			return color;
		}
	}
	return [135,206,250]; //pale blue if no hit
}

function darken(c)
{
	//to shade points that are farther away along ray
	return [.6*c[0],.6*c[1],.6*c[2]];
}
function wcolor(p, c) 
{
	//vary color according to w coord
	var fog=5*p.w;
	
	return [c[0]+fog,c[1]+fog,c[2]+fog]
	//return COLOR(RED_VALUE(color),(p.w+5.0)*25.5,BLUE_VALUE(color));
}
function mix(p1,p2, lambda)
{
	var p={};
	p.x=mix0(p1.x,p2.x,lambda);
	p.y=mix0(p1.y,p2.y,lambda);
	p.z=mix0(p1.z,p2.z,lambda);
	p.w=mix0(p1.w,p2.w,lambda);
	p.t=mix0(p1.t,p2.t,lambda);
	return p;
}
function mix0(c1,c2, lambda)
{
	return (1.0-lambda)*c1+lambda*c2;
}