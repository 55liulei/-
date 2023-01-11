import * as constant from '../constant'
import request from '../request'


//action： 获取profile
export const getProfile = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.get(username)
            console.log('result', result);
            dispatch({ type: constant.PROFILE_GET_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.USER_SETTING_RESULT, result: { status: 0, message: error.message, errors: error.errors } })
        }
    }
}

//action： 添加关注
export const addFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.follow(username)
            console.log('result', result);
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result: { status: 0, message: error.message, errors: error.errors } })
        }
    }
}
//action： 取消关注
export const deleteFollow = (username) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.user.unfollow(username)
            console.log('result', result);
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.PROFILE_FOLLOW_RESULT, result: { status: 0, message: error.message, errors: error.errors } })
        }
    }
}


