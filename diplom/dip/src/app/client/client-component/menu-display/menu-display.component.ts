import { Component, OnInit, Input} from '@angular/core';
import { MenuService } from '../../../MenuService/MenuService';
import { SocketService } from '../../../SocketService/SocketService';
import { UserService } from '../../UserService';
import { Observable } from 'rxjs';
import { Dish } from '../../../MenuService/dish';
import { Order } from '../../../MenuService/order';
import { User }  from '../../user';


@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  providers: [MenuService, UserService],
  styleUrls: ['./menu-display.component.css']
})


export class MenuDisplayComponent implements OnInit {
	
	@Input() mainUser: User;
	
	dishes: Dish[] = [];
	orders: Order[] = [];
	
	connection;

	
	constructor(private menuService: MenuService, private userService: UserService, private socketService: SocketService) {}
	
	ngOnInit() {
		//get Menu
		this.menuService.getDishes().subscribe(data => {
				this.dishes = data;
			}, err => {console.log(err);}
		);
		//listening kitchen and update order conditions "real time"
		this.connection = this.socketService.listenMassages("refresh").subscribe( msg =>{
			let newOrder = new Order();
			newOrder = JSON.parse(msg.toString());
			
			for (let i = this.orders.length - 1; i >= 0 ; i--){
				if ((this.orders[i].title == newOrder.title) && (this.orders[i].userEmail == newOrder.userEmail)){
					this.orders[i].condition = newOrder.condition;
					//return money to user account in case of problems with delivery
					if (newOrder.condition == "Возникли сложности"){
							this.mainUser.money += newOrder.price;
					}					
					return;
				}
			}
		})
	}
	
	//get orders due to user email
	public initOrders(email: string){
		this.menuService.getOrdersDueEmail(email).subscribe(data => {
			this.orders = data;
			}, err => {console.log(err);}	
		);
	}
	
	//add new order
	public addOrder(dish: Dish) { 
		let newOrder = new Order();
		newOrder.title = dish.title;
		newOrder.condition = "Заказано";
		newOrder.userEmail = this.mainUser.email;
		newOrder.date = Date.now();
		newOrder.price = dish.price;
		
		this.menuService.addOrder(newOrder).subscribe(
			response=> {
				this.mainUser.money -= dish.price;
				this.orders.push(newOrder);
				//update user data in DB
				this.userService.updateUserInfo(this.mainUser).subscribe( response=> {
						//emit message for kitchen
						this.socketService.sendMassage("added", newOrder);
					}
				);	
			},
		);
	}
	

}
