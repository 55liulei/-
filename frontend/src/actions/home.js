import * as constant from '../constant'
import request from '../request'

//action: 获取所有标签
export const getTags = () => {
    return async (dispatch, getState) => {
        try {
            const result = await request.tag.getAll()
            console.log('result', result);
            dispatch({type:constant.TAGS_GET_RESULT,result})
        } catch (error) {
            console.log('error', error);
             dispatch({type:constant.TAGS_GET_RESULT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}

//action: 同步tag
export const syncTag = (tag) => {
    return{type:constant.HOME_TAG_SYNC,tag}
    
}

//action: 同步tab
export const syncTab = (tab) => {
    return{type:constant.HOME_TAB_SYNC,tab}
}
export const syncPage = (page)=>{
    return{type:constant.HOME_PAGE_SYNC,page}
}

//action: 获取tab对应文章
export const getTabArticles = () => {
    return async (dispatch, getState) => {
        try {
            const {tab,tag,currentPage} = getState().home
            console.log('action',tab,tag,currentPage);
            let result ={}
            //处理tab
            if(tab){
                if(tab==='follow'){
                    result = await request.article.byFollow(currentPage)
                }else if(tab==='all'){
                    result = await request.article.getAll(currentPage)
                }
            }
            //处理标签
            if(tag){
                result = await request.article.byTag(tag,currentPage)
            }
            console.log('result', result);
            dispatch({type:constant.HOME_ARTICLE_RESLUT,result})
        } catch (error) {
            console.log('error', error);
             dispatch({type:constant.HOME_ARTICLE_RESLUT,result:{status:0,message:error.message,errors:error.errors}})

        }
    }
}

