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
var WeixinMiniProvider = /** @class */ (function (_super) {
    __extends(WeixinMiniProvider, _super);
    function WeixinMiniProvider() {
        var _this = _super.call(this) || this;
        _this.name = 'Weixin@miniprogram';
        return _this;
    }
    WeixinMiniProvider.prototype.init = function (callback) {
        console.log("WeixinProvider doesn't need initilize itself.....move forward...");
        callback({ customInitPreventDup: true });
    };
    WeixinMiniProvider.prototype.callAsync = function (op, callback) {
        if (op.method == 'createNewWebView') {
            if (op.params.url.indexOf("https://") == 0) {
                window.wx.miniProgram.navigateTo({ url: '/pages/transform/main?transformUrl=' + encodeURIComponent(op.params.url) });
            }
            else {
                window.wx.miniProgram.navigateTo({ url: op.params.url });
            }
            window.wx.miniProgram.navigateTo({ url: op.params.url });
        }
        else if (op.method == 'logout') {
            window.wx.miniProgram.redirectTo({ url: '/pages/login/main?flag=outLogin' });
        }
        else if (op.method == 'goToMe') {
            window.wx.miniProgram.redirectTo();
        }
        else {
            throw new Error('Method not implemented.');
        }
    };
    WeixinMiniProvider.prototype.registerListener = function (name, callback) {
        throw new Error("Method not implemented.");
    };
    return WeixinMiniProvider;
}(Provider));
export { WeixinMiniProvider };
