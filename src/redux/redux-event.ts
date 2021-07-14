import { Action, Store } from 'redux';
type listenListType = {
    [key: string]: Function[];
}

export class ReduxEvent {
    store: Store;
    listenList: listenListType = {};

    constructor(store: Store) {
        this.store = store;
    }

    addDataDispatch(action: Action) {
        this.store.dispatch(action);
    }
    addFuncDispatch(func: Function) {
        const dispatch: any = this.store.dispatch;
        dispatch(func);
    }
    addPromiseDispatch(promise: Promise<Action>) {
        const dispatch: any = this.store.dispatch;
        dispatch(promise);
    }
    addListen(type: string, listen: Function) {
        if (!this.listenList[type]) {
            this.listenList[type] = [];
        }
        this.listenList[type].push(listen);
    }
    startListen() {
        this.store.subscribe(() => {
            const state = this.store.getState();
            if (this.listenList[state]) {
                const item = this.listenList[state];
                item.forEach(func => {
                    func(state)
                });
            }
        })
    }
}