var shadowGrid=[];
var WD=24;
var HT=12;
var i,j;
for(i=0;i<WD;i++)
{
	shadowGrid[i]=[];
	for(j=0;j<HT;j++)
		shadowGrid[i][j]=0; //empty
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
	if(fitBlock(corner)>theFit)
	{
		restoreBlock(corner,temp);
		return false; //no change
	}
	console.log("replacement ",perm);
	return true; //changed
}
//calculate its degree of fit
//+ for matching faces, - for mismatch
//save config
//choose a permutation of the four cells
//implement it
//calculate its fit
//if less, restore saved config


//function fitBlock(cell)
//{
//	return score(cell)+score(neighbor(cell,1))+score(neighbor(neighbor(cell,1),2))+score(neighbor(cell,2));
//}
function fitBlock(cell)
{
	var c,ans=0;
	c=cell;
	ans=ans+score(c)+score(neighbor(c,1))+score(neighbor(neighbor(c,1),1));
	c=neighbor(c,2);
	ans=ans+score(c)+score(neighbor(c,1))+score(neighbor(neighbor(c,1),1));
	c=neighbor(c,2);
	ans=ans+score(c)+score(neighbor(c,1))+score(neighbor(neighbor(c,1),1));
	return ans;
}

//function saveBlock(cell)
//{
//	return [typeInCell(cell),typeInCell(neighbor(cell,1)),typeInCell(neighbor(neighbor(cell,1),2)),typeInCell(neighbor(cell,2))];
//}
function saveBlock(cell)
{
	var ans=[];
	var c=cell;
	ans[0]=typeInCell(c);ans[1]=typeInCell(neighbor(c,1));ans[2]=typeInCell(neighbor(neighbor(c,1),1));
	c=neighbor(c,2);
	ans[3]=typeInCell(c);ans[4]=typeInCell(neighbor(c,1));ans[5]=typeInCell(neighbor(neighbor(c,1),1));
	c=neighbor(c,2);
	ans[6]=typeInCell(c);ans[7]=typeInCell(neighbor(c,1));ans[8]=typeInCell(neighbor(neighbor(c,1),1));
	return ans;
}
function restoreBlock(cell,temp)
{
	var c=cell;
	setCell(c,temp[0]);setCell(neighbor(c,1),temp[1]);setCell(neighbor(neighbor(c,1),1),temp[2]);
	c=neighbor(c,2);
	setCell(c,temp[3]);setCell(neighbor(c,1),temp[4]);setCell(neighbor(neighbor(c,1),1),temp[5]);
	c=neighbor(c,2);
	setCell(c,temp[6]);setCell(neighbor(c,1),temp[7]);setCell(neighbor(neighbor(c,1),1),temp[8]);
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
	ans[0]=Math.floor(Math.random()*WD);
	ans[1]=Math.floor(Math.random()*HT);
	return ans;
}
function randomType()
{
	return Math.floor(Math.random()*6)+1;
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
			setCell(cell,0);
			//setCell(cell,randomType());
		}
		
	}
}
function prob(p)
{
	return Math.random()<p;
}
//type 0 empty
//type 1 filled rectangle
//type 2 SE triangle
//type 3 SW triangle

function score(cell) //lack of fit
{
	var ans=0;
	var t=typeInCell(cell);
	if (t==0)
		return 0;
	if (t==1) //rect
	{
		if ((typeInCell(neighbor(cell,0))==2)&&(typeInCell(neighbor(cell,1))==1)&&(typeInCell(neighbor(cell,3))==2)&&(typeInCell(neighbor(cell,2))==0))
			ans=ans-35;
		if ((typeInCell(neighbor(cell,0))==3)&&(typeInCell(neighbor(cell,1))==3)&&(typeInCell(neighbor(cell,3))==1)&&(typeInCell(neighbor(cell,2))==0))
			ans=ans-35;
		if ((typeInCell(neighbor(cell,1))==1)||(typeInCell(neighbor(cell,3))==1))
			ans=ans-10;
		//if((typeInCell(neighbor(cell,3))!=2)&&(typeInCell(neighbor(cell,3))!=1))
		//	ans=ans+2;
		//if((typeInCell(neighbor(cell,1))!=3)&&(typeInCell(neighbor(cell,1))!=1))
		//	ans=ans+2;
		if((typeInCell(neighbor(cell,0))!=2)&&(typeInCell(neighbor(cell,0))!=3))
			ans=ans+5;
		return ans;
	}
	if (t==2) //SE triangle
	{
		if ((typeInCell(neighbor(cell,1))==3)&&(typeInCell(neighbor(cell,2))==1))
			ans=ans-35;
		if (typeInCell(neighbor(cell,1))==1)
			ans=ans-20;
		if (typeInCell(neighbor(cell,1))==3)
			ans=ans-35;
		//if((typeInCell(neighbor(cell,1))!=3)&&(typeInCell(neighbor(cell,1))!=1))
		//	ans=ans+3;
		//if(typeInCell(neighbor(cell,3))!=0)
		//	ans=ans+2;
		//if (typeInCell(neighbor(cell,0))!=0)
		//	ans=ans+3;
		return ans;
	}
	if (t==3) //SW triangle
	{
		if ((typeInCell(neighbor(cell,3))==3)&&(typeInCell(neighbor(cell,2))==1))
			ans=ans-35;
		if (typeInCell(neighbor(cell,3))==1)
			ans=ans-20;
		if (typeInCell(neighbor(cell,3))==2)
			ans=ans-35;
		//if((typeInCell(neighbor(cell,3))!=2)&&(typeInCell(neighbor(cell,3))!=1))
		//	ans=ans+3;
		//if(typeInCell(neighbor(cell,1))!=0)
		//	ans=ans+2;
		//if (typeInCell(neighbor(cell,0))!=0)
		//	ans=ans+3;
		return ans;
	}
	if (t==4) //small block
	{
		if((typeInCell(neighbor(cell,0))==5)&&(typeInCell(neighbor(cell,1))==4)&&(typeInCell(neighbor(neighbor(cell,1),0))==6))
			ans=ans-35;
		if((typeInCell(neighbor(cell,0))==6)&&(typeInCell(neighbor(cell,3))==4)&&(typeInCell(neighbor(neighbor(cell,3),0))==5))
			ans=ans-35;
		if((typeInCell(neighbor(cell,0))==5)||(typeInCell(neighbor(cell,0))==6))
			ans=ans-15;
		return ans;
	} 
	if (t==5) //small SE
	{
		if (typeInCell(neighbor(cell,2))==4)
			ans=ans-36;
		if (typeInCell(neighbor(cell,1))==6)
			ans=ans-30; 
		return ans;
	}
	if (t==6) //small SW
	{
		if (typeInCell(neighbor(cell,2))==4)
			ans=ans-36;
		if (typeInCell(neighbor(cell,3))==5)
			ans=ans-30;
		return ans;
	}
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
			ans[1]=HT-1;
		return ans;
	}
	if(dir==1)
	{
		ans[1]=cell[1];
		ans[0]=cell[0]+1;
		if (ans[0]>(WD-1))
			ans[0]=0;
		return ans;
	}
	if(dir==2)
	{
		ans[0]=cell[0];
		ans[1]=cell[1]+1;
		if (ans[1]>(HT-1))
			ans[1]=0;
		return ans;
	}
	if(dir==3)
	{
		ans[1]=cell[1];
		ans[0]=cell[0]-1;
		if (ans[0]<0)
			ans[0]=WD-1;
		return ans;
	}
}


function empty(cell)
{
	return (typeInCell(cell)==0);
}
