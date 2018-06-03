const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function (req, res) {
	
	res.status(200).send('Hello, Express.js');
  
});



app.get('/hello', function (req, res) {
	
	res.status(200).send('Hello stranger!');
  
});



app.get('/hello/:name', function (req, res) {
	
	res.status(200).send('Hello, ' + req.params.name);
  
});



app.all('/sub/*', function (req, res, next) {

	fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
	res.status(200).send('You requested URI: ' + fullUrl);	

	next();
  
});



app.post('/post', function (req, res, next) {
	
	if (req.get('Key')){
		if (Object.keys(req.body).length != 0) {
			res.json(req.body);
		} else {
			res.status(404).send('Not Found');
		}
	} else {
		res.sendStatus(401);
	}
	
	next();
  
});




app.listen(3000, () => {console.log('Listening on port 3000!');});