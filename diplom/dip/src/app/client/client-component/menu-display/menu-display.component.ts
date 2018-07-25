import { Component, OnInit, Input} from '@angular/core';
import { MenuService } from '../../../MenuService/MenuService';
import { Observable } from 'rxjs';
import { Dish } from '../../../MenuService/dish';
import { Order } from '../../../MenuService/order';
import { User }  from '../../user';


@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  providers: [MenuService],
  styleUrls: ['./menu-display.component.css']
})


export class MenuDisplayComponent implements OnInit {
	
	@Input() mainUser: User;
	
	dishes: Dish[] = [];
	orders: Order[] = [];

	constructor(private menuService: MenuService) { }
	
	ngOnInit() {
		this.menuService.getDishes().subscribe(data => {
				this.dishes = data;
			}, err => {console.log(err);}
		);
		
		this.menuService.getOrders().subscribe(data => {
			this.orders = data;
			}, err => {console.log(err);}
		);
	}
	
	public initOrders(){
		if (!this.mainUser.email){
			this.menuService.getOrders().subscribe(data => {
				this.orders = data;
				}, err => {console.log(err);}	
		);
		}
	}
	

	public addOrder(dish: Dish) { 
		let newOrder = new Order();
		newOrder.title = dish.title;
		newOrder.condition = "Заказано";
		newOrder.userEmail = this.mainUser.email;
		newOrder.date = Date.now();
		
		this.menuService.addOrder(newOrder).subscribe(
			response=> {
				console.log(response);
				this.mainUser.money -= dish.price;
				this.orders.push(newOrder);
			},
		);
	}
	

}
