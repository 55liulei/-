//引包
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './reducers'

// 创建history
export const history = createBrowserHistory()

//集成redux
export const store = createStore(
    createRootReducer(history),
    applyMiddleware(routerMiddleware(history), thunk)
)
