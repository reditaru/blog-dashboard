/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './models/'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Container, Aside, Menu, Main, Button, Header, Card, Input, Form, FormItem, Message, Alert, Dropdown, DropdownItem, DropdownMenu,
    MenuItem, Table, TableColumn, Dialog, Select, Option } from 'element-ui'
const components = [Container, Aside, Menu, Main, Button, Header, Card, Input, Form, FormItem, Message, Alert, Dropdown, DropdownItem, DropdownMenu,
    MenuItem, Table, TableColumn, Dialog, Select, Option];
components.forEach(item => {
    Vue.component(item.name, item);
});
Vue.prototype.$message = Message;
Vue.use(mavonEditor);
new Vue({
    el:'#app',
    router,
    store,
    render: h => h(App)
})
window.router = router