export class User {

	constructor(
		public name: string,
		public email: string,
		public money: number
	) { }

	
	clone(oldUser: User){
		this.name = oldUser.name;
		this.email = oldUser.email;
		this.money = oldUser.money;
	}
	
}