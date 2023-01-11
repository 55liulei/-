import * as constant from "../constant"
import request from '../request'
import { push } from 'connected-react-router'

//文章创建：清楚
export const articleUnload = () => {
    return { type: constant.ARTICLE_CREATE_UNLOAD }
}


//文章创建：同步
export const commentFieldUpdate = (key, value) => {
    return { type: constant.COMMENT_CREATE_FIELD, key, value }
}


//获取评论
export const initComments = (slug) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.get(slug)
            console.log('result', result);
            dispatch({ type: constant.COMMENTS_GET_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.COMMENTS_GET_RESULT, result: { status: 0, message: error.message, errors: error.errors } })

        }
    }
}
//删除评论
export const deleteComment = (slug,id) => {
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.delete(slug,id)
            console.log('result', result);
            dispatch({ type: constant.COMMENT_DELETE_RESULT, result:{...result,id}})
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.COMMENT_DELETE_RESULT, result: { status: 0, message: error.message, errors: error.errors } })

        }
    }
}

//创建评论
export const createComment = (slug,body)=>{
    return async (dispatch, getState) => {
        try {
            const result = await request.comment.create(slug,body)
            console.log('result', result);
            dispatch({ type: constant.COMMENT_CREATE_RESULT, result })
        } catch (error) {
            console.log('error', error);
            dispatch({ type: constant.COMMENT_CREATE_RESULT, result: { status: 0, message: error.message, errors: error.errors } })

        }
    }
}