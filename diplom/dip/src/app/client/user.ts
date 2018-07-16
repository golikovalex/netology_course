export class User {

	constructor(
		public id: number,
		public name: string,
		public email: string,
		public money: number;
	) { }

	
	clone(oldUser: User){
		this.id = oldUser.id;
		this.name = oldUser.name;
		this.email = oldUser.email;
		this.money = oldUser.money;
	}
	
}