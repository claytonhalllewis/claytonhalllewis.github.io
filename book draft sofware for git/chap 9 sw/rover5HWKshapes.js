//these all modify global color
//to indicate color of a point that is hit
//return true if hit; false if not

function inSafeScenario(p)//5D
{
	if (inGoldbar(p))
		return true;
	if (inSafe(p))
		return true;
	return false;
}
const WALLTHICKNESS=.5;
const SAFEHEIGHT=2.5; //all measurements are halves; shapes centered on origin
const SAFEWIDTH=2;
const SAFEDEPTH=1.5;
const BARSIDE=.5; //y and z
const BARLENGTH=1; //x
const GOLD=[255,215,0];
const GRAY=[119,136,153];
function inSafe(p)
{
	if(interiorSafe(p))
		return false;
	if ((Math.abs(p.x)<SAFEWIDTH)&&(Math.abs(p.y)<SAFEHEIGHT)&&(Math.abs(p.z)<SAFEDEPTH)&&(Math.abs(p.w)<THICK))
	{
		color= GRAY;
		return true;
	}
	return false;

}
function interiorSafe(p)
{
	if ((Math.abs(p.x)<(SAFEWIDTH-WALLTHICKNESS))&&(Math.abs(p.y)<(SAFEHEIGHT-WALLTHICKNESS))&&(Math.abs(p.z)<(SAFEDEPTH-WALLTHICKNESS)))
		return true;
	return false;
}
//bar moves: starts in w=0, moves to w= AWAY 5, starting at t=START 2, arriving at t=FINISH; 5 
	//moves in x to XDIST 4 at t=XOUT 7; moves back to w=0 at t=BACK 9 
function inGoldbar(p)
{
    var x=barX(p.t);
    var w=interiorW(p.t);
    if (
    	(p.x>(x-BARLENGTH))&&(p.x<(x+BARLENGTH))&&
    	(Math.abs(p.y)<BARSIDE)&&(Math.abs(p.z)<BARSIDE)&&
    	(p.w>(w-THICK))&&(p.w<(w+THICK))
    	)
    	{
    		color=GOLD;
    		return true;
    	}
    return false;
}
function barX(t)
{
	if(t<FINISH)
		return 0;
	if(t<XOUT)
		return XDIST*(t-FINISH)/(XOUT-FINISH);
	return XDIST;
}


function inShapeOrange(p) //5D
{
	
	if (inshapePeel(p))
		return true;
	if (inshapePith(p))
		return true;
	
	if (inshapeInterior(p))
		return true;
	
	return false;
}

const THICK=.1; //thickness in the w coordinate
const RADIUS=2;
const PEEL=.2;
const PITH=.2;
const WHITE=[255,255,255];
const DARKORANGE=[255,140,0];
const ORANGE=[255,165,0];

function dist3D(p)
{
	return Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z);
}

function inshapePeel(p)
{
	//static, always in w=0 but not too thin!
	if (inPeel3D(p)&&inPeelW(p))
	{
		color=ORANGE;
		return true;
	}
	return false;
}
function inPeel3D(p)
{
	var d=dist3D(p);
	if((d>(RADIUS+PITH))&&(d<(RADIUS+PITH+PEEL)))
		return true;
	return false;
}
function inPeelW(p)
{
	if((p.w>-THICK)&&(p.w<THICK))
		return true;
	return false;
}
function inshapePith(p)
{
	//static, always in w=0 but not too thin!
	if (inPith3D(p)&&inPeelW(p)) //same w thickness as peel
	{
		color=WHITE;
		return true;
	}
	return false;
}
function inPith3D(p)
{
	var d=dist3D(p);
	if((d>RADIUS)&&(d<(RADIUS+PITH)))
		return true;
	return false;
}

const VANISH=10;
function inshapeInterior(p)
{
	//moves: starts in w=0, moves to w= AWAY 5, starting at t=START 2, arriving at t=FINISH; 5 
	//moves in x to XDIST 4 at t=XOUT 7; moves back to w=0 at t=BACK 9 vanishes at t=VANISH 10
	if(p.t>VANISH)
		return false;
	if (inInterior3D(p)&&inInteriorW(p))
	{
		color=DARKORANGE;
		return true;
	}
}
const START=2;
const FINISH=5;
const XOUT=7;
const BACK=9;
const AWAY=5;
const XDIST=5;
function inInterior3D(p)
{
	if (p.t<FINISH)
	{
		if (dist3D(p)<=RADIUS)
			return true;
		return false;
	}
	var x;
	var temp={};
	
	if (p.t<XOUT)
	{
		temp.x=p.x-((p.t-FINISH)/(XOUT-FINISH))*XDIST;
	}
	else temp.x=p.x-XDIST;
	temp.y=p.y;
	temp.z=p.z;
	if (dist3D(temp)<=RADIUS)
			return true;
	return false;
}

	

function inInteriorW(p)
{
	var wt=interiorW(p.t);
	if ((p.w>wt-THICK)&&(p.w<wt+THICK))
		return true;
	return false;
}

function interiorW(t)
{
	if (t<START)
		return 0;   //at w=0 until START
	if (t<FINISH)
		return AWAY*(t-START)/(FINISH-START);  //moves to AWAY
	if(t<XOUT)
		return AWAY;  //at AWAY
	if(t<BACK)
		return AWAY-AWAY*(t-XOUT)/(BACK-XOUT); //moves back to 0
	return 0; //stays there
}



//the following are all 4D shapes
function inshape7(p) //solid red for test
{
	color=[255,0,0];
	return true;
}
function inshape0(p)//block w growing hole
{
	//console.log("in shape 0");
	if((-(p.w/4.0+1.0)<p.x)&&(p.x<(p.w/4.0+1.0))&&(-(p.w/4.0+1.0)<p.y)&&(p.y<(p.w/4.0+1.0))&&(-2.0<p.z)&&(p.z<2.0)&&(-4.0<p.w)&&(p.w<4.0))
		return false;
	if((-2.0<p.x)&&(p.x<2.0)&&(-2.0<p.y)&&(p.y<2.0)&&(-2.0<p.z)&&(p.z<2.0)&&(-4.0<p.w)&&(p.w<4.0))
	{
		color=[255,0,0];
		return true;
	}
	return false;

}


function inshape1(p)
{
	//4D rectangular solid
	if((-1.0<p.x)&&(p.x<1.0)&&(-0.5<p.y)&&(p.y<0.5)&&(-1.5<p.z)&&(p.z<1.5)&&(-2.0<p.w)&&(p.w<2.0))
	{
		color=[255,0,0];
		return true;
	}
	return false;

}

function inshape2(p)//overall shape centered on x=z=0
{
	//4D "wedges"
	if((p.w>=0)&&(p.w<5)&&(-2.0<p.x)&&(p.x<-1.0)&&(-1.0<p.z)&&(p.z<1.0)&&(0.0<=p.y)&&(p.y<(p.w+0.1)))
	{
		color=[255,0,0];
		return true;
	}
	if((p.w>=0)&&(p.w<5)&&(1.0<p.x)&&(p.x<2.0)&&(-1.0<p.z)&&(p.z<1.0)&&(0.0<=p.y)&&(p.y<(3.0-p.w)))
	{
		color=[255,0,255];
		return true;
	}
	return false;
}


function inshape3(p)
{
	//4D solid with differently colored slab on front
	if((-1.0<p.x)&&(p.x<1.0)&&(-0.5<p.y)&&(p.y<0.5)&&(-2.0<p.z)&&(p.z<2.0)&&(-2.0<p.w)&&(p.w<2.0))
	{
		color=[255,0,0];
		return true;
	}
	if((-1.0<p.x)&&(p.x<1.0)&&(-0.5<p.y)&&(p.y<0.5)&&(2.0<p.z)&&(p.z<2.5)&&(-2.0<p.w)&&(p.w<2.0))
	{
		color=[0,0,255];
		return true;
	}
	return false;
}


function inshape4(p)
{
	//4D solid with differently colored center
	if((-0.5<p.x)&&(p.x<0.5)&&(-0.5<p.y)&&(p.y<0.5)&&(-0.5<p.z)&&(p.z<-0.5)&&(-4.0<p.w)&&(p.w<4.0))
	{
		color=[0,0,255];
		return true;
	}
	if((-1.0<p.x)&&(p.x<1.0)&&(-1.0<p.y)&&(p.y<1.0)&&(-1.0<p.z)&&(p.z<1.0)&&(-4.0<p.w)&&(p.w<4.0))
	{
		color=[255,0,0];
		return true;
	}
	
	return false;
}
function inshape5(p)
{
	//block with periodically varying hole
	var hw=0.75*Math.sin(0.5*p.w)+1.0;//halfwidth
	if(p.y<-2.0) //ground
	{
		color=[0,0,255];
		return true; 
	}
	if((-hw<p.x)&&(p.x<hw)&&(-hw<p.y)&&(p.y<hw))
		return false;
	if((-2.0<p.x)&&(p.x<2.0)&&(-2.0<p.y)&&(p.y<2.0)&&(-2.0<p.z)&&(p.z<2.0))
	{
		color=[255,0,0];
		return true;
	}
	return false;

}
function inshape6(p)
{
	//two overlapping volcanos that grow and erode
	var vx1=-0.5; var vz1=0.0;
	var vx2=0.5;var vz2=-1.0;
	var t=0.5*p.w;
	var h1;
	var h2;
	if(t<0.0) 
	{
		h1=0.0;
	}
	else if (t<3.0) 
	{
		h1=1*t;  //.5
	}
	else if(t<10.0) 
	{
		h1=-0.2*(t-3.0)+3;  //1.5
	}
	else h1=0.0;
	if(t<4.0) 
	{
		h2=0.0;
	}
	else if(t<10.0) 
	{
		h2=.6*(t-4.0); //.3
	}
	else if(t<20.0) 
	{
		h2=3.6-.2*(t-10.0); //1.8
	}
	else h2=0.0;
	if(p.y<0.0) //ground
	{
		color=[0,255,0];
		return true; 
	}
	if((p.y<h1)&&Math.sqrt((p.x-vx1)*(p.x-vx1)+(p.z-vz1)*(p.z-vz1))<(h1-p.y))
	{
		color=[255,0,0];
		return true;
	}
	if((p.y<h2)&&Math.sqrt((p.x-vx2)*(p.x-vx2)+(p.z-vz2)*(p.z-vz2))<(h2-p.y))
	{
		color=[128,0,0];
		return true;
	}
	return false;

}
