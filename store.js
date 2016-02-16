var redux_1 = require('redux');
var reducer_1 = require('./reducer');
let appStore;
function getStore() {
    if (!appStore) {
        appStore = new Promise((resolve) => {
            var interval = setInterval(() => {
                if (reducer_1.getReducer()) {
                    clearInterval(interval);
                    resolve(redux_1.createStore(reducer_1.getReducer()));
                }
            });
        });
    }
    return appStore;
}
exports.getStore = getStore;
function updateStateProperties(target, state) {
    target.stateProperties.forEach(prop => {
        target[prop] = state[prop];
    });
}
function Store(...stateProperties) {
    return function (target) {
        // Add stateProperties to the target
        if (target.prototype.stateProperties === undefined) {
            target.prototype.stateProperties = [];
        }
        target.prototype.stateProperties = target.prototype.stateProperties.concat(stateProperties);
        // Add a generic store update handler
        target.prototype.storeUpdateHandler = function () {
            updateStateProperties(this, this.appStore.getState());
        };
        // Add a generic storeInit method
        target.prototype.storeInit = () => {
            return this.getStore().then(() => {
                this.unsubscribe = this.appStore.subscribe(this.storeUpdateHandler.bind(this));
                // Apply the default state to all listeners
                this.storeUpdateHandler();
            });
        };
        // Add a generic storeDestroy method
        target.prototype.storeDestroy = function () {
            this.unsubscribe();
        };
        // Add a get store method
        target.prototype.getStore = () => {
            if (this.appStore) {
                return this.appStore.then ? this.appStore : Promise.resolve(this.appStore);
            }
            return getStore().then(store => this.appStore = store);
        };
        // Add a set store method for testing purposes
        target.prototype.setStore = (store) => {
            this.appStore = store;
        };
        return target;
    };
}
exports.Store = Store;
