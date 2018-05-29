const http = require('http');
const https = require('https');
var querystring = require('querystring');
var fs = require('fs');

const port = 3000;



var server = http.createServer();
var form = "<html><head></head><body><form method=\"POST\" action=\"\" accept-charset=\"utf-8\"><input type=\"text\" name=\"inputdata\"><br><br><input type=\"submit\" value=\"send\"></form></body></html>"




function getTranslation(wordToTranslate){
	
	var post_data = querystring.stringify({
		  'key' : 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df',
		  'text': wordToTranslate,
		  'lang': 'en-ru'
	});	
	
	
	var postheaders = {
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Length' : Buffer.byteLength(post_data, 'utf8')	
	};
	
	
	var post_options = {
      host: 'translate.yandex.net',
	  port: 443,
      path: '/api/v1.5/tr.json/translate',
      method: 'POST',
	  "rejectUnauthorized": false, 
	  headers : postheaders
	};

	

	const req = https.request(post_options, (res) => {
		res.setEncoding('utf8');
	  
		var respData = '';
	  
		res.on('data', (chunk) => {
			respData += chunk;
		});
		
		res.on('end', function() {
			var finalStr = JSON.parse(respData);
			console.log(finalStr.text);
		});
	  
	  
	});

	req.on('error', (e) => {
		console.log(e);
	});

	req.write(post_data);
	req.end();
	
}




server.on('request', function(request, response) {

    response.writeHead(200);
	
	if (request.method == "GET"){
		response.write(form);
	}
	
	var data = '';
	
	request.on('data', function(chunk) {
		data += chunk.toString();	
	});
	
	
	request.on('end', function() {	
		if (request.method == "POST"){		
			getTranslation(data.substring(10));
		}
	});
	
	
	request.on('error', (err) => {
		console.error(err);
	});
	
    response.end();
	
});


 
server.listen(port);
console.log("Server is ready on port: " + port + "\n");