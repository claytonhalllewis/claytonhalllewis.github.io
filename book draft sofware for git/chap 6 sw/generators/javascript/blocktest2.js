/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for test blocks.
 * @author clayton lewis
 */
'use strict';

goog.provide('Blockly.JavaScript.blocktest');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['blocktest0'] = function(block) {
  var code = 'alert("eureka");';
  return code;
};
Blockly.JavaScript['A note'] = function(block) {
  var code = 'noteA();';
  return code;
};
Blockly.JavaScript['B note'] = function(block) {
  var code = 'noteB();';
  return code;
};
/*
Blockly.JavaScript['noteDrop'] = function(block) {
  var note = block.getFieldValue('NOTE');
  //alert("NOTE is "+note);
  switch(note)
  {
	case 'A':
		return 'noteA();';
	case 'B':
		return 'noteB();';
	default:
		return 'noteA();';
   }
};
*/
Blockly.JavaScript['noteDrop'] = function(block) 
{

  var note = block.getFieldValue('NOTE');
  
  return 'playDirect('+note+');';
}
  

Blockly.JavaScript['play']=function(block)
{
	var argument=Blockly.JavaScript.valueToCode(block,'SOUND',Blockly.JavaScript.ORDER_ATOMIC);
	var code='playSound('+argument+');';
	return code;
}
/*
Blockly.JavaScript['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return 'window.alert(' + argument0 + ');\n';
};
*/
Blockly.JavaScript['mix']=function(block)
{
	var argument0=Blockly.JavaScript.valueToCode(block,'SOUND A',Blockly.JavaScript.ORDER_ATOMIC);
	var argument1=Blockly.JavaScript.valueToCode(block,'SOUND B',Blockly.JavaScript.ORDER_ATOMIC);
	var code='mix('+argument0+','+argument1+')';
	return [code,Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript['concatenate']=function(block)
{
	var argument0=Blockly.JavaScript.valueToCode(block,'SOUND A',Blockly.JavaScript.ORDER_ATOMIC);
	var argument1=Blockly.JavaScript.valueToCode(block,'SOUND B',Blockly.JavaScript.ORDER_ATOMIC);
	var code='concatenate('+argument0+','+argument1+')';
	return [code,Blockly.JavaScript.ORDER_ATOMIC];
}
Blockly.JavaScript['multiply']=function(block)
{
	var sound=Blockly.JavaScript.valueToCode(block,'SOUND',Blockly.JavaScript.ORDER_ATOMIC);
	var factor = Blockly.JavaScript.valueToCode(block,'FACTOR',Blockly.JavaScript.ORDER_ATOMIC);

	var code='attenuate('+sound+','+factor+')';
	return [code,Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['note'] = function(block) {
  var note = block.getFieldValue('NOTE');
  var code='note("'+note+'")';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};






