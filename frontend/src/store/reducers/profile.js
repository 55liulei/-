import * as constant from '../../constant'




const initState = {
        username:"",
        bio:"",
        avatar:"",
        following:false,
        followers:[],
        errors:null
}


const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.PROFILE_GET_RESULT: 
            const { status, message, data } = action.result
            if (status === 1) {
                
                return { ...state,...data }
            } else {
                return { ...state, errors: { message } }
            }
        case constant.PROFILE_FOLLOW_RESULT: 
            if (action.result.status === 1) {
                return { ...state,...action.result.data }
            } else {
                return { ...state, errors: { message } }
            }
        case constant.USER_SETTING_LOGOUT:
            state.currentUser=null
            //本地清除 =》localstorage 清除
           
            return { ...state}
        default:
            return state
    }
}

export default profileReducer