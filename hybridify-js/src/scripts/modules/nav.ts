import { callAsync, callSync } from "../Core";
import { Operation } from "../definitions/Operation";
function push(url: string) {
  const params = { url: url };
  const op = new Operation("createNewWebView", params);
  callAsync(op, function () { });
}
function toHome() {
  const op = new Operation("goToHome");
  callAsync(op, function () { });
}

function toChat() {
  const op = new Operation("goToChat");
  callAsync(op, function () { });
}
function toMe() {
  const op = new Operation("goToMe");
  callAsync(op, function () { });
}
function toSearch(platform: string) {
  const params = { platform: platform }
  const op = new Operation("goToSearchScreen", params);
  callAsync(op, function () { });
}
function toLogin() {
  const op = new Operation("goToLogin");
  callAsync(op, function () { });
}
function toCoin() {
  const op = new Operation("goToCoinScreen");
  callAsync(op, function () { });
}
function toNotice() {
  const op = new Operation("goToNotice");
  callAsync(op, function () { });
}
function toPoster() {
  const op = new Operation("poster");
  callAsync(op, function () { });
}
function toAlbum() {
  const op = new Operation("officialAlbum");
  callAsync(op, function () { });
}

function toMall() {
  const op = new Operation("goToMall");
  callAsync(op, function () { });
}

function toCommunity() {
  const op = new Operation("goToCommunity");
  callAsync(op, function () { });
}

function toRankList() {
  const op = new Operation("rankingList");
  callAsync(op, function () { });
}

function back() {
  const op = new Operation("goBack");
  callAsync(op, function () { });
}

function loadFail() {
  const op = new Operation("loadErrorView");
  callAsync(op, function () { });
}

function toInvoice(params: object) {
  const ob = params;
  const op = new Operation("goToInvoice", ob);
  callAsync(op, function () { });
}
function toCalendar() {
  const op = new Operation("goToCalendarScreen");
  callAsync(op, function () { });
}
function toTaoBuTingLive() {
  const op = new Operation("goToTaoBuTingLive");
  callAsync(op, function () { });
}
function goToTingCoinPage() {
  const op = new Operation("goToTingCoinPage");
  callAsync(op, function () { });
}
export default {
  push,
  toHome,
  toChat,
  toMe,
  toCoin,
  toSearch,
  toNotice,
  toPoster,
  toAlbum,
  toMall,
  toCommunity,
  toRankList,
  back,
  loadFail,
  toInvoice,
  toLogin,
  toCalendar,
  toTaoBuTingLive,
  goToTingCoinPage
};
