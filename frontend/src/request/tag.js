/* eslint-disable import/no-anonymous-default-export */
import apiClient from "./apiClient"

export default { 
    getAll: () => apiClient.get('/tags'),
}
