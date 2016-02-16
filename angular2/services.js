var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var store_1 = require("../store");
let Redux = class {
    constructor() {
        this._storePromise = store_1.getStore();
    }
    dispatch(action, ...data) {
        return this._storePromise.then(store => store.dispatch({ type: action, data: data }));
    }
    subscribe(subscriber) {
        return this._storePromise.then(store => store.subscribe(subscriber));
    }
};
Redux = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], Redux);
exports.Redux = Redux;
class Subscriber {
    constructor(_redux) {
        this._redux = _redux;
        this._redux.subscribe(this.onStateChange.bind(this));
    }
}
exports.Subscriber = Subscriber;
