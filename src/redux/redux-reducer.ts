import { createStore, ReducersMapObject, Action, combineReducers, applyMiddleware, Middleware, Store } from 'redux';

/**
 * TODO 
 * 1.reducer 添加 
 * 2.middleware 声明
 *  */
export class ReduxReducer {
    reducerMap: any = {};
    defaultState: any = {};
    store!: Store;
    middlewareList: Middleware[] =  [];

    addReducer(name: any, reducer: any, defaultState: any) {
        this.reducerMap[name] = (state: any, action: Action) => {
            if (action.type === name) {
                reducer(state, action);
            }
        };
        this.defaultState[name] = defaultState;
    }

    addMiddleware(middleware: Middleware) {
        this.middlewareList.push(middleware)
    }

    reducerInit() {
        const reducer = combineReducers(this.reducerMap);
        this.store = createStore(reducer, this.defaultState, applyMiddleware(...this.middlewareList));
    }
}
