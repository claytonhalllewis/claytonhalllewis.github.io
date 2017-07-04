//construct the path and update it as points are dragged

function addPath(pointArray,tag)
{
	var svgns = "http://www.w3.org/2000/svg";
    var svg = document.getElementById('svg');
    var myPath = createPath(tag);
    setPath(pointArray,myPath);
    myPath.style.fill="none";
    svg.appendChild( myPath );
    
    return myPath;
}
//let createTrianglePath = (x = 0, y = 0, width = 100, height = 200) => {
function createPath(tag)
	{
  
  //var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //var path=document.getElementById("theMotionPath");
  var path=document.getElementById(tag);
  return path;
}
function getMidPoint(pointArray,i)
{
	var j=i+1;
	if (j==pointArray.length)
		j=0;
	var p0=getPointCoords(pointArray[i]);
	var p1=getPointCoords(pointArray[j]);
	var ans=
	[
		.5*(p0[0]+p1[0]),.5*(p0[1]+p1[1])
	];
	//console.log("midpt i:",ans,i);
	return ans;
}
function setBothPaths()
{
  setPath(pointArray0,thePath0);
  setPath(pointArray1,thePath1);
}

function setPath(pointArray,path)
{

  var coords=[];
  var midpt=[];
  var i;
  for(i=0;i<pointArray.length;i++)
  {
  	coords[i]=getPointCoords(pointArray[i]);
  	midpt[i]=getMidPoint(pointArray,i);
  }
  /*
  var pathData=
  [
  	{type:"M",values:coords[0]},
  	{type:"C",values:coords[1].concat(coords[2]).concat(coords[3])},
  	{type:"S",values:coords[4].concat(coords[5])},
  	{type:"S",values:coords[6].concat(coords[0])},
  	//{type:"Z"}
  	//{type:"S",values:coords[7].concat(coords[0])}
  ];
  */
 //console.log("midpt: ",midpt[1]);
  var pathData=
  [
  	{type:"M",values:midpt[0]},
  	{type:"Q",values:coords[1].concat(midpt[1])},
  	{type:"Q",values:coords[2].concat(midpt[2])},
  	{type:"Q",values:coords[3].concat(midpt[3])},
  	{type:"Q",values:coords[4].concat(midpt[4])},
  	{type:"Q",values:coords[5].concat(midpt[5])},
  	{type:"Q",values:coords[6].concat(midpt[6])},
  	{type:"Q",values:coords[7].concat(midpt[7])},
    {type:"Q",values:coords[8].concat(midpt[8])},
    {type:"Q",values:coords[9].concat(midpt[9])},
    {type:"Q",values:coords[10].concat(midpt[10])},
    {type:"Q",values:coords[11].concat(midpt[11])},
  	{type:"Q",values:coords[0].concat(midpt[0])},

  ];
  

  path.setPathData(pathData);
};