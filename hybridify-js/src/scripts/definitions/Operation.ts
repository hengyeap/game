class Operation {
	method: string;
	params: any;

	constructor(method: string, params?: any) {
		this.method = method;
		if (params) {
			this.params = params;
		}
	}
}
export { Operation };
