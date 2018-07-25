export class Account {

	constructor(
	) { }

	private static sum_to_add = 100;
	private static currency_name = " Галактические кредиты";
	
	static addMoneyToAccount(): number {
		return this.sum_to_add;
	}
	
	static getCurrencyName(): string {
		return this.currency_name;
	}
	
}