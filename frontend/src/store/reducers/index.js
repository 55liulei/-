// 根Reducer
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import userReducer from "./user";
// import userLogin from '../reducers/user/login'
// import userRegist from '../reducers/user/regist'

import login from '../reducers/user/login'
import regist from '../reducers/user/regist'
import setting from '../reducers/user/setting'
import profile from "../reducers/profile";
import articlesReducer from "../reducers/articles"
import articleReducer from "../reducers/article"
import comment from '../reducers/comment'
import home from '../reducers/home'
const createRootReducer = (history)=>combineReducers({
    // userLogin,
    // userRegist,
    user:combineReducers({
        login,
        regist,
        setting,
    }),
    profile,
    articlesReducer,
    article:articleReducer,
    comment,
    home,
    router: connectRouter(history)
})

export default createRootReducer