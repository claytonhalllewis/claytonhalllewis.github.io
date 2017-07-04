function where(c)
{
	if(c.length==1)
	{
		if (c[0]==0)
			return structure[0];
		return structure[1];
	}
	var parent=where(butlast(c));
	//console.log("parent: ",parent);
	if (isList(parent))
	{
		//console.log("in list");
		return parent[last(c)];
	}
	if (isHeading(parent))
		return parent.blocks[last(c)];
	if(isBlock(parent))
	{
		//console.log("in block");
		//console.log("returning: ",parent.args[last(c)]);
		return parent.args[last(c)];
	}
	if(isBlockArg(parent))
	{
		return parent.value.args[last(c)];
	}
	if(isDropdown(parent))
	{
		//console.log("in dropdown");
		return parent.choices[last(c)];
	}
	if(isStatements(parent))
		return parent.value[last(c)];
	console.log("invalid cursor in where");
	console.log("bad cursor part is: ",c);
}
function last(c)
{
	return c[c.length-1];
}
function butlast(c)
{
	return c.slice(0,c.length-1);
}
function isHeading(loc)
{
	return ("heading" in loc);
}

function isBlock(loc)
{
	return ("blockname" in loc);
}
function isBlockArg(loc)
{
	if(!("type" in loc))
		return false;
	return (isBlockType(loc.type));
}
function isBlockType(t)
{
	if (t=="soundblock")
		return true;
	if(t=="numberblock")
		return true;
	return false;
}
function isList(loc)
{
	return Array.isArray(loc);
}
function isDropdown(loc)
{
	//console.log("in isDropdown loc is: ",loc);
	if (!("type" in loc))
		return false;
	return (loc.type=="dropdown");
}
function isStatements(loc)
{
	if (!("type" in loc))
		return false;
	return (loc.type=="statements");
}