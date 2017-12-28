/**
 * Created by reditaru on 2017/12/26.
 */
/**
 * Created by Administrator on 2017/10/3.
 */
import config from '../config'
import fetch from 'isomorphic-fetch'
import auth from './auth'
const host = config.host;
function parse(response) {
    let promise = null;

    if (response.headers == null) {
        return;
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType == null) {
        return;
    }

    if (contentType.indexOf('text') >= 0) {
        promise = response.text();
        return promise;
    } else if (contentType.indexOf('json') >= 0) {
        promise = response.json();
        return promise;
    }
}
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw response;
}
function handleError(response) {
    let promise = parse(response);
    if (promise == null) {
        return { status: response.status, success: false };
    }

    return promise.then((data) => {
        data.status = response.status;
        return data;
    });
}
export function request(url, options) {
    if (options == null) {
        options = {};
    }

    if (options.headers == null) {
        options.headers = {};
    }
    let token = auth.getAuth();
    if(token!=null)
        options.headers['Authorization'] = token;
    options.headers['Content-Type'] = 'application/json';
    return fetch(host+ url, options)
        .then(checkStatus)
        .then(parse)
        .then((data) => {
            if (data == null) {
                data = {};
            }
            return data;
        })
        .catch(response => handleError(response));
}