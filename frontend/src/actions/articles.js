import * as constant from '../constant'
import request from '../request'

//action: 作者文章
export const getArticlesByAuthor = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getAuthor(username, page)
            console.log('result', result);
            dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result})
        } catch (error) {
            console.log('error', error);
             dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}

//action: 作者喜欢的文章
export const getArticlesByFavorite = (username, page) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.getFavorite(username, page)
            console.log('result', result);
            dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result})
        } catch (error) {
            console.log('error', error);
             dispatch({type:constant.ARTICLES_AUTHOR_RESULT,result:{status:0,message:error.message,errors:error.errors}})
        }
    }
}
