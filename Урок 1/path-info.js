
const fs = require('fs');
const conf = {encoding: 'utf-8'};


function PathObject() {
	
	var path, type, content, childs;
	
	function setter(path, type, content, childs){
		this.path = path;
		this.type = type;
		this.content = content;
		this.childs = childs;
	}
	
}


function pathInfo(path, callback){
	
	fs.stat(path, (err, stats) => {
		if (err) callback(err, undefined);
		
		let pathObject = new PathObject();
		
		if (stats.isFile()) {
			//readdir(path, ...) или readdir(stats, ...) ?
			fs.readFile(path, conf, (err, content) => {
				if (err) callback(err, undefined);
				
				pathObject.setter(path, 'file', content, undefined);
				callback(null, pathObject);					
			});
		}
		else 
		if (stats.isDirectory()){
			fs.readdir(path, (err, files) => {
				if (err) callback(err, undefined);
				
				pathObject.setter(path, 'directory', undefined, files);
				callback(null, pathObject);
			});
		}
		else {
			pathObject.setter(path, undefined, undefined, undefined);
			callback(null, pathObject);				
		}
	});
	
}