var hasController = false;
var repController;

var show_raw = false;

var controllerPort = -1;

var digital_bindings = {
    button_a: 2,
    button_b: 3,
    button_x: 1,
    button_y: 4,
    button_z: 8,
    button_l: 5,
    button_r: 6,
    button_start: 10,
    dpad_l: 16,
    dpad_u: 13,
    dpad_r: 14,
    dpad_d: 15
};

var analog_bindings = {
    joystick_x: 1,
    joystick_y: 2,
    cstick_x: 6,
    cstick_y: 3,
    trigger_l: 4,
    trigger_r: 5
};

var digital_values = {};
var analog_values = {};

function canGame() {
    return "getGamepads"in navigator;
}

function roundAnalog(num) {
    return (Math.round(num * 80) / 80).toFixed(5);
}

function detectPort() {
    var controllers = navigator.getGamepads();
    for (var i = 0; i < 4; i++) {

        // Checks to see if a trigger value is not exactly -1
        if (controllers[i] && controllers[i].axes[3] !== -1) {
            controllerPort = i;
            break;
        }

        controllerPort = -1;

    }
    if (controllerPort === -1) {
        $('#controllerPrompt').text("No Active Controller Detected");
    } else {
        $('#controllerPrompt').text("Adapter Connected - Polling From Port " + (controllerPort + 1));
    }

}

function reportOnController() {

    if (controllerPort !== -1) {
        var controller = navigator.getGamepads()[controllerPort];

        for (var i = 0; i < controller.buttons.length; i++) {
            digital_values[i + 1] = controller.buttons[i].pressed;
        }

        for (var i = 0; i < controller.axes.length; i++) {
            analog_values[i + 1] = controller.axes[i];
        }

        displayInputs();
    }
}

function displayInputs() {
    var html = "";

    var value_jx = analog_values[analog_bindings["joystick_x"]];
    var value_jy = analog_values[analog_bindings["joystick_y"]];
    var value_cx = analog_values[analog_bindings["cstick_x"]];
    var value_cy = analog_values[analog_bindings["cstick_y"]]

    html += "A Button: " + digital_values[digital_bindings["button_a"]] + "<br/>";
    html += "B Button: " + digital_values[digital_bindings["button_b"]] + "<br/>";
    html += "X Button: " + digital_values[digital_bindings["button_x"]] + "<br/>";
    html += "Y Button: " + digital_values[digital_bindings["button_y"]] + "<br/>";

    html += "<br/>";

    html += "Start Button: " + digital_values[digital_bindings["button_start"]] + "<br/>";
    html += "Z Button: " + digital_values[digital_bindings["button_z"]] + "<br/>";
    html += "L Button: " + digital_values[digital_bindings["button_l"]] + "<br/>";
    html += "R Button: " + digital_values[digital_bindings["button_r"]] + "<br/>";

    html += "<br/>";

    html += "DPAD Up: " + digital_values[digital_bindings["dpad_u"]] + "<br/>";
    html += "DPAD Left: " + digital_values[digital_bindings["dpad_l"]] + "<br/>";
    html += "DPAD Down: " + digital_values[digital_bindings["dpad_d"]] + "<br/>";
    html += "DPAD Right: " + digital_values[digital_bindings["dpad_r"]] + "<br/>";

    html += "<br/>";

    html += "Joystick X: " + value_jx + "<br/>";
    html += "Joystick Y: " + value_jy + "<br/>";

    html += "<br/>";

    html += "Cstick X: " + value_cx + "<br/>";
    html += "Cstick Y: " + value_cy + "<br/>";

    html += "<br/>";

    html += "Trigger L: " + analog_values[analog_bindings["trigger_l"]] + "<br/>";
    html += "Trigger R: " + analog_values[analog_bindings["trigger_r"]] + "<br/>";

    $('#controllerTextDisplay').html(html);

    html = "<p><b>Note: these values do <em>not</em> exactly reflect values seen on a console. Use as an estimate.</b></p><br/>";

    html += "<p>Joystick X: " + value_jx.toFixed(5) + " (" + roundAnalog(value_jx) + ")</p>";
    html += "<p>Joystick Y: " + value_jy.toFixed(5) + " (" + roundAnalog(value_jy) + ")</p>";

    html += "<br/><p>Cstick X: " + value_cx.toFixed(5) + " (" + roundAnalog(value_cx) + ")</p>";
    html += "<p>Cstick Y: " + value_cy.toFixed(5) + " (" + roundAnalog(value_cy) + ")</p>";

    $('#raw-values').html(html);

    if (display_loaded) {
        updateDisplay();
    }
}

$(document).ready(function() {

    loadDisplay();

    if (canGame()) {

        // Prompt for user input
        var prompt = "Connect your controller and press any button.";
        $('#controllerPrompt').text(prompt);

        // Firefox detect controller
        $(window).on("gamepadconnected", function() {
            hasController = true;
            $("#controllerPrompt").text("Controller Connected");
            console.log("Connection Event");

            detectPort();

            repController = window.setInterval(reportOnController, 50);

        });

        // Firefox detect controller disconnect
        $(window).on("gamepaddisconnected", function() {
            console.log("Disconnection Event");
            $("#controllerPrompt").text(prompt);
            window.clearInterval(repController);
        });

        // Check interval (Chrome)
        var checkController = window.setInterval(function() {

            if (navigator.getGamepads()[0]) {

                if (!hasController) {
                    $(window).trigger("gamepadconnected");
                }

                window.clearInterval(checkController);
            }
        }, 500);

    }

    $("#raw").on("click", function() {
        $('#raw-values').toggleClass('is-showing');
    });

    setInterval(function() {
        detectPort();
    }, 500);

});
