var Q=1; //constant in Feynman formula 28.3 in http://www.feynmanlectures.caltech.edu/I_28.html#Ch28-S1
var Epsilon0=1; //ditto
var DELTA=.001; //used in numerical approx of derivatives

var C=1000; //speed of light (arbitrarily scaled


function diff(f) //time derivative of scalar fn... not used in current program
{
	return function(t){return (f(t+DELTA)-f(t))/DELTA;}
}
function addV(v1,v0) //add vectors
{
	var that={};
	that.x=v1.x+v0.x;
	that.y=v1.y+v0.y;
	return that;
}
function multV(v,s) //multiply vector by scalar
{
	var that={};
	that.x=v.x*s;
	that.y=v.y*s;
	return that;
}
function diffV(fv) //time derivative of a vector fn
{
	return function(t){return multV(addV(fv(t+DELTA),multV(fv(t),-1)),1/DELTA);}
}
		

function fv(t)//vector fn for testing
{
	var that={};
	that.x=t*t;
	that.y=10*t+6;
	return that;
}
function vLen(v) //length of a vector
{
	return Math.sqrt(Math.pow(v.x,2)+Math.pow(v.y,2));
}
function rVec(p,t) //vector from charge to point at time t
{
	return addV(p,multV(q(t),-1));
}
function r(p,t) //distance from charge to point at time t
{
	return vLen(rVec(p,t));
}
var chargeMotion="horizontal";
function q(t) //position of moving charge at time t
{
	var AMP=50; //amplitude of oscillation of q 
	//charge  can move in a circle, oscillate horizontally or vertically,
	//or be stationary
        var that={x:0,y:0};
	if (chargeMotion=="stationary")
	{
		return that;
	}
        if (chargeMotion=="horizontal")
	{
		that.x=AMP*Math.cos(t);
		return that;
        }
	if (chargeMotion=="vertical")
	{
		that.y=AMP*Math.sin(t);
		return that;
        }
	//circular
	that.x=AMP*Math.cos(t);
	that.y=AMP*Math.sin(t);
	return that;
}
function setStationaryMotion()
{
	chargeMotion="stationary";
}
function setHorizontalMotion()
{
	chargeMotion="horizontal";
}
function setVerticalMotion()
{
	chargeMotion="vertical";
}
function setCircularMotion()
{
	chargeMotion="circular";
}
function delay(p,t) //see Feynman; approx time for signal from charge to reach p
{
	return r(p,t)/C;
}
function rPrimeVec(p,t) //see Feynman; vector from retarded position of charge to p
{
	return rVec(p,t-delay(p,t));
}
function rPrime(p,t)//see Feynman; distance from retarded position of charge to p
{
	return vLen(rPrimeVec(p,t));
}

function eRPrime(p,t) //see Feynman; unit vector oriented with rPrimeVec
{
	return multV(rPrimeVec(p,t),1/rPrime(p,t));
}
function firstTerm(p,t) //see Feynman; first term in sum
{
	return multV(eRPrime(p,t),1/Math.pow(rPrime(p,t),2));
}
function secondTerm(p,t) //see Feynman; second term in sum
{
	return multV(deriv(p,t), rPrime(p,t)/C);
}
function deriv(p,t) //time derivative needed in second term
{
	var dummy=function(k){return multV(eRPrime(p,k),1/Math.pow(rPrime(p,k),2));};
	return diffV(dummy)(t);
}
function thirdTerm(p,t) //see Feynman; third term of sum
{
	return multV(deriv2(p,t),1/Math.pow(C,2));
}
function deriv2(p,t) //second time derivative needed in third term
{
	var dummy=function(k){return eRPrime(p,k);};
	return diffV(diffV(dummy))(t);
}
function capE(p,t) //see Feynman. capital E is electric field
{
  return multV(addV(addV(firstTerm(p,t),secondTerm(p,t)),thirdTerm(p,t)),(-1*Q/4*Math.PI*Epsilon0));
}
