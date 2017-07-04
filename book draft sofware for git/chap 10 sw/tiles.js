var shadowGrid=[];
var SIDE=20;
var i,j;
for(i=0;i<SIDE;i++)
{
	shadowGrid[i]=[];
	for(j=0;j<SIDE;j++)
		shadowGrid[i][j]=-1;
}
var types=[];
//type -1 is empty
//types[0]=["red","white","red","white"];
//types[1]=["white","red","white","red"];
//types[2]=["white","blue","white","red"];
//types[3]=["white","red","white","blue"];
types[0]=["white","white","white","white"];
types[1]=["white","white","white","white"];
types[2]=["white","white","white","white"];
types[3]=["white","white","white","white"];
types[4]=["white","white","white","white"];
types[5]=["white","white","white","white"];
types[6]=["white","white","white","white"];
types[7]=["white","white","white","white"];

function initializeTypes()
{
	var i,d;
	for(i=0;i<types.length;i++)
		for(d=0;d<4;d++)
			types[i][d]=randomColor();
}
var clumpTags=[];
function clearClumpTags()
{
	var i,j;
	for(i=0;i<SIDE;i++)
	{
		clumpTags[i]=[];
		for(j=0;j<SIDE;j++)
			clumpTags[i][j]=false;
	}
}
function getClumpTag(cell)
{
	return clumpTags[cell[0]][cell[1]];
}
function setClumpTag(cell)
{
	clumpTags[cell[0]][cell[1]]=true;
}
var clumpCount;
function countClump(cell)
{
	clearClumpTags();
	clumpCount=0;
	countClumpAux(cell);
	console.log("count: ",clumpCount);
	return clumpCount;
}
function countClumpAux(cell)
{
	if(getClumpTag(cell))
		return; //already counted
	clumpCount=clumpCount+1; //count this cell
	setClumpTag(cell); //mark it counted
	var t=typeInCell(cell);
	var d,n;
	for(d=0;d<4;d++)
	{
		n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]==types[typeInCell(n)][opposite(d)])) //connected to this neighbor
			countClumpAux(n); //count the neighbor and new things connected to it
	}
}


function randomColor()
{
	var colors=["white","red","blue","green","yellow","white"];
	return colors[Math.floor(Math.random()*colors.length)];
}

function randomCell()
{
	var ans=[];
	ans[0]=Math.floor(Math.random()*SIDE);
	ans[1]=Math.floor(Math.random()*SIDE);
	return ans;
}
function randomType()
{
	return Math.floor(Math.random()*types.length);
}
function randomDirection()
{
	return Math.floor(Math.random()*4);
}
function typeInCell(cell)
{
	//console.log("cell is ",cell[0],cell[1]);
	return shadowGrid[cell[0]][cell[1]];
}
function setCell(cell,t)
{
	//console.log("setting cell ",cell[0],cell[1],t);
	shadowGrid[cell[0]][cell[1]]=t;
}
function placeTiles(n)
{
	var i;
	var cell;
	for(i=0;i<n;i++)
	{
		cell=randomCell();
		if(empty(cell))
		{
			setCell(cell,randomType());
		}
		
	}
}
function prob(p)
{
	return Math.random()<p;
}

//???move toward center? as a way to promote clumping

function processRandomTile()
{
	//pick a cell
	//pick a random move and if it works do it
	var cell=randomCell();
	if(empty(cell))
		return false; //no change
	makeMoveProb(cell);
	
}
function findAMove(cell)
{
	var d;
	var i;
	var n;
	var t=typeInCell(cell);
	for(i=0;i<20;i++)
	{
		d=randomDirection();
		n=neighbor(cell,d);
		if (empty(n)&&compatibleExcept(t,n,opposite(d)))
		{
			setCell(cell,-1);
			setCell(n,t);
			drawGrid();
			return;
		}

	}
}
	

function isolated(cell)
{
	var d;
	for(d=0;d<4;d++)
		if(!empty(neighbor(cell,d)))
			return false;
	return true;
}

function neighbor(cell,dir)
{
	//dir 0:N,1:E;2:S;3:W
	var ans=[];
	if(dir==0)
	{
		ans[0]=cell[0];
		ans[1]=cell[1]-1;
		if (ans[1]<0)
			ans[1]=SIDE-1;
		return ans;
	}
	if(dir==1)
	{
		ans[1]=cell[1];
		ans[0]=cell[0]+1;
		if (ans[0]>(SIDE-1))
			ans[0]=0;
		return ans;
	}
	if(dir==2)
	{
		ans[0]=cell[0];
		ans[1]=cell[1]+1;
		if (ans[1]>(SIDE-1))
			ans[1]=0;
		return ans;
	}
	if(dir==3)
	{
		ans[1]=cell[1];
		ans[0]=cell[0]-1;
		if (ans[0]<0)
			ans[0]=SIDE-1;
		return ans;
	}
}

function opposite(d)
{
	return (d+2)%4;
}
function compatible(t,cell) //edge colors must match if not empty
{
	var d;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)]))
			return false;
	}
	return true;
}
function nStronglyCompatible(cell) //number of matching edge colors not counting empty nbrs
{
	var d;
	var t=typeInCell(cell);
	var count=0;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]==types[typeInCell(n)][opposite(d)]))
			count=count+1;
	}
	return count;
}
function makeMoveProb(cell)
{
	var p;
	var c=countClump(cell);
	if (incompatible(typeInCell(cell),cell))
		p=1;
	else if (c<2)
		p=1;
	else if (c<4)
		p=.1;
	else p=0;

	if(prob(p))
		findAMove(cell);

}
function incompatible(t,cell) //some edge colors must NOT match
{
	var d;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)]))
			return true;
	}
	return false;
}
function compatibleExcept(t,cell,ignore) //edge colors must match if not empty except for one dir
{
	var d;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)])&&(d!=ignore))
			return false;
	}
	return true;
}
function incompatibleExcept(t,cell,ignore) //edge colors must NOT match if not empty except for ignoring one dir
{
	var d;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)])&&(d!=ignore))
			return true;
	}
	return false;
}
function empty(cell)
{
	return (typeInCell(cell)==-1);
}
