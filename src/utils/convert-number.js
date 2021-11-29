export default (num) => {
    // 计算后几位中0的个数
    var len = Number(num).toString().length;
    if (len > 6) {
        num = Number(num / 1e6).toFixed(1) + '百万';
    } else if (len > 4) {
        num = Number(num / 1e3).toFixed(1) + '万';
    }
    return num;
};
