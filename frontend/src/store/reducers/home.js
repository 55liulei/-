import * as constant from '../../constant'




const initState = {
    count: 0,
    articles: [],
    tags: [],
    tag: null,
    currentPage: 1,
    tab: "all"
}


const articlesReducer = (state = initState, action) => {
    switch (action.type) {

        case constant.TAGS_GET_RESULT:
            if (action.result.status === 1) {
                const tags = action.result.data
                return { ...state, tags }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        case constant.HOME_TAB_SYNC: //选项卡同步
            return { ...state, tab: action.tab, }
        case constant.HOME_TAG_SYNC: //标签同步
            return { ...state, tag: action.tag }
        case constant.HOME_PAGE_SYNC: // 页码同步
            return { ...state, currentPage: action.page }
        case constant.HOME_ARTICLE_RESLUT: //全局文章
            if (action.result.status === 1) {
                const {count,articles} = action.result.data
                return { ...state,count,articles }
            } else {
                return { ...state, errors: { message: action.result.message } }
            }
        default:
            return state
    }
}

export default articlesReducer