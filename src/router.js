/**
 * Created by reditaru on 2017/12/26.
 */
import Root from './views/Root.vue'
import Login from './views/Login.vue'
const routes = [
    {
        path:'/',
        component:Root
    },
    {
        path:'/login',
        component:Login
    }
]
export default routes