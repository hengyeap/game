import { callAsync, callSync, registerListener } from "../Core";
import { Operation } from "../definitions/Operation";

function firstLogin(obj: object, callback: (resposne: string) => void) {
  const params = obj;
  const op = new Operation("getUserFirstLogin", params);
  callAsync(op, function (res) {
    callback(res);
  });
}
function logout() {
  const op = new Operation("logout");
  callAsync(op, () => { });
}
function userStatusOnChange(callback: (resposne: string) => void) {
  registerListener('userStatusOnChange', (res: string) => {
    callback(res);
  })
}
export default {
  firstLogin,
  logout,
  userStatusOnChange
};
