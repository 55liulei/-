import * as constant from '../../constant'

const initState = {
    title: "",
    discription: "",
    body: "",
    tag: "",
    tags: [],
    errors: null
}
const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case constant.ARTICLE_CREATE_UNLOAD:
            return { ...initState }
        case constant.ARTICLE_CREATE_FIELD:
            const key = action.key
            const value = action.value
            // console.log('reducer', key, value);
            return { ...state, [key]: value }
        case constant.ARTICLE_ADD_TAG:

            const tags = state.tags.concat([state.tag])
            return { ...state, tags, tag: '' }
        case constant.ARTICLE_REMOVE_TAG:
            const removeTag = action.tag
            const filterTags = state.tags.filter(tag => {  //过滤到删除标签 返回新的数组
                return tag !== removeTag
            })
            return { ...state, tags: filterTags }
        case constant.ARTICLE_CREATE_RESULT: //创建文章
            return { ...state, errors: { message: action.result.message } } //处理创建文章错误
        case constant.ARTICLE_GET_RESULT: //处理获取文章
            if (action.result.status === 1) {
                return { ...state, ...action.result.data }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.ARTICLE_UPDATE_RESULT: //更新文章
            return { ...state, errors: { message: action.result.message } }
        case constant.ARTICLE_FAVORITE_RESULT: //喜欢  取消喜欢结果
        if (action.result.status === 1) {
            return { ...state, ...action.result.data }
        } else {
            return { ...state, errors: { message: action.result.message } }
        }
        case constant.ARTICLE_DELETE_RESULT: //处理删除文章错误
              return{...state,errors:{message:action.result.message}}
        default:
            return state
    }
}

export default articleReducer