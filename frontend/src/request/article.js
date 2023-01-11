/* eslint-disable import/no-anonymous-default-export */
import apiClient from "./apiClient"
import { LIMIT } from '../constant'
const OFFSET = (page) => {
    return (page - 1) * LIMIT
}

export default {
    //单个文章
    create: article => apiClient.post('/articles', { article }),
    get: slug => apiClient.get('/articles/' + slug),
    update: article => apiClient.put('/articles/' + article.slug, { article }),
    delete: slug => apiClient.delete('/articles/' + slug),
    //喜欢文章
    favorite: slug => apiClient.post('/favorites/' + slug),
    unfavorite: slug => apiClient.delete('/favorites/' + slug),

    //批量查询
    //作者自己的文章
    getAuthor: (author, page) => apiClient.get(`/articles?author=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    //作者喜欢的文章
    getFavorite: (author, page) => apiClient.get(`/articles?favorite=${author}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    //全局文章
    getAll: (page) => apiClient.get(`/articles?limit=${LIMIT}&offset=${OFFSET(page)}`),
    //通过标签tag
    byTag: (tag, page) => apiClient.get(`/articles?tag=${tag}&limit=${LIMIT}&offset=${OFFSET(page)}`),
    //获取关注 follow
    byFollow: ( page) => apiClient.get(`/articles/follow??limit=${LIMIT}&offset=${OFFSET(page)}`),
}
