//Blocks I created specifically for this game

Blockly.Blocks['nugget'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "num");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
  }
}

Blockly.JavaScript['nugget'] = function(block) {
  var text_num = block.getFieldValue('num');
  var code = text_num;
  return [code, Blockly.JavaScript.ORDER_NONE];
};  
  
Blockly.Blocks['fourchan'] = {
  init: function() {
    this.appendValueInput("x1")
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["+", "a"], ["-", "s"], ["*", "m"], ["/", "d"]]), "function");
    this.appendValueInput("x2")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
	this.setColour(290);
  }
};

Blockly.JavaScript['fourchan'] = function(block) {
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_function = block.getFieldValue('function');
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'x2', Blockly.JavaScript.ORDER_ATOMIC);
  if (dropdown_function == 'a') {
	  var code = parseInt(value_x1.substring(1,2)) + parseInt(value_x2.substring(1,2));
  }
  else if (dropdown_function == 's') {
	  var code = parseInt(value_x1.substring(1,2)) - parseInt(value_x2.substring(1,2));
  }
  else if (dropdown_function == 'm') {
	  var code = parseInt(value_x1.substring(1,2)) * parseInt(value_x2.substring(1,2));
  }
  else if (dropdown_function == 'd') {
	  var code = parseInt(value_x1.substring(1,2)) / parseInt(value_x2.substring(1,2));
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['repeat_input_times'] = {
  init: function() {
    this.appendValueInput("num")
        .setCheck(null)
        .appendField("Repeat");
    this.appendDummyInput()
        .appendField("times");
    this.appendStatementInput("do")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setColour(225);
  }
};

Blockly.JavaScript['repeat_input_times'] = function(block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  code = 'for (i = 0; i < ' + value_num + '; i++) {' + statements_do + '}';
  return code;
};

Blockly.Blocks['multiply'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "num1");
    this.appendDummyInput()
        .appendField("X");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "num2");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(290);
  }
};

Blockly.JavaScript['multiply'] = function(block) {
  var text_num1 = block.getFieldValue('num1');
  var text_num2 = block.getFieldValue('num2');
  var code = text_num1 * text_num2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['divide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "num1");
    this.appendDummyInput()
        .appendField("/");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "num2");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(290);
    this.setTooltip('');
  }
};

Blockly.JavaScript['divide'] = function(block) {
  var text_num1 = block.getFieldValue('num1');
  var text_num2 = block.getFieldValue('num2');
  var code = text_num1 / text_num2;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['water_flower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Water flower");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.JavaScript['water_flower'] = function(block) {
  var code = 'codeArray.push(waterString);';
  return code;
};

Blockly.Blocks['fert_flower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Fertilize flower");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip('');
  }
};

Blockly.JavaScript['fert_flower'] = function(block) {
  var code = 'codeArray.push(waterString);';
  return code;
};

Blockly.Blocks['next_flower'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Next flower");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(70);
    this.setTooltip('');
  }
};

Blockly.JavaScript['next_flower'] = function(block) {
  var code = 'codeArray.push("next();");';
  return code;
};

Blockly.Blocks['up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move up");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(70);
    this.setTooltip('');
  }
};

Blockly.JavaScript['up'] = function(block) {
  var code = 'codeArray.push("up();");';
  return code;
};

Blockly.Blocks['down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move down");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(70);
    this.setTooltip('');
  }
};

Blockly.JavaScript['down'] = function(block) {
  var code = 'codeArray.push("down();");';
  return code;
};

Blockly.Blocks['left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move left");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(70);
    this.setTooltip('');
  }
};

Blockly.JavaScript['left'] = function(block) {
  var code = 'codeArray.push("left();");';
  return code;
};

Blockly.Blocks['right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move right");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(70);
    this.setTooltip('');
  }
};

Blockly.JavaScript['right'] = function(block) {
  var code = 'codeArray.push("right();");';
  return code;
};

Blockly.Blocks['repeat_7'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat 7 times");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['repeat_7'] = function(block) {
	var statements = Blockly.JavaScript.statementToCode(block, 'DO');
	code = 'for (i = 0; i < 7; i++) {' + statements + '}';
	return code;
};

Blockly.Blocks['if_blue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("If flower is blue");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['if_blue'] = function(block) {
	var statements = Blockly.JavaScript.statementToCode(block, 'DO');
	code = "codeArray.push(\"checkColor(\'blue\', \'" + statements + "\');\");";
	console.log(block.getChildren().length);
	//console.log(code);
	return code;
};

Blockly.Blocks['if_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("If flower is ")
        .appendField(new Blockly.FieldTextInput("color"), "num")
    this.appendStatementInput("do")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['if_input'] = function(block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  var statements = Blockly.JavaScript.statementToCode(block, 'do');
  code = "codeArray.push('checkColor(\"" + value_num + "\", \"" + statements + "\");');";
  return code;
};

//codeArray.push("if (flowerpatch[f].color == &apos;blue&apos;) {  codeArray.push("water(flowerpatch[f])");}");codeArray.push("check()");setTimeout(codeArray[0], 0);

Blockly.Blocks['repeat_blank_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat")
        .appendField(new Blockly.FieldTextInput("0"), "num")
        .appendField("times");
    this.appendStatementInput("do")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['repeat_blank_times'] = function(block) {
  var text_num = block.getFieldValue("num");
  var statements_name = Blockly.JavaScript.statementToCode(block, "do");
  var id = "id" + statements_name.length;
  var code = 'for (' + id + ' = 0; ' + id + ' < ' + text_num + '; ' + id + '++) {' + statements_name + '}';
  return code;
};

Blockly.Blocks['repeat_blank_by_blank_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat")
        .appendField(new Blockly.FieldTextInput("0"), "num1")
        .appendField("x")
        .appendField(new Blockly.FieldTextInput("0"), "num2")
        .appendField("times");
    this.appendStatementInput("do")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['repeat_blank_by_blank_times'] = function(block) {
  var text_num1 = block.getFieldValue('num1');
  var text_num2 = block.getFieldValue('num2');
  var statements_name = Blockly.JavaScript.statementToCode(block, "do");
  var code = 'for (i = 0; i < ' + (text_num1 * text_num2) + '; i++) {' + statements_name + '}';
  return code;
};

Blockly.Blocks['repeat_blank_mod_blank_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Repeat")
        .appendField(new Blockly.FieldTextInput("0"), "num1")
        .appendField("%")
        .appendField(new Blockly.FieldTextInput("0"), "num2")
        .appendField("times");
    this.appendStatementInput("do")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip('');
  }
};

Blockly.JavaScript['repeat_blank_mod_blank_times'] = function(block) {
  var text_num1 = block.getFieldValue('num1');
  var text_num2 = block.getFieldValue('num2');
  var statements_name = Blockly.JavaScript.statementToCode(block, "do");
  var code = 'for (i = 0; i < ' + text_num1 + '%' + text_num2 + '; i++) {' + statements_name + '}';
  return code;
};