var initial_state_1 = require('./initial-state');
let rootReducer;
let actionReducers = [];
//------------------------------------------------------------------------------
// Root reducer
//------------------------------------------------------------------------------
function getReducer() {
    return rootReducer || DefaultReducer.prototype.reducer;
}
exports.getReducer = getReducer;
class DefaultReducer {
    reducer(state = initial_state_1.getInitialState(), action) {
        let filteredActionReducers = actionReducers.filter((r) => r.type === action.type);
        if (filteredActionReducers.length) {
            return filteredActionReducers.reduce((s, r) => Object.assign(s, r.method(s, ...action.data)), state);
        }
        return state;
    }
}
exports.DefaultReducer = DefaultReducer;
//------------------------------------------------------------------------------
// Action reducers
//------------------------------------------------------------------------------
function addActionReducer(type, fn) {
    actionReducers.push({
        type: type,
        method: fn
    });
}
exports.addActionReducer = addActionReducer;
function getActionReducers() {
    return actionReducers;
}
exports.getActionReducers = getActionReducers;
//------------------------------------------------------------------------------
// Reducer decorator
//------------------------------------------------------------------------------
function Reducer(...methods) {
    return function (target, method) {
        if (!target.prototype) {
            handleActionReducer(target, method);
            return;
        }
        handleRootReducer(target, methods);
    };
}
exports.Reducer = Reducer;
let handleActionReducer = function (target, method) {
    addActionReducer(method, target[method]);
};
let handleRootReducer = function (target, methods) {
    if (target.prototype.reducer) {
        rootReducer = target.prototype.reducer;
    }
    methods.forEach(m => addActionReducer(m, target.prototype[m]));
};
