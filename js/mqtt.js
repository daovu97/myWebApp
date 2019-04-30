var host = "m16.cloudmqtt.com";
var port = 31210;
var part = '';
var clientId = "ClientID";
var reconnectTimeout = 0;
var subTemperature = "-1", subHumidity = "-1", subRelay1 = "-1", subRelay2 = "-1", subRelay3 = "-1", subRelay4 = "-1";
var relayStatus1, relayStatus2, relayStatus3, relayStatus4;
const qos = 0;

let client = new Paho.MQTT.Client(host, Number(port), part, clientId);

function doConnect() {


    // Connect the client, providing an onConnect callback
    client.connect({
        timeout: 3,
        onSuccess: onConnect,
        useSSL: true,
        userName: "ubukzoam",
        password: "MKTzzWJI6wHS",
        onFailure: doFail

    });

    // Called when the connection is made
    function onConnect() {
        console.log("Connected!");
        doClick();
        client.subscribe("ESP/temperature");
        client.subscribe("ESP/humidity");
        client.subscribe("ESPg/RL1");
        client.subscribe("ESPg/RL2");
        client.subscribe("ESPg/RL3");
        client.subscribe("ESPg/RL4");
    }

    function doFail(e) {
        console.log(e);
        setTimeout(doConnect, Number(reconnectTimeout));
    }

}


// set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
    setTimeout(doConnect, Number(reconnectTimeout));
}

client.onMessageArrived = function (message) {
    var flagHum, flagTem, flagRL1, flagRL2, flagRL3, flagRL4;
    switch (message.destinationName) {

        case "ESP/temperature": {
            if (message.payloadString === subTemperature) {
                flagTem = false;
            } else {
                subTemperature = message.payloadString;
                flagTem = true;
            }
        }
            break;
        case "ESP/humidity": {

            if (message.payloadString === subHumidity) {
                flagHum = false;
            } else {
                subHumidity = message.payloadString;
                flagHum = true;
            }
        }
            break;

        case "ESPg/RL1": {

            if (message.payloadString === subRelay1) {
                flagRL1 = false;
            } else {
                subRelay1 = message.payloadString;
                flagRL1 = true;
            }
        }
            break;
        case "ESPg/RL2": {

            if (message.payloadString === subRelay2) {
                flagRL2 = false;
            } else {
                subRelay2 = message.payloadString;
                flagRL2 = true;
            }
        }
            break;
        case "ESPg/RL3": {

            if (message.payloadString === subRelay3) {
                flagRL3 = false;
            } else {
                subRelay3 = message.payloadString;
                flagRL3 = true;
            }
        }
            break;
        case "ESPg/RL4": {

            if (message.payloadString === subRelay4) {
                flagRL4 = false;
            } else {
                subRelay4 = message.payloadString;
                flagRL4 = true;
            }
        }
            break;
    }

    if (flagTem) {
        document.getElementById("progressTem").className = "c100 p" + message.payloadString + " orange";
        document.getElementById("temNumber").innerText = message.payloadString + "°C";
    }

    if (flagHum) {
        document.getElementById("progressHum").className = "c100 p" + message.payloadString + " green";
        document.getElementById("humNumber").innerText = message.payloadString + "%";
    }

    if (flagRL1) {
        if (subRelay1 === "1") {
            document.getElementById("relay1img").src = "img/light_on.png";
            document.getElementById("rl1status").innerText = "ON";
            relayStatus1 = true;
        } else {
            document.getElementById("relay1img").src = "img/light_off.png";
            document.getElementById("rl1status").innerText = "OFF";
            relayStatus1 = false;
        }
    }

    if (flagRL2) {
        if (subRelay2 === "1") {
            document.getElementById("relay2img").src = "img/light_on.png";
            document.getElementById("rl2status").innerText = "ON";
            relayStatus2 = true;
        } else {
            document.getElementById("relay2img").src = "img/light_off.png";
            document.getElementById("rl2status").innerText = "OFF";
            relayStatus2 = false;
        }
    }

    if (flagRL3) {
        if (subRelay3 === "1") {
            document.getElementById("relay3img").src = "img/light_on.png";
            document.getElementById("rl3status").innerText = "ON";
            relayStatus3 = true;
        } else {
            document.getElementById("relay3img").src = "img/light_off.png";
            document.getElementById("rl3status").innerText = "OFF";
            relayStatus3 = false;
        }
    }

    if (flagRL4) {
        if (subRelay4 === "1") {
            document.getElementById("relay4img").src = "img/light_on.png";
            document.getElementById("rl4status").innerText = "ON";
            relayStatus4 = true;
        } else {
            document.getElementById("relay4img").src = "img/light_off.png";
            document.getElementById("rl4status").innerText = "OFF";
            relayStatus4 = false;
        }
    }


}

function doClick() {
    document.getElementById("pubRelay1").onclick = function () {

        if (relayStatus1) {

            client.send("ESPn/RL1", "0", qos, false);
        } else {

            client.send("ESPn/RL1", "1", qos, false);
        }

    }

    document.getElementById("pubRelay2").onclick = function () {

        if (relayStatus2) {

            client.send("ESPn/RL2", "0", qos, false);
        } else {

            client.send("ESPn/RL2", "1", qos, false);
        }

    }

    document.getElementById("pubRelay3").onclick = function () {

        if (relayStatus3) {

            client.send("ESPn/RL3", "0", qos, false);
        } else {

            client.send("ESPn/RL3", "1", qos, false);
        }

    }

    document.getElementById("pubRelay4").onclick = function () {

        if (relayStatus4) {

            client.send("ESPn/RL4", "0", qos, false);
        } else {

            client.send("ESPn/RL4", "1", qos, false);
        }

    }


}












