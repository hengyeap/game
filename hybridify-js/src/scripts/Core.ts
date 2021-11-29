import { ProviderFactory } from './definitions/ProviderFactory';
import { Provider } from './definitions/providers/Provider';
import { ProviderType } from './definitions/ProviderType';
localStorage.setItem("TST_HYBRIDIFY_STATUS","0");
const u = navigator.userAgent;
let pType: ProviderType | undefined = undefined;
if ((u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) && u.indexOf('VersionString') > -1) {
	pType = ProviderType.ANDROID;
} else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && u.indexOf('VersionString') > -1) {
	pType = ProviderType.IOS;
} else if (u.indexOf('miniprogram') > -1 || (window as any).__wxjs_environment === 'miniprogram') {
	pType = ProviderType.WEIXIN_MINI;
} else {
	pType = ProviderType.BROWSER;
}
const provider = ProviderFactory.create(pType);

import { Operation } from './definitions/Operation';
function callAsync(op: Operation, callback: (response: string) => void) {
	const id = setInterval(() => {
		const TST_HYBRIDIFY_STATUS = localStorage.getItem("TST_HYBRIDIFY_STATUS");
		console.log("callAsync interval called");
		if (TST_HYBRIDIFY_STATUS == "1") {
			clearInterval(id);
			provider.callAsync(op, (response: string) => {
				callback(response);
			});
		}
	}, 20);

}
function registerListener(name: String, callback: (response: string) => void) {
	const id = setInterval(() => {
		const TST_HYBRIDIFY_STATUS = localStorage.getItem("TST_HYBRIDIFY_STATUS");
		if (TST_HYBRIDIFY_STATUS == "1") {
			clearInterval(id);
			provider.registerListener(name, (res: string) => {
				callback(res);
			})
		}
	}, 20);
}
function providerGetName() {
	return provider.getName();
}
async function callSync(op: Operation) {
	const p = new Promise((resolve, reject) => {
		try {
			const id = setInterval(() => {
				const TST_HYBRIDIFY_STATUS = localStorage.getItem("TST_HYBRIDIFY_STATUS");
				if (TST_HYBRIDIFY_STATUS == "1") {
					clearInterval(id);
					provider.callAsync(op, (response: string) => {
						resolve(response);
					});
				}
			}, 20);

		} catch (e) {
			reject(new Error('unexpected error'));
		}
	});
	try {
		return await p;
	} catch (e) {
		return new Error('unexpected error');
	}
}

export { callAsync, callSync, providerGetName, registerListener };
