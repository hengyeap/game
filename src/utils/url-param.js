export default function(name) {
    // 构造一个含有目标参数的正则表达式对象
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    // 返回参数值
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
};
