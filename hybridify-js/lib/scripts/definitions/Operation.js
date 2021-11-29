var Operation = /** @class */ (function () {
    function Operation(method, params) {
        this.method = method;
        if (params) {
            this.params = params;
        }
    }
    return Operation;
}());
export { Operation };
