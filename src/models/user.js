/**
 * Created by reditaru on 2017/12/27.
 */
import {PLAIN_TYPES} from './types'
const {UPDATE_USER} = PLAIN_TYPES.user.mutations;
const user = {
    namespaced:true,
    state:{
        status:false,
        user:{
            id:0,
            name:'',
            avatar:'',
            username:''
        }
    },
    actions:{
    },
    mutations:{
        [UPDATE_USER](state,payload){
            state = {...state,status:payload.status,user:payload.user};
        }
    }
}
export default user