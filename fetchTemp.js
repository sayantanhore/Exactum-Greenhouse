var https = require("https");
var fs = require("fs");
var url = "https://greenhouse.firebaseio.com/channels/-JPnv3s_R0BjJ6_Lxkd7/data/0/data.json";

function fetchJson(){
	console.log("Starting");
	https.get(url, function(res){
		
		res.on("data", function(data){
		

			console.log(data);
			fs.writeFile("1.txt", data);

		})

	})

}

fetchJson();
