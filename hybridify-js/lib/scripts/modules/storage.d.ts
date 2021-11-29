declare function getProtectedField(): string[];
declare function getItem(key: string, callback: (resposne: string) => void): void;
declare function getItemSync(key: string): Promise<unknown>;
declare function setItem(obj: object, callback: (resposne: string) => void): void;
declare function delItem(key: string, callback: (resposne: string) => void): void;
declare const _default: {
    getItem: typeof getItem;
    getItemSync: typeof getItemSync;
    setItem: typeof setItem;
    delItem: typeof delItem;
    getProtectedField: typeof getProtectedField;
};
export default _default;
