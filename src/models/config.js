/**
 * Created by reditaru on 2017/12/28.
 */
import {PLAIN_TYPES,TYPES} from './types'
import * as configService from '../service/config'
const {UPDATE_CONFIG,OPERATION_FAIL,OPERATION_REQUEST,OPERATION_SUCCESS} = PLAIN_TYPES.config.mutations;
const config = {
    namespaced:true,
    state:{
        config:{
            id: 1,
            icon: "",
            github: "",
            weibo: "",
            twitter: "",
            mail: "",
            avatar: "",
            header: "",
            subHeader: ""
        },
        loading:false,
        status:false,
        msg:''
    },
    actions:{
        async getConfig({commit}){
            let data = await configService.getConfig();
            if(data.success){
                commit(TYPES.config.mutations.UPDATE_CONFIG,{config:data.res},{root:true});
                commit(TYPES.config.mutations.OPERATION_SUCCESS,null,{root:true});
            }
        },
        async updateConfig({commit},payload){
            commit(TYPES.config.mutations.OPERATION_REQUEST,null,{root:true});
            let data = await configService.updateConfig(payload);
            if(data.success){
                commit(TYPES.config.mutations.UPDATE_CONFIG,{config:data.res},{root:true})
                commit(TYPES.config.mutations.OPERATION_SUCCESS,null,{root:true});
            }else{
                commit(TYPES.config.mutations.OPERATION_FAIL,{msg:data.msg},{root:true});
            }
        }
    },
    mutations:{
        [UPDATE_CONFIG](state,payload){
            state.config = payload.config
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
        }
    }
}
export default config