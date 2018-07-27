var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs("mongodb://tester:qwerty12345@ds243041.mlab.com:43041/ordersdb", ['users']);


router.get('/:email', function(req, res, next){
    db.users.findOne({email: req.params.email}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});


router.post('/', function(req, res, next){
	
	let user = req.body;
	if(!user.name){
		res.status(400);
		res.json({"error": "Bad Data"});		
	} else {
		db.users.save(user, function(err, user){
			if(err){
				res.send(err);
			}
			res.json(user);
		});
	}
});


router.put('/:email', function(req, res, next){
	
	let user = req.body;
	let updUser = {};

	updUser.name = user.name;
	updUser.email = user.email;
	updUser.money = user.money;
	
    if(!updUser){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.users.update({email: user.email}, updUser, {}, function(err, newuser){
        if(err){
            res.send(err);
        }
        res.json(newuser);
    });
    }
});



module.exports = router;