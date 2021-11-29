import utilString from './utilString';
import urlUtil from 'url';

export default {
    mount: function mount(redirectUrl, userId) {
        if (redirectUrl.indexOf('?') == -1) {
            redirectUrl = redirectUrl + '?a=1';
        }
        if (utilString.isNotBlank(userId)) {
            redirectUrl = redirectUrl =
                redirectUrl +
                '&uid=' +
                userId +
                '&appid=' +
                userId +
                '&userId=' +
                userId;
        }
        if (redirectUrl.indexOf("https://") == 0) {
            // todo hard-coding
            let str = urlUtil.parse(redirectUrl).path.replace("/h5", "");
            return process.env.HTML_PREFIX + str.replace("/app-h5", "");
        } else if (redirectUrl.indexOf("/pages") == -1 && redirectUrl.indexOf("/main") == -1) {
            return process.env.HTML_PREFIX + urlUtil.parse(redirectUrl).path;
        } else {
            return redirectUrl;
        }

    },
    pureMount: function mount(redirectUrl, userId) {
        if (redirectUrl.indexOf('?') == -1) {
            redirectUrl = redirectUrl + '?a=1';
        }
        if (utilString.isNotBlank(userId)) {
            redirectUrl = redirectUrl =
                redirectUrl +
                '&uid=' +
                userId +
                '&appid=' +
                userId +
                '&userId=' +
                userId;
        }
        return redirectUrl;

    }
}