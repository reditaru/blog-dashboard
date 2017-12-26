/**
 * Created by reditaru on 2017/12/27.
 */
import {namespace} from '../util/Toolkit'
const PLAIN_TYPES = {
    auth:{
        actions: {
            login: 'login',
            logout: 'logout'
        },
        mutations: {
            LOGIN_REQUEST :'LOGIN',
            LOGIN_SUCCESS : 'LOGIN_SUCCESS',
            LOGIN_FAIL :'LOGIN_FAIL'
        }
    },
    user:{
        mutations:{
            UPDATE_USER : 'UPDATE_USER'
        }
    }
}
const addPrefix = function (obj) {
    let res = {}
    Object.keys(obj).forEach(key => {
        res[key] = namespace(key, obj[key])
    })
    return res
}
const TYPES = addPrefix(PLAIN_TYPES)
export  {
    PLAIN_TYPES,
    TYPES
}
