var display_a, display_b, display_x, display_y, display_z, display_l, display_r, display_start, display_dpad_u, display_dpad_l, display_dpad_d, display_dpad_r, display_joystick, display_cstick, display_joystick_nub, display_cstick_nub;

var color_black = "#000000";
var color_white = "#ffffff";

var color_grey = "#c6c6c6";
var color_dark_grey = "#8c8c8c";

var color_green = "#00d631";
var color_dark_green = "#00801e";

var color_red = "#ff0808";
var color_dark_red = "#990000";

var color_purple = "#a114ff";
var color_dark_purple = "#6b00b3";

var color_yellow = "#fff544";

var display_loaded = false;

var l_percent;
var r_percent;
var l_value;
var r_value;
var l_rgb;
var r_rgb;

function loadDisplay(){
  if(document.getElementById('display').classList.contains('replaced-svg')){
    initButtons();
  } else {
    setTimeout(loadDisplay, 15);
  }
}

function updateDisplay(){
  var analogX = analog_values[analog_bindings["joystick_x"]]; 
  var analogY = analog_values[analog_bindings["joystick_y"]];
  var cX = -analog_values[analog_bindings["cstick_x"]]; 
  var cY = -analog_values[analog_bindings["cstick_y"]];

  if(digital_values[digital_bindings["button_a"]]){
    fillArea(display_a, color_white);
    strokeArea(display_a, color_white);
  } else {
    fillArea(display_a, color_green);
    strokeArea(display_a, color_green);
  }

  if(digital_values[digital_bindings["button_b"]]){
    fillArea(display_b, color_white);
    strokeArea(display_b, color_white);
  } else {
    fillArea(display_b, color_red);
    strokeArea(display_b, color_red);
  }

  if(digital_values[digital_bindings["button_x"]]){
    fillArea(display_x, color_white);
    strokeArea(display_x, color_white);
  } else {
    fillArea(display_x, color_grey);
    strokeArea(display_x, color_grey);
  }

  if(digital_values[digital_bindings["button_y"]]){
    fillArea(display_y, color_white);
    strokeArea(display_y, color_white);
  } else {
    fillArea(display_y, color_grey);
    strokeArea(display_y, color_grey);
  }

  if(digital_values[digital_bindings["button_start"]]){
    fillArea(display_start, color_white);
    strokeArea(display_start, color_white);
  } else {
    fillArea(display_start, color_grey);
    strokeArea(display_start, color_grey);
  }


  l_percent = (analog_values[analog_bindings["trigger_l"]] + 1) / 2;
  r_percent = (analog_values[analog_bindings["trigger_r"]] + 1) / 2;

  l_value = 170 + (100 * l_percent);
  r_value = 170 + (100 * r_percent);

  l_rgb = "rgb(" + parseInt(l_value) + ", " + parseInt(l_value) + ", " + parseInt(l_value) + ")";
  r_rgb = "rgb(" + parseInt(r_value) + ", " + parseInt(r_value) + ", " + parseInt(r_value) + ")";


  if(digital_values[digital_bindings["button_l"]]){
    fillArea(display_l, color_white);
    strokeArea(display_l, color_white);
  } else {
    fillArea(display_l, l_rgb);
    strokeArea(display_l, l_rgb);
  }

  if(digital_values[digital_bindings["button_r"]]){
    fillArea(display_r, color_white);
    strokeArea(display_r, color_white);
  } else {
    fillArea(display_r, r_rgb);
    strokeArea(display_r, r_rgb);  
  }

  if(digital_values[digital_bindings["button_z"]]){
    fillArea(display_z, color_white);
    strokeArea(display_z, color_white);
  } else {
    fillArea(display_z, color_purple);
    strokeArea(display_z, color_purple);
  }

  if(digital_values[digital_bindings["dpad_u"]]){ 
    fillArea(display_dpad_u, color_white);
    strokeArea(display_dpad_u, color_white);
  } else {
    fillArea(display_dpad_u, color_grey);
    strokeArea(display_dpad_u, color_grey);
  }

  if(digital_values[digital_bindings["dpad_d"]]){
    fillArea(display_dpad_d, color_white);
    strokeArea(display_dpad_d, color_white);
  } else {
    fillArea(display_dpad_d, color_grey); 
    strokeArea(display_dpad_d, color_grey);
  }

  if(digital_values[digital_bindings["dpad_l"]]){
    fillArea(display_dpad_l, color_white);
    strokeArea(display_dpad_l, color_white);
  } else {
    fillArea(display_dpad_l, color_grey);
    strokeArea(display_dpad_l, color_grey);
  }

  if(digital_values[digital_bindings["dpad_r"]]){
    fillArea(display_dpad_r, color_white);
    strokeArea(display_dpad_r, color_white);
  } else {
    fillArea(display_dpad_r, color_grey);
    strokeArea(display_dpad_r, color_grey);
  }

  moveSection(display_joystick_nub, analogX, analogY);
  moveSection(display_cstick_nub, cX, cY);

  

}
/*
function calibrateController(valueX, valueY, axis) {
  //stick max values
  var SMVy+;
  var SMVy-;
  var SMVx+;
  var SMVx-;
  
  var CSMVy+;
  var CSMVy-;
  var CSMVx+;
  var CSMVx-;
  
  var angle;
  var magnitude;
  var magnitudePercent;
  
  angle = cartesian2Polar(valueX, valueY).radians * (180/Math.PI);
  magnitude = cartesian2Polar(valueX, valueY).distance; 
  
  
}

function cartesian2Polar(x, y){
    distance = Math.sqrt(x*x + y*y)
    radians = Math.atan2(y,x) //This takes y first
    polarCoor = { distance:distance, radians:radians }
    return polarCoor
}
*/
function initButtons(){
  display_loaded = true;

  display_a = $('#display #XMLID_1_');
  display_b = $('#display #XMLID_4_');
  display_x = $('#display #XMLID_3_');
  display_y = $('#display #XMLID_2_');
  
  display_z = $('#display #XMLID_12_');
  display_start = $('#display #XMLID_5_');
  display_l = $('#display #XMLID_17_');
  display_r = $('#display #XMLID_7_');

  display_dpad_u = $('#display #XMLID_11_');
  display_dpad_r = $('#display #XMLID_8_');
  display_dpad_l = $('#display #XMLID_10_');
  display_dpad_d = $('#display #XMLID_13_');
  
  display_joystick = $('#display #XMLID_9_');
  display_cstick = $('#display #XMLID_6_');

  fillArea(display_joystick, color_grey);

  display_joystick_nub = "XMLID_29_";
  display_cstick_nub = 'XMLID_28_';

}

function moveSection(idStr, xOffset, yOffset) {
  var domElemnt = document.getElementById(idStr);
      if (domElemnt) {
          var transformAttr = ' translate(' + xOffset * 60 + ',' + yOffset * 60 + ')';
          domElemnt.setAttribute('transform', transformAttr);
      }
  }

function fillArea(area, color){
  area.css('fill', color);
}

function strokeArea(area, color){
  area.css('stroke', color);
}
