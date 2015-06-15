//var cursorX=0;
//var cursorY=0;
var PT={};
PT.x=0;
PT.y=0;
function updateCursor(e)
{
var movementX = e.movementX ||
      e.mozMovementX          ||
      e.webkitMovementX       ||
      0;

  var movementY = e.movementY ||
      e.mozMovementY      ||
      e.webkitMovementY   ||
      0;
//may need to scale these
    PT.x = PT.x+movementX;

    PT.y = PT.y-movementY;
}
//function updateCursor(event)
//{
//
//    PT.x = scaleCursorX(event.clientX);
//    PT.y = scaleCursorY(event.clientY);
//}
function resetProbe()
{
	PT.x=0;
	PT.y=0;
}

function announcePosition()
{
	//alert("announce");
	var msg = new SpeechSynthesisUtterance(Math.floor(PT.x/10)+" comma "+ Math.floor(PT.y/10) );
	window.speechSynthesis.speak(msg);
}
/*
function getMousePos()
{
	var pt={};
	pt.x=scaleCursorX(cursorX);
	pt.y=scaleCursorY(cursorY);
	console.log("scaled x,y "+pt.x+","+pt.y);
	return pt;
}
*/
function scaleCursorX(x)
{
	//return x*SCALE+SIDE/2; //from x to screen conversion above
	return (x-SIDE/2)/SCALE;
}
function scaleCursorY(y)
{
	//return -1*SCALE*y+SIDE/2; //from y to screen conversion above
	return (y-SIDE/2)/(-1*SCALE);
}
