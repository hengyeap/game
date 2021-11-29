import { callAsync, providerGetName, registerListener } from '../Core';
import { Operation } from '../definitions/Operation';
function whereamiSync() {
    return providerGetName();
}
function share(ob) {
    var params = ob;
    var op = new Operation('goToSharePic', params);
    callAsync(op, function () { });
}
function shareText(ob) {
    var params = ob;
    var op = new Operation('goToShareText', params);
    callAsync(op, function () { });
}
function toShare(ob) {
    var params = ob;
    var op = new Operation('goToShare', params);
    callAsync(op, function () { });
}
function toTaoBuTingLive(ob) {
    var params = ob;
    var op = new Operation('goToTaoBuTingLive', params);
    callAsync(op, function () { });
}
function goToTingCoinPage(ob) {
    var params = ob;
    var op = new Operation('goToTingCoinPage', params);
    callAsync(op, function () { });
}
function download(url) {
    var params = { url: url };
    var op = new Operation('downloadImg', params);
    callAsync(op, function () { });
}
function downloadMulti(urls) {
    var params = { urls: urls };
    var op = new Operation('downloadImgs', params);
    callAsync(op, function () { });
}
function multiDownloadOnProgress(callback) {
    registerListener('downloadProgress', function (res) {
        callback(res);
    });
}
function multiDownloadFinished(callback) {
    registerListener('downloadResult', function (res) {
        callback(res);
    });
}
function downloadVideo(url) {
    var params = { videoUrl: url };
    var op = new Operation('videoDownload', params);
    callAsync(op, function () { });
}
function takeVedio() {
    var op = new Operation('videoRecord');
    callAsync(op, function () { });
}
function getHost(callback, ob) {
    var params = ob;
    var op = new Operation('getStoreHost', params);
    callAsync(op, function (res) {
        callback(res);
    });
}
export default {
    share: share,
    download: download,
    downloadMulti: downloadMulti,
    downloadVideo: downloadVideo,
    takeVedio: takeVedio,
    getHost: getHost,
    toShare: toShare,
    multiDownloadOnProgress: multiDownloadOnProgress,
    multiDownloadFinished: multiDownloadFinished,
    whereamiSync: whereamiSync,
    toTaoBuTingLive: toTaoBuTingLive,
    shareText: shareText,
    goToTingCoinPage: goToTingCoinPage
};
