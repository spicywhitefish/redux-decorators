import { IAction } from "redux";
export declare class Redux {
    private _storePromise;
    constructor();
    dispatch(action: string, ...data: any[]): Promise<IAction>;
    subscribe(subscriber: (state) => void): Promise<() => void>;
}
export declare abstract class Subscriber {
    private _redux;
    constructor(_redux: Redux);
    abstract onStateChange(state: any): any;
}
