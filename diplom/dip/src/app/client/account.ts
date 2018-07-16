export class Account {

	constructor(
	) { }

	static private sum_to_add = 100;
	static private currency_name = " Галактические кредиты";
	
	static addMoneyToAccount(): number {
		return this.sum_to_add;
	}
	
	static getCurrencyName(): string {
		return this.currency_name;
	}
	
}