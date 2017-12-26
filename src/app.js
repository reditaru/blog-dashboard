/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'
import routes from './router'
import store from './models/'
import config from './config'

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: config.routerMode
})

new Vue({
    router,
    store,
}).$mount('#root')