import * as constant from '../../constant'

const initState = {
    body: "",
    comments: [],
    errors: null
}
const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.COMMENTS_GET_RESULT:
            if (action.result.status === 1) {
                const comments = action.result.data
                return { ...state, comments, body: '' }
            } else {
                return { ...state, errors: { message: action.result.message }, body: "" }
            }
        case constant.COMMENT_CREATE_FIELD:
            const key = action.key
            const value = action.value
            return { ...state, [key]: value }
        case constant.COMMENT_CREATE_RESULT:
            if (action.result.status === 1) {
                const comment = action.result.data
                const newComments = state.comments.concat([comment])
                return { ...state, comments: newComments, body: "" }
            } else {
                return { ...state, errors: { message: action.result.message }, body: "" }
            }
        case constant.COMMENT_DELETE_RESULT:
            if (action.result.status === 1) {
                const deleteId = action.result.id
                const deleteResultComments = state.comments.filter(comment => {
                    return comment.id !== deleteId
                })
                return { ...state, comments: deleteResultComments, body: "" }
            } else {
                return { ...state, errors: { message: action.result.message }, body: "" }
            }
        default:
            return state
    }
}
export default commentReducer