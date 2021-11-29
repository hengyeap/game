declare function firstLogin(obj: object, callback: (resposne: string) => void): void;
declare function logout(): void;
declare function userStatusOnChange(callback: (resposne: string) => void): void;
declare const _default: {
    firstLogin: typeof firstLogin;
    logout: typeof logout;
    userStatusOnChange: typeof userStatusOnChange;
};
export default _default;
