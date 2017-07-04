//hypercube
//faces are specified by which two coords are "in", that is, in what plane the face lies
//the other two coords are "out"; the slab representing the face has a set thickness in these dimensions
function inHypercube(p)
{
	const HWIDE=2;  // these are half dimensions
	const HTHICK=.3;
	var in0,in1;
	for(in0=0;in0<3;in0++) //first coord can't be 3
		for(in1=in0+1;in1<4;in1++) //2d coord after 1st
		{
			if
			(
				  (Math.abs(coord(in0,p))<HWIDE)
				&&(Math.abs(coord(in1,p))<HWIDE)
				&&(Math.abs(Math.abs(coord(out0(in0,in1),p))-HWIDE)<HTHICK)
				&&(Math.abs(Math.abs(coord(out1(in0,in1),p))-HWIDE)<HTHICK)
			)
			{
				color=faceColor(in0,in1); //this colors 4 faces the same
				return true;
			}
		}
		return false;
}
function coord(c,p)
{
	if (c==0)
		return p.x;
	if(c==1)
		return p.y;
	if(c==2)
		return p.z;
	return p.w;
}
function out0(c0,c1) //first coord not in
{
	var i;
	for(i=0;i<4;i++)
		if((i!=c0)&&(i!=c1))
			return i;
}
 
function out1(c0,c1) //second coord not in
{
	var i;
	for(i=3;i>-1;i--)
		if((i!=c0)&&(i!=c1))
			return i;
}
function faceColor(in0,in1)
{
	const RED=[255,0,0];
	const YELLOW=[255,255,0];
	const BLUE=[0,0,255];
	const GREEN=[0,255,0];
	const ORANGE=[255,165,0];
	const WHITE=[255,255,255];
	var colorTable=
	[
		0, 
		RED,//0,1=1
		YELLOW,//0,2=2
		BLUE, //0,3=3
		0,
		GREEN, //1,2=5
		ORANGE, //1,3=6
		0,
		0,
		WHITE, //2,3=9
	]
	var index=3*in0+in1;
	return colorTable[index];
}
