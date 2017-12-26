/**
 * Created by reditaru on 2017/12/26.
 */
import * as authService from '../service/auth'
import {PLAIN_TYPES} from './types'
const {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL} = PLAIN_TYPES.auth.mutations;

const auth = {
    namespaced:true,
    state:{
        loading:false,
        status:true,
        msg:''
    },
    actions:{
        async login({ commit },payload){
            commit(LOGIN_REQUEST);
            let result = await authService.login(payload);
            if(result.success){
                commit('user/UPDATE_USER',result.res,{root:true});
                commit(LOGIN_SUCCESS);
            }else
                commit(LOGIN_FAIL,{msg:result.msg})
        },
        async logout({commit}){

        }
    },
    mutations:{
        [LOGIN_REQUEST](state){
            state.loading = true;
        },
        [LOGIN_SUCCESS](state){
            state.loading = false;
            state.status = true;
        },
        [LOGIN_FAIL](state,payload){
            state.loading = false;
            state.status = false;
            state.msg = payload.msg;
        }
    }
}
export default auth