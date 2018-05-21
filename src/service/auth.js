/**
 * Created by reditaru on 2017/12/26.
 */
import { request } from '../util/request'
export async function login({
    username,
    password
}) {
    return request('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    });

}
export async function logout({
    id
}) {
    return request('/api/logout', {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    });
}