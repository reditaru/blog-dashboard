/**
 * Created by reditaru on 2017/12/26.
 */
import request from '../util/request'
export async function login({username,password}) {
    return new Promise((resolve,reject)=>{setTimeout(()=>{resolve ({success:false,code:100,res:{user:{name:'haha',username:'steinskurisu',avatat:'hahaha',id:1}},msg:'The Request User does not exist!'})},1000)})

}
export async function logout({}) {

}