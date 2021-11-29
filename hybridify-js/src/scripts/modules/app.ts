import { callAsync, callSync, providerGetName, registerListener } from '../Core';
import { Operation } from '../definitions/Operation';

function whereamiSync() {
	return providerGetName();
}
function share(ob: object) {
	const params = ob;
	const op = new Operation('goToSharePic', params);
	callAsync(op, function () { });
}
function shareText(ob: object) {
	const params = ob;
	const op = new Operation('goToShareText', params);
	callAsync(op, function () { });
}
function toShare(ob: object) {
	const params = ob;
	const op = new Operation('goToShare', params);
	callAsync(op, function () { });
}
function toTaoBuTingLive(ob: object) {
    const params = ob;
    const op = new Operation('goToTaoBuTingLive',params)
    callAsync(op,function() {})
}
function goToTingCoinPage(ob: object) {
    const params = ob;
    const op = new Operation('goToTingCoinPage',params)
    callAsync(op,function() {})
}
function download(url: string) {
	const params = { url: url };
	const op = new Operation('downloadImg', params);
	callAsync(op, function () { });
}
function downloadMulti(urls: string[]) {
	const params = { urls: urls };
	const op = new Operation('downloadImgs', params);
	callAsync(op, function () { });
}
function multiDownloadOnProgress(callback: (resposne: string) => void) {
	registerListener('downloadProgress', (res: string) => {
		callback(res);
	})
}
function multiDownloadFinished(callback: (resposne: string) => void) {
	registerListener('downloadResult', (res: string) => {
		callback(res);
	})
}
function downloadVideo(url: string) {
	const params = { videoUrl: url };
	const op = new Operation('videoDownload', params);
	callAsync(op, function () { });
}
function takeVedio() {
	const op = new Operation('videoRecord');
	callAsync(op, function () { });
}
function getHost(callback: (resposne: string) => void, ob: object) {
	const params = ob;
	const op = new Operation('getStoreHost', params);
	callAsync(op, function (res) {
		callback(res);
	});
}

export default {
	share,
	download,
	downloadMulti,
	downloadVideo,
	takeVedio,
	getHost,
	toShare,
	multiDownloadOnProgress,
	multiDownloadFinished,
	whereamiSync,
    toTaoBuTingLive,
	shareText,
	goToTingCoinPage
};
