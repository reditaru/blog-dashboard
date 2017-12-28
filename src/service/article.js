/**
 * Created by reditaru on 2017/12/26.
 */
import {request} from '../util/request'
export async function getArticles() {
    return request('/api/articles',{
        method:'GET'
    })
}
export async function createArticle(payload) {
    return request('/api/articles',{
        method:'POST',
        body:JSON.stringify(payload.article)
    })
}
export async function getArticle(payload) {
    return request(`/api/article/${payload.id}`,{
        method:'GET'
    })
}
export async function updateArticle(payload) {
    return request(`/api/article/${payload.id}`,{
        method:'PUT',
        body:JSON.stringify(payload.article)
    })
}
export async function deleteArticle(payload) {
    return request(`/api/article/${payload.id}`,{
        method:'DELETE'
    })
}
