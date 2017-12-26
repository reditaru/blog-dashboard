/**
 * Created by reditaru on 2017/12/26.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import article from './article'
import auth from './auth'
import user from './user'
Vue.use(Vuex)
const store = new Vuex.Store({modules:{article,auth,user}})
export default store