/**
 * Created by reditaru on 2017/12/27.
 */
import {request} from '../util/request'
export async function getCategories() {
    return request('/api/categories',{
        method:'GET'
    })
}
export async function createCategory(payload) {
    return request('/api/categories',{
        method:'POST',
        body:JSON.stringify(payload.category)
    })
}
export async function updateCategory(payload) {
    return request(`/api/category/${payload.id}`,{
        method:'PUT',
        body:JSON.stringify(payload.category)
    })
}
export async function deleteCategory(payload) {
    return request(`/api/category/${payload.id}`,{
        method:'DELETE'
    })
}