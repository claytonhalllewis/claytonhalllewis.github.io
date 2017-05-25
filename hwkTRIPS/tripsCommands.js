 
function run()
{
	for(var i=0;i<originalDb.length;i++)
		mainDb[i]=originalDb[i];
	mainDb.length=originalDb.length;
	drawDb(mainDb);
	//addParticle("electron.png",[100,200]);
}
function com0()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","right sleeve"]);
	settle();
	eraseParticles();
	drawDb(mainDb);
}
function com1()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","left sleeve"]);
	settle();
	drawDb(mainDb);
}
function com2()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","center"]);
	settle();
	drawDb(mainDb);
}
function com3()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","leftside"]);
	settle();
	drawDb(mainDb);
}
function com4()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","atWall"]);
	settle();
	drawDb(mainDb);
}
function com5()
{
	takeAction(["hand","close","false"]);
	settle();
	drawDb(mainDb);
}
function com6()
{
	takeAction(["hand","close","true"]);
	settle();
	drawDb(mainDb);
}
function com7()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","belowLeftside"]);
	settle();
	drawDb(mainDb);
}
function com8()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","belowCenter"]);
	settle();
	drawDb(mainDb);
}
function com9()
{
	takeAction(["move","obj","hand"]);
	takeAction(["move","place","belowAtWall"]);
	settle();
	drawDb(mainDb);
}
