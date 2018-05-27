
//подключаем fs вне функций или лучше внутри каждой ?
const fs = require('fs');
const conf = {encoding: 'utf-8'};


function read(file) {	
	return new Promise((done, fail) => {
		fs.readFile(file, conf, (err, content) => {
			if (err){
				fail(err);
			} else {
				done(content);
			}
		});
	});	
}


function write(file, data) {
	return new Promise((done, fail) => {
		fs.writeFile(file, data, conf, (err) => {
			if (err){
				fail(err);
			} else {
				done(file);
			}
		});
	});
}



module.exports = {
	read,
	write
};