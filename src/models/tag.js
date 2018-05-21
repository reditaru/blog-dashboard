/**
 * Created by reditaru on 2017/12/28.
 */
import { PLAIN_TYPES, TYPES } from './types'
import * as tagService from '../service/tag'
const { UPDATE_ALL_TAG, UPDATE_TAG, OPERATION_FAIL, OPERATION_REQUEST, OPERATION_SUCCESS, DELETE_TAG } = PLAIN_TYPES.tag.mutations;
const tag = {
    namespaced: true,
    state: {
        tags: {},
        loading: false,
        status: false,
        msg: ''
    },
    actions: {
        async getTags({
            commit
        }) {
            let data = await tagService.getTags();
            if (data.success) {
                commit(TYPES.tag.mutations.UPDATE_ALL_TAG, {
                    tags: data.res
                }, {
                    root: true
                });
                commit(TYPES.tag.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            }
        },
        async deleteTag({
            commit
        }, payload) {
            commit(TYPES.tag.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await tagService.deleteTag(payload);
            if (data.success) {
                commit(TYPES.tag.mutations.DELETE_TAG, {
                    id: payload.id
                }, {
                    root: true
                })
                commit(TYPES.tag.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.tag.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        },
        async createTag({
            commit
        }, payload) {
            commit(TYPES.tag.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await tagService.createTag(payload);
            if (data.success) {
                commit(TYPES.tag.mutations.UPDATE_TAG, {
                    tag: data.res
                }, {
                    root: true
                })
                commit(TYPES.tag.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.tag.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        },
        async updateTag({
            commit
        }, payload) {
            commit(TYPES.tag.mutations.OPERATION_REQUEST, null, {
                root: true
            });
            let data = await tagService.updateTag(payload);
            if (data.success) {
                commit(TYPES.tag.mutations.UPDATE_TAG, {
                    tag: data.res
                }, {
                    root: true
                })
                commit(TYPES.tag.mutations.OPERATION_SUCCESS, null, {
                    root: true
                });
            } else {
                commit(TYPES.tag.mutations.OPERATION_FAIL, {
                    msg: data.msg
                }, {
                    root: true
                });
            }
        }
    },
    mutations: {
        [UPDATE_ALL_TAG](state, payload) {
            let tags = {};
            payload.tags.forEach(item => {
                tags[item.id] = item
            })
            state.tags = tags
        },
        [UPDATE_TAG](state, payload) {
            let tags = state.tags;
            tags[payload.tag.id] = payload.tag;
            state.tags = { ...state.tags,
                ...tags
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
        [DELETE_TAG](state, payload) {
            let tags = state.tags;
            delete tags[payload.id];
            state.tags = { ...state.tags,
                ...tags
            }
        }
    }
}
export default tag