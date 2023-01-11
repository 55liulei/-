import * as constant from '../constant'
import request from '../request'
//设置：清除
export const settingUnload = () => {
    return { type: constant.USER_SETTING_UNLOAD }
}
//设置：同步
export const settingFiledUpdate = (key, value) => {
    return { type: constant.USER_SETTING_FIELD, key, value }
}
//设置：提交
export const settingSubmit = (user) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.update(user)
            console.log('result', result);
            dispatch({ type: constant.USER_SETTING_RESULT, result })
        } catch (error) {
            dispatch({ type: constant.USER_SETTING_RESULT, result: { status: 0, message: error.message, errors: error.errors } })
        }
    }
}
//设置：退出
export const settingLogout = () => {
    return {type:constant.USER_SETTING_LOGOUT}
}