var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Provider } from '../Provider';
var IOSProvider = /** @class */ (function (_super) {
    __extends(IOSProvider, _super);
    function IOSProvider() {
        var _this = _super.call(this) || this;
        _this.name = 'App@IOS';
        return _this;
    }
    IOSProvider.prototype.init = function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    };
    IOSProvider.prototype.callAsync = function (op, callback) {
        window.WebViewJavascriptBridge.callHandler(op.method, op.params, function (response) {
            callback(response);
        });
    };
    IOSProvider.prototype.registerListener = function (name, callback) {
        window.WebViewJavascriptBridge.registerHandler(name, function (data) {
            console.log(name, " ios called with:", data);
            callback(data);
        });
    };
    return IOSProvider;
}(Provider));
export { IOSProvider };
