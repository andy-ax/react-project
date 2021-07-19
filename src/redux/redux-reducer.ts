import {
    createStore,
    ReducersMapObject,
    Action,
    combineReducers,
    applyMiddleware,
    Middleware,
    Store,
} from "redux";

export class ReduxReducer {
    reducerMap: ReducersMapObject = {};
    defaultState: any = {};
    store!: Store;
    middlewareList: Middleware[] = [];

    // 新增reducer
    addReducer(name: any, reducer: any, defaultState: any) {
        this.reducerMap[name] = (state: any, action: Action) => {
            if (action.type === name) {
                reducer(state, action);
            }
        };
        this.defaultState[name] = defaultState;
    }

    // 从已有reducer生成新的reducer
    /**
     * reducer复用
     * @param reducerFunction 需要复用的reducer
     * @param reducerName reducer命名空间
     * @param key reducer命名空间在action中的key值
     * @param reducerFilter reducer筛选,符合条件才会执行reducer
     * @returns 
     */
    createNamedWrapperReducer(reducerFunction: Function, reducerName: string, key: string = 'name', reducerFilter?: Function) {
        return (state: any, action: Action): void => {
            const name = (action as any)[key];
            const isInitializationCall = state === undefined;
            if (name !== reducerName && !isInitializationCall) {
                return state;
            } else if (reducerFilter && !reducerFilter(state, action)) {
                return state;
            }

            return reducerFunction(state, action);
        };
    }

    // 获取保存的reducer函数
    getReducerFuc(name: string) {
        return this.reducerMap[name];
    }

    // 添加中间件
    addMiddleware(middleware: Middleware) {
        this.middlewareList.push(middleware);
    }

    reducerInit() {
        const reducer = combineReducers(this.reducerMap);
        this.store = createStore(
            reducer,
            this.defaultState,
            applyMiddleware(...this.middlewareList)
        );
    }
}
