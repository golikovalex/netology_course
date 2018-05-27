const fs = require('fs');
const conf = {encoding: 'utf-8'};


function File(name, content){
	
	this.name = name;
	this.content = content;	
	
}


function getFilesFromDir(pathToDir) {
	
	return new Promise((resolve, reject) => {	
		fs.readdir(pathToDir, (err, files) => {	
			if (err) {
				reject(err);
			} else {				
				let arrFiles = []; 
				
				for (let i = 0; i < files.length; i++) {
					let pathTemp = pathToDir + '/' + files[i];
					arrFiles.push(pathTemp);
				}	
				resolve(arrFiles);	
			
			}
		});
	});

}


/*
function getInfo(pathToFile) {
	
	return new Promise((resolve, reject) => {
		fs.stat(pathToFile, (err, stats) => {
			if (err){
				reject(err);
			} else {
				resolve(stats.isFile);
			}
		});
	});
	
}
*/

function getContent(pathToFile){
	
	return new Promise((resolve, reject) => {
		fs.readFile(pathToFile, conf, (err, content) => {
			if (err){
				reject(err);
			} else {
				resolve(content);
			}					
		});
	});
	
}



function getError(err){
	console.log(err);
}




function readAll(path){

	getFilesFromDir(path).then(arrayFiles => Promise.all(
		arrayFiles.map(
			singleFile => {
				return getContent(singleFile)
						.then(content => {
						return new File(singleFile, content)
						})
						.catch(getError);
				}
		)
	))
			
	.then (files => {
		console.log(files);
	})
	.catch(getError);
	
}


  
module.exports = readAll;
  