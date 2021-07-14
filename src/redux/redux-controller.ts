import {ReduxReducer} from './redux-reducer';
import {ReduxEvent} from './redux-event';

class Reduxp {
    protected reducer: ReduxReducer;
    protected event!: ReduxEvent;
    constructor() {
        this.reducer = new ReduxReducer();
    }

    reducerInit() {
        this.reducer.reducerInit();
        this.event = new ReduxEvent(this.reducer.store);
        this.event.startListen();
    }
}

export default new Reduxp();
