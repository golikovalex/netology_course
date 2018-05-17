const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */

  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
  }, 1000);
  }
     
  close(lastMessage){
    console.log(lastMessage);
    this.close;
  } 
  
}

module.exports.getChatApp = function(title){
	return new ChatApp(title);
}
