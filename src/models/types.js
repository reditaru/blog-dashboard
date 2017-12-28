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
    },
    article: {
        mutations:{
            UPDATE_ARTICLE:'UPDATE_ARTICLE',
            UPDATE_ALL_ARTICLE:'UPDATE_ALL_ARTICLE',
            OPERATION_REQUEST:'OPERATION_REQUEST',
            OPERATION_SUCCESS:'OPERATION_SUCCESS',
            OPERATION_FAIL:'OPERATION_FAIL',
            DELETE_ARTICLE:'DELETE_ARTICLE'
        },
        actions:{
            GET_ARTICLES:'getArticles',
            GET_ARTICLE:'getArticle',
            CREATE_ARTICLE:'createArticle',
            UPDATE_ARTICLE:'updateArticle',
            DELETE_ARTICLE:'deleteArticle',
        }
    },
    category: {
        mutations:{
            UPDATE_CATEGORY:'UPDATE_CATEGORY',
            UPDATE_ALL_CATEGORY:'UPDATE_ALL_CATEGORY',
            OPERATION_REQUEST:'OPERATION_REQUEST',
            OPERATION_SUCCESS:'OPERATION_SUCCESS',
            OPERATION_FAIL:'OPERATION_FAIL',
            DELETE_CATEGORY:'DELETE_CATEGORY'
        },
        actions:{
            GET_CATEGORIES:'getCategories',
            DELETE_CATEGORY:'deleteCategory',
            CREATE_CATEGORY:'createCategory',
            UPDATE_CATEGORY:'updateCategory'
        }
    },
    tag: {
        mutations:{
            UPDATE_TAG:'UPDATE_TAG',
            UPDATE_ALL_TAG:'UPDATE_ALL_TAG',
            OPERATION_REQUEST:'OPERATION_REQUEST',
            OPERATION_SUCCESS:'OPERATION_SUCCESS',
            OPERATION_FAIL:'OPERATION_FAIL',
            DELETE_TAG:'DELETE_TAG'
        },
        actions:{
            GET_TAGS:'getTags',
            DELETE_TAG:'deleteTag',
            CREATE_TAG:'createTag',
            UPDATE_TAG:'updateTag'
        }
    },
    config: {
        mutations:{
            UPDATE_CONFIG:'UPDATE_CONFIG',
            UPDATE_ALL_CONFIG:'UPDATE_ALL_CONFIG',
            OPERATION_REQUEST:'OPERATION_REQUEST',
            OPERATION_SUCCESS:'OPERATION_SUCCESS',
            OPERATION_FAIL:'OPERATION_FAIL'
        },
        actions:{
            GET_CONFIG:'getConfig',
            UPDATE_CONFIG:'updateConfig'
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
