export default (currency) => {
    switch (currency) {
        case 'CNY': return '￥';
        case 'TWD': return 'NT$';
    }
    return '￥';
};
