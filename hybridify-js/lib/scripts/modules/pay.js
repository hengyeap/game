import { callAsync } from "../Core";
import { Operation } from "../definitions/Operation";
function cmbpay(sign) {
    var parameter = {
        payload: sign
    };
    var op = new Operation("CMBPay", parameter);
    callAsync(op, function () { });
}
function alipay(sign) {
    var parameter = {
        payload: sign
    };
    var op = new Operation("alipay", parameter);
    callAsync(op, function () { });
}
function unifyPay(sign) {
    var parameter = {
        payload: sign
    };
    var op = new Operation("unifyPay", parameter);
    callAsync(op, function () { });
}
export default {
    cmbpay: cmbpay,
    alipay: alipay,
    unifyPay: unifyPay
};
