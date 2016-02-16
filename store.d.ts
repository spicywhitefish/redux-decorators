import { IStore } from 'redux';
export declare function getStore(): Promise<IStore<any>>;
export declare function Store(...stateProperties: any[]): (target: any) => any;
