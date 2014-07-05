// Constants
var LISTENING = 1;
var TEMPERATURE_RECEIVED = 2;

var https = require("https");
var fs = require("fs");
var SerialPort = require("serialport").SerialPort;
var url = "https://greenhouse.firebaseio.com/channels/-JPnv3s_R0BjJ6_Lxkd7/data/0/data.json";
var file = "data.json";
var temperature;

var serialPort = new SerialPort("COM6", {
        baudrate: 9600,
        // defaults for Arduino serial communication
        dataBits: 8, 
        parity: 'none', 
        stopBits: 1, 
        flowControl: false 
    });

serialPort.on("open", function(){
            console.log("Port opened");
            console.log("Current temperature is " + temperature);
    
            // Send Serial data to Arduino
            /*
            serialPort.write(temperature.toString() + "p", function(err, results){
                console.log("Temperature data sent");
                console.log('err ' + err);
                console.log('results ' + results);
            });
            */
            
            // Message received from Arduino
            serialPort.on("data", function(data){
                
                if(data.toString() === LISTENING.toString()){
                    console.log("Message from Arduino :: " + "Listening");
                    
                    serialPort.write(temperature.toString() + "p", function(err, results){
                        console.log("Temperature data sent");
                    });
                    
                }
                else if(data.toString() === TEMPERATURE_RECEIVED.toString()){
                    console.log("Message from Arduino :: " + "Temperature received");
                }
            });
        });

function fetchJson(){
	console.log("Starting");
    /*
	https.get(url, function(res){
		
		res.on("data", function(data){
            console.log(data.toString().substring(0, (parseInt(data.toString().length) - 0)));
			try{
                console.log("Data Length");
                console.log(data.toString().length);
                console.log(JSON.parse(data.toString()));
            }
            catch(e){
                if(e instanceof SyntaxError){
                    console.log(e.stack);
                    data = eval(data.toString() + "\"");
                }
                else{
                    throw e;
                }
            }
			//fs.writeFile("1.txt", data);
		})

	})
    */
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            console.log("Error!");
            return;
        }
        
        data = JSON.parse(data);
        dataLength = Object.keys(data).length;
        
        for (var key in data){
            var temp = data[key][1]
            if(temp < 40){
                temperature = temp;
            }
        }  
    });
}

fetchJson();
