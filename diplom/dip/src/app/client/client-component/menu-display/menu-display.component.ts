import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../../MenuService/MenuService';
import { Dish } from '../../../MenuService/dish';

@Component({
  selector: 'app-menu-display',
  templateUrl: './menu-display.component.html',
  providers: [MenuService],
  styleUrls: ['./menu-display.component.css']
})


export class MenuDisplayComponent implements OnInit {
	
	@Input() mainUser: User;
	
	dishes: Dish[] = [];

	constructor(private menuService: MenuService) { }
	
	ngOnInit() {
		this.menuService.getDishes().subscribe(data => this.dishes=data);
	}
	

}
