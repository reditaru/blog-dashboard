/**
 * Created by reditaru on 2017/12/26.
 */
import * as authService from '../service/auth'
import { PLAIN_TYPES, TYPES } from './types'
import token from '../util/auth'
import router from '../router'
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } = PLAIN_TYPES.auth.mutations;

const auth = {
    namespaced: true,
    state: {
        loading: false,
        status: true,
        msg: ''
    },
    actions: {
        async login({
            commit
        }, payload) {
            commit(LOGIN_REQUEST);
            let result = await authService.login(payload);
            if (result.success) {
                if (result.res.type === 'admin') {
                    commit(TYPES.user.mutations.UPDATE_USER, {
                        user: result.res,
                        status: result.success
                    }, {
                        root: true
                    });
                    commit(LOGIN_SUCCESS);
                    token.setAuth(result.res.token);
                    router.push('/');
                } else {
                    commit(LOGIN_FAIL, {
                        msg: 'The user has no access!'
                    })
                }
            } else
                commit(LOGIN_FAIL, {
                    msg: result.msg
                })
        },
        async logout({
            commit
        }, payload) {
            let result = await authService.logout(payload);
            if (result.success) {
                commit(TYPES.user.mutations.UPDATE_USER, {
                    status: false,
                    user: {}
                }, {
                    root: true
                });
                token.clearAuth();
                router.push('/login')
            }
        }
    },
    mutations: {
        [LOGIN_REQUEST](state) {
            state.loading = true;
        },
        [LOGIN_SUCCESS](state) {
            state.loading = false;
            state.status = true;
        },
        [LOGIN_FAIL](state, payload) {
            state.loading = false;
            state.status = false;
            state.msg = payload.msg;
        }
    }
}
export default auth