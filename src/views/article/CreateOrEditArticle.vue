<template lang="html">
    <el-form :model="article" :rules="rules" ref="article" label-width="80px" size="mini">
        <el-form-item label="标题" prop="title" >
            <el-input v-model="article.title"></el-input>
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
        <el-form-item class="summary" label="摘要" prop="summary">
            <el-input type="textarea" autosize v-model="article.summary"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <mavon-editor v-model="article.content"/>
        </el-form-item>
        <el-form-item class="footer">
            <el-button type="success" @click="onSubmit('article')" :loading="loading" >保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapState } from 'vuex';
import { TYPES } from '../../models/types';
export default {
	name: 'CreateOrEditArticle',
	data() {
		return {
			article: {
				id: 0,
				title: '',
				summary: '',
				content: '',
				category: '',
				tags: [],
			},
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
	computed: {
		...mapState({
			articles: state => {
				return Object.values(state.article.articles);
			},
			user: state => state.user.user,
			categories: state => {
				return Object.values(state.category.categories).map(item => {
					return { value: item.id, label: item.name };
				});
			},
			tags: state => {
				return Object.values(state.tag.tags).map(item => {
					return { value: item.id, label: item.name };
				});
			},
			loading: state => state.article.loading,
			status: state => state.article.status,
			msg: state => state.article.msg,
			operation: state => state.article.operation,
			editId: state => state.article.editId,
		}),
	},
	methods: {
		onSubmit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let params = this.article;
					let id = this.article.id;
					delete params['id'];
					params.author = this.user.id;
					if (this.operation === 'create') {
						this.$store
							.dispatch(TYPES.article.actions.CREATE_ARTICLE, { article: params }, { root: true })
							.then(() => {
								if (!this.status) this.$message.error(this.msg);
								this.$router.push('/articles');
							});
					} else {
						params.id = this.article.id;
						this.$store
							.dispatch(TYPES.article.actions.UPDATE_ARTICLE, { id: id, article: params }, { root: true })
							.then(() => {
								if (!this.status) this.$message.error(this.msg);
								this.$router.push('/articles');
							});
					}
				} else {
					this.$message.error('请合法填写相应字段');
					return false;
				}
			});
		},
	},
	mounted() {
		if (this.operation === 'create') {
			this.article = {
				id: 0,
				title: '',
				summary: '',
				content: '',
				category: '',
				tags: [],
			};
		} else {
			let article = this.articles.filter(item => item.id === this.editId)[0];
			let result = {};
			if (article) {
				this.article = {
					id: article.id,
					title: article.title,
					summary: article.summary,
					content: article.content,
					category: article.category.id,
					tags: article.tags.map(i => i.id),
				};
			}
		}
	},
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.el-form {
	.category,
	.tags {
		width: 100%;
	}
	.footer {
		text-align: right;
    }
    .summary .el-input {
        height: 80px;
    }
}
</style>