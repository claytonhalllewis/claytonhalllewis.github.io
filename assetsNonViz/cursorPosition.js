
var PT={x:150,y:150};

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

function resetProbe()
{
	PT.x=150;
	PT.y=150;
	announcePosition();
}

function announcePosition()
{
	//alert("announce");
	say(Math.floor(PT.x/10)+" comma "+ Math.floor(PT.y/10) );
}
