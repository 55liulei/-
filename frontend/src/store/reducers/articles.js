import * as constant from '../../constant'




const initState = {
    count: 0,
    articles: [],
    tags: [],
    tag: null,
    currentPage: 1
}


const articlesReducer = (state = initState, action) => {
    switch (action.type) {
        
        case constant.ARTICLES_AUTHOR_RESULT:
            if (action.result.status === 1) {
                
                const {articles,count} = action.result.data
                return { ...state,articles,count }
            } else {
                return { ...state, errors: {message:action.result.message } }
            }
        default:
            return state
    }
}

export default articlesReducer