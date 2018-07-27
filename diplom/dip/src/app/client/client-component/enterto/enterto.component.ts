import { EventEmitter, Input, Output, Component, OnInit } from '@angular/core';
import { User }  from '../../user';
import { UserService } from '../../UserService';

@Component({
	selector: 'app-enterto',
	templateUrl: './enterto.component.html',
	providers: [UserService],
	styleUrls: ['./enterto.component.css']
})


export class EntertoComponent implements OnInit {
	
	@Input() mainUser: User;
	@Output() readyToShow = new EventEmitter<boolean>();

	constructor(private userService: UserService) { }	
	ngOnInit() { }

	submitted = false;
	
	onSubmit() {
		let tempUser = new User("", "", 0);
	
		//check user in DB
		this.userService.checkUserInDB(this.mainUser.email).subscribe(data => {
			tempUser = data;
			//if there is no user in DB - add user
			if (data === null){
				this.mainUser.money = 100;
				this.userService.addUser(this.mainUser).subscribe(data=> {
						console.log("new user added");
				},);
			} 
			else {
				//if user in db  - get data
				this.mainUser.money = tempUser.money;
			}
		}, err => {console.log("error: " + err);}
		);

		
		this.submitted = true;
		this.readyToShow.emit(true);
	}
  
	enterToClientInterface() {	

	}


}
