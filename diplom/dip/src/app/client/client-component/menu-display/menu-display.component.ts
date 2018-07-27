import { Component, OnInit, Input} from '@angular/core';
import { MenuService } from '../../../MenuService/MenuService';
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

	constructor(private menuService: MenuService, private userService: UserService) { }
	
	ngOnInit() {
		//get Menu
		this.menuService.getDishes().subscribe(data => {
				this.dishes = data;
			}, err => {console.log(err);}
		);
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
		
		this.menuService.addOrder(newOrder).subscribe(
			response=> {
				this.mainUser.money -= dish.price;
				this.orders.push(newOrder);
				//update user data in DB
				this.userService.updateUserInfo(this.mainUser).subscribe( response=> {
					}
				);	
			},
		);
	}
	

}
