const INITPROBE=5000;


var PT=[{x:INITPROBE,y:INITPROBE},{x:INITPROBE,y:INITPROBE}];

const PROBEDELTA=500; //movement increment for probes

function moveFirstProbe()
{
  mode="probe";
  say("move first probe with arrow keys. press escape to return to menu");
  probe=0;
}
function moveSecondProbe()
{
  mode="probe";
  say("move second probe with arrow keys. press escape to return to menu");
  probe=1;
}

function readCoord(c)
{
  return (c/PROBEDELTA).toFixed(0);
}
function readPoint(pt)
{
  say(readCoord(pt.x)+" comma "+ readCoord(pt.y));
}

function moveProbeUp(p)
{
  PT[p].y=PT[p].y+PROBEDELTA;
  readPoint(PT[p]);
}
function moveProbeDown(p)
{
  PT[p].y=PT[p].y-PROBEDELTA;
  readPoint(PT[p]);
}
function moveProbeRight(p)
{
  PT[p].x=PT[p].x+PROBEDELTA;
  readPoint(PT[p]);
}
function moveProbeLeft(p)
{
  PT[p].x=PT[p].x-PROBEDELTA;
  readPoint(PT[p]);
}

function resetProbe()
{
  for(var i=0;i<2;i++)
    {
      PT[i].x=INITPROBE;
      PT[i].y=INITPROBE;
    }
	announcePosition();
}

function announcePosition()
{
	//alert("announce");
	say("first "+readCoord(PT[0].x)+" comma "+readCoord(PT[0].y) + " second "+readCoord(PT[1].x)+" comma "+ readCoord(PT[1].y));
}
