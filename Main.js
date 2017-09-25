//Code for level creation and correctness checking

var flowerpatch = [];
var level = 1;
var stage = 1;
var code;
var f = 0;
var g = 0;
var col = 3;
var row = 3;
var tableCont = "";
var correct = false;
var levelarray = [];
var workspace;
var bot;
var codeArray = [];
var ifArray = [];
var menustage = 1;
var pass = true;
var leftovers = null;
var rock = false;
var fcolor = "";
var waterString = "water(flowerpatch[f]);";
var fertString = "fert(flowerpatch[f]);";
var nextString = "next();";
var upString = "up();";
var downString = "down();";
var leftString = "left();";
var rightString = "right();";

var resize = function() {
	bot = document.getElementById("bot");
	if (level == 3) {
		bot.style.left = document.getElementById("right").offsetLeft - document.body.scrollLeft + 70 + "px";
	}
	else if (level == 4) {
		bot.style.left = document.getElementById("right").offsetLeft - document.body.scrollLeft + 190 + "px";
	}
	else {
		bot.style.left = document.getElementById("right").offsetLeft - document.body.scrollLeft - 50 + "px";
	}
	bot.style.top = document.getElementById("right").offsetTop - document.body.scrollTop - 75 + "px";
}

var newest = function(i) {
	document.getElementById("levels").style="visibility:hidden;";
	level = ((menustage - 1) * 10) + i;
	stage = menustage;
	loadlevel();
	document.getElementById("menu").onclick=showMenu;
	leftovers = null;
}

var loadTable = function() {
	tableCont = "";
	for (i = 0; i < row; i++) {
		tableCont += "<tr>";
		for (j = 0; j < col; j++) {
			var id = "flower" + ((i*col)+j);
			if (flowerpatch[((i*col)+j)].type != null && flowerpatch[((i*col)+j)].type == "rock") {
				tableCont += "<th class='maintable'><img src='Images/rock.gif' id='" + id + "' /></th>";
			}
			else {
				tableCont += "<th class='maintable'><img src='' id='" + id + "' /></th>";
			}
		}
	tableCont += "</tr>";
	}
	document.getElementById("table").innerHTML = tableCont;
}

var menu = function() {
	levelCont = "<table>";
	var id = 1;
	for (i = 0; i < 3; i++) {
		levelCont += "<tr>";
		for (j = 0; j < 3; j++) {
		levelCont += "<th><button class='levbut' ";
		if (!levelarray[id - 1].solved && id != 1) {
			levelCont += "style='visibility:hidden;' ";
		}
		levelCont += "onclick='newest(" + id + ")'>" + id + "</button></th>";
		id++;
		}
		levelCont += "<tr>";
	}
	levelCont += "<tr>";
	if (menustage != 1) {
		levelCont += "<th><button class='levbut' onclick='prevStage()'><<</button></th>";
	}
	else {
		levelCont += "<th><button style='visibility:hidden'>0</button></th>";
	}
	levelCont += "<th><button class='levbut' id='stagename'>Stage " + menustage + "</button></th>";
	if (menustage != 2) {
		levelCont += "<th><button class='levbut' onclick='nextStage()'>>></button></th>";
	}
	document.getElementById("levels").innerHTML = levelCont + "</table>";
}

var prevStage = function() {
	menustage--;
	loadlevel();
	menu();
}

var nextStage = function() {
	menustage++;
	loadlevel();
	menu();
}

var showMenu = function() {
	menu();
	document.getElementById("levels").style="visibility:visible;";
	document.getElementById("menu").onclick=closeMenu;
}

var closeMenu = function() {
	document.getElementById("levels").style="visibility:hidden;";
	document.getElementById("menu").onclick=showMenu;
}

var start = function() {
	for (i = 0; i < 30; i++) {
		levelarray.push( {solved:true} );
	}
	loadlevel();
}

var loadlevel = function() {
	document.getElementById("blocklyDiv").innerHTML="";
	document.getElementById("blocklyDiv").style = "height:450px;";
	correct = false;
	flowerpatch = [];
	document.getElementById("botpic").src = "Images/bot1.gif";
	document.getElementById("botpic").style = "";
	resize();
	f = 0;
	if (level == 1) {
		row = 3;
		col = 3;
		for (i = 0; i < 9; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block></xml>';
		document.getElementById("instruct").innerHTML = "Start by watering one flower.  Drag the Water Flower block into the workspace and press Go!";
	}
	else if (level == 2) {
		row = 3;
		col = 3;
		flowerpatch.push( {water:1} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block></xml>';
		document.getElementById("instruct").innerHTML = "Now we need to move the gardener to the next flower. Use the Next Flower block this time!";
	}
	else if (level == 3) {
		f = 1;
		row = 3;
		col = 3;
		bot.style.left = document.getElementById("right").offsetLeft - document.body.scrollTop + 70 + "px";
		flowerpatch.push( {water:1} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block></xml>';
		document.getElementById("instruct").innerHTML = "Try to water this flower and go to the next one in one move by sticking two blocks together!";
		}
	else if (level == 4) {
		f = 2;
		row = 3;
		col = 3;
		bot.style.left = document.getElementById("right").offsetLeft + 190 - document.body.scrollLeft + "px";
		flowerpatch.push( {water:1} );
		flowerpatch.push( {water:1} );
		for (i = 0; i < 7; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_7"></block></xml>'
		document.getElementById("instruct").innerHTML = "This new Repeat block will let you water a flower and move to the next one 7 more times to water the whole garden.";
	}
	else if (level == 5) {
		row = 3;
		col = 3;
		for (i = 0; i < 9; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_blank_times"></block></xml>';
		document.getElementById("instruct").innerHTML = "Great, you watered all of the flowers in that garden!  We need to water the flowers in this garden now.  Use the repeat block to water all of the flowers in one move!";
	}
	else if (level == 6) {
		row = 3;
		col = 4;
		for (i = 0; i < 12; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_input_times"></block><block type="multiply"><block></xml>';
		document.getElementById("instruct").innerHTML = "Wow, that was much faster!  It would go even faster if we let the computer do the counting for us.  There are three rows and four columns in this garden.  You can put the multiplication equation right in the Repeat block instead of multiplying it yourself!";
	}
	else if (level == 7) {
		row = 3;
		col = 5;
		for (i = 0; i < 5; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 10; i++) {
			flowerpatch.push( {water: 1} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_input_times"></block><block type="divide"></block></xml>';
		document.getElementById("instruct").innerHTML = "It works for division, too!  This garden has 15 flowers and 3 rows, but you only need to water the first row.";
	}
	else if (level == 8) {
		row = 3;
		col = 3;
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 6; i++) {
			flowerpatch.push( {water: 1} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_input_times"></block><block type="multiply"></block><block type="divide"></block></xml>';
		document.getElementById("instruct").innerHTML = "Water these flowers however you want!";
	}
	else if (level == 9) {
		row = 4;
		col = 4;
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1} );
		}
		toolbox = '<xml><block type="water_flower"></block><block type="next_flower"></block><block type="repeat_input_times"></block><block type="multiply"></block><block type="divide"></block></xml>';
		document.getElementById("instruct").innerHTML = "Water these flowers however you want!";
	}
	else if (level == 10) {
		document.getElementById("leveldisplay").innerHTML = "Watering stage complete!";
		toolbox = '<xml></xml>';
		document.getElementById("instruct").innerHTML = "Great job, you watered all of the flowers!";
	}
	else if (level == 11) {
		row = 3;
		col = 3;
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		toolbox = '<xml><block type="water_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></xml>';
		document.getElementById("instruct").innerHTML = "We need to water the last flower in this garden, but having to go through every other flower first seems silly.  Use these new blocks to get there faster!";
	}
	else if (level == 12) {
		row = 3;
		col = 3;
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 6; i++) {
			flowerpatch.push( {water: 1} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Now that you've mastered so many blocks, we'll put them in different compartments to tidy things up.  Find the 'repeat' block to solve this challenge.";
	}
	else if (level == 13) {
		row = 3;
		col = 3;
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 1} );
			flowerpatch.push( {water: 0} );
		}
		flowerpatch.push( {water: 1} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "You can either use loops or the new action blocks for this one.";
	}
	else if (level == 14) {
		row = 3;
		col = 3;
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1} );
		}
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "You might want to use a combination of loops and the new action blocks for this one.";
	}
	else if (level == 15) {
		row = 4;
		col = 4;
		for (j = 0; j < 3; j++) {
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 1} );
		}
		}
		flowerpatch.push( {water: 0} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "You might want to use a combination of loops and the new action blocks for this one.";
	}
	else if (level == 16) {
		row = 4;
		col = 4;
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push({water: 1} );
		}
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "You might want to use a combination of loops and the new action blocks for this one.";
	}
	else if (level == 17) {
		row = 5;
		col = 5;
		for (i = 0; i < 5; i++) {
			flowerpatch.push( {water: 0} );
		}
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		flowerpatch.push( {water: 1} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0} );
		}
		flowerpatch.push( {water: 1} );
		flowerpatch.push( {water: 0} );
		
		flowerpatch.push( {water: 1} );
		flowerpatch.push( {water: 0} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1} );
		}
		flowerpatch.push( {water: 0} );
		flowerpatch.push( {water: 1} );
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "You might want to use a combination of loops and the new action blocks for this one.";
	}
	else if (level == 18) {
		row = 4;
		col = 4;
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		flowerpatch.push( {type: "rock"} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		flowerpatch.push( {type: "rock"} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		flowerpatch.push( {type: "rock"} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Look out, this garden has rocks in it!  The gardener can't walk over rocks, you'll have to go around them!";
	}
	else if (level == 19) {
		row = 5;
		col = 5;
		for (i = 0; i < 7; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		for (j = 0; j < 3; j++) {
		flowerpatch.push( {type: "rock"} );
		for (i = 0; i < 4; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		}
		flowerpatch.push( {type: "rock"} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 0, type: "flower"} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Look out, this garden has rocks in it!  The gardener can't walk over rocks, you'll have to go around them!";
	}
	else if (level == 20) {
		document.getElementById("leveldisplay").innerHTML = "Advanced Watering stage complete!";
		toolbox = '<xml></xml>';
		document.getElementById("instruct").innerHTML = "Great job, you watered all of the flowers!";
	}
	//half-done levels
	/*else if (level == 21) {
		row = 3;
		col = 3;
		for (i = 0; i < 9; i++) {
			flowerpatch.push( {water: 1, fert:0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "BugBot learned a new skill: fertilizing!  Look for the new block in the 'Actions' tab and fertilize the first flower.";
	}
	else if (level == 22) {
		row = 3;
		col = 3;
		flowerpatch.push( {water: 1, fert:1} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1, fert:0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Now let's fertilize the rest of the garden.";
	}
	else if (level == 23) {
		row = 3;
		col = 3;
		for (i = 0; i < 9; i++) {
			flowerpatch.push( {water: 0, fert:0} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "This garden needs to be watered AND fertilized.  Make sure to do both for each flower!";
	}
	else if (level == 24) {
		row = 3;
		col = 3;
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "This garden has flowers of two different colors, but only the blue flower needs water.";
	}
	else if (level == 25) {
		row = 4;
		col = 4;
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category><category name="Conditionals"><block type="if_blue"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Looks like only the blue flowers need water again.  It can be a pain to have to tell BugBot how to get to each blue flower--instead, let's let BugBot see for itself whether the flower is blue or not.  Try out the new 'If flower is blue' block and put the 'water flower' block inside.  If the first flower is blue, BugBot will water it, otherwise it won't.";
	}
	else if (level == 26) {
		row = 4;
		col = 4;
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 8; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'red'} );
		}
		flowerpatch.push( {water: 0, fert:1, color:'blue'} );
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category><category name="Conditionals"><block type="if_blue"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Great!  Now instead of having BugBot go to each individual blue flower, it can just go to all of the flowers and check whether they're blue.  Give it a try!";
	}
	else if (level == 27) {
		row = 4;
		col = 4;
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'blue'} );
		}
		flowerpatch.push( {water: 1, fert:0, color:'red'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'blue'} );
		}
		flowerpatch.push( {water: 1, fert:0, color:'red'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'blue'} );
		}
		flowerpatch.push( {water: 1, fert:0, color:'red'} );
		for (i = 0; i < 2; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'blue'} );
		}
		flowerpatch.push( {water: 1, fert:0, color:'red'} );
		for (i = 0; i < 3; i++) {
			flowerpatch.push( {water: 1, fert:1, color:'blue'} );
		}
		toolbox = '<xml><category name="Actions"><block type="water_flower"></block><block type="fert_flower"></block><block type="next_flower"></block><block type="up"></block><block type="down"></block><block type="left"></block><block type="right"></block></category><category name="Loops"><block type="repeat_blank_times"></block></category><category name="Conditionals"><block type="if_input"></block></category></xml>';
		document.getElementById("instruct").innerHTML = "Now the red flowers need fertilizing.  Type 'red' into the if-block to fertilize only the red flowers!";
	}*/
	else {
		document.getElementById("instruct").innerHTML = "Level in progress";
	}
	if (level % 10 == 0) {
		levelarray[level - 1].solved = true;
		level++;
		stage++;
		document.getElementById("go").innerHTML = "Stage " + (stage);
		document.getElementById("go").onclick = loadlevel;
		document.getElementById("go").style = "height:80px;"
		document.getElementById("blocklyDiv").style = "height:0px;";
		document.getElementById("left").style="height:120px;min-height:120px;";
	}
	else {
		loadTable();
		document.getElementById("leveldisplay").innerHTML = "Level " + level;
		document.getElementById("go").innerHTML = "Go!";
		document.getElementById("go").style = "height:60px;"
		document.getElementById("go").onclick = run;
		document.getElementById("left").style="height:575px;min-height:400px;";
		workspace = Blockly.inject('blocklyDiv',
		{toolbox: toolbox,
		trashcan:true,
		sounds:false});
		if (stage < 3) {
			checkWater();
		}
		else {
			checkBoth();
		}
		if (level == 4) {
			var b = workspace.newBlock('water_flower');
			b.initSvg();
			b.render();
			b.moveBy(10, 10);
			c = workspace.newBlock('next_flower');
			c.initSvg();
			c.render();
			c.moveBy(10, 50);
		}
		else if (leftovers != null) {
			Blockly.Xml.domToWorkspace(leftovers,workspace);
		}
	}
}

var water = function(flower) {	
	flower.water ++;
	if (stage < 3) {
		if (flower.water == 1) {
			document.getElementById("flower" + f).src = "Images/flower3.gif";
		}
		else {
			document.getElementById("flower" + f).src = "Images/flower2.gif";
		}
	}
	else {
		watfert(flower);
	}
	g++;
	document.getElementById("botpic").src = "Images/bot2.gif";
	setTimeout(water2, 150);
}
var water2 = function() {
	document.getElementById("botpic").src = "Images/bot1.gif";
	setTimeout(codeArray[g], 100);
}
var checkWater = function() {
	for (i = 0; i < flowerpatch.length; i++) {
		if (!(flowerpatch[i].type != null && flowerpatch[i].type == "rock")){
		if (flowerpatch[i].water == 1) {
			document.getElementById("flower" + i).src = "Images/flower3.gif";
		}
		else {
			document.getElementById("flower" + i).src = "Images/flower2.gif";
		}
		}
	}
}
var compWater = function() {
	pass = true;
	for (var i = 0; i < flowerpatch.length; i++) {
		if (flowerpatch[i].water != 1 && flowerpatch[i].type != "rock") {
			pass = false;
		}
	}
}

var fert = function(flower) {	
	flower.fert ++;
	watfert(flower);
	g++
	document.getElementById("botpic").src = "Images/bot3.gif";
	setTimeout(fert2, 150);
}
var fert2 = function() {
	document.getElementById("botpic").src = "Images/bot1.gif";
	setTimeout(codeArray[g], 100);
}

var watfert = function(flower) {
	if (flower.color != null) {
		fcolor = flower.color;
	}
	else {
		fcolor = "";
	}
	if (flower.fert == 1) {
		if (flower.water == 1) {
		document.getElementById("flower" + f).src = fcolor + "Images/flower3.gif";
		}
		else {
		document.getElementById("flower" + f).src = fcolor + "Images/flower2.gif";
		}
	}
	else {
		if (flower.water == 1) {
		document.getElementById("flower" + f).src = fcolor + "Images/flower5.gif";
		}
		else {
		document.getElementById("flower" + f).src = fcolor + "Images/flower4.gif";
		}
	}
}
var checkBoth = function() {
	for (i = 0; i < flowerpatch.length; i++) {
		if (!(flowerpatch[i].type != null && flowerpatch[i].type == "rock")){
			if (flowerpatch[i].color != null) {
				fcolor = flowerpatch[i].color;
			}
			else {
				fcolor = "";
			}
			if (flowerpatch[i].fert == 1) {
				if (flowerpatch[i].water == 1) {
					document.getElementById("flower" + i).src = fcolor + "Images/flower3.gif";
				}
				else {
					document.getElementById("flower" + i).src = fcolor + "Images/flower2.gif";
				}
			}
			else {
				if (flowerpatch[i].water == 1) {
					document.getElementById("flower" + i).src = fcolor + "Images/flower5.gif";
				}
				else {
					document.getElementById("flower" + i).src = fcolor + "Images/flower4.gif";
				}
			}
		}
	}
}
var compBoth = function() {
	pass = true;
	for (var i = 0; i < flowerpatch.length; i++) {
		if ((flowerpatch[i].water != 1 || flowerpatch[i].fert != 1) && flowerpatch[i].type != "rock") {
			pass = false;
		}
	}
}

var next = function() {
	if ((f + 1) % col == 0) {
		if (f + 1 == flowerpatch.length) {
			bot.style.left = document.getElementById("right").offsetLeft - 50 - document.body.scrollLeft + "px";
			bot.style.top = document.getElementById("right").offsetTop - 75 - document.body.scrollTop + "px";
			f = -1;
		}
		else {
			bot.style.left = document.getElementById("right").offsetLeft - 50 - document.body.scrollLeft + "px";
			bot.style.top = parseInt(bot.style.top) + 120 + "px";
		}
	}
	else {
		bot.style.left = parseInt(bot.style.left) + 120 + "px";
	}
	if ((flowerpatch[(f+1) % flowerpatch.length].type != null) && (flowerpatch[(f+1) % flowerpatch.length].type == "rock")) {
		rock = true;
		check();
	}
	else {
		f++;
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var up = function() {
	if (f > (col - 1)) {
		f -= col;
		bot.style.top = parseInt(bot.style.top) - 120 + "px";
	}
	if ((flowerpatch[(f) % flowerpatch.length].type != null) && (flowerpatch[(f) % flowerpatch.length].type == "rock")) {
		rock = true;
		check();
	}
	else {
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var down = function() {
	if (f < (col * (row - 1))) {
		f += col;
		bot.style.top = parseInt(bot.style.top) + 120 + "px";
	}
	if ((flowerpatch[(f) % flowerpatch.length].type != null) && (flowerpatch[(f) % flowerpatch.length].type == "rock")) {
		rock = true;
		check();
	}
	else {
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var left = function() {
	if (f%col != 0) {
		f --;
		bot.style.left = parseInt(bot.style.left) - 120 + "px";
	}
	if ((flowerpatch[(f) % flowerpatch.length].type != null) && (flowerpatch[(f) % flowerpatch.length].type == "rock")) {
		rock = true;
		check();
	}
	else {
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var checkColor = function(color, stuff) {
	if (flowerpatch[f].color === color) {
		var cutting = stuff.substring(17,28);
		var t = document.createElement('script');
		t.src = 'data:text/javascript, ifArray.push(' + cutting + ');';
		document.body.appendChild(t);
		setTimeout(ifArray[0], 100);
	}
	else {
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var right = function() {
	if (((f+1)%col != 0)) {
		f ++;
		bot.style.left = parseInt(bot.style.left) + 120 + "px";
	}
	if ((flowerpatch[(f) % flowerpatch.length].type != null) && (flowerpatch[(f) % flowerpatch.length].type == "rock")) {
		rock = true;
		check();
	}
	else {
		g++;
		setTimeout(codeArray[g], 100);
	}
}

var run = function() {
	leftovers = Blockly.Xml.workspaceToDom(workspace);
	codeArray = [];
	g = 0;
	Blockly.JavaScript.addReservedWords('code');
	code = Blockly.JavaScript.workspaceToCode(workspace);
	var s = document.createElement('script');
	s.src = 'data:text/javascript,' + encodeURIComponent(code) + 'codeArray.push("check();");setTimeout(codeArray[0], 0);';
	document.body.appendChild(s);
  }
 
var rolloff = function() {
	for (var i = 0; i < codeArray.length; i++) {
	}
	g++;
	setTimeout(codeArray[g], 100);
}
 
var check = function() {
	correct = false;
	if (stage == 1) {
		if (level == 1) {
			if (code == 'codeArray.push(waterString);') {
				correct = true;
			}
		}
		else if (level == 2) {
			if (code == 'codeArray.push("next();");') {
				correct = true;
			}
		}
		else if (level == 3) {
			if (code == 'codeArray.push(waterString);codeArray.push("next();");') {
				correct = true;
			}
		}
		else if (level == 4) {
			if (code == 'for (i = 0; i < 7; i++) {  codeArray.push(waterString);codeArray.push("next();");}') {
				correct = true;
			}
		}
		else {
			compWater();
			if (pass) {
			correct = true;
			}
		}
	}
	else if (stage == 2) {
		compWater();
		if (pass) {
			correct = true;
		}
	}
	else if (stage == 3) {
		if (level == 21) {
			if (code == 'codeArray.push(fertString);') {
				correct = true;
			}
		}
		if (level == 25) {
			if (code == 'codeArray.push(\'checkColor("blue", "  codeArray.push(waterString);");\');') {
				correct = true;
			}
		}
		else {
			compBoth();
			if (pass) {
			correct = true;
			}
		}
	}
	Blockly.mainWorkspace.clear();
	document.getElementById("go").innerHTML = "Next";
	document.getElementById("go").onclick = loadlevel;
	document.getElementById("blocklyDiv").innerHTML="";
	document.getElementById("blocklyDiv").style = "height:0px;";
	document.getElementById("left").style="height:100px;min-height:100px";
	if (correct) {
		document.getElementById("botpic").src = "Images/happy.gif";
		document.getElementById("instruct").innerHTML = "<strong>Great Job!<strong>";
		levelarray[level - 1].solved = true;
		level++;
		menu();
		leftovers = null;
	}
	else {
		if (rock) {
			document.getElementById("botpic").src = "Images/oo.gif";
			rock = false;
			document.getElementById("instruct").innerHTML = "<strong>You hit a rock!</strong>";
			document.getElementById("botpic").style = "-webkit-animation:oopsie 1s infinite;animation:oopsie 1s infinite;";
		}
		else {
			document.getElementById("botpic").src = "Images/sad.gif";
			document.getElementById("instruct").innerHTML = "<strong>Try again!</strong>";
		}
	}
}