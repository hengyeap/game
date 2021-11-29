import { Provider } from '../Provider';
import { Operation } from '../../Operation';
declare class IOSProvider extends Provider {
    constructor();
    init(callback: (callback: any) => void): any;
    callAsync(op: Operation, callback: (resposne: string) => void | undefined): void;
    registerListener(name: String, callback: (resposne: string) => void): void;
}
export { IOSProvider };
