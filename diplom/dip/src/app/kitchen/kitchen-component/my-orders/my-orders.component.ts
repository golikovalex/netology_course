declare var require: any;
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../MenuService/MenuService';
import { SocketService } from '../../../SocketService/SocketService';
import { Observable } from 'rxjs';
import { Order } from '../../../MenuService/order';

const drone = require('netology-fake-drone-api');


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  providers: [MenuService, SocketService],
  styleUrls: ['./my-orders.component.css']
})


export class MyOrdersComponent implements OnInit {


	constructor(private menuService: MenuService, private socketService: SocketService) { }
  
	orders: Order[] = [];
	cookingOrders: Order[] = [];
	connection;
	

	ngOnInit() {
		//get orders with condition "Заказано"
		this.menuService.getOrderingOrders().subscribe(data => {
				this.orders = data;
			}, err => {console.log(err);}
		);
		//get orders with condition "Готовится"
		this.menuService.getCookingOrders().subscribe(data => {
				this.cookingOrders = data;
			}, err => {console.log(err);}
		);
		
		//listening users and update orders list in "real time"
		this.connection = this.socketService.listenMassages("add").subscribe( msg =>{
			this.menuService.getOrderingOrders().subscribe(data => {
					this.orders = data;
				}, err => {console.log(err);}
			);
		})
		
		
	}

  
	//change condition to "Готовится" and update order in DB
	public sendToCook(order: Order){
		order.condition = "Готовится";
		
		this.menuService.changeOrderCondition(order).subscribe(data => {
				this.cookingOrders.push(order);
				let index = this.orders.indexOf(order, 0);
				if (index > -1) {
					this.orders.splice(index, 1);
				}
				//emit message to user
				this.socketService.sendMassage("refreshed", order);
				
			}, err => {console.log(err);}
		);	  
	}
	
	//change condition to "Доставляется" and update order in DB
	public sendToDelivery(order: Order){
		order.condition = "Доставляется";
		this.socketService.sendMassage("refreshed", order);
		
		this.menuService.changeOrderCondition(order).subscribe(data => {
				let index = this.cookingOrders.indexOf(order, 0);
				if (index > -1) {
					this.cookingOrders.splice(index, 1);
				}
				//using drone_api
				drone
					.deliver()
					.then(() => {
						console.log('Доставлено');
						order.condition = "Доставлено";
						this.menuService.changeOrderCondition(order).subscribe( response=> {
							this.socketService.sendMassage("refreshed", order);
						});
					})
					.catch(() => {
						console.log('Возникли сложности');
						order.condition = "Возникли сложности";
						this.menuService.changeOrderCondition(order).subscribe( response=> {
							this.socketService.sendMassage("refreshed", order);
						});
					});

				
			}, err => {console.log(err);}
		);	  
	}
  

  

}
