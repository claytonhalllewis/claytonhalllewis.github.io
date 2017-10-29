var shadowGrid=[];
var SIDE=20;
var i,j;
for(i=0;i<SIDE;i++)
{
	shadowGrid[i]=[];
	for(j=0;j<SIDE;j++)
		shadowGrid[i][j]=-1;
}
var colorTable={};

function setColorTableRow(c)
{
	colorTable[c]=[c,c,c,c];
	console.log(colorTable); 
}
setColorTableRow("red");

setColorTableRow("blue");

setColorTableRow("green");

setColorTableRow("yellow");

setColorTableRow("white");







var types=[];
//type -1 is empty

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

function randomColor()
{
	var colors=["white","red","blue","green","yellow","white"];
	return colors[Math.floor(Math.random()*colors.length)];
}
//idea: choose random 2x2 block
function aStep()
{
	var corner=randomCell();
	var theFit=fitBlock(corner);
	var temp=saveBlock(corner);
	console.log("temp ",temp);
	var perm=permuteTemp(temp);
	restoreBlock(corner,perm);
	if(fitBlock(corner)<theFit)
	{
		restoreBlock(corner,temp);
		return false; //no change
	}
	return true; //changed
}
//calculate its degree of fit
//+ for matching faces, - for mismatch
//save config
//choose a permutation of the four cells
//implement it
//calculate its fit
//if less, restore saved config

function fitCell(cell) //edge colors must match if not empty
{
	if(empty(cell))
		return 0;
	var t=typeInCell(cell);
	console.log("cell,t: ",cell,t);
	var d;
	var fit=0;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		
		console.log("cell,t,d,n: ",cell,t,d,n);
		if(!empty(n)&&!matchColor(types[t][d],types[typeInCell(n)][opposite(d)],d)) //conflict
			fit=fit-2;
		else if(!empty(n)&&matchColor(types[t][d],types[typeInCell(n)][opposite(d)],d)) //match
			fit=fit+2;
		else if (empty(n)&&(types[t][d]=="white"))
			fit=fit+1;
	}
	return fit;
}
function fitBlock(cell)
{
	return fitCell(cell)+fitCell(neighbor(cell,1))+fitCell(neighbor(neighbor(cell,1),2))+fitCell(neighbor(cell,2));
}
function saveBlock(cell)
{
	return [typeInCell(cell),typeInCell(neighbor(cell,1)),typeInCell(neighbor(neighbor(cell,1),2)),typeInCell(neighbor(cell,2))];
}
function restoreBlock(cell,temp)
{
	console.log("restoring cell ",cell);
	setCell(cell,temp[0]);
	setCell(neighbor(cell,1),temp[1]);
	setCell(neighbor(neighbor(cell,1),2),temp[2]);
	setCell(neighbor(cell,2),temp[3]);
}
function permuteTemp(temp)
{
	var perm=[];
	var i;
	for (i=0;i<temp.length;i++)
		perm[i]=temp[i];
	shuffleArray(perm);
	return perm;
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
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

function matchColor(c,cp,d)
{
	//console.log("colors, d: ",c,cp,d);
	return (c==colorTable[cp][d]);
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
		//if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)]))
		if(!empty(n)&&!matchColor(types[t][d],types[typeInCell(n)][opposite(d)],d));
			return false;
	}
	return true;
}
function compatibleExcept(t,cell,ignore) //edge colors must match if not empty except for one dir
{
	var d;
	for (d=0;d<4;d++)
	{
		var n=neighbor(cell,d);
		//if(!empty(n)&&(types[t][d]!=types[typeInCell(n)][opposite(d)])&&(d!=ignore))
		if(!empty(n)&&!matchColor(types[t][d],types[typeInCell(n)][opposite(d)],d)&&(d!=ignore));
			return false;
	}
	return true;
}
function empty(cell)
{
	return (typeInCell(cell)==-1);
}
