function printpoint(p)
{
	return "("+p.x.toFixed(2)+", "+p.y.toFixed(2)+", "+p.z.toFixed(2)+", "+p.w.toFixed(2)+", "+p.t.toFixed(2)+")\n ";
}
function applymatrix(v, newvp)
{
	//here newvp is new position of viewpoint
	//idea is to transform whole viewer to correspond
	//do this by computing rotation matrix and translation, then applying this to viewer
	var rot=makematrix(v.vp,newvp);
	transformviewer(rot,maketrans(v.vp,newvp,rot),v);
}
function maketrans(v0, v1,  rot)
{
	return subtract(v1,apply(rot,v0));
}
function identity()
{
	var id={};
	id.rowx=point(1.0,0.0,0.0,0.0,0.0);
	id.rowy=point(0.0,1.0,0.0,0.0,0.0);
	id.rowz=point(0.0,0.0,1.0,0.0,0.0);
	id.roww=point(0.0,0.0,0.0,1.0,0.0);
	id.rowt=point(0.0,0.0,0.0,0.0,1.0);
	return id;
}
	
function makematrix(v0,v1)
{

	var x=point(1.0,0.0,0.0,0.0,0.0);
	var y=point(0.0,1.0,0.0,0.0,0.0);
	var z=point(0.0,0.0,1.0,0.0,0.0);
	var w=point(0.0,0.0,0.0,1.0,0.0);
	var t=point(0.0,0.0,0.0,0.0,1.0);
	var d=norm(v0);
	if(d==0) 
	{
		console.log("zero divide");
		return identity();
	}
	var vx=mult(1.0/d,v0);
	var tv=subtract(v1,mult(dot(vx,v1),vx));
	d=norm(tv);
	if(d==0) 
	{
		console.log("zero divide");
		return identity();
	}
	var vy=mult(1.0/d,tv);
	//printf("vxvx %f, vyvy %f vxvy %f\n",dot(vx,vx),dot(vy,vy),dot(vx,vy));
	var cos=dot(v0,v1)/(norm(v0)*norm(v1));
	var sin=Math.sqrt(1.0-cos*cos);
	var a=subtract(mult(cos,vx),mult(sin,vy));
	var b=add(mult(sin,vx),mult(cos,vy));
	var r={};
	r.rowx=add(add(mult(vx.x,a),mult(vy.x,b)),subtract(x,add(mult(vx.x,vx),mult(vy.x,vy))));
	r.rowy=add(add(mult(vx.y,a),mult(vy.y,b)),subtract(y,add(mult(vx.y,vx),mult(vy.y,vy))));
	r.rowz=add(add(mult(vx.z,a),mult(vy.z,b)),subtract(z,add(mult(vx.z,vx),mult(vy.z,vy))));
	r.roww=add(add(mult(vx.w,a),mult(vy.w,b)),subtract(w,add(mult(vx.w,vx),mult(vy.w,vy))));
	r.rowt=add(add(mult(vx.t,a),mult(vy.t,b)),subtract(t,add(mult(vx.t,vx),mult(vy.t,vy))));
	
	//check... should get v1 if apply r and trans to v0
	//printpoint(v0);
	//printpoint(transformpt(r,maketrans(v0,v1,r),v0));
	//printpoint(v1);
	return r;
}
function mult(k,p)
{
	var r={};
	r.x=k*p.x;
	r.y=k*p.y;
	r.z=k*p.z;
	r.w=k*p.w;
	r.t=k*p.t;
	return r;
}



function transformviewer(m, trans,v)
{
	
	v.vp=transformpt(m,trans,v.vp);
	v.nw=transformpt(m,trans,v.nw);
	v.ne=transformpt(m,trans,v.ne);
	v.se=transformpt(m,trans,v.se);
	v.sw=transformpt(m,trans,v.sw);
}
function apply(m, p)
{
	var newp={};
	newp.x=dot(m.rowx,p);
	newp.y=dot(m.rowy,p);
	newp.z=dot(m.rowz,p);
	newp.w=dot(m.roww,p);
	newp.t=dot(m.rowt,p);
	return newp;
}
function transformpt(m, trans, p)
{
	return add(apply(m,p),trans);
	
}

function makeRotation(d0,d1, theta) //make rotation in d0 x d1 plane
{
	var cos=Math.cos(theta);
	var sin=Math.sin(theta);
	var m=identityMatrix();
	m[d0][d0]=cos;
	m[d0][d1]=-sin;
	m[d1][d0]=sin;
	m[d1][d1]=cos;
	var res=convertMatrixNamedCoords(m)
	return res;
}
function identityMatrix()
{
	var m=[];
	var i;
	for(i=0;i<5;i++)
	{
		m[i]=[0,0,0,0,0];
		m[i][i]=1;
	}
	return m;
}
function convertMatrixNamedCoords(m)
{
	var conv={};
	conv.rowx=point(m[0][0],m[0][1],m[0][2],m[0][3],m[0][4]);
	conv.rowy=point(m[1][0],m[1][1],m[1][2],m[1][3],m[1][4]);
	conv.rowz=point(m[2][0],m[2][1],m[2][2],m[2][3],m[2][4]);
	conv.roww=point(m[3][0],m[3][1],m[3][2],m[3][3],m[3][4]);
	conv.rowt=point(m[4][0],m[4][1],m[4][2],m[4][3],m[4][4]);
	return conv;
}
function norm(v)
{
	return Math.sqrt(dot(v,v));
}
function dot(p1, p2)
{
	//console.log("p1,p2: ",p1,p2);
	return p1.x*p2.x+p1.y*p2.y+p1.z*p2.z+p1.w*p2.w+p1.t*p2.t;
}


function subtract(p1, p2)
{
	var res={};
	res.x=p1.x-p2.x;
	res.y=p1.y-p2.y;
	res.z=p1.z-p2.z;
	res.w=p1.w-p2.w;
	res.t=p1.t-p2.t;
	return res;
}
function add(p1, p2)
{
	var res={};
	res.x=p1.x+p2.x;
	res.y=p1.y+p2.y;
	res.z=p1.z+p2.z;
	res.w=p1.w+p2.w;
	res.t=p1.t+p2.t;
	return res;
}	
function point(x,y,z,w,t)
{
	var p={};
	p.x=x;p.y=y;p.z=z;p.w=w;p.t=t;
	return p;
}