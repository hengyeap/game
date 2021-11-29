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
var BrowserProvider = /** @class */ (function (_super) {
    __extends(BrowserProvider, _super);
    function BrowserProvider() {
        var _this = _super.call(this) || this;
        _this.name = 'Browser';
        return _this;
    }
    BrowserProvider.prototype.init = function (callback) {
        console.log("BrowserProvider doesn't need initilize itself.....move forward...");
        callback({ customInitPreventDup: true });
    };
    BrowserProvider.prototype.callAsync = function (op, callback) {
        if (op.method == 'createNewWebView') {
            window.location.href = op.params.url;
        }
        else if (op.method == 'alipay') {
            console.log("支付宝支付....");
        }
        else if (op.method == 'CMBPay') {
            console.log("交行支付....");
        }
        else if (op.method == 'unifyPay') {
            console.log("银联支付....");
        }
        else if (op.method == 'back') {
            window.history.go(-1);
        }
        else if (op.method == 'getLocalStorage') {
            var response = {};
            var result = window.sessionStorage.getItem(op.params['key']);
            response[op.params['key']] = result;
            callback(JSON.stringify(response));
        }
        else {
            throw new Error('Method:[' + op.method + ']not implemented.');
        }
    };
    BrowserProvider.prototype.registerListener = function (name, callback) {
        throw new Error("Method not implemented.");
    };
    return BrowserProvider;
}(Provider));
export { BrowserProvider };
