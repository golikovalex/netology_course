//alexalex qwerty12345 ordersdb tester


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const orders = require('./routes/orders');
const users = require('./routes/users');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/dip')));


app.use('/orders', orders);
app.use('/users', users);



app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/dip/index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
	console.log("Server is on, port: " + port);
});





