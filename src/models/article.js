/**
 * Created by reditaru on 2017/12/26.
 */
import {PLAIN_TYPES,TYPES} from './types'
import * as articleService from '../service/article'
const {UPDATE_ALL_ARTICLE,UPDATE_ARTICLE,OPERATION_FAIL,OPERATION_REQUEST,OPERATION_SUCCESS,DELETE_ARTICLE} = PLAIN_TYPES.article.mutations;
const article = {
    namespaced:true,
    state:{
        articles:{},
        loading:false,
        status:false,
        msg:''
    },
    actions:{
        async getArticles({commit}){
            let data = await articleService.getArticles();
            if(data.success){
                commit(TYPES.article.mutations.UPDATE_ALL_ARTICLE,{articles:data.res},{root:true});
            }
        },
        async getArticle({commit},payload){
            let data = await articleService.getArticle(payload);
            if(data.success){
                commit(TYPES.article.mutations.UPDATE_ARTICLE,{article:data.res},{root:true});
            }
        },
        async createArticle({commit},payload){
            commit(TYPES.article.mutations.OPERATION_REQUEST,null,{root:true});
            let data = await articleService.createArticle(payload);
            if(data.success){
                commit(TYPES.article.mutations.UPDATE_ARTICLE,{article:data.res},{root:true})
                commit(TYPES.article.mutations.OPERATION_SUCCESS,null,{root:true});
            }else{
                commit(TYPES.article.mutations.OPERATION_FAIL,{msg:data.msg},{root:true});
            }
        },
        async updateArticle({commit},payload){
            commit(TYPES.article.mutations.OPERATION_REQUEST,null,{root:true});
            let data = await articleService.updateArticle(payload);
            if(data.success){
                commit(TYPES.article.mutations.UPDATE_ARTICLE,{article:data.res},{root:true})
                commit(TYPES.article.mutations.OPERATION_SUCCESS,null,{root:true});
            }else{
                commit(TYPES.article.mutations.OPERATION_FAIL,{msg:data.msg},{root:true});
            }
        },
        async deleteArticle({commit},payload){
            commit(TYPES.article.mutations.OPERATION_REQUEST,null,{root:true});
            let data = await articleService.deleteArticle(payload);
            if(data.success){
                commit(TYPES.article.mutations.DELETE_ARTICLE,{id:payload.id},{root:true})
                commit(TYPES.article.mutations.OPERATION_SUCCESS,null,{root:true});
            }else{
                commit(TYPES.article.mutations.OPERATION_FAIL,{msg:data.msg},{root:true});
            }
        },
    },
    mutations:{
        [UPDATE_ARTICLE](state,payload){
            let articles = state.articles;
            articles[payload.article.id] = payload.article;
            state.articles = {...state.articles,...articles}
        },
        [UPDATE_ALL_ARTICLE](state,payload){
            let articles = {};
            payload.articles.forEach(item=>{articles[item.id]=item})
            state.articles = articles
        },
        [OPERATION_REQUEST](state){
            state.loading = true
        },
        [OPERATION_SUCCESS](state){
            state.loading = false;
            state.status = true;
        },
        [OPERATION_FAIL](state,payload){
            state.loading = false;
            state.status = false;
            state.msg = payload.msg;
        },
        [DELETE_ARTICLE](state,payload){
            let articles = state.articles;
            delete articles[payload.id];
            state.articles = {...state.articles,...articles}
        }
    }
}
export default article