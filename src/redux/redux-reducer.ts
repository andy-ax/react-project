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
    // reducer集合
    reducerMap: ReducersMapObject = {};
    // state默认状态
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

    /**
     * 实现撤销与重做功能
     * @param reducerFunction reducer函数
     * @returns 
     */
    undoable(reducerFunction: Function) {
        //用一个空的action来调用reducer来产生初始的state;
        const initialState = {
            past: [],
            present: reducerFunction(undefined, {}),
            future: []
        };
    
        //返回一个可以执行撤销和重做的新的reducer
    
        return function (state = initialState, action: Action) {
            const {past, present, future} = state;
    
            switch (action.type) {
                case "UNDO":
                    const previous = past[past.length - 1];
                    const newPast = past.slice(0, past.length - 1);
                    return {
                        past: newPast,
                        present: previous,
                        future: [present, ...future]
                    };
                case"REDO":
                    const next = future[0];
                    const newFuture = future.slice(1);
                    return {
                        past: [...past, present],
                        present: next,
                        future: newFuture
                    };
                default:
                    //将其他action委托给原始的reducer处理
                    const newPresent = reducerFunction(present, action);
                    if (present === newPresent) {
                        return state;
                    }
                    return {
                        past: [...past, present],
                        present: newPresent,
                        future: []
                    };
            }
        }
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
