import { Action } from 'redux';
import { connect } from 'react-redux';
import { HomepageUI } from './homepageUI';
import reduxController from '../../redux/redux-controller';
import { ReduxEvent } from '../../redux/redux-event';

const data: any = {
    inputValue: '',
    todoList: [
        {
            status: 'wait',
            text: '1111',
        },
        {
            status: 'completed',
            text: '2222',
        },
        {
            status: 'invalid',
            text: '3333',
        }
    ]
}
/**
 * input reducer
 * @param state state
 * @param action 操作state的数据
 */
const inputReducer = (state: any, action: Action) => {
    const act: any = action;
    switch(act.data.type) {
        case 'SET':
            return act.data.value;
        case 'GET':
            return state;
        default:
            return null;
    }
}

const HeaderRedux = connect(
    (state: any, ownProps: any) => {
        return {
            header: state,
        }
    },
    (dispatch: Function, ownProps: any) => {
        return {
            onChange: (value: string) => {
                dispatch({
                    type: 'inputValue',
                    data: {
                        type: 'SET',
                        value,
                    }
                })
            }
        }
    }
)
