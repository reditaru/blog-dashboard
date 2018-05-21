<template lang="html">
    <el-form :model="config" :rules="rules" ref="config" label-width="80px" size="mini">
        <el-form-item label="图标" prop="icon" >
            <el-input v-model="config.icon" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="header">
            <el-input v-model="config.header" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Intro" prop="subHeader">
            <el-input v-model="config.subHeader" type="textarea" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
            <el-input v-model="config.avatar" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Github" prop="github">
            <el-input v-model="config.github" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Weibo" prop="weibo">
            <el-input v-model="config.weibo" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Twitter" prop="twitter">
            <el-input v-model="config.twitter" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="mail">
            <el-input v-model="config.mail" @keyup.enter="onSubmit('config')"></el-input>
        </el-form-item>
        <el-form-item class="footer">
            <el-button type="success" @click="onSubmit('config')" :loading="loading" >保存</el-button>
            <el-button @click="cancel" :disabled="loading">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
	name: 'ConfigForm',
	props: ['loading', 'config'],
	data() {
		return {
			rules: {
				icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
				header: [{ required: true, message: '请输入Name', trigger: 'blur' }],
				subHeader: [{ required: true, message: '请输入Intro', trigger: 'blur' }],
				avatar: [{ required: true, message: '请输入头像', trigger: 'blur' }],
				github: [{ required: true, message: '请输入github', trigger: 'blur' }],
				weibo: [{ required: true, message: '请输入微博', trigger: 'blur' }],
				twitter: [{ required: true, message: '请输入twitter', trigger: 'blur' }],
				mail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
			},
		};
	},
	computed: {},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit('onSubmit', this.config);
				} else {
					this.$message.error('请合法填写相应字段');
					return false;
				}
			});
		},
		cancel() {
			this.$emit('hideDialog');
		},
	},
};
</script>

<style lang="less" rel="stylesheet/less">
.el-form {
	.category,
	.tags {
		width: 100%;
	}
	.footer {
		text-align: right;
	}
}
</style>