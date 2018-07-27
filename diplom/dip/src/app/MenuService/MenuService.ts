import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish } from './dish';
import { Order } from './order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

   
   
@Injectable()
export class MenuService{
   
	constructor(private http: HttpClient){ }
	
	
	getDishes(): Observable<any>{
		return this.http.get('assets/menu.json');
	}
	
	
	getOrders(): Observable<any>{
		return this.http.get('/orders');
	}
	
	getOrdersDueEmail(email): Observable<any>{
		return this.http.get('/orders/email/' + email);
	}
	
	getCookingOrders(): Observable<any>{
		return this.http.get('/orders/cooking');
	}
	
	getOrderingOrders(): Observable<any>{
		return this.http.get('/orders/ordering');
	}
	

	
	
	addOrder(newOrder): Observable<any>{	
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		}
		
		return this.http.post('/orders', JSON.stringify(newOrder), httpOptions);
	}
	
	
	changeOrderCondition(order): Observable<any>{
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		}	

		return this.http.put('/orders/' + order._id, JSON.stringify(order), httpOptions);
	}
	


	
	/*
	    addTask(newTask){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers: headers})
            .map(res => res.json());
    }
	
	private serverApi= 'http://localhost:3000';
	
	
    public getAllLists():Observable<List[]> {
        let URI = "${this.serverApi}/orders/";
        return this.http.get(URI)
            .map(res => res.json())
            .map(res => <List[]>res.lists);
    }
	
	public addList(list: List) {
        let URI = "${this.serverApi}/orders/";
        let headers = new Headers;
         let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
         console.log(body);
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body ,{headers: headers})
        .map(res => res.json());
    }

	
	

    public deleteList(listId : string) {
		
      let URI = "${this.serverApi}/orders/${listId}";
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.delete(URI, {headers})
        .map(res => res.json());
		
    }	
*/	

	

	
	/*
	addOrder(newOrder){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		return this.http.post('/api/orders', JSON.stringify(newOrder), {headers: headers})
			.map(res => res.json());
    }
	
	
	deleteOrder(id){
        return this.http.delete('/api/order/'+id)
            .map(res => res.json());
    }
	
	
	updateOrderStatus(order){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
        
		return this.http.put('/api/order/'+order.id, JSON.stringify(order), {headers: headers})
            .map(res => res.json());
    }*/
	
	   
}