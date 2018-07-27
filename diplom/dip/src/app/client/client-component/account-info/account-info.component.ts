import { Component, OnInit, Input } from '@angular/core';
import { Account }  from '../../account';
import { User }  from '../../user';
import { UserService } from '../../UserService';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  providers: [UserService],
  styleUrls: ['./account-info.component.css']
})



export class AccountInfoComponent implements OnInit {
	
	@Input() mainUser: User;

	constructor(private userService: UserService) { }

	ngOnInit() {
	}
	
	private _money: number;
	private _currency_name: string;
	
	addMoneyToAccount(){
		this._money = Account.addMoneyToAccount();
		this._currency_name = Account.getCurrencyName();
		
		alert("Вы пополнили свой счет на: " + this._money + " " + this._currency_name);
		this.mainUser.money += this._money;
		
		this.userService.updateUserInfo(this.mainUser).subscribe( response=> {
			}
		);
	}

}
