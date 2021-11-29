import { Provider } from '../Provider';
import { Operation } from '../../Operation';

class BrowserProvider extends Provider {
	constructor() {
		super();
		this.name = 'Browser';
	}
	init(callback: (callback: any) => void): void {
		console.log("BrowserProvider doesn't need initilize itself.....move forward...");
		callback({ customInitPreventDup: true });
	}
	callAsync(op: Operation, callback: (resposne: string) => void | undefined): void {
		if (op.method == 'createNewWebView') {
			window.location.href = op.params.url;
		} else if (op.method == 'alipay') {
			console.log("支付宝支付....");
		} else if (op.method == 'CMBPay') {
			console.log("交行支付....");
		} else if (op.method == 'unifyPay') {
			console.log("银联支付....");
		} else if (op.method == 'back') {
			window.history.go(-1);
		} else if (op.method == 'getLocalStorage') {
			const response = {}
			const result = window.sessionStorage.getItem(op.params['key'])
			response[op.params['key']] = result
			callback(JSON.stringify(response))
		} else {
			throw new Error('Method:[' + op.method + ']not implemented.');
		}
	}
	registerListener(name: String, callback: (resposne: string) => void): void {
		throw new Error("Method not implemented.");
	}
}
export { BrowserProvider };
