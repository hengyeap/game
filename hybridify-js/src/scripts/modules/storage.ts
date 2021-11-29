import { callAsync, callSync } from '../Core';
import { Operation } from '../definitions/Operation';
const protectedArray: Array<string> = ['uid', 'accountToken', 'userKey', 'deviceId', 'accessJwt'];

function getProtectedField() {
	return protectedArray;
}

function protectedFieldCheck(obj?: any) {
	for (const key in obj) {
		if (protectedArray.includes(key)) {
			throw new Error('op:setItem failed,protected field not allowed');
		}
	}
}

function getItem(key: string, callback: (resposne: string) => void) {
	const params = { key: key };
	const op = new Operation('getLocalStorage', params);
	callAsync(op, function (res) {
		if (typeof (res) != 'string') {
			res = JSON.stringify(res)
		}
		callback(res);
	});
}

async function getItemSync(key: string) {
	const params = { key: key };
	const op = new Operation('getLocalStorage', params);
	let result = await callSync(op);
	if (typeof (result) != 'string') {
		result = JSON.stringify(result)
	}
	return result;
}

function setItem(obj: object, callback: (resposne: string) => void) {
	protectedFieldCheck();
	const params = obj;
	const op = new Operation('setLocalStorage', params);
	callAsync(op, function (res) {
		callback(res);
	});
}

function delItem(key: string, callback: (resposne: string) => void) {
	const params = { key: key };
	const op = new Operation('deleteLocalStorage', params);
	callAsync(op, function (res) {
		callback(res);
	});
}

export default {
	getItem,
	getItemSync,
	setItem,
	delItem,
	getProtectedField
};
