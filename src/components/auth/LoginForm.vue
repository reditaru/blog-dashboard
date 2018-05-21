<template lang="html">
    <el-card>
        <el-form :model="login" :rules="rules" ref="login">
            <el-form-item label="用户名" prop="username" >
                <el-input v-model="login.username" @keyup.enter="onSubmit('login')"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password" @keyup.enter="onSubmit('login')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onSubmit('login')" :loading="loading" >登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
export default {
	name: 'LoginForm',
	props: ['loading'],
	data() {
		return {
			login: {
				username: '',
				password: '',
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 5, max: 15, message: '长度在5到15个字符', trigger: 'blur' },
				],
			},
		};
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit('onSubmit', this.login);
				} else {
					this.$message.error('请合法填写相应字段');
					return false;
				}
			});
		},
	},
};
</script>

<style lang="less" scoped>
.el-button {
	width: 100%;
}
</style>