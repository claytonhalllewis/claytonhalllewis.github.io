//keyboard handler
const keyDict=
{
27:handleEscape,
32:handleSpace,
38:handleUpArrow,
40:handleDownArrow,
37:handleLeftArrow,
39:handleRightArrow,
49:toggleFirstProbe,
50:toggleSecondProbe,
82:resetProbe, //r
80:announcePosition, //p
83:toggleVoicing, //s
191:handleQuery //?
};
function handleKey(e){
    var unicode=e.keyCode? e.keyCode : e.charCode;
    console.log("key "+unicode);
    if (!(unicode in keyDict))
    {
	console.log("invalid key "+unicode);
	return;
    }
    keyDict[unicode]();
};

