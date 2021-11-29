'use strict'

const WIN = window
const UA = navigator.userAgent
const API_ROOT = 'fz'  //lib包根名称，例如，API_ROOT取名 wx(套一下微信小程序),则在html调用时可以以wx.* 调用

let callbackMap = {}
let eventCallMap = {}

const Hybrid = WIN[API_ROOT] = {}


const ANDROID = "Android"
const IOS = "iOS"
const WIN_PHONE = "WP"
const OTHER = "Others"

function getOS() { // 获取当前操作系统
    var os;
    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
        os = ANDROID;
    } else if (navigator.userAgent.indexOf('iPhone') > -1) {
        os = IOS;
    } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
        os = WIN_PHONE;
    } else {
        os = OTHER;
    }
    return os;
}

let os = getOS()

//获取设备类型
var m = UA.match(/\s*([^]+)\s+Build/)


const iosProvider = {
    call: function (data) {
        window.webkit.messageHandlers.callNative.postMessage(data)
    },
    callSync: function (data) {
        let str = JSON.stringify(data);

        var resultObj
        try {
            let resultjson = prompt(str);
            resultObj = resultjson;
            //直接用 = 接收 Prompt()的返回数据，JSON反解
            resultObj = resultjson ? JSON.parse(resultjson) : {};

        } catch (error) {
            console.warn('parse json failure ' + resultObj);
        }
        return resultObj;
    }
}

const androidProvider = {
    call: function (data) {
        android.callNative(JSON.stringify(data));
    },
    callSync: function (data) {
        let str = JSON.stringify(data);

        var resultObj
        try {
            let resultjson = prompt(str);
            resultObj = resultjson;
            //直接用 = 接收 Prompt()的返回数据，JSON反解
            resultObj = resultjson ? JSON.parse(resultjson) : {};

        } catch (error) {
            console.warn('parse json failure ' + resultObj);
        }
        return resultObj;
    }
}
const browserProvider = {
    call: function (data) {
        console.log("browser provider not supported");
    },
    callSync: function (data) {
        // let str = JSON.stringify(data);

        // var resultObj
        // try {
        //     let resultjson = prompt(str);
        //     resultObj = resultjson;
        //     //直接用 = 接收 Prompt()的返回数据，JSON反解
        //     resultObj = resultjson ? JSON.parse(resultjson) : {};
        //
        // } catch (error) {
        //     console.warn('parse json failure '+resultObj);
        // }
        if (data.ns == 'nav' && data.action == 'push') {
            window.location.href = data.url;
        } else if (data.ns == 'nav' && data.action == 'to') {
            window.location.href = data.url;
        } else if (data.ns == 'nav' && data.action == 'back') {
            window.location.go(-1);
        } else if (data.ns == 'account' && data.action == 'isLogin') {
            return true;
        } else if (data.ns == 'account' && data.action == 'info') {
            return {
                token: window.sessionStorage.getItem("accessToken")
            };
        }
        return resultObj;
    }
}

var provider = {}

if (os === ANDROID) {
    provider = androidProvider
} else if (os === IOS) {
    provider = iosProvider
} else {
    provider = browserProvider
}


function wrapApi(api, wrapper) {
    inject(api, wrapper)
}

function inject(ns, api, handler) {
    if (arguments.length < 3) {
        handler = arguments[1]
        api = arguments[0]
        ns = ''
    }

    let names = api.split(/\./)
    let fnName = names.pop()

    if (names[0] === ns) names.shift()

    let root = ns ? (Hybrid[ns] || (Hybrid[ns] = {})) : Hybrid

    root = createNamespace(root, names)

    if (fnName && isFn(handler)) root[fnName] = handler
}

function createNamespace(root, names) {
    let i = 0
    let a

    while (a = names[i++]) {
        if (a in root && 'object' !== typeof root[a]) throw Error(`${a} 命名空间冲突`)
        if (!(a in root)) root[a] = {}
        root = root[a]
    }

    return root
}


/**
 * 生成GUID
 * @returns {string} 返回GUID
 */
function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function isFn(fn) {
    return fn ? typeof fn === 'function' : false
}

function callNative(ns, action, params) {
    let data = params ? params : {}
    // for (var i in params) {
    //     var callback = params[i]
    //     if (typeof (callback) === 'function') {
    //         let callbackId = guid();
    //         callbackMap[callbackId] = callback;
    //         data[i] = {}
    //         data[i].callbackId = callbackId;
    //         data[i].callbackFunction = 'window.callbackDispatcher';
    //     }
    // }
    const callback = params.callback
    if (typeof (callback) === 'function') {
        let callbackId = guid();
        callbackMap[callbackId] = callback;
        data.callbackId = callbackId;
        data.callbackFunction = 'window.callbackDispatcher';
        data.callback = undefined
    }
    data.ns = ns
    data.action = action
    provider.call(data)
}

function callNativeSync(ns, action, params) {
    let data = params ? params : {}
    // for (var i in params) {
    //     var callback = params[i]
    //     if (typeof (callback) === 'function') {
    //         let callbackId = guid();
    //         callbackMap[callbackId] = callback;
    //         data[i] = {}
    //         data[i].callbackId = callbackId;
    //         data[i].callbackFunction = 'window.callbackDispatcher';
    //     }
    // }
    data.ns = ns
    data.action = action
    return provider.callSync(data)
}


function callbackDispatcher(callbackId, resultjson) {
    var handler = callbackMap[callbackId];
    if (handler && typeof (handler) === 'function') {
        var resultObj = resultjson
        try {
            resultObj = resultjson ? JSON.parse(resultjson) : {}; //不能转化为json的直接作为返回值过去
        } catch (e) {

        }
        handler(resultObj);
    }
}

WIN.callbackDispatcher = callbackDispatcher

function onListenEvent(eventId, handler) {
    var handlerArr = eventCallMap[eventId];
    if (handlerArr === undefined) {
        handlerArr = [];
        eventCallMap[eventId] = handlerArr;
    }
    if (handler !== undefined) {
        handlerArr.push(handler);
    }
}

function eventDispatcher(eventId, resultjson) {
    var handlerArr = eventCallMap[eventId];
    for (var key in handlerArr) {
        if (handlerArr.hasOwnProperty(key)) {
            var handler = handlerArr[key];
            if (handler && typeof (handler) === 'function') {
                var resultObj = resultjson
                try {
                    resultObj = resultjson ? JSON.parse(resultjson) : {}; //不能转化为json的直接作为返回值过去
                } catch (e) {

                }
                var returnData = handler(resultObj);
                return returnData;
            }
        }
    }
}

WIN.eventDispatcher = eventDispatcher

function freeze(k, v, o = Hybrid) {
    if ('__defineGetter__' in o) o.__defineGetter__(k, () => {
        return isFn(v) ? v() : v
    })
    else o[k] = isFn(v) ? v() : v
}

freeze("wrapApi", () => wrapApi)
freeze("callNative", () => callNative)
freeze("callNativeSync", () => callNativeSync)
freeze("onListenEvent", () => onListenEvent)

module.exports = Hybrid



