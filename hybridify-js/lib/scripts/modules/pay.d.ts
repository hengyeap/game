declare function cmbpay(sign: string): void;
declare function alipay(sign: string): void;
declare function unifyPay(sign: string): void;
declare const _default: {
    cmbpay: typeof cmbpay;
    alipay: typeof alipay;
    unifyPay: typeof unifyPay;
};
export default _default;
