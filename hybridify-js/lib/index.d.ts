declare const _default: {
    nav: {
        push: (url: string) => void;
        toHome: () => void;
        toChat: () => void;
        toMe: () => void;
        toCoin: () => void;
        toSearch: (platform: string) => void;
        toNotice: () => void;
        toPoster: () => void;
        toAlbum: () => void;
        toMall: () => void;
        toCommunity: () => void;
        toRankList: () => void;
        back: () => void;
        loadFail: () => void;
        toInvoice: (params: object) => void;
        toLogin: () => void;
        toCalendar: () => void;
        toTaoBuTingLive: () => void;
        goToTingCoinPage: () => void;
    };
    app: {
        share: (ob: object) => void;
        download: (url: string) => void;
        downloadMulti: (urls: string[]) => void;
        downloadVideo: (url: string) => void;
        takeVedio: () => void;
        getHost: (callback: (resposne: string) => void, ob: object) => void;
        toShare: (ob: object) => void;
        multiDownloadOnProgress: (callback: (resposne: string) => void) => void;
        multiDownloadFinished: (callback: (resposne: string) => void) => void;
        whereamiSync: () => string;
        toTaoBuTingLive: (ob: object) => void;
    };
    pay: {
        cmbpay: (sign: string) => void;
        alipay: (sign: string) => void;
        unifyPay: (sign: string) => void;
    };
    storage: {
        getItem: (key: string, callback: (resposne: string) => void) => void;
        getItemSync: (key: string) => Promise<unknown>;
        setItem: (obj: object, callback: (resposne: string) => void) => void;
        delItem: (key: string, callback: (resposne: string) => void) => void;
        getProtectedField: () => string[];
    };
    user: {
        firstLogin: (obj: object, callback: (resposne: string) => void) => void;
        logout: () => void;
        userStatusOnChange: (callback: (resposne: string) => void) => void;
    };
};
export default _default;
