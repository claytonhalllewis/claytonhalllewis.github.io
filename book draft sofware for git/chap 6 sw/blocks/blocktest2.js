/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview blocktest blocks for Blockly.
 * @author clayton lewis
 */
'use strict';

goog.provide('Blockly.Blocks.blocktest');

goog.require('Blockly.Blocks');


Blockly.Blocks['blocktest0'] = {
    init: function() {
    this.setColour(200);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('does an alert.');
     }
};
Blockly.Blocks['A note'] = {
    init: function() {
    this.setColour(90);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('plays note A');
     }
};
Blockly.Blocks['B note'] = {
    init: function() {
    this.setColour(270);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('plays note B');
     }
};
Blockly.Blocks['noteDrop'] = {
    init: function() {
    
    var dropdown = new Blockly.FieldDropdown([['A', 'A'], ['B', 'B']]);
    this.appendDummyInput()
	.appendField('note')
	.appendField(dropdown, 'NOTE');
    this.setColour(270);
    this.setOutput(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('plays note selected in dropdown');
     }
};

Blockly.Blocks['play'] = {
  init: function() {
    this.jsonInit({
      "message0":"play %1",
      "args0": [
        {
          "type": "input_value",
          "name": "SOUND"
        }
      ],
      //"output": false,
      "colour": 160,
      "tooltip": "plays sound",
      "nextStatement":null,
      "previousStatement":null
    });
  }
};
Blockly.Blocks['mix'] = 
{
  init: function() 
  {
     this.jsonInit(
     {
        "message0": "mix %1 and %2",
        "args0": [
                   {
                     "type": "input_value",
                     "name": "SOUND A",
                   },
                   {
                      "type": "input_value",
                      "name": "SOUND B"
                   }
                ],
        "output": null,
        "colour": 160,
        "tooltip": "mixes two sounds",
    });
   }
};
Blockly.Blocks['concatenate'] = 
{
  init: function() 
  {
     this.jsonInit(
     {
        "message0": "concatenate %1 and %2",
        "args0": [
                   {
                     "type": "input_value",
                     "name": "SOUND A",
                   },
                   {
                      "type": "input_value",
                      "name": "SOUND B"
                   }
                ],
        "output": null,
        "colour": 160,
        "tooltip": "concatenates two sounds",
    });
   }
};
Blockly.Blocks['multiply'] = {
  init: function() {
    this.jsonInit(
{
  "message0": "multiply %1 by %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SOUND",
    },
    {
      "type": "input_value",
      "name": "FACTOR"
    }
  ],
"output": null,
"colour": 160,
"tooltip": "multiplies sound by factor",
    });
   }
};
Blockly.Blocks['note'] = {
  init: function() {
    this.jsonInit(
{
  "message0": "make note %1",
  "args0": 
  [
    {
      "type": "field_dropdown",
      "name": "NOTE",
      "options": 
      [
        [ "C", "C" ],
        [ "D", "D" ],
	[ "E", "E" ],
        [ "F", "F" ],
	[ "G", "G" ],
        [ "A", "A" ],
	[ "B", "B" ],
        [ "C5", "C5" ]
      ]
    }  
  ],
"output": null,
"colour": 160,
"tooltip": "makes a note",
    });
   }
};


