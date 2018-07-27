import { Component, OnInit, ViewChild } from '@angular/core';
import { User }  from '../user';
import { MenuDisplayComponent } from './menu-display/menu-display.component';


@Component({
	selector: 'app-client-component',
	templateUrl: './client-component.component.html',
	styleUrls: ['./client-component.component.css']
})


export class ClientComponentComponent implements OnInit {
	
	@ViewChild(MenuDisplayComponent) menuDisplayComponent: MenuDisplayComponent;

	constructor() { }
	ngOnInit() { }
	
	mainUser = new User("", "", 0);
	showInterface = false;
	
	
	
	readyToShow(result: boolean){
		this.menuDisplayComponent.initOrders(this.mainUser.email);
		this.showInterface = result;	
	}
		

}
