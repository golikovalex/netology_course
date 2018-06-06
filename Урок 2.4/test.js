const express = require('express')();
var http = require('http').Server(express);
var io = require('socket.io')(http);

const path = require('path');



express.set('views', path.join(__dirname, 'views'));
express.set('view engine', 'pug');



const messages = [];


express.get('/', function(req, res){
	
	res.render('index', {
		messagesList: messages
	});
  
});



io.on('connection', function(socket){
	
	console.log('a user connected');
	socket.broadcast.emit('a user connected');
	
	
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		messages.push(msg);
		io.emit('chat message', msg);
	});
	
	
  
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
  
});



http.listen(3000, () => {console.log('Server is working on port :3000');});