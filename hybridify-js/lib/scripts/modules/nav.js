import { callAsync } from "../Core";
import { Operation } from "../definitions/Operation";
function push(url) {
    var params = { url: url };
    var op = new Operation("createNewWebView", params);
    callAsync(op, function () { });
}
function toHome() {
    var op = new Operation("goToHome");
    callAsync(op, function () { });
}
function toChat() {
    var op = new Operation("goToChat");
    callAsync(op, function () { });
}
function toMe() {
    var op = new Operation("goToMe");
    callAsync(op, function () { });
}
function toSearch(platform) {
    var params = { platform: platform };
    var op = new Operation("goToSearchScreen", params);
    callAsync(op, function () { });
}
function toLogin() {
    var op = new Operation("goToLogin");
    callAsync(op, function () { });
}
function toCoin() {
    var op = new Operation("goToCoinScreen");
    callAsync(op, function () { });
}
function toNotice() {
    var op = new Operation("goToNotice");
    callAsync(op, function () { });
}
function toPoster() {
    var op = new Operation("poster");
    callAsync(op, function () { });
}
function toAlbum() {
    var op = new Operation("officialAlbum");
    callAsync(op, function () { });
}
function toMall() {
    var op = new Operation("goToMall");
    callAsync(op, function () { });
}
function toCommunity() {
    var op = new Operation("goToCommunity");
    callAsync(op, function () { });
}
function toRankList() {
    var op = new Operation("rankingList");
    callAsync(op, function () { });
}
function back() {
    var op = new Operation("goBack");
    callAsync(op, function () { });
}
function loadFail() {
    var op = new Operation("loadErrorView");
    callAsync(op, function () { });
}
function toInvoice(params) {
    var ob = params;
    var op = new Operation("goToInvoice", ob);
    callAsync(op, function () { });
}
function toCalendar() {
    var op = new Operation("goToCalendarScreen");
    callAsync(op, function () { });
}
function toTaoBuTingLive() {
    var op = new Operation("goToTaoBuTingLive");
    callAsync(op, function () { });
}
function goToTingCoinPage() {
    var op = new Operation("goToTingCoinPage");
    callAsync(op, function () { });
}
export default {
    push: push,
    toHome: toHome,
    toChat: toChat,
    toMe: toMe,
    toCoin: toCoin,
    toSearch: toSearch,
    toNotice: toNotice,
    toPoster: toPoster,
    toAlbum: toAlbum,
    toMall: toMall,
    toCommunity: toCommunity,
    toRankList: toRankList,
    back: back,
    loadFail: loadFail,
    toInvoice: toInvoice,
    toLogin: toLogin,
    toCalendar: toCalendar,
    toTaoBuTingLive: toTaoBuTingLive,
    goToTingCoinPage: goToTingCoinPage
};
