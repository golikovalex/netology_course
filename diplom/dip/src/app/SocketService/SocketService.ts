import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

	private socket;

	constructor() { 
		this.socket = io();
	}
	
	
	sendMassage(channel, msg){
		this.socket.emit(channel, msg);
	}
	
	
	listenMassages(channel){
		let observable = new Observable(observer => {
			this.socket.on(channel, (data) => {
				observer.next(data);    
			});
      
			return () => {
				this.socket.disconnect();
			};  
		})     
    
		return observable;
	}  
  
}
