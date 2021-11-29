import { AndroidProvider, BrowserProvider, IOSProvider, WeixinMiniProvider } from './providers/ProvidersTemplate';
import { ProviderType } from './ProviderType';
var ProviderFactory = /** @class */ (function () {
    function ProviderFactory() {
    }
    ProviderFactory.create = function (type) {
        var tempProvider = undefined;
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
                    console.log(tempProvider.getName(), 'customInitPreventDup success...continue!');
                    localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
                }
                else {
                    window.WebViewJavascriptBridge = webViewJavascriptBridge;
                    console.log(tempProvider.getName(), 'init success...continue!');
                    if (type == ProviderType.ANDROID) {
                        try {
                            localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
                            webViewJavascriptBridge.init(function (message, responseCallback) {
                                responseCallback(message);
                            });
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        localStorage.setItem("TST_HYBRIDIFY_STATUS", "1");
                    }
                }
            });
            return tempProvider;
        }
        else {
            throw Error('Not supported provider type');
        }
    };
    return ProviderFactory;
}());
export { ProviderFactory };
