import { callAsync, registerListener } from "../Core";
import { Operation } from "../definitions/Operation";
function firstLogin(obj, callback) {
    var params = obj;
    var op = new Operation("getUserFirstLogin", params);
    callAsync(op, function (res) {
        callback(res);
    });
}
function logout() {
    var op = new Operation("logout");
    callAsync(op, function () { });
}
function userStatusOnChange(callback) {
    registerListener('userStatusOnChange', function (res) {
        callback(res);
    });
}
export default {
    firstLogin: firstLogin,
    logout: logout,
    userStatusOnChange: userStatusOnChange
};
