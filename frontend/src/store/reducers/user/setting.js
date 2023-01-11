import * as constant from '../../../constant'
import { deleteData, getData, saveData } from '../../../utils/localstorage'

const initUser = () => {
    //从本地获取用户信息
    const currentUser = getData('currentUser')
    if (currentUser) {
        return currentUser
    }
    return null
}
const initToken = () => {
    //从本地获取用户信息
    const token = getData('token')
    if (token) {
        return token
    }
    return null
}

const initState = {
    ...initUser(),
    errors: null,
    token: initToken(),
    currentUser: initUser(),

}

//login - action(function) - thunk - action(object) - store - reducer(user) - state(new)-login

const settingReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_SETTING_UNLOAD:
            return { ...initState, currentUser: initUser() }
        case constant.USER_SETTING_FIELD:
            const key = action.key
            const value = action.value
            console.log('reducer',key,value);
            return { ...state, [key]: value }
        case constant.USER_SETTING_RESULT: // 设置结果 
            const { status } = action.result
            if (status === 1) {
                //更新后 用户信息和token同步到本地
               const currentUser = action.result.data
               const token = action.result.data.token
                //用户信息存储 : 登录状态  持久化
                saveData("currentUser",currentUser)
                saveData("token", token)
                //token存储 ： 接口验证
                //返回新的state :最新的用户信息和token 同步到reducer(内存)
                return { ...state, currentUser,token}
            } else {
                return { ...state, errors: { message:action.result.message} }
            }
        case constant.USER_SETTING_LOGOUT:
            // 清除 ： 登录状态的标记 currentUser
            //内存清除 ： =》reducer 清除
            state = {}
            //本地清除 =》localstorage 清除
            deleteData('currentUser')
            deleteData('token')
            return {...state,redirect: '/'}
        default:
            return {
                ...initUser(),
                errors:null,
                currentUser:initUser(),
                token:initToken()
            }
    }
}

export default settingReducer