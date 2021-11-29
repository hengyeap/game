import { Provider } from '../Provider';
import { Operation } from '../../Operation';

class AndroidProvider extends Provider {
	constructor() {
		super();
		this.name = 'App@Android';
	}
	init(callback: (callback: any) => void) {
		if ((window as any).WebViewJavascriptBridge) {
			callback((window as any).WebViewJavascriptBridge);
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function () {
					callback((window as any).WebViewJavascriptBridge);
				},
				false
			);
		}
	}
	callAsync(op: Operation, callback: (resposne: string) => void | undefined): void {
		(window as any).WebViewJavascriptBridge.callHandler(op.method, op.params, function (response: string) {
			callback(response);
		});
	}

	registerListener(name: String, callback: (resposne: string) => void): void {
		(window as any).WebViewJavascriptBridge.registerHandler(name, function (data: string) {
			console.log(name, " android called with:", data)
			callback(data);
		})
	}

}
export { AndroidProvider };
