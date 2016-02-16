let initialState = {};

export function setInitialState(state) {
    initialState = state;
}

export function getInitialState() {
    return initialState;
}

export function InitialState(initialState: any) {
    setInitialState(initialState);
    return function(target: any) {}
}
