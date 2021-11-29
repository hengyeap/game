import { Provider } from './providers/Provider';
import { ProviderType } from './ProviderType';
declare class ProviderFactory {
    static create(type: ProviderType): Provider;
}
export { ProviderFactory };
