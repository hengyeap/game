import { AndroidProvider, BrowserProvider, IOSProvider, WeixinMiniProvider } from './providers/ProvidersTemplate';
import { Provider } from './providers/Provider';
import { ProviderType } from './ProviderType';
class ProviderFactory {
	static create(type: ProviderType): Provider {
		let tempProvider: Provider | undefined = undefined;
		switch (type) {
			case ProviderType.ANDROID:
				tempProvider = new AndroidProvider();
				break;
			case ProviderType.IOS:
				tempProvider = new IOSProvider();
				break;
			case ProviderType.WEIXIN_MINI:
				tempProvider = new WeixinMiniProvider();
				break;
			case ProviderType.BROWSER:
				tempProvider = new BrowserProvider();
				break;
			default:
				throw Error('Not supported provider type');
		}
		if (tempProvider) {
			tempProvider.init(function (webViewJavascriptBridge) {
				if (webViewJavascriptBridge.customInitPreventDup) {
					console.log((tempProvider as any).getName(), 'customInitPreventDup success...continue!');
					localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
				} else {
					(window as any).WebViewJavascriptBridge = webViewJavascriptBridge;
					console.log((tempProvider as any).getName(), 'init success...continue!');
					if (type == ProviderType.ANDROID) {
						try {
							localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
							webViewJavascriptBridge.init(function (message: string, responseCallback: (callback: any) => void) {
								responseCallback(message);
							});
						} catch (e) {
							console.log(e);
						}

					} else {
						localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
					}

				}
			});
			return tempProvider;
		} else {
			throw Error('Not supported provider type');
		}
	}
}
export { ProviderFactory };
