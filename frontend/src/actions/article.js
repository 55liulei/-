import * as constant from "../constant"
import request from '../request'
import { push } from 'connected-react-router'


//文章创建：清楚
export const articleUnload = () => {
    return { type: constant.ARTICLE_CREATE_UNLOAD }
}
//文章创建：同步
export const articleFiledUpdate = (key, value) => {
    return { type: constant.ARTICLE_CREATE_FIELD, key, value }
}
export const articleAddTag = () => {
    return { type: constant.ARTICLE_ADD_TAG}
}
export const articleRemoveTag = (tag) => {
    return { type: constant.ARTICLE_REMOVE_TAG,tag}
}
//创建文章
export const createArticle = (article) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.create(article)
            if(result.status===1){
                const {slug} = result.data
                dispatch(push(`/article/${slug}`)) //文章详情
            }else{
                 dispatch({type:constant.ARTICLE_CREATE_RESULT,result})
            }
           
        } catch (error) {
            console.log('error', error);
             dispatch({type:constant.ARTICLE_CREATE_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}
//获取文章
export const getArticleBySlug = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.article.get(slug)
            console.log('result', result);
            dispatch({ type: constant.ARTICLE_GET_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.ARTICLE_GET_RESULT, result: { status: 0, message: error.message, errors: error.errors } })

        }
    }
}
//更新文章
export const updateArticle = (article)=>{
    return  async (dispatch,getState)=>{
        try {
            const result =  await request.article.update(article)
            // console.log('result',result);
            if(result.status===1){
                const {slug} = result.data
                dispatch(push(`/article/${slug}`))  // =>文章详请
            }else{
                dispatch({type:constant.ARTICLE_UPDATE_RESULT,result})
            }
        } catch (error) {
            console.log('error',error);
             dispatch({type:constant.ARTICLE_UPDATE_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}
//删除文章
export const deleteArticle = (slug)=>{
    return  async (dispatch,getState)=>{
        try {
            const result =  await request.article.delete(slug)
            // console.log('result',result);
            if(result.status===1){
                
                dispatch(push("/home"))  // =>文章详请
            }else{
                dispatch({type:constant.ARTICLE_DELETE_RESULT,result})
            }
        } catch (error) {
            console.log('error',error);
             dispatch({type:constant.ARTICLE_UPDATE_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}
//喜欢文章
export const favoriteArticle = (slug)=>{
    return  async (dispatch,getState)=>{
        try {
            const result =  await request.article.favorite(slug)
            // console.log('result',result);
                dispatch({type:constant.ARTICLE_FAVORITE_RESULT,result})
            
        } catch (error) {
            console.log('error',error);
             dispatch({type:constant.ARTICLE_UPDATE_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}
//取消喜欢文章
export const unfavoriteArticle = (slug)=>{
    return  async (dispatch,getState)=>{
        try {
            const result =  await request.article.unfavorite(slug)
            dispatch({type:constant.ARTICLE_FAVORITE_RESULT,result})
        } catch (error) {
            console.log('error',error);
             dispatch({type:constant.ARTICLE_FAVORITE_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}
