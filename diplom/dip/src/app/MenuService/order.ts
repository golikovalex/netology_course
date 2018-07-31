export class Order {

	title: string;
	condition: string;
	userEmail: string;
	date: number;
	price: number;
	
	
	updateToCooking = function(){
		this.condition = "Готовится";
	}
	
}