const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 


const users = [];


app.get('/', function (req, res) {
	
  res.render('index', {
	  usersList: users.filter(u => u)
  });
  
});



app.get('/users', (req, res) => {
	
	let limit = req.params.limit;
	let offset = req.params.offset;
	let field = req.params.field;
	
	if ((limit > 0) && (limit - offset > 0)){
		temp_users = users.slice(offset, limit);
		res.json.stringify(temp_users, ["${field}"]);
	} else {
		res.status(404);
		res.send();		
	}
	
});



app.post('/users', function (req, res){
	
	id = users.length;
	name = req.body.username;
	score = req.body.score;
	
	if (name){
		console.log("User added: " + name + "; score: " + score);
		users.push({name, score});
	}

	res.json({id});
	res.redirect('back');
	
})



app.get('/users/:userId', (req, res) => {
	
	id = req.param.userId;
	if (users[id]){
		res.json(users[id]);
	} else {
		res.status(404);
		res.send();
	}
	
});



app.delete('/users/:userId', function (req, res){
	
	id = req.param.userId;
	
	if (id < users.length){
		users[req.param.userId] = null;
		res.send();
 	} else {
		res.status(404);
		res.send();
	}
	
})


app.delete('/users', function (req, res){
	
	users = [];
	res.send();
	
})



app.put('users/:userId', (req, res) => {
	
	id = req.param.userId;
	
	if (users[id]){
		user = Object.assign(users[id], req.body);
		users[id] = user;
		res.json(user);
	} else {
		res.status(404);
		res.send();
	}
	
});



app.listen(3000, () => {console.log('Server is working on port :3000');});