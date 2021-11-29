import { Provider } from '../Provider';
import { Operation } from '../../Operation';
class WeixinMiniProvider extends Provider {
	constructor() {
		super();
		this.name = 'Weixin@miniprogram';
	}
	init(callback: (callback: any) => void): void {
		console.log("WeixinProvider doesn't need initilize itself.....move forward...");
		callback({customInitPreventDup:true});
	}
	callAsync(op: Operation, callback: (resposne: string) => void | undefined): void {
		if (op.method == 'createNewWebView') {
			if (op.params.url.indexOf("https://") == 0) {
				(window as any).wx.miniProgram.navigateTo({ url: '/pages/transform/main?transformUrl=' + encodeURIComponent(op.params.url) });
			} else {
				(window as any).wx.miniProgram.navigateTo({ url: op.params.url });
			}
			(window as any).wx.miniProgram.navigateTo({ url: op.params.url });
		} else if (op.method == 'logout') {
			(window as any).wx.miniProgram.redirectTo({ url: '/pages/login/main?flag=outLogin' });
		} else if (op.method == 'goToMe') {
			(window as any).wx.miniProgram.redirectTo();
		} else {
			throw new Error('Method not implemented.');
		}
	}
	registerListener(name: String, callback: (resposne: string) => void): void {
		throw new Error("Method not implemented.");
	}
}
export { WeixinMiniProvider };
