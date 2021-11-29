import { Operation } from './definitions/Operation';
declare function callAsync(op: Operation, callback: (response: string) => void): void;
declare function registerListener(name: String, callback: (response: string) => void): void;
declare function providerGetName(): string;
declare function callSync(op: Operation): Promise<unknown>;
export { callAsync, callSync, providerGetName, registerListener };
