function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

export default {
    getLang: function (defaultValue) {
        let lang = getUrlParam('countryCode')
        let language = getUrlParam('language')
        // let lang = navigator.language || navigator.userLanguage
        let result = defaultValue
        if (lang == 'TW') {
            result = 'zh-TW'
        } else if (lang == 'MS') {
            if (language == 'zh-Hans') {
                result = 'zh-CN'
            } else if (language == 'zh-Hant') {
                result = 'zh-TW'
            } else {
                result = 'en'
            }
        } else {
            result = 'zh-CN'
        }

        console.log(result)

        return result
    }
}
