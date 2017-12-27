/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './models/'
import {Container,Aside,Menu,Main,Button,Header,Card,Input,Form,FormItem,Message,Alert,Dropdown,DropdownItem,DropdownMenu,MenuItem}  from 'element-ui'
const components = [Container,Aside,Menu,Main,Button,Header,Card,Input,Form,FormItem,Alert,Dropdown,DropdownItem,DropdownMenu,MenuItem];
components.forEach(item=>{
    Vue.component(item.name,item)
})
Vue.prototype.$message = Message;

new Vue({
    el:'#app',
    router,
    store,
    render:h=>h(App)
})