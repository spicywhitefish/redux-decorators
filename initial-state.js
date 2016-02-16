let initialState = {};
function setInitialState(state) {
    initialState = state;
}
exports.setInitialState = setInitialState;
function getInitialState() {
    return initialState;
}
exports.getInitialState = getInitialState;
function InitialState(initialState) {
    setInitialState(initialState);
    return function (target) { };
}
exports.InitialState = InitialState;
