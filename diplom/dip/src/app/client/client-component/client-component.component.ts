import { Component, OnInit } from '@angular/core';
import { User }  from '../user';


@Component({
	selector: 'app-client-component',
	templateUrl: './client-component.component.html',
	styleUrls: ['./client-component.component.css']
})


export class ClientComponentComponent implements OnInit {

	constructor() { }
	ngOnInit() { }
	
	mainUser = new User(1, "", "", 20);
	showInterface = false;
	
	
	
	readyToShow(result: boolean){
		this.showInterface = result;	
	}
		

}
