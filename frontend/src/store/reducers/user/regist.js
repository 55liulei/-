import * as constant from '../../../constant'

const initState = {
    email: '',
    username: '',
    password: '',
    errors: null
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.USER_REGIST_UNLOAD:
            return { ...initState }
        case constant.USER_REGIST_FIELD:
            const key = action.key
            const value = action.value
            // console.log(key,value)
            return { ...state, [key]: value } // [key] 动态取key ： email / username / password
        case constant.USER_REGIST_RESULT:
            return { ...state, errors: { message: action.result.message } }
        default:
            return state
    }
}

export default userReducer