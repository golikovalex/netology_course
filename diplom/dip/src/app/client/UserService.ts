import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from './user';
   
   
@Injectable()
export class UserService{
   
	constructor(private http: HttpClient){ }
	
	
	checkUserInDB(email): Observable<any>{
		return this.http.get('/users/' + email);
	}
	

	addUser(newUser): Observable<any>{	
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		}
		
		return this.http.post('/users', JSON.stringify(newUser), httpOptions);
	}
	
	
	updateUserInfo(user): Observable<any>{
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		}	
		return this.http.put('/users/' + user.email, JSON.stringify(user), httpOptions);
	}
	

	   
}