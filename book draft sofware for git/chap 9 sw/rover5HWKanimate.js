//animate
const INCREMENT=.3;
const TIMES=(VANISH-1)/INCREMENT; //stop before vanishes
var count;
var ctl;
var inc=INCREMENT;
var reps=0;
function animate()
{
	running=true;
	ctl = setInterval(function(){ show() }, 50);
}
function show()
{
	viewer(v.vp.t);
	draw(theSceneFn,v);
	translate(v,point(0.0,0.0,0.0,0.0,inc));
	console.log(v.vp.t);
	if (running==false)
	{
		clearInterval(ctl);
	}
	if(count>TIMES)
	{
		reps++;
		inc=-1*inc; //reverse
		count=0;
	}
	count++;
}
function interpolateViewers(v1,v2,lambda)
{
	var v={}
	v.vp=mix(v1.vp,v2.vp,lambda);
	v.nw=mix(v1.nw,v2.nw,lambda);
	v.ne=mix(v1.ne,v2.ne,lambda);
	v.se=mix(v1.se,v2.se,lambda);
	v.sw=mix(v1.sw,v2.sw,lambda);
	return v;
}

function viewer(time)
{
	console.log("in viewer time: ",time);

	if (time<START)
	{
		v=xyPlaneZ();
		setTime(v,time);
		return;
	}
	if (time<FINISH)
	{
		v=goodViewer;
		//v=interpolateViewers(xyPlaneZ(), goodViewer,(time-START)/FINISH-START);
		setTime(v,time);
		return;
	}
	if(time<BACK)
	{
		v=goodViewer;
		//v=interpolateViewers(goodViewer,xyPlaneZ(), (time-FINISH)/(VANISH-1-FINISH));
		setTime(v,time);
		return;
	}
	v=xyPlaneZ();
	setTime(v,time);
	return;

}
function setTime(v,t)
{
	v.vp.t=t;
	v.nw.t=t;
	v.ne.t=t;
	v.se.t=t;
	v.sw.t=t;
}

		
