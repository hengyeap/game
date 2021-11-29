declare const _default: {
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
    shareText: (ob: object) => void;
    goToTingCoinPage: (ob: object) => void;
};
export default _default;
