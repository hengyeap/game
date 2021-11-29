import { Operation } from '../Operation';
declare abstract class Provider {
    name: string;
    constructor();
    abstract init(callback: (callback: any) => void): void;
    abstract callAsync(op: Operation, callback: (resposne: string) => void | undefined): void;
    abstract registerListener(name: String, callback: (resposne: string) => void): void;
    getName(): string;
}
export { Provider };
