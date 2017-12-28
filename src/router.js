/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'
import Root from './views/Root.vue'
import Login from './views/Login.vue'
import Articles from './views/article/Articles.vue'
import Tags from './views/tag/Tags.vue'
import Categories from './views/category/Categories.vue'
import Config from './views/config/Config.vue'
import store from './models'
import {TYPES} from './models/types'
Vue.use(VueRouter)

const initialArr = ['tag','category','config']
const routes = [
    {
        path:'/',
        component:Root,
        redirect:'/articles',
        children:[
            {
                path:'articles',
                component:Articles,
                beforeEnter:(to,from,next)=>{
                    requestIfNotInitial(initialArr)
                    next(store.dispatch(TYPES.article.actions.GET_ARTICLES,null,{root:true}))
                }
            },
            {
                path:'tags',
                component:Tags,
                beforeEnter:(to,from,next)=>{
                    requestIfNotInitial(['tag'])
                    next()
                }
            },
            {
                path:'categories',
                component:Categories,
                beforeEnter:(to,from,next)=>{
                    requestIfNotInitial(['category'])
                    next()
                }
            },
            {
                path:'config',
                component:Config,
                beforeEnter:(to,from,next)=>{
                    requestIfNotInitial(['config'])
                    next()
                }
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
const requestIfNotInitial = (arr)=>{
    arr.forEach(item=>{
        if(!store.state[item].status){
            switch(item){
                case 'tag':
                    store.dispatch(TYPES.tag.actions.GET_TAGS,null,{root:true})
                    break;
                case 'category':
                    store.dispatch(TYPES.category.actions.GET_CATEGORIES,null,{root:true})
                    break;
                case 'config':
                    store.dispatch(TYPES.config.actions.GET_CONFIG,null,{root:true})
                    break;
            }
        }
    })
}
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