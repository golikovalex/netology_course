import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from './dish';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
   
   
@Injectable()
export class MenuService{
   
	constructor(private http: HttpClient){ }
       
	getDishes() {
		return this.http.get('assets/menu.json');
	}
	   
	/*
    getDishes() : Observable<Dish[]> {
		return this.http.get('assets/menu.json').pipe(map(data=>{
            let dishesList = data["dishesList"];
            return dishesList.map(function(dish:any) {
                return {title: dish.title};
              });
        }));
    }*/
}