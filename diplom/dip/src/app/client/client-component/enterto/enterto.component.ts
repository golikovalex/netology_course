import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';
import { User }  from '../../user';


@Component({
	selector: 'app-enterto',
	templateUrl: './enterto.component.html',
	styleUrls: ['./enterto.component.css']
})


export class EntertoComponent implements OnInit {
	
	@Input() mainUser: User;
	@Output() readyToShow = new EventEmitter<boolean>();

	constructor() { }
	ngOnInit() { }
	
	users: Array<User> = new Array();
	submitted = false;
	
	onSubmit() {
		this.submitted = true;
		this.users.push(this.mainUser);
		this.readyToShow.emit(true);
	}
  
	enterToClientInterface() {	

	}
	

	get diagnostic() { return JSON.stringify(this.users); }

}
