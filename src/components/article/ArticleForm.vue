<template lang="html">
    <el-form :model="article" :rules="rules" ref="article" label-width="80px" size="mini">
        <el-form-item label="标题" prop="title" >
            <el-input v-model="article.title" @keyup.enter="onSubmit('article')"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
            <el-input type="textarea" v-model="article.summary" @keyup.enter="onSubmit('article')"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="article.content" @keyup.enter="onSubmit('article')"></el-input>
        </el-form-item>
        <el-form-item label="目录" prop="category" >
            <el-select v-model="article.category" placeholder="请选择目录" class="category">
                <el-option
                        v-for="item in categories"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags" >
            <el-select v-model="article.tags" placeholder="请选择标签" multiple class="tags">
                <el-option
                        v-for="item in tags"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="footer">
            <el-button type="success" @click="onSubmit('article')" :loading="loading" >保存</el-button>
            <el-button @click="cancel" :disabled="loading">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
	name: 'ArticleForm',
	props: ['loading', 'categories', 'tags', 'article', 'operation'],
	data() {
		return {
			rules: {
				title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
				summary: [{ required: true, message: '请输入摘要', trigger: 'blur' }],
				content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
				category: [
					{ required: true, message: '请选择目录', trigger: 'blur' },
					{ type: 'number', message: '请选择目录' },
				],
				tags: [
					{ required: true, message: '请选择标签', trigger: 'blur' },
					{ type: 'array', message: '请选择标签' },
				],
			},
		};
	},
	computed: {},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit('onSubmit', this.article);
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