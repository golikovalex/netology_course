
function File(name, content){
	
	this.name = name;
	this.content = content;	
	
}


function show(path) {
	
	const fs = require('fs');
	const conf = {encoding: 'utf-8'};

	return new Promise((done, fail) => {
		fs.readdir(path, (err, files) => {
			if (err) {
				fail(err);
			} else {			
				let arrFiles = []; 
				
				for (let i = 0; i < files.length; i++) {
					let pathTemp = path + '/' + files[i];
					
					//"Don't make functions with a loop" warning, как тогда лучше сделать?
					fs.stat(pathTemp, (err, stats) => {
						if (err) return console.error(err); //вызов fail только одни в функции ? если да, то лучше ли будет сделать отдельную функцию, возвращающую fail и вызывать ее во всех "err" ?

						if (stats.isFile()){
							fs.readFile(pathTemp, conf, (err, content) => {
								if (err) return console.error(err);
								arrFiles.push(new File(files[i], content));
							});
						}
					
				});
							
				}
				
				done(arrFiles);	
			
			}
		});
	});

}


module.exports = show;