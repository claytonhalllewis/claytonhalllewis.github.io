var toolbox=[
		{"heading":"player notes",
		 "blocks":
			[
				{
					"blockname":"C note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"D note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"E note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"F note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"G note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"A note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"B note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"C five note",
					"type":"statement",
					"args":[]
				},
				{
					"blockname":"changeable note",
					"type":"statement",
					"args":[{"argname":"note","type":"dropdown","choices": [{"choice":"C"},{"choice":"D"},{"choice":"E"},{"choice":"F"},{"choice":"G"},{"choice":"A"},{"choice":"B"},{"choice":"C five"}],"value":"C"}]
				}

			]
		},
		{"heading":"controls",
		 "blocks":
			[
				{
					"blockname":"repeat",
					"type":"statement",
					"args":
					[
						{"argname":"times","type":"numberfield","value":"1"},
						{"argname":"nest","type":"statements","value":[]}
					]
				}
			]
		},
		{"heading":"tone generators",
		 "blocks":
			[
				{
					"blockname":"play",
					"type":"statement",
					"args":[{"argname":"sound","type":"soundblock","value":"empty"}]
				},
				{
					"blockname":"note",
					"type":"soundblock",
					"args":[{"argname":"note","type":"dropdown","choices":[{"choice":"C"},{"choice":"D"},{"choice":"E"},{"choice":"F"},{"choice":"G"},{"choice":"A"},{"choice":"B"},{"choice":"C five"}],"value":"C"}]
				},
				{
					"blockname":"concatenate",
					"type":"soundblock",
					"args":
					[
						{"argname":"SOUND A","type":"soundblock","value":"empty"},
						{"argname":"SOUND B","type":"soundblock","value":"empty"},
					]
				},
				{
					"blockname":"mix",
					"type":"soundblock",
					"args":
					[
						{"argname":"SOUND A","type":"soundblock","value":"empty"},
						{"argname":"SOUND B","type":"soundblock","value":"empty"},
					]
				},
				{
					"blockname":"multiply",
					"type":"soundblock",
					"args":
					[
						{"argname":"SOUND","type":"soundblock","value":"empty"},
						{"argname":"FACTOR","type":"numberblock","value":"empty"},
					]
				}
			]
		},
		{"heading":"math",
		 "blocks":
			[	
				{
					"blockname":"number",
					"type":"numberblock",
					"args":[{"argname":"number","type":"numberfield","value":"0"}]
				},
				{
					"blockname":"add",
					"type":"numberblock",
					"args":
					[
						{"argname":"A","type":"numberblock","value":"empty"},
						{"argname":"B","type":"numberblock","value":"empty"},
					]
				}
			]
		}
	];