export declare function getReducer(): any;
export interface IReducer {
    reducer(state: any, action: any): any;
}
export declare class DefaultReducer implements IReducer {
    reducer(state: {}, action: any): any;
}
export declare function addActionReducer(type: any, fn: any): void;
export declare function getActionReducers(): any[];
export declare function Reducer(...methods: any[]): (target: any, method: any) => void;
