/**
 * Created by reditaru on 2017/12/27.
 */
import { request } from '../util/request'
export async function getTags() {
    return request('/api/tags', {
        method: 'GET'
    })
}
export async function createTag(payload) {
    return request('/api/tags', {
        method: 'POST',
        body: JSON.stringify(payload.tag)
    })
}
export async function updateTag(payload) {
    return request(`/api/tag/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload.tag)
    })
}
export async function deleteTag(payload) {
    return request(`/api/tag/${payload.id}`, {
        method: 'DELETE'
    })
}