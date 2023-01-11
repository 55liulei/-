import * as constant from '../../../constant'
import { getData, saveData,deleteData } from '../../../utils/localstorage'

const initUser = () => {
    //从本地获取用户信息
    const currentUser = getData('currentUser')
    if (currentUser) {
        return currentUser
    }
    return null
}

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null,
    token: null,
    currentUser: initUser(),
}

//login - action(function) - thunk - action(object) - store - reducer(user) - state(new)-login

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_LOGIN_UNLOAD:
            return { ...initState, currentUser: initUser()}
        case constant.USER_LOGIN_FIELD:
            const key = action.key
            const value = action.value
            return { ...state, [key]: value }
        case constant.USER_LOGIN_RESULT: // 登录结果 
            const { status, message, data } = action.result
            if (status === 1) {
                let currentUser = null
                let token = null
                currentUser = data
                token = data.token
                //用户信息存储 : 登录状态  持久化
                saveData("currentUser", currentUser)
                saveData("token", token)

                //token存储 ： 接口验证
                //返回新的state
                return { ...state, currentUser, redirect: '/' }
            } else {
                return { ...state, errors: { message } }
            }
        case constant.USER_SETTING_LOGOUT:
            // 清除 ： 登录状态的标记 currentUser
            //内存清除 ： =》reducer 清除
            state.currentUser=null
            //本地清除 =》localstorage 清除
            deleteData('currentUser')
            deleteData('token')
            return { ...state}
        default:
            return state
    }
}

export default userReducer