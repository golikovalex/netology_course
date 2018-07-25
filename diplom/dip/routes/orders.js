var express = require('express');
var mongojs = require('mongojs');
var router = express.Router();

var db = mongojs("mongodb://tester:qwerty12345@ds243041.mlab.com:43041/ordersdb", ['orders']);


router.get('/', function(req, res, next){
    db.orders.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});


router.get('/email/:email', function(req, res, next){
	console.log("2." + req.params.email);
    db.orders.find({userEmail: req.params.email}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});



router.get('/cooking', function(req, res, next){
    db.orders.find({condition: "Готовится"}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});



router.get('/ordering', function(req, res, next){
    db.orders.find({condition: "Заказано"}, function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});



router.post('/', function(req, res, next){
	
	let order = req.body;
	if(!order.title){
		res.status(400);
		res.json({"error": "Bad Data"});		
	} else {
		db.orders.save(order, function(err, order){
			if(err){
				res.send(err);
			}
			res.json(order);
		});
	}
});



router.put('/:id', function(req, res, next){
	
	let order = req.body;
	let updOrder = {};

	updOrder.title = order.title;
	updOrder.condition = order.condition;
	updOrder.userEmail = order.userEmail;
	updOrder.date = order.date;

    if(!updOrder){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.orders.update({_id: mongojs.ObjectId(req.params.id)}, updOrder, {}, function(err, order){
        if(err){
            res.send(err);
        }
        res.json(order);
    });
    }
});



	
/*
// Get All Tasks
router.get('/orders', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});
*/

module.exports = router;