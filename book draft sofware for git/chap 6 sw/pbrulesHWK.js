var rules=
[
	{"cond":[Down,Editing, AtTop],"action":[EnterProgram],"name":"enter program"},
	{"cond":[Down,Editing, OnStatement,HasNest],"action":[MoveCursorIntoNest],"name":"d into nest"},
	{"cond":[Down,Editing, OnStatement,InNest,AtBottomOfNest],"action":[MoveCursorDownOutOfNest],"name":"d out of nest"},
	{"cond":[Down,Editing, OnStatement],"action":[MoveCursorDown],"name":"d in stmt list"},
	
	{"cond":[Up,Editing, OnStatement,PrevStatementHasNest],"action":[MoveCursorUpIntoNest],"name":"u into nest"},
	{"cond":[Up,Editing, OnStatement,InNest,AtTopOfNest],"action":[MoveCursorUpOutOfNest],"name":"u out of nest"},
	{"cond":[Up,Editing, OnStatement],"action":[MoveCursorUp],"name":"u in stmt list"},


	{"cond":[Up,Editing, InArgs],"action":[RetractCursor],"name":"out of args"},
	{"cond":[Down,Editing, InArgs],"action":[RetractCursor],"name":"out of args"},

	{"cond":[Up,Editing, InDropdown],"action":[MoveCursorUp],"name":"d in dropdown"},
	{"cond":[Down,Editing, InDropdown],"action":[MoveCursorDown],"name":"d in dropdown"},
	{"cond":[Down,Editing, OnBlock],"action":[EnterArgs],"name":"enter args block"},
	
	{"cond":[Right,Editing, AtTop],"action":[EnterProgram],"name":"enter program"},
	{"cond":[Right,Editing, OnStatement],"action":[EnterArgs],"name":"enter args on stmnt"},
	{"cond":[Enter,Editing, OnStatement],"action":[EnterArgs],"name":"enter args on stmnt"},

	{"cond":[Right,Editing, InDropdown],"action":[NextArg],"name":"next arg"},
	{"cond":[Left,Editing, InDropdown],"action":[PrevArg],"name":"prev arg"},
	{"cond":[Right,Editing, InArgs],"action":[NextArg],"name":"next arg"},
	{"cond":[Left,Editing, InArgs],"action":[PrevArg],"name":"prev arg"},

	{"cond":[Enter,Editing, InArgs, NotNest],"action":[DoEdit],"name":"edit on arg"},
	{"cond":[Enter,Editing, InArgs],"action":[MoveCursorIntoNest],"name":"edit on arg"},


	{"cond":[Select,Editing,AtTop],"action":[DoEdit],"name":"edit at top level"},
	{"cond":[Select,Editing,InDropdown],"action":[SelectFromDropdown],"name":"select in dropdown"},
	{"cond":[Select,Editing,OnStatement],"action":[DoEdit],"name":"edit on statement"},
	{"cond":[Select,Editing,InArgs],"action":[DoEdit],"name":"edit on arg"},


	{"cond":[Delete,Editing,OnStatement],"action":[DeleteStatement],"name":"delete statement"},
	{"cond":[Delete,Editing,InArgs],"action":[DeleteArg],"name":"delete on arg"},

	{"cond":[Minus],"action":[Undo],"name":"Undo"},

	
	
	{"cond":[Down,Inserting, OnHeading],"action":[NextHeadingInPalette],"name":"d heading"},
	{"cond":[Up,Inserting, OnHeading],"action":[PrevHeadingInPalette],"name":"u heading"},
	{"cond":[Down,Inserting],"action":[NextBlockInHeading],"name":"d in heading"},
	{"cond":[Up,Inserting],"action":[PrevBlockInHeading],"name":"u in heading"},
	{"cond":[Left,Inserting, OnHeading],"action":[StartScanInHeading],"name":"start heading"},
	{"cond":[Right,Inserting, OnBlockInPalette],"action":[NextHeadingInPalette],"name":"next heading"},
	{"cond":[Right,Inserting, OnHeading],"action":[EndInserting],"name":"end insert"},
	{"cond":[Select,Inserting,OnBlockInPalette],"action":[Insert],"name":"insert"},

	{"cond":[Dot],"action":[Execute],"name":"execute"}
	
];
