var Stream = require('stream');
var fs = require('fs');
var crypto = require('crypto');

var transformer = new Stream.Transform;

//Задание 1. Создать два потока: чтение и запись файла;
var readable = fs.createReadStream('data.txt', "utf-8");
var writable = fs.createWriteStream('data2.txt', "utf-8");

hash = crypto.createHash('md5').setEncoding('hex');




//Задание 2. Реализовать свой класс, который будет конвертировать результат crypto.createHash() (бинарные данные - хеш‑сумма) в hex формат;
class BinaryConvertor {

  static convertIt(Hash){
    return Hash.setEncoding('hex');
  }

}


//Дополнительное задание. Readable класс должен генерировать бесконечное кол-во случайных цифр;
class MyReadable extends Stream.Readable{

  constructor(min, max, options) {
    super(options);

    this.min = min;
    this.max = max;
  }

  _read(size) {
    let num = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    this.push(num.toString() + ' ');
  }
}


//Дополнительное задание. Writable класс должен выводить полученные данные через _write в консоль;
class MyWritable extends Stream.Writable{

  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
}


//Дополнительное задание. Transform класс должен как-либо изменять данные и передавать их на дальнейшую обработку, но с интервалами в 1 сек;
class MyTransform extends Stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    var data = chunk.toString();
    data += "___";

    setTimeout(() => {
      this.push(data);
      callback();
    }, 1000);
    
  }

}



readable.on('error', function(err){
	console.error(err);
});



readable.on('end', function(){
  writable.write("\n");
  console.log("\n");
});


//Задание 2. Расширить предыдущие решние используя stream.Transform;
transformer._transform = function (chunk, encoding, done) {
    var data = chunk.toString();

    arr = data.split('\n');
    for (let i = 0; i < arr.length; i++){
      arr[i] = arr[i] >> 1;
    }

     this.push(arr.toString());
     done();
}



readableMy = new MyReadable(0, 10);
writableMy = new MyWritable();
transformMy = new MyTransform();

readableMy.pipe(transformMy).pipe(writableMy);

readable.pipe(writable, {end: false});
readable.pipe(hash).pipe(writable, {end: false});
readable.pipe(transformer).pipe(writable);

//readable.pipe(hash).pipe(process.stdout);
readable.pipe(BinaryConvertor.convertIt(crypto.createHash('md5'))).pipe(process.stdout);
readable.pipe(process.stdout);

readable.pipe(transformer).pipe(process.stdout);