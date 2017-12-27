/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import Root from './views/Root.vue'
import Login from './views/Login.vue'
import Articles from './views/article/Articles.vue'
import store from './models'
import {TYPES} from './models/types'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        component:Root,
        redirect:'/articles',
        children:[{
            path:'articles',
            component:Articles
        }]
    },
    {
        path:'/login',
        component:Login
    }
]
const router = new VueRouter({
    routes,
    mode: config.routerMode
})

router.beforeEach((to, from, next) => {
    let user = sessionStorage.getItem('user')
    if(to.path!=='/login'){
        if(user==null){
            next('/login')
        }
        else {
            user = JSON.parse(user)
            store.commit(TYPES.user.mutations.UPDATE_USER,{status:true,user:user})
            next()
        }
    }
    next()
})
export default router