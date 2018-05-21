<template lang="html">
    <el-form :model="data" :rules="rules" ref="data" label-width="80px" size="mini">
        <el-form-item label="名字" prop="name" >
            <el-input v-model="data.name" @keyup.enter="onSubmit('data')"></el-input>
        </el-form-item>
        <el-form-item class="footer">
            <el-button type="success" @click="onSubmit('data')" :loading="loading" >保存</el-button>
            <el-button @click="cancel" :disabled="loading">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
	name: 'SingleNameForm',
	props: ['loading', 'data'],
	data() {
		return {
			rules: {
				name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
			},
		};
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit('onSubmit', this.data);
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
	.footer {
		text-align: right;
	}
}
</style>