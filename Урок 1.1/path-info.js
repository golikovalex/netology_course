const fs = require('fs');
const conf = {encoding: 'utf-8'};



function pathInfo(path, callback){
	
	fs.stat(path, (err, stats) => {
		if (err) {
			callback(err, undefined);
			return;
		}
		
		let pathObject = new PathObject();
		
		if (stats.isFile()) {
			fs.readFile(path, conf, (err, content) => {
				if (err) {
					callback(err, undefined);
					return;
				}
				
				callback(null, {path: path, type: "file", content: content, childs: undefined});					
			});
		}
		else 
		if (stats.isDirectory()){
			fs.readdir(path, (err, files) => {
				if (err) {
					callback(err, undefined);
					return;
				}
				
				callback(null, {path: path, type: "directory", content: undefined, childs: files});
			});
		}
	});
	
}