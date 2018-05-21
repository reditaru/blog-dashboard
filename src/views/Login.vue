<template lang="html">
    <div class="login">
        <h1 class="title">Reditaru Blog</h1>
        <div v-if="isLogin">
            <el-alert title="您已经登录过了,2s后跳转至首页..." type="success" show-icon></el-alert>
        </div>
        <div v-else>
            <el-alert :title="msg" type="error" v-show="!loading&&!status" show-icon></el-alert>
            <LoginForm @onSubmit="submit" :loading="loading"></LoginForm>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue';
import { TYPES } from '../models/types';
import { mapState } from 'vuex';
import router from '../router';
export default {
	name: 'Login',
	data() {
		return {};
	},
	mounted() {
		if (this.isLogin) {
			setTimeout(() => {
				router.push('/');
			}, 2000);
		}
	},
	computed: {
		...mapState({
			loading: state => state.auth.loading,
			status: state => state.auth.status,
			msg: state => state.auth.msg,
			isLogin: state => state.user.status,
		}),
	},
	components: {
		LoginForm,
	},
	methods: {
		submit({ username, password }) {
			this.$store.dispatch(TYPES.auth.actions.login, { username, password }, { root: true });
		},
	},
};
</script>
<style lang="less"  rel="stylesheet/less">
.login {
	text-align: center;
	margin: 120px auto;
	width: 312px;
	.el-alert {
		margin-bottom: 5px;
	}
}
</style>