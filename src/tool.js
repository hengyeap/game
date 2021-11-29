import hy from 'hybridify-js'
import {isBlank} from 'underscore.string'
import {Toast, Dialog} from 'vant'

const axios = require('axios')
import hybrid from 'hybridify-js'
import urlParamGetter from '@/url-param';

function makeString(object) {
    if (object == null) return '';
    return '' + object;
};

function getUrlParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

function addURLParam(url, name, value) {
    url += (url.indexOf('?') == -1 ? '?' : '&')
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    return url
}

function getHeader(userTokenFlag) {
    const header = {}
    if (userTokenFlag) {
        let token = getUrlParam("accessJwt")
        let uid = getUrlParam("uid")
        if (!isBlank(token)) {
            header.accessjwt = token
        } else if (!isBlank(uid)) {
            header.uid = uid
        } else {
            Dialog.alert({
                message: '登录状态已失效，请重新登录！'
            }).then(() => {
                hybrid.nav.toMe();
            });
            return;
        }
    }
    return header;
}

export default {
    install(Vue) {
        Vue.prototype.hy = hy
        var skuImgPreFix = 'https://resource.yuedaoec.com/'
        Vue.prototype.getImgUrl = function (url) {
            if (url == null) {
                return ''
            }
            return skuImgPreFix + url
        }
        Vue.prototype.toast = function (str) {
            Toast(str)
        }
        Vue.prototype.loadImg = function (url, callback) {
            //创建一个Image对象，
            var img = new Image();
            img.crossOrigin = "anonymous";

            img.src = url;
            if (img.complete) {
                callback(img);
                return;
            }
            img.onload = function () {
                callback(img);
            };
        }
        Vue.prototype.getRedirectUrl = function (pageName, query) {
            let href = window.location.href;
            let origin = window.location.origin
            let pathName = window.location.pathname;
            const pathNameArr = pathName.split("/");
            let pageNameArr = pageName.split("/")
            let url;
            let pathCount = 0;
            if (pageName.indexOf("..") != -1) {
                for (let index in pageNameArr) {
                    if (pageNameArr[index] == "..") {
                        pathCount = pathCount + 1;
                    }
                }
            }
            if (pathNameArr.length - 2 < pathCount) {
                console.log("error!")
                throw new Error()
                return null
            }
            for (let i = pathNameArr.length - 2; i > 0; i--) {
                if (pathCount > 0) {
                    pathNameArr[i] = ""
                    pathCount = pathCount - 1
                }
                if (pathCount == 0) {
                    break;
                }
            }
            let newPathNameArr = []
            for (let index in pathNameArr) {
                if (index == 0 || index == pathNameArr.length - 1) {
                    newPathNameArr.push(pathNameArr[index])
                } else {
                    if (pathNameArr[index] != "") {
                        newPathNameArr.push(pathNameArr[index])
                    }
                }
            }
            let newPathName = newPathNameArr.join("/")
            href = origin + newPathName
            if (pageName.indexOf(".html") != -1) {
                url = href.replace(newPathNameArr[newPathNameArr.length - 1], pageNameArr[pageNameArr.length - 1])
            } else {
                url = href.replace(newPathNameArr[newPathNameArr.length - 1], pageNameArr[pageNameArr.length - 1] + ".html")
            }
            if (query) {
                for (let key in query) {
                    url = addURLParam(url, key, query[key])
                }
            }

            console.log(url)

            return url;
        }
        //拼接url 参数
        Vue.prototype.addURLParam = function (url, name, value) {
            return addURLParam(url, name, value)
        }
        Vue.prototype.getRootPath_web = function (url) {
            const curWwwPath = window.document.location.href// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
            const pathName = window.document.location.pathname
            const pos = curWwwPath.indexOf(pathName)// 获取主机地址，如： http://localhost:8083
            const localhostPaht = curWwwPath.substring(0, pos)// 获取带"/"的项目名，如：/uimcardprj
            const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
            return (localhostPaht + projectName + '/' + url)
        }

        Vue.prototype.reqwest = function (params) {
            let url = params.url
            const type = params.type
            let data = params.data == null ? {} : params.data
            let preHeader = getHeader(params.userToken);
            let header = Object.assign(preHeader, params.header == null ? {} : params.header)

            if (type == 'get') {
                if (data) {
                    for (let key in data) {
                        url = this.addURLParam(url, key, data[key])
                    }
                }
            }
            url = this.addURLParam(url, 'autoTime', new Date().getTime())

            if (params.query) {
                for (let key in params.query) {
                    url = this.addURLParam(url, key, params.query[key])
                }
            }
            console.log(process.env.VUE_APP_REQUEST_URL)
            return new Promise((resolve, reject) => {
                axios({
                    method: type,
                    url: process.env.VUE_APP_REQUEST_URL + url,
                    data: data,
                    headers: header
                }).then(function (response) {
                    const data = response.data
                    if (data.code === "10000") {
                        resolve({success: true, result: data})
                    } else {
                        resolve({success: false, result: data})
                    }
                }).catch(function (error) {
                    reject({error: error})
                });
            })
        }

        /**
         * 获取url中拼接的参数
         * @param name  参数名
         * @returns {null}
         */
        Vue.prototype.getUrlParam = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            var r = window.location.search.substr(1).match(reg)
            if (r != null) return unescape(r[2])
            return null
        }

        /**
         * 判断参数是否为空
         * @param str
         * @returns {boolean} 为空的时候返回true
         */

        Vue.prototype.checkNull = function (str) {
            if (str === '' || str === ' ' || str === 'null' || str === null || str === 'undefined' || str === undefined) {
                return true
            }
            return false
        }


        /**
         * 获取当前域名信息
         */

        Vue.prototype.getHttpUrl = function () {
            let url = process.env.VUE_APP_ORIGIN;
            return url
        }

        /**
         *  链接跳转
         */
        Vue.prototype.httpUrlJump = function (item) {
            if (item.check_login) {
                if (this.checkNull(this.uid)) {
                    this.hy.nav.toLogin();
                } else {
                    if (!isBlank(item.jump_path)) {
                        if ('#' == item.jump_path) {
                            Toast(this.$t('message.comingSoon'));
                        } else {
                            this.hy.nav.push(item.jump_path);
                        }
                    }
                }
            } else {
                if (!isBlank(item.jump_path)) {
                    if ('#' == item.jump_path) {
                        Toast(this.$t('message.comingSoon'));
                    } else {
                        this.hy.nav.push(item.jump_path);
                    }
                }
            }
        }


        Vue.prototype.currency = function (currency) {
            switch (currency) {
                case 'CNY':
                    return '￥';
                case 'TWD':
                    return 'NT$';
                case 'MYR':
                    return 'RM'
                case 'SGD':
                    return "S$";
            }
            return '￥';
        }

        Vue.prototype.isBlank = function (str) {
            return (/^\s*$/).test(makeString(str));
        };
        /**
         * @param params url :请求地址，type:请求类型，data:请求参数
         * @param callback 请求成功后的 回掉函数
         */
        Vue.prototype.createAjax = function (params, callback) {
            let url = params.url
            const type = params.type
            const data = params.data
            let headers = params.headers
            if (!headers) {
                headers = {}
            }
            if (type == 'get') {
                if (data) {
                    for (let key in data) {
                        if (data[key].constructor === Array) {
                            for (let i = 0; i < data[key].length; i++) {
                                url = this.addURLParam(url, key, data[key][i])
                            }
                        } else {
                            url = this.addURLParam(url, key, data[key])
                        }
                    }
                }
            }
            axios({
                method: type,
                url: url,
                headers: headers,
                data: data,
            }).then(function (response) {
                callback(response.data)
            }).catch(function (error) {
                try {
                    hybrid.storage.getItem('uid', function (response) {
                        try {
                            let uid = undefined;
                            if (response) {
                                const rtnObj = JSON.parse(response);
                                uid = rtnObj.uid;
                            }
                            axios.post("https://da.tingmimi.net/user-track/receive/", {
                                operateType: "9999.0001.0000.0000.0000",
                                clickedName: JSON.stringify(error),
                                userId: uid
                            });
                        } catch (e) {
                            // nothing to du
                        }

                    });
                } catch (e) {
                    // nothing to du
                }
                callback({code: '9999', msg: error.message})
            });
        }
        Vue.prototype.reqwest = function (params) {
            let url = params.url
            const type = params.type
            let data = params.data == null ? {} : params.data
            let preHeader = getHeader(params.userToken);
            let header = Object.assign(preHeader, params.header == null ? {} : params.header)

            if (type == 'get') {
                if (data) {
                    for (let key in data) {
                        url = this.addURLParam(url, key, data[key])
                    }
                }
            }
            url = this.addURLParam(url, 'autoTime', new Date().getTime())

            if (params.query) {
                for (let key in params.query) {
                    url = this.addURLParam(url, key, params.query[key])
                }
            }
            let requestUrl = url;
            if (!requestUrl.startsWith('http')) {
                requestUrl = process.env.VUE_APP_REQUEST_PRODUCT_URL + url
            }
            return new Promise((resolve, reject) => {
                axios({
                    method: type,
                    url: requestUrl,
                    data: data,
                    headers: header
                }).then(function (response) {
                    const data = response.data
                    if (data.code === "10000") {
                        resolve({success: true, result: data})
                    } else {
                        if (data.text) {
                            data.msg = JSON.parse(data.text).msg;
                        }
                        resolve({success: false, result: data})
                    }
                }).catch(function (error) {
                    reject({error: error})
                });
            })
        }

        Vue.prototype.getLang = function () {
            let language = this.getSession('language')

            if (this.checkNull(language)) {
                language = getUrlParam('language')
            }
            if (language == 'en') {
                return 'us'
            } else if (language == 'zh-Hant' || language == 'tw') {
                return 'tw'
            } else if (language == 'zh-Hans' || language == 'cn') {
                return 'cn'
            }
            return 'cn'
        }
        //拼接url 参数
        Vue.prototype.addURLParam = function (url, name, value) {
            url += (url.indexOf('?') == -1 ? '?' : '&')
            url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
            return url
        }
        //拼接url 参数
        Vue.prototype.getImgUrl = function (url) {
            return 'https://resource.yuedaoec.com/' + url
        }
        /**
         * 判断参数是否为空
         * @param str
         * @returns {boolean} 为空的时候返回true
         */
        Vue.prototype.checkNull = function (str) {
            if (str === '' || str === 'null' || str === null || str === 'undefined' || str === undefined) {
                return true
            }
            return false
        }
        /**
         * 页面跳转
         * @param url 需要跳转的页面  比如 index.html
         */
        Vue.prototype.redirectPage = function (url) {
            if (url.indexOf('?') == -1) {
                url = url + '?time=' + new Date().getMinutes()
            } else {
                url = url + '&time=' + new Date().getMinutes()
            }
            location.href = url
        }
        /**
         * 设置session
         * @param key value
         */
        Vue.prototype.setSession = function (key, value) {
            sessionStorage.setItem(key, value)
        }
        /**
         * 获取session
         * @param key
         */
        Vue.prototype.getSession = function (key) {
            return sessionStorage.getItem(key)
        }
        /**
         * 获取需要显示的金额符号
         * @returns {string}
         */
        Vue.prototype.getCurrency = function (type) {
            var json = {
                CNY: '¥',
                TWD: 'NT$',
                MYR: 'RM',
                GOLD: '金币'
            }
            return json[type] ? json[type] : '¥'
        }
        Vue.prototype.goToMall = function (platform) {
            let destination = 'https://appstore.yuedaoec.com/h5/store_index.html?platform={}'
            if (isBlank(platform)) {
                platform = 'tingmimi'
            }
            destination = destination.replace('{}', platform)
            hybrid.nav.push(destination)
        }


        /**
         * 时间格式化
         * @param fmt 需要的格式  比如 yyyy-MM-dd HH:mm:ss
         * @returns {*}
         * @constructor
         */
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                'M+': this.getMonth() + 1, //月份
                'd+': this.getDate(), //日
                'h+': this.getHours(), //小时
                'm+': this.getMinutes(), //分
                's+': this.getSeconds(), //秒
                'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                'S': this.getMilliseconds() //毫秒
            }
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            return fmt
        }

        //从服务端获取当天日期字符串
        Vue.prototype.getTodayStrFromServer = function () {
        let self = this
        let params = {}
        params.type = 'get'
        params.url = process.env.VUE_APP_REQUEST_PRODUCT_URL + 'getToday.shop'
        params.async = false
        axios(params).then(res=>{
            console.log(res.data.res);
            return res.data.res
        })
      }

      //根据uid获取code
      Vue.prototype.getCodeByUid = function (uid) {
        axios.get(process.env.VUE_APP_REQUEST_PRODUCT_URL + 'user/getCodeByUid.user?uid=' + uid).then( res=> {
            console.log();
            if (res.data.code == "10000") {
                console.log(res.data.res.code);
                return res.data.res.code
            }  
        })
      }

    //复制文字
      Vue.prototype.copyValue = function (val) {
        try {
          let self = this
          let clipboard = new Clipboard('.copy-btn', {
            text: function () {
              return val
            }
          })
  
          clipboard.on('success', function (e) {
            window.mui.toast(self.$t('toast.copied'))
            clipboard.destroy()
          })
  
          clipboard.on('error', function (e) {
            window.mui.toast(self.$t('toast.tryAgain'))
            clipboard.destroy()
          })
        } catch (e) {
          console.log(e)
        }
      }
        //webview 方法
        Vue.prototype.setupWebViewJavascriptBridge = function (callback) {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if (isAndroid) {
                if (window.WebViewJavascriptBridge) {
                    callback(WebViewJavascriptBridge);
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function () {
                            callback(WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            }
            if (isIOS) {
                console.log(window)
                if (window.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);
                }
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback);
                }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://__bridge_loaded__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0)
            }

        };
      /**
     * 判断数组中是否存在某一项
     * @param arr
     * @param value
     * @returns {boolean}
     */
    Vue.prototype.isInArray = function (arr, value) {
        if (!arr) {
          return false
        }
        for (var i = 0; i < arr.length; i++) {
          if (value == arr[i]) {
            return true
          }
        }
        return false
      }


        /**
         * 获取url中拼接的含汉字的参数
         * @param name 参数名
         * @returns {*}
         */
        Vue.prototype.getUrlParam_china = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            var r = window.location.search.substr(1).match(reg)
            if (r != null) return decodeURI(r[2])
            return null
        }



      /**
     * 判断某个值在数组中的位置
     * @param arr
     * @param value
     * @returns {boolean}
     */
    Vue.prototype.indexOfArr = function (arr, value) {
        if (!arr) {
          return false
        }
        for (var i = 0; i < arr.length; i++) {
          if (value == arr[i]) {
            return i
          }
        }
      }
    }
}
