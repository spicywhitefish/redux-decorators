import {Injectable} from 'angular2/core';
import {getStore} from "../store";
import {IAction, IDispatch, IStore} from "redux";

@Injectable()
export class Redux {
    private _storePromise:Promise<IStore<any>>;

    constructor() {
        this._storePromise = getStore();
    }

    dispatch(action:string, ...data):Promise<IAction> {
        return this._storePromise.then(store => store.dispatch(<IAction>{type: action, data: data}));
    }

    subscribe(subscriber: (state) => void) {
        return this._storePromise.then(store => store.subscribe(subscriber));
    }
}

export abstract class Subscriber {
    constructor(private _redux:Redux) {
        this._redux.subscribe(this.onStateChange.bind(this));
    }
    abstract onStateChange(state);
}
