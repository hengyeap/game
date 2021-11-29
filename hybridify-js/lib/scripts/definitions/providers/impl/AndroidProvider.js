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
var AndroidProvider = /** @class */ (function (_super) {
    __extends(AndroidProvider, _super);
    function AndroidProvider() {
        var _this = _super.call(this) || this;
        _this.name = 'App@Android';
        return _this;
    }
    AndroidProvider.prototype.init = function (callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge);
        }
        else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(window.WebViewJavascriptBridge);
            }, false);
        }
    };
    AndroidProvider.prototype.callAsync = function (op, callback) {
        window.WebViewJavascriptBridge.callHandler(op.method, op.params, function (response) {
            callback(response);
        });
    };
    AndroidProvider.prototype.registerListener = function (name, callback) {
        window.WebViewJavascriptBridge.registerHandler(name, function (data) {
            console.log(name, " android called with:", data);
            callback(data);
        });
    };
    return AndroidProvider;
}(Provider));
export { AndroidProvider };
