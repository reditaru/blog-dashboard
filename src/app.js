/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './models/'
import config from './config'
import {Container,Aside,Menu,Main,Button,Header,Card,Input,Form,FormItem,Message,Alert}  from 'element-ui'
const components = [Container,Aside,Menu,Main,Button,Header,Card,Input,Form,FormItem,Alert];
components.forEach(item=>{
    Vue.component(item.name,item)
})
Vue.use(VueRouter)
Vue.prototype.$message = Message;
const router = new VueRouter({
    routes,
    mode: config.routerMode
})
new Vue({
    el:'#app',
    router,
    store,
    render:h=>h(App)
})