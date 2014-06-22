//numbers, colors, and some arithmetic

var HALFSIDE=75;
var HALFHEIGHT=HALFSIDE/Math.sqrt(3)
var HH4=HALFHEIGHT/2;
var HH8=HALFHEIGHT/4;
var HS4=HALFSIDE/2;
var HS8=HALFSIDE/4;
var LINEWIDTH=16;
var WHITE="rgb(255,255,255)";
var RED="rgb(255,0,0)";
var BLUE="rgb(0,0,255)";
var GREEN="rgb(0,255,0)";
var YELLOW="rgb(255,255,0)";
var halfside=function()
{
	return HALFSIDE;
}
var quarter=function()
{
	return .25;
}
var half=function()
{
	return .5;
}
var one=function()
{
	return 1.;
}
var two=function()
{
	return 2.;
}
var pi=function()
{
	return 3.1415926;
}
var hundred=function()
{
	return 100.;
}
var twofiftyfive=function()
{
	return 255.;
}
var white=function()
{
	return "rgb(255,255,255)";
}
var black=function()
{
	return "rgb(0,0,0)";
}
var red=function()
{
	return "rgb(255,0,0)";
}
var blue=function()
{
	return "rgb(0,0,255)";
}
var green=function()
{
	return "rgb(0,255,0)";
}
var yellow=function()
{
	return "rgb(255,255,0)";
}
var times=function(arg)
{
	return arg.n0*arg.n1;
}
var minus=function(arg)
{
	return arg.n0-arg.n1;
}
var divide=function(arg)
{
	return arg.n0/arg.n1;
}