/**
 * Created by reditaru on 2017/12/28.
 */
import { PLAIN_TYPES, TYPES } from './types'
import * as categoryService from '../service/category'
const { UPDATE_ALL_CATEGORY, UPDATE_CATEGORY, OPERATION_FAIL, OPERATION_REQUEST, OPERATION_SUCCESS, DELETE_CATEGORY } = PLAIN_TYPES.category.mutations;
const category = {
    namespaced: true,
    state: {
        categories: {},
        loading: false,
        status: false,
        msg: ''
    },
    actions: {
        async getCategories({
            commit
        }) {
            let data = await categoryService.getCategories();
            if (data.success) {
                commit(TYPES.category.mutations.UPDATE_ALL_CATEGORY, {
                    categories: data.res
                }, {
                    root: true
                });
                commit(TYPES.category.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            }
        },
        async deleteCategory({
            commit
        }, payload) {
            commit(TYPES.category.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await categoryService.deleteCategory(payload);
            if (data.success) {
                commit(TYPES.category.mutations.DELETE_CATEGORY, {
                    id: payload.id
                }, {
                    root: true
                })
                commit(TYPES.category.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.category.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        },
        async createCategory({
            commit
        }, payload) {
            commit(TYPES.category.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await categoryService.createCategory(payload);
            if (data.success) {
                commit(TYPES.category.mutations.UPDATE_CATEGORY, {
                    category: data.res
                }, {
                    root: true
                })
                commit(TYPES.category.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.category.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        },
        async updateCategory({
            commit
        }, payload) {
            commit(TYPES.category.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await categoryService.updateCategory(payload);
            if (data.success) {
                commit(TYPES.category.mutations.UPDATE_CATEGORY, {
                    category: data.res
                }, {
                    root: true
                })
                commit(TYPES.category.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.category.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        }
    },
    mutations: {
        [UPDATE_ALL_CATEGORY](state, payload) {
            let categories = {};
            payload.categories.forEach(item => {
                categories[item.id] = item
            })
            state.categories = categories
        },
        [UPDATE_CATEGORY](state, payload) {
            let categories = state.categories;
            categories[payload.category.id] = payload.category;
            state.categories = { ...state.categories,
                ...categories
            }
        },
        [OPERATION_REQUEST](state) {
            state.loading = true
        },
        [OPERATION_SUCCESS](state) {
            state.loading = false;
            state.status = true;
        },
        [OPERATION_FAIL](state, payload) {
            state.loading = false;
            state.status = false;
            state.msg = payload.msg;
        },
        [DELETE_CATEGORY](state, payload) {
            let categories = state.categories;
            delete categories[payload.id];
            state.categories = { ...state.categories,
                ...categories
            }
        }
    }
}
export default category