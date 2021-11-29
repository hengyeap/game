import { Operation } from '../Operation';
abstract class Provider {
	name: string;
	constructor() {
		this.name = 'unknown';
	}
	abstract init(callback: (callback: any) => void): void;
	abstract callAsync(op: Operation, callback: (resposne: string) => void | undefined): void;
	abstract registerListener(name: String,callback: (resposne: string) => void): void;
	
	getName() {
		return this.name;
	}
}
export { Provider };
