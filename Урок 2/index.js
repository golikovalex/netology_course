var fabric = require('./fabric.js');

let webinarChat =  fabric.getChatApp('webinar');
let facebookChat = fabric.getChatApp('=========facebook');
let vkChat =       fabric.getChatApp('---------vk').setMaxListeners(2);


let chatOnMessage = (message) => {
	console.log(message);
};


let preChatMessage = () => {
	console.log('Готовлюсь к ответу');
}


webinarChat.on('message', preChatMessage);
webinarChat.on('message', chatOnMessage);

facebookChat.on('message', chatOnMessage);

vkChat.on('message', preChatMessage);
vkChat.on('message', chatOnMessage);


// Закрыть вконтакте
setTimeout( ()=> {
	console.log('Закрываю вконтакте...');
	vkChat.close('Чат вконтакте закрылся :(');
	vkChat.removeAllListeners('message');
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
	console.log('Закрываю фейсбук, все внимание — вебинару!');
	facebookChat.removeListener('message', chatOnMessage);
}, 15000 );


// Закрыть вебинар
setTimeout( ()=> {
	console.log('Вебинар всё...');
	webinarChat.removeAllListeners('message');
}, 30000 );