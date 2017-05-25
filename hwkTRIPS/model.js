var mainDb=[];
var originalDb=[

["hasProton","hasImage","proton.png"],
["hasElectron","hasImage","electron.png"],

["leftside","location",[250,250]],
["center","location", [600,250]],
["atWall","location",[850,250]],
["wall0place","location",[965,250]],
["wall1place","location",[965,370]],
["wall2place","location",[965,490]],
["belowLeftside","location",[250,500]],
["belowCenter","location", [600,500]],
["belowAtWall","location",[850,500]],

["atWall","nearWall","true"],
["belowAtWall","nearWall","true"],
["atWall","wallPart","wall0"],
["belowAtWall","wallPart","wall2"],

["atWall","isAbove","belowAtWall"],
["leftside","isAbove","belowLeftside"],
["center","isAbove","belowCenter"],

["wallPart","is","wall0"],
["wallPart","is","wall2"],

["hasProton","hasOffset",[20,20]],
["hasElectron","hasOffset",[40,40]],

["right sleeve","hasOffset",[-140,-60]],
["left sleeve","hasOffset",[60,-70]],
["bp1","hasOffset",[-10,-50]],
["bp2","hasOffset",[-70,-40]],
["bep1","hasOffset",[-50,-100]],
["bep2","hasOffset",[-50,0]],


["thing", "is","sweater"],
["thing","is","balloon"],

["sweater","contains","right sleeve"],
["sweater","contains","left sleeve"],
["balloon","contains","bp1"],
["balloon","contains","bp2"],
["balloon","contains","bep1"],
["balloon","contains","bep2"],

["right sleeve","hasElectron","true"],
["left sleeve","hasElectron","true"],
["bp1","hasElectron","true"],
["bp2","hasElectron","true"],
["bep1","hasElectron","false"], 
["bep2","hasElectron","false"],

["right sleeve","hasProton","true"], 
["left sleeve","hasProton","true"],
["bp1","hasProton","true"],
["bp2","hasProton","true"],
["bep1","hasProton","false"],
["bep2","hasProton","false"],

["right sleeve","opposite","bep1"],
["left sleeve","opposite","bep2"],

["balloon","light","true"],

["hand","close","false"],
["hand","at","center"],
["balloon","at","belowAtWall"],
["sweater","at","leftside"],

["wall0","at","wall0place"],
["wall1","at","wall1place"],
["wall2","at","wall2place"],

["close",".arity","11"],
["unique",".arity","11"],
["at",".arity","m1"],
["prev",".arity","m1"],
["appliesTo",".arity","1m"],
["obj",".arity","11"],
["place",".arity","11"],
["hasElectron",".arity","m1"],
["hasProton",".arity","m1"],
["say",".arity","m1"],
["wallImage",".arity","m1"],
["isAbove",".arity","m1"],
["thing",".arity","m1"]


];



var rules=[
[
	[
		[["thing","is","contains","hasElectron"],"eq",["true"]],
		[["thing","is","contains","hasProton"],"eq",["false"]],
		[["thing","is","hasSurplus"],"neq",["true"]]
	],
	[
		[["electronBalance-surplus"],"appliesTo",["thing","is"]],
		[["thing","is"],"hasSurplus",["true"]],
		[["thing","is"],"hasDeficit",["false"]],
		[["narr0"],"say",["if a part of something has an electron and no proton it has an electron surplus. Here the thing with the surplus is the"]], //.arity of say is m1
		[["narr1"],"say",["thing","is" ]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["thing","is","contains","hasElectron"],"eq",["false"]],
		[["thing","is","contains","hasProton"],"eq",["true"]],
		[["thing","is","hasDeficit"],"neq",["true"]]
	],
	[
		[["electronBalance-deficit"],"appliesTo",["thing","is"]],
		[["thing","is"],"hasSurplus",["false"]],
		[["thing","is"],"hasDeficit",["true"]],
		[["narr0"],"say",["if a part of something has a proton and no electron it has an electron deficit. Here the thing with the deficit is the"]], //.arity of say is m1
		[["narr1"],"say",["thing","is" ]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
/*
[
	[
	],
	[
		[["electronBalance-neutral"],"appliesTo",["thing","is"]]
	]
],
*/
[
	[
		[["balloon","rub","hasElectron"],"eq",["true"]],
	],
	[
		[["balloon","rub"],"hasElectron",["false"]],
		[["balloon","rub","opposite"],"hasElectron",["true"]],
		[["narr0"],"say",["If a balloon is rubbed on something with an electron, the electron moves onto the balloon."]], //.arity of say is m1
		[["narr1"],"say",["NULL"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["move","obj"],"eq",["hand"]],
		[["held","unique"],"neq",["NULL"]],
		[["held","unique"],"neq",["sweater"]]
	],
	[
		[["held","unique"],"prev",["held","unique","at"]],
		[["held","unique"],"at",["move","place"]],
		[["hand"],"at",["move","place"]],
		[["move"],"obj",["NULL"]],
		[["narr0"],"say",["You have moved the"]], //.arity of say is m1
		[["narr1"],"say",["held","unique"]],
		[["narr2"],"say",["to"]],
		[["narr3"],"say",["move","place"]]
	]
],
[
	[
		[["move","obj"],"eq",["hand"]],
		[["held","unique"],"eq",["sweater"]],
		[["move","place","hasElectron"],"neq",["NULL"]]//don't let sweater move to part

	],
	[
		[["hand"],"close",["false"]], //open the hand
		[["hand"],"at",["move","place"]],
		[["move"],"obj",["NULL"]],
		[["narr0"],"say",["You can't move the sweater onto itself, so you have to let go. You've moved the hand to"]], //.arity of say is m1
		[["narr1"],"say",["move","place"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["move","obj"],"eq",["hand"]],
		[["move","place","hasElectron"],"eq",["NULL"]], //ok to move sweater to non part
		[["held","unique"],"eq",["sweater"]]
	],
	[
		[["held","unique"],"prev",["held","unique","at"]],
		[["held","unique"],"at",["move","place"]],
		[["hand"],"at",["move","place"]],
		[["move"],"obj",["NULL"]],
		[["narr0"],"say",["You have moved the"]], //.arity of say is m1
		[["narr1"],"say",["held","unique"]],
		[["narr2"],"say",["to"]],
		[["narr3"],"say",["move","place"]]
	]
],
[
	[
		[["move","obj"],"eq",["hand"]],
		[["held","unique"],"eq",["NULL"]]
	],
	[
		[["hand"],"at",["move","place"]],
		[["move"],"obj",["NULL"]],
		[["narr0"],"say",["You have moved the hand to"]], //.arity of say is m1
		[["narr1"],"say",["move","place"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["sweater","contains"],"eq",["balloon","prev"]],
		[["balloon","rub"],"neq",["balloon","prev"]]
	],
	[
		[["balloon"],"rub",["sweater","contains"]],
		[["narr0"],"say",["Pulling the balloon away from a place on the sweater is rubbing it."]], //.arity of say is m1
		[["narr1"],"say",["NULL"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["electronBalance-surplus","appliesTo"],"neq",["NULL"]],
		[["electronBalance-deficit","appliesTo"],"neq",["NULL"]],
		[["attractor","thing"],"eq",["NULL"]],
		[["attracted","thing","at","nearWall"],"neq",["true"]]
	],
	[
		[["attracted"],"thing",["electronBalance-surplus","appliesTo"]],
		[["attractor"],"thing",["electronBalance-deficit","appliesTo"]],
		[["narr0"],"say",["Something with an electron surplus is attracted to something with an electron deficit. Here the "]], //.arity of say is m1
		[["narr1"],"say",["electronBalance-surplus","appliesTo"]],
		[["narr2"],"say",["is attracted to the"]],
		[["narr3"],"say",["electronBalance-deficit","appliesTo"]]

	]
],
[
	[
		[["attracted","thing"],"neq",["NULL"]],
		[["attractor","thing"],"neq",["NULL"]], //to prevent moving in sticking case
		[["attracted","thing"],"neq",["held","unique"]],
		[["attracted","thing","light"],"eq",["true"]],
		[["attracted","thing","at"],"neq",["attractor","thing","at"]]
	],
	[
		[["attracted","thing"],"at",["attractor","thing","at"]],
		[["narr0"],"say",["If something that's light is attracted to something, and isn't being held, it goes to the thing attracting it. Here the "]], //.arity of say is m1
		[["narr1"],"say",["attracted","thing"]],
		[["narr2"],"say",["moves to the"]],
		[["narr3"],"say",["attractor","thing"]]
	]
],
[
	[
		[["balloon"],"neq",["attracted","thing"]],
		[["balloon"],"neq",["held","unique"]],
		[["balloon","at","isAbove"],"neq",["NULL"]]
	],
	[
		[["balloon"],"at",["balloon","at","isAbove"]],
		[["narr0"],"say",["The balloon drops to the floor."]], //.arity of say is m1
		[["narr1"],"say",["NULL"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
		
		
	]
],

[
	[
		[["hand","close"],"eq",["true"]],
		[["thing","is","at"],"eq",["hand","at"]],
		[["held","unique"],"eq",["NULL"]]
	],
	[
		[["held"],"unique",["thing","is"]],
		[["narr0"],"say",["You are holding the"]], //.arity of say is m1
		[["narr1"],"say",["held","unique"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]]
	]
],
[
	[
		[["hand","close"],"eq",["false"]],
		[["held","unique"],"neq",["NULL"]]
	],
	[
		[["narr0"],"say",["You have dropped the"]], //.arity of say is m1
		[["narr1"],"say",["held","unique"]],
		[["narr2"],"say",["NULL"]],
		[["narr3"],"say",["NULL"]],
		[["held"],"unique",["NULL"]]
		
	]
],
[
	[
		[["thing","is","hasSurplus"],"eq",["true"]],
		[["thing","is","at","nearWall"],"eq",["true"]],
		[["thing","is","at","wallPart","wallImage"],"neq",["polarized.png"]]

	],
	[
		[["thing","is","at","wallPart"],"wallImage",["polarized.png"]],
		[["narr0"],"say",["The extra electrons on the "]], //.arity of say is m1
		[["narr1"],"say",["thing","is"]],
		[["narr2"],"say",["have rotated the dipoles in the wall."]],
		[["narr3"],"say",["NULL"]]
		
		
	]
],
[
	[
		[["thing","is","hasSurplus"],"eq",["true"]],
		[["thing","is","at","wallPart","wallImage"],"eq",["polarized.png"]],
		[["attractor","thing"],"neq",["NULL"]]

	],
	[
		[["attracted"],"thing",["thing","is"]],
		[["attractor"],"thing",["NULL"]], //don't move it
		[["narr0"],"say",["The extra electrons on the "]], //.arity of say is m1
		[["narr1"],"say",["thing","is"]],
		[["narr2"],"say",["are attracted to the protons in the dipoles, "]],
		[["narr3"],"say",["which are closer than the electrons."]]
		
		
	]
],
[
	[
		[["wallPart","is","wallImage"],"eq",["polarized.png"]],
		[["balloon","at","wallPart"],"neq",["wallPart","is"]]
	],
	[
		[["wallPart","is"],"wallImage",["randomWall.png"]],
		[["narr0"],"say",["With the electrons on the balloon gone "]], //.arity of say is m1
		[["narr1"],"say",["the previously rotated dipoles in the wall"]],
		[["narr2"],"say",["drift back to random orientation."]],
		[["narr3"],"say",["NULL"]]
		
		
	]
]

];