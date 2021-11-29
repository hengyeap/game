import { Provider } from '../Provider';
import { Operation } from '../../Operation';

class IOSProvider extends Provider {
	constructor() {
		super();
		this.name = 'App@IOS';
	}
	init(callback: (callback: any) => void) {
		if ((window as any).WebViewJavascriptBridge) {
			return callback((window as any).WebViewJavascriptBridge);
		}
		if ((window as any).WVJBCallbacks) {
			return (window as any).WVJBCallbacks.push(callback);
		}
		(window as any).WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function () {
			document.documentElement.removeChild(WVJBIframe);
		}, 0);
	}
	callAsync(op: Operation, callback: (resposne: string) => void | undefined): void {
		(window as any).WebViewJavascriptBridge.callHandler(op.method, op.params, function (response: string) {
			callback(response);
		});
	}
	registerListener(name: String, callback: (resposne: string) => void): void {
		(window as any).WebViewJavascriptBridge.registerHandler(name, function (data: string) {
			console.log(name, " ios called with:", data)
			callback(data);
		})
	}
}
export { IOSProvider };
