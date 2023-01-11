/* eslint-disable import/no-anonymous-default-export */
import apiClient from "./apiClient"

export default {
    create: (slug,body) => apiClient.post(`/comments/${slug}`,{comment:{body}}),
    get: slug => apiClient.get(`/comments/${slug}`),
    delete: (slug,id) => apiClient.delete(`/comments/${slug}/${id}` )
}
