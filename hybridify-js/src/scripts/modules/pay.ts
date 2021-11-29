import { callAsync, callSync } from "../Core";
import { Operation } from "../definitions/Operation";

function cmbpay(sign: string) {
  const parameter = {
    payload: sign
  }
  const op = new Operation("CMBPay", parameter);
  callAsync(op, function() {});
}
function alipay(sign: string) {
  const parameter = {
    payload: sign
  }
  const op = new Operation("alipay", parameter);
  callAsync(op, function() {});
}
function unifyPay(sign: string) {
  const parameter = {
    payload: sign
  }
  const op = new Operation("unifyPay", parameter);
  callAsync(op, function() {});
}


export default {
	cmbpay,
	alipay,
	unifyPay
};