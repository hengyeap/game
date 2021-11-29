'use strict';
const WIN = window;

function Provider(name) {
	this.name = name;
	if (!this.name) {
		this.name = 'default provider';
	}
	console.log(this.name, 'is running!');
}
Provider.prototype.init = function() {
	console.log('init success');
};
Provider.prototype.cb = function(result, callback) {
	if (typeof callback === 'function') {
		callback('op:{op} had been called!'.replace('{op}', JSON.stringify(result)));
	} else {
		console.log('callback should be a function!');
		throw new Error('callback should be a function');
	}
};
Provider.prototype.asyncCall = function(op, callback) {
	//todo browser action
	this.cb(op, callback);
};
function IOSProvider() {
	Provider.call(this, 'ios');
}
IOSProvider.prototype = Object.create(Provider.prototype);
IOSProvider.prototype.constructor = IOSProvider;
IOSProvider.prototype.asyncCall = function(op, callback) {
	window.WebViewJavascriptBridge.callHandler(op.method, op.params, function(response) {
		callback(response);
	});
};
IOSProvider.prototype.init = function(callback) {
	if (window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	if (window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	window.WVJBCallbacks = [ callback ];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe);
	}, 0);
	Provider.prototype.init();
};
function AndroidProvider() {
	Provider.call(this, 'android');
}
AndroidProvider.prototype = Object.create(Provider.prototype);
AndroidProvider.prototype.constructor = AndroidProvider;
AndroidProvider.prototype.asyncCall = function(op, callback) {
	window.WebViewJavascriptBridge.callHandler(op.method, op.params, function(response) {
		callback(response);
	});
};
AndroidProvider.prototype.init = function(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener(
			'WebViewJavascriptBridgeReady',
			function() {
				callback(WebViewJavascriptBridge);
			},
			false
		);
	}
	Provider.prototype.init();
};

const ProviderFactory = {
	getProvider: () => {
		let provider;
		if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
			provider = new AndroidProvider();
		} else if (navigator.userAgent.indexOf('iPhone') > -1) {
			provider = new IOSProvider();
		} else {
			provider = new Provider();
		}
		return provider;
	}
};

const provider = ProviderFactory.getProvider();
provider.init(function(webViewJavascriptBridge) {
	window.WebViewJavascriptBridge = webViewJavascriptBridge;
	webViewJavascriptBridge.init(function(message, responseCallback) {
		responseCallback(message);
	});
});
function callNative(op, callback) {
	provider.asyncCall(op, callback);
}

export default {
	callNative
};
