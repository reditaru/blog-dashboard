/**
 * Created by reditaru on 2017/12/27.
 */
import { request } from '../util/request'
export async function getConfig() {
    return request('/api/config', {
        method: 'GET'
    })
}
export async function updateConfig(payload) {
    return request(`/api/config`, {
        method: 'PUT',
        body: JSON.stringify(payload.config)
    })
}