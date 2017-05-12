//scenario
function run()
{
drawDb(mainDb);
setTimeout(run0,10);
}
function run0()
{
alert();
takeAction(["hand","close","true"]);
settle();
drawDb(mainDb);

setTimeout(run1,10);
}
function run1()
{
alert();
takeAction(["move","obj","hand"]);
takeAction(["move","place","sp1"]);
settle();
drawDb(mainDb);
setTimeout(run2,10);
}
function run2()
{
	alert();
takeAction(["move","place","center"]);
settle();
drawDb(mainDb);
setTimeout(run3,10);
}
function run3()
{
	alert();
takeAction(["hand","close","false"]);
settle();
drawDb(mainDb);
}
