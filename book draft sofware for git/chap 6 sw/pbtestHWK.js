function test()
{

var testProgram=   //to test conversion and execution
[
	{
	"blockname":"play",
	"type":"statement",
	"args":
	[
		{"argname":"sound","type":"soundblock",
		"value":
			{
				"blockname":"note",
				"type":"soundblock",
				"args":[{"argname":"note","type":"dropdown","choices":[{"choice":"C"},{"choice":"D"},{"choice":"E"},{"choice":"F"},{"choice":"G"},{"choice":"A"},{"choice":"B"},{"choice":"C five"}],"value":"A"}]
			}
		}
	]
	},
	{
	"blockname":"repeat",
	"type":"statement",
	"args":
	[
		{"argname":"times","type":"numberfield","value":3},
		{
			"argname":"nest",
			"type":"statements",
			"value":
			[
			{
				"blockname":"play",
				"type":"statement",
				"args":
				[
					{"argname":"sound","type":"soundblock",
					"value":
						{
							"blockname":"note",
							"type":"soundblock",
							"args":[{"argname":"note","type":"dropdown","choices":[{"choice":"C"},{"choice":"D"},{"choice":"E"},{"choice":"F"},{"choice":"G"},{"choice":"A"},{"choice":"B"},{"choice":"C five"}],"value":"C"}]
						}
					}
				]
			},
			{
				"blockname":"play",
				"type":"statement",
				"args":
				[
					{"argname":"sound","type":"soundblock",
					"value":
						{
							"blockname":"note",
							"type":"soundblock",
							"args":[{"argname":"note","type":"dropdown","choices":[{"choice":"C"},{"choice":"D"},{"choice":"E"},{"choice":"F"},{"choice":"G"},{"choice":"A"},{"choice":"B"},{"choice":"C five"}],"value":"F"}]
						}
					}
				]
			}
			]
		}
	]
}
];
//tests
structure[0]=toolbox;
structure[1]=testProgram;

cursor=[0];
console.log(Editing(),Inserting(),OnHeading());
console.log("0 false, true, false");
cursor=[0,0];
console.log(Editing(),Inserting(),OnHeading());
console.log("1 false, true, true");
cursor=[0,0,0];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),OnBlock());
console.log("2 false, true, false, true, true");
cursor=[0,0,1];
console.log(where(cursor).blockname);
console.log("3 D note");
cursor=[1];
console.log(Editing(),Inserting(),OnHeading(),OnStatement());
console.log("4 true, false, false, false");
cursor=[1,0];
console.log(Editing(),Inserting(),OnHeading(),OnStatement());
console.log("5 true, false, false, true");
console.log(where(cursor).blockname);
console.log("6 play");
cursor=[1,1];
console.log(where(cursor).blockname);
console.log("7 repeat");
cursor=[1,1,0];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),InArgs());
console.log("8 true, false, false, false, true");
console.log(where(cursor).argname,where(cursor).type);
console.log("9 times, numberfield");
cursor=[1,1,1];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),InArgs());
console.log("10 true, false, false, false, true");
console.log(where(cursor).argname,where(cursor).type);
console.log("11 nest, statements");
cursor=[1,1,1,0];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),InArgs());
console.log("12 true, false, false, true, false");
console.log(where(cursor).blockname,where(cursor).type);
console.log("13 play, statement");
cursor=[1,1,1,1];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),InArgs());
console.log("14 true, false, false, true, false");
console.log(where(cursor).blockname,where(cursor).type);
console.log("15 play, statement");
cursor=[1,1,1,1,0];
console.log(Editing(),Inserting(),OnHeading(),OnStatement(),InArgs());
console.log("16 true, false, false, false, tru");
console.log(where(cursor).argname,where(cursor).type);
console.log("17 sound, soundblock");
console.log(where(cursor).value.blockname);
console.log("18 note");
cursor=[1,0];
console.log(HasNest());
console.log("19 false");
cursor=[1,1];
console.log(HasNest());
console.log("20 true");
cursor=[1,1,1,0];
console.log(InNest(),AtBottomOfNest());
console.log("21 true false");
cursor=[1,1,1,1];
console.log(InNest(),AtBottomOfNest());
console.log("22 true true");

insertionType="statement";
	StartPaletteScan();
	console.log(cursor);
	console.log("23 should be [0,0]");
	StartScanInHeading();
	console.log(cursor);
	console.log("24 should be [0,0,0]");
	NextBlockInHeading();
	console.log(cursor);
	console.log("25 should be [0,0,1]");
	NextHeadingInPalette();
	console.log(cursor);
	console.log("26 should be [0,1]");
	NextHeadingInPalette();
	console.log(cursor);
	console.log("27 should be [0,2]");
	StartScanInHeading();
	console.log(cursor);
	console.log("28 should be [0,2,0]");
	NextBlockInHeading();
	console.log(cursor);
	console.log("29 should be [0,2,0]");
	StartPaletteScan();
	console.log(cursor);
	console.log("30 should be 0,0");

	cursor=[1,0];
	EnterArgs();
	console.log(cursor);
	console.log("31 should be [1,0,0]");
	console.log(InArgs());
	console.log("32 should be true");
	cursor=[1,0];
	console.log(InArgs());
	console.log("33 should be false");
	cursor=[1,0,0];
	NextArg();
	console.log(cursor);
	console.log("34 should be [1,0,0]"); //only one arg
	cursor=[1,1,0];
	NextArg();
	console.log(cursor);
	console.log("35 should be [1,1,1]");

	DoEdit();
	console.log(cursor);
	console.log("36 should be [0,0]");
	console.log(insertionPoint);
	console.log("37 should be [1,1,1,0]");
	cursor=[1,1,0];
	DoEdit();
	console.log("38 should prompt for num");
	cursor=[1,1,0]
	NextArg();
	DoEdit();
	cursor=[0,0,0];
	Insert();
	console.log(insertionPoint);
	console.log("39 should be 1,1,1,1")
	console.log(where(insertionPoint).blockname);
	console.log("40 should be C note");


	cursor=[0,0];
	describe();
	console.log("41 player notes  heading");
	cursor=[0,0,0];
	describe();
	console.log("42 C note statement");
	cursor=[1,0]
	describe();
	console.log("43 play statement");
	cursor=[1,0,0]
	describe();
	console.log("44 sound soundblock");
	cursor=[1,1];
	describe();
	console.log("45 repeat statement");
	cursor=[1,1,0];
	describe();
	console.log("46 times numberfield");

	cursor=[1,0];
	MoveCursorDown();
	//describe();
	console.log("47 repeat statement ");
	MoveCursorDown();;
	//describe();
	console.log("48 play statement");
	EnterArgs();
	//describe();
	console.log("49 sound soundblock");
	cursor=[1,0];
	console.log(PrevStatementHasNest());
	console.log("50 should be true");
	cursor=[1,1];
	console.log(PrevStatementHasNest());
	console.log("51 false"); 
	cursor=[1,0];
	MoveCursorUpIntoNest();
	console.log(cursor);
	console.log("52 1,1,1,2"); //statement was inserted!
	cursor=[1,1,1,0];
	console.log(AtTopOfNest());
	console.log("53 true");
	cursor=[1,1,1,1];
	console.log(AtTopOfNest());
	console.log("54 false");
	cursor=[1,1,1,0];
	MoveCursorUpOutOfNest();
	console.log(cursor);
	console.log("55 1,1");
	MoveCursorUp();
	console.log(cursor);
	console.log("56 1,0");

	cursor=[1,0,0,0];
	console.log(InArgs())
	console.log("57 true");
	DoEdit();
	console.log(cursor);
	console.log("58 1,0,0,0,0");
	console.log(InDropdown())
	console.log("59 true");
	console.log(structure[1][0].args[0].value.args[0].value);
	console.log("60 A")
	SelectFromDropdown();
	console.log(structure[1][0].args[0].value.args[0].value);
	console.log("61 C")
	cursor=[1,0];
	console.log(OnStatement());
	console.log("62 true");
	ExtendCursor();
	console.log(cursor);
	console.log("63 1,0,0");
	console.log(OnStatement());
	console.log("64 false");
	console.log(InArgs());
	console.log("65 true");
	RetractCursor();
	console.log(cursor);
	console.log("66 1,0");
	console.log(OnStatement());
	console.log("67 true");
	console.log(InArgs());
	console.log("68 false");

	//simulated user sessions
	
	//insert a statement
	insertionPoint=[1,0];
	insertionType="statement";
	StartPaletteScan();
	StartScanInHeading();
	Insert();
	EndInserting();
	console.log("after insert note A statement");
	console.log(cursor);
	console.log("69 1")
	console.log(structure[1][1]);
	console.log("70 C note");
	insertionPoint=[1];
	insertionType="statement";
	StartPaletteScan();
	StartScanInHeading();
	Insert();
	EndInserting();
	console.log("after insert note A statement");
	console.log(cursor);
	console.log("71 1")
	console.log(structure[1][0]);
	console.log("72 C note");

	//play note c
	insertionPoint=[1];
	insertionType="statement";
	StartPaletteScan();
	NextHeadingInPalette(); //skipp direct play
	NextHeadingInPalette(); //skip control
	StartScanInHeading();
	Insert();
	console.log("after insert play statement");
	console.log(structure[1][0]);
	console.log("73 play");
	EndInserting(); 
	EnterProgram(); //enter statement list
	console.log(cursor);
	console.log("74 1,0")
	EnterArgs();
	DoEdit();
	StartPaletteScan();
	StartScanInHeading();
	Insert();
	console.log("after insert soundblock");
	//console.log(structure[1][0].args[0].value.blockname);
	console.log(structure[1][0].args[0].value);
	console.log("75 note");
	EndInserting();
	EnterProgram(); //enter statements
	EnterArgs(); //enter args
	DoEdit(); //edit block
	DoEdit(); //make choice
	console.log(structure[1][0].args[0].value.args[0].value);
	console.log("76 C");

	//execute(testProgram); 

	structure=[toolbox,[]]; //restart

	//build note A repeat 3 note B note B end note A
	insertionPoint=[1];
	insertionType="statement";
	StartPaletteScan();
	StartScanInHeading();
	Insert();
	console.log(structure[1][0].blockname);
	console.log("77 C note");
	NextHeadingInPalette(); //control
	StartScanInHeading();
	Insert();
	console.log(structure[1][1].blockname);
	console.log("78 repeat")
	PrevHeadingInPalette();
	console.log(cursor)
	console.log("78.1 [0,0]");
	StartScanInHeading();
	NextBlockInHeading();
	Insert();
	console.log(structure[1][2].blockname);
	console.log("79 D note")
	EndInserting();
	EnterProgram();
	MoveCursorDown();
	EnterArgs();
	DoEdit();
	console.log(structure[1][1].args[0].value);
	console.log("80 5 (or whatever was entered)");
	NextArg();
	DoEdit();
	StartScanInHeading();
	NextBlockInHeading();
	Insert();
	console.log(structure[1][1].args[1].value[0].blockname);
	console.log("81 D note");
	Insert(); //insert same block again
	console.log(structure[1][1].args[1].value.length);
	console.log("82 2")
	EndInserting();
	Execute();
	
	//for navigation test in workspace
	//cursor=[1];
};

	/*
	structure=[toolbox,[]];
	deletionType="none;"
	insertionPoint=[1];
	insertionType="statement";
	StartPaletteScan();
	say();
	*/

	


