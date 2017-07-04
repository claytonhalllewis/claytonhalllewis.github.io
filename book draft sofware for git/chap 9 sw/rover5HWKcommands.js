var v;//the viewer
var theSceneFn;
var panlambda=0;
const delta=5;//determines how much the view arcs move
const TRANS=1;//determines how much the translators move
const ROTINC=Math.PI/12; //how much to rotate
function run()
{
	

	//test();

	runIt();

}
var coordTransform;
function runIt()
{
	//running version:

	setUpCanvas();
	frame();
	ctx.putImageData(imgData,0,0);
	
	addButtons();
	//v=xwPlaneY();
	v=xyPlaneZ();
	//console.log("here");
	//theSceneFn=inShapeOrange;
	//theSceneFn=inSafeScenario;
	theSceneFn=inshape5; //block w varying hole
	//theSceneFn=inHypercube;
	draw(theSceneFn,v);
	//animate();
}
function addButtons()
{
	addButton(zoomPos,"+","zoom");
	addButton(zoomNeg,"-","br");
	addButton(arcXPos,"+","arc in x");
	addButton(arcXNeg,"-","br");
	addButton(arcYPos,"+","arc in y");
	addButton(arcYNeg,"-","br");
	addButton(arcZPos,"+","arc in z");
	addButton(arcZNeg,"-","br");
	addButton(arcWPos,"+","arc in w");
	addButton(arcWNeg,"-","br");
	addButton(rotateXYPos,"+","rotate in xy");
	addButton(rotateXYNeg,"-","br");
	addButton(rotateXZPos,"+","rotate in xz");
	addButton(rotateXZNeg,"-","br");
	addButton(rotateXWPos,"+","rotate in xw");
	addButton(rotateXWNeg,"-","br");
	addButton(rotateYWPos,"+","rotate in yw");
	addButton(rotateYWNeg,"-","br");
	addButton(translateXPos,"+","move in x");
	addButton(translateXNeg,"-","br");
	addButton(translateYPos,"+","move in y");
	addButton(translateYNeg,"-","br");
	addButton(translateZPos,"+","move in z");
	addButton(translateZNeg,"-","br");
	addButton(translateWPos,"+","move in w");
	
	addButton(translateWNeg,"-","br");
	addLabel("Note: w acts like time for the varying block and the volcanoes");
	addButton(setXYPlaneZ,"XY plane along Z","set view");
	addButton(setYWPlaneZ,"YW plane along Z","br");
	addButton(setSceneBlock,"block with varying hole","");
	addButton(setSceneVolcanoes,"volcanoes","");
	addButton(setSceneHypercube,"hypercube","br");

}

//var ROTINC=Math.PI/12;




function translateXPos()
{
	translate(v,point(TRANS,0.0,0.0,0.0,0.0));
	draw(theSceneFn,v);
}
function translateXNeg()
{
	translate(v,point(-TRANS,0.0,0.0,0.0,0.0));
	draw(theSceneFn,v);
}
function translateYPos()
{
	translate(v,point(0.0,TRANS,0.0,0.0,0.0));
	draw(theSceneFn,v);
}
function translateYNeg()
{
	translate(v,point(0.0,-TRANS,0.0,0.0,0.0));
	draw(theSceneFn,v);
}
function translateZPos()
{
	translate(v,point(0.0,0.0,TRANS,0.0,0.0));
	draw(theSceneFn,v);
}
function translateZNeg()
{
	translate(v,point(0.0,0.0,-TRANS,0.0,0.0));
	draw(theSceneFn,v);
}
function translateWPos()
{
	translate(v,point(0.0,0.0,0.0,TRANS,0.0));
	draw(theSceneFn,v);
}
function translateWNeg()
{
	translate(v,point(0.0,0.0,0.0,-TRANS,0.0));
	draw(theSceneFn,v);
}
function arcXPos()
{
	applymatrix(v,add(v.vp,point(delta,0.0,0.0,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcYPos()
{
	applymatrix(v,add(v.vp,point(0.0,delta,0.0,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcZPos()
{
	applymatrix(v,add(v.vp,point(0.0,0.0,delta,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcWPos()
{
	applymatrix(v,add(v.vp,point(0.0,0.0,0.0,delta,0.0)));
	draw(theSceneFn,v);
}
function arcXNeg()
{
	applymatrix(v,add(v.vp,point(-delta,0.0,0.0,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcYNeg()
{
	applymatrix(v,add(v.vp,point(0.0,-delta,0.0,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcZNeg()
{
	applymatrix(v,add(v.vp,point(0.0,0.0,-delta,0.0,0.0)));
	draw(theSceneFn,v);
}
function arcWNeg()
{
	applymatrix(v,add(v.vp,point(0.0,0.0,0.0,-delta,0.0)));
	draw(theSceneFn,v);
}
function zoomPos()
{
	translate(v,mult(-.1,v.vp));
	draw(theSceneFn,v);
}
function zoomNeg()
{
	translate(v,mult(.1,v.vp));
	draw(theSceneFn,v);
}
function setXYPlaneZ()
{
	v=xyPlaneZ();
	draw(theSceneFn,v);
}
function setYWPlaneZ()
{
	v=ywPlaneZ();
	draw(theSceneFn,v);
}
function setSceneBlock()
{
	theSceneFn=inshape5;
	setXYPlaneZ()
	draw(theSceneFn,v);
}
function setSceneVolcanoes()
{
 	theSceneFn=inshape6;
 	v=xyPlaneZ();
 	draw(theSceneFn,v);
}
function setSceneHypercube()
{
	theSceneFn=inHypercube;
	setXYPlaneZ();
	draw(theSceneFn,v);
}
function addButton(fn,label,text)
{
	var btn = document.createElement("BUTTON");        // Create a <button> element
	var lab = document.createTextNode(label);       // Create a text node
	btn.appendChild(lab);
	var ctlsDiv=document.getElementById("controls");                                
	//document.body.appendChild(btn); 
	ctlsDiv.appendChild(btn); 
	btn.addEventListener("click",fn);
	if (text=="br")
		ctlsDiv.appendChild(document.createElement("br"));
	else
		ctlsDiv.appendChild(document.createTextNode(text));
}
function addLabel(text)
{
	var ctlsDiv=document.getElementById("controls");  
	ctlsDiv.appendChild(document.createTextNode(text));                              
	ctlsDiv.appendChild(document.createElement("br"));
}

var RETC=2.5;//1;
var VIEWD=30; //12;
var RETD=22.5;//9;
//console.log(VIEWD);

function xyPlaneZ() //xy plane along z
{
	var v={};
	//console.log("in fn: ",VIEWD);
	v.vp=point(0,0,VIEWD,0,0);
	v.nw=point(-RETC,RETC,RETD,0,0);
	v.ne=point(RETC,RETC,RETD,0,0,0);
	v.se=point(RETC,-RETC,RETD,0,0);
	v.sw=point(-RETC,-RETC,RETD,0,0);
	
	return v;
}
function ywPlaneX() //looking along x
{
	var v={};
	v.vp=point(VIEWD,0,0,0,0);
	v.nw=point(RETD,RETC,0,RETC,0);
	v.ne=point(RETD,RETC,0,-RETC,0);
	v.se=point(RETD,-RETC,0,-RETC,0);
	v.sw=point(RETD,-RETC,0,RETC,0);
	
	return v;
}
function ywPlaneZ()  //looking along z e key
{
	var v={};
	v.vp=point(0,0,VIEWD,0,0);
	v.nw=point(0,RETC,RETD,-RETC,0);
	v.ne=point(0,RETC,RETD,RETC,0);
	v.se=point(0,-RETC,RETD,RETC,0);
	v.sw=point(0,-RETC,RETD,-RETC,0);
	
	return v;
}
function yzPlaneX()  
{
	var v={};
	v.vp=point(VIEWD,0,0,0,0);
	v.nw=point(RETD,RETC,-RETC,0,0);
	v.ne=point(RETD,RETC,RETC,0,0);
	v.se=point(RETD,-RETC,RETC,0,0);
	v.sw=point(RETD,-RETC,-RETC,0,0);
	
	return v;
}
function xzPlaneY()
{
	var v={};
	v.vp=point(0,VIEWD,0,0,0);
	v.nw=point(RETC,RETD,RETC,0,0);
	v.ne=point(RETC,RETD,-RETC,0,0);
	v.se=point(-RETC,RETD,-RETC,0,0);
	v.sw=point(-RETC,RETD,RETC,0,0);
	
	return v;
}
function xyPlaneW() //xy plane, along w; n key
{
	var v={};
	v.vp=point(0,0,0,VIEWD,0);
	v.nw=point(-RETC,RETC,0,RETD,0);
	v.ne=point(RETC,RETC,0,RETD,0);
	v.se=point(RETC,-RETC,0,RETD,0);
	v.sw=point(-RETC,-RETC,0,RETD,0);
	
	return v;
}
function xzPlaneW() //xy plane, along w; n key
{
	var v={};
	v.vp=point(0,0,0,VIEWD,0);
	v.nw=point(-RETC,0,RETC,RETD,0);
	v.ne=point(RETC,0,RETC,RETD,0);
	v.se=point(RETC,0,-RETC,RETD,0);
	v.sw=point(-RETC,0,-RETC,RETD,0);
	
	return v;
}

function xwPlaneZ()  //along z; m key
{
	var v={};
	v.vp=point(0,0,VIEWD,0,0);
	v.nw=point(RETC,0,RETD,-RETC,0);
	v.ne=point(RETC,0,RETD,RETC,0);
	v.se=point(-RETC,0,RETD,RETC,0);
	v.sw=point(-RETC,0,RETD,-RETC,0);
	
	return v;
}
function xwPlaneY()//along y
{
	var v={};
	v.vp=point(0,VIEWD,0,0,0);
	v.nw=point(-RETC,RETD,0,RETC,0);
	v.ne=point(RETC,RETD,0,RETC,0);
	v.se=point(RETC,RETD,0,-RETC,0);
	v.sw=point(-RETC,RETD,0,-RETC,0);
	
	return v;
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

function mixInViewer(v1)
{
	//console.log("here");
	var k=.1; //how much of v1 to add
	var newV=interpolateViewers(v,v1,k);
	newV.vp.t=v.vp.t; //keep time fixed
	newV.nw.t=v.vp.t;
	newV.ne.t=v.vp.t;
	newV.se.t=v.vp.t;
	newV.sw.t=v.vp.t;
	v=newV;
	return;
}
function panCameraAhead()
{
	console.log("ahead; panlambda: ",panlambda);
	if(panlambda>=.9)
	{
		panlambda=1;
		return;
	}
	panlambda=panlambda+.1;
	var newV=interpolateViewers(xyPlaneW(),xwPlaneY(),panlambda); 
	newV.vp.t=v.vp.t; //keep time fixed
	newV.nw.t=v.vp.t;
	newV.ne.t=v.vp.t;
	newV.se.t=v.vp.t;
	newV.sw.t=v.vp.t;
	v=newV;
}
function panCameraBack()
{
	console.log("back; panlambda: ",panlambda);
	if(panlambda<=.1)
	{
		panlamdba=0;
		return;
	}
	panlambda=panlambda-.1;
	var newV=interpolateViewers(xyPlaneW(),xwPlaneY(),panlambda); //newviewer is xy plane along z
	newV.vp.t=v.vp.t; //keep time fixed
	newV.nw.t=v.vp.t;
	newV.ne.t=v.vp.t;
	newV.se.t=v.vp.t;
	newV.sw.t=v.vp.t;
	v=newV;
}
function translate(v,t) //adds vector t to all components of viwer v
{
	v.vp=add(v.vp,t);
	v.nw=add(v.nw,t);
	v.ne=add(v.ne,t);
	v.se=add(v.se,t);
	v.sw=add(v.sw,t);
}
function rotateViewer(rot)
{
	//console.log("v: ",v);
	var rv={}
	rv.vp=apply(rot,v.vp);
	rv.nw=apply(rot,v.nw);
	rv.ne=apply(rot,v.ne);
	rv.se=apply(rot,v.se);
	rv.sw=apply(rot,v.sw);
	v=rv;
}
function printviewer(v)
{
	alert("Viewer \n"+printpoint(v.vp)+
	printpoint(v.nw)+
	printpoint(v.ne)+
	printpoint(v.se)+
	printpoint(v.sw));
	
}

/* failed internal scaling attempt
function setCoordTransformXY()
{
	coordTransform=makeCoordTransform(0,1);
	console.log("coordTransform: ",coordTransform);
}
function makeCoordTransform(d0,d1)
{
	return function(q){var rot=makeRotation(d0,d1,ROTINC);console.log(q);var ans=apply(rot,q); return ans;};
}
*/

	
function rotateXYPos()
{
	var rot=makeRotation(0,1,ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateXYNeg()
{
	var rot=makeRotation(0,1,-ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateXZPos()
{
	var rot=makeRotation(0,2,ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateXZNeg()
{
	var rot=makeRotation(0,2,-ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateXWPos()
{
	var rot=makeRotation(0,3,ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateXWNeg()
{
	var rot=makeRotation(0,3,-ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateYWPos()
{
	var rot=makeRotation(1,3,ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
function rotateYWNeg()
{
	var rot=makeRotation(1,3,-ROTINC);
	rotateViewer(rot,v);
	draw(theSceneFn,v);
}
