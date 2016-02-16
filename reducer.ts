import {getInitialState} from './initial-state';
let rootReducer;
let actionReducers = [];

//------------------------------------------------------------------------------
// Root reducer
//------------------------------------------------------------------------------
export function getReducer() {
    return rootReducer || DefaultReducer.prototype.reducer;
}

export interface IReducer {
    reducer(state, action);
}

export class DefaultReducer implements IReducer {
    reducer(state = getInitialState(), action) {
        let filteredActionReducers = actionReducers.filter((r) => r.type === action.type);
        if (filteredActionReducers.length) {
            return filteredActionReducers.reduce((s, r) => Object.assign(s, r.method(s, ...action.data)), state);
        }
        return state;
    }
}

//------------------------------------------------------------------------------
// Action reducers
//------------------------------------------------------------------------------

export function addActionReducer(type, fn) {
    actionReducers.push({
        type: type,
        method: fn
    });
}

export function getActionReducers() {
    return actionReducers;
}

//------------------------------------------------------------------------------
// Reducer decorator
//------------------------------------------------------------------------------

export function Reducer(...methods) {
    return function (target, method) {
        if (!target.prototype) {
            handleActionReducer(target, method);
            return;
        }
        handleRootReducer(target, methods);
    }
}

let handleActionReducer = function (target, method) {
    addActionReducer(method, target[method]);
};

let handleRootReducer = function (target, methods) {
    if (target.prototype.reducer) {
        rootReducer = target.prototype.reducer;
    }
    methods.forEach(m => addActionReducer(m, target.prototype[m]));
};
