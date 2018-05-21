<template lang="html">
    <div>
        <el-button type="success" @click="create" size="mini">创建</el-button>
        <Table :columns="columns" :data="articles" @edit="edit" @delete="remove"></Table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Table from '../../components/common/DefaultOperationTable.vue';
import { TYPES } from '../../models/types';
export default {
	name: 'Articles',
	data() {
		return {
			columns: [
				{ prop: 'title', label: '标题', minWidth: '200' },
				{ prop: 'category.name', label: '目录', type: 'label' },
				{
					prop: 'tags',
					label: '标签',
					formatter(r, c, v) {
						return v.map(i => i.name).join(',');
					}
				},
				{
					prop: 'createdAt',
					label: '创建于',
					width: '150',
					formatter(r, c, v) {
						return new Date(v).toDateString();
					}
				},
				{ prop: 'readCount', label: '阅读量', width: '70' },
				{ prop: 'commentCount', label: '评论数', width: '70' },
				{
					prop: 'updatedAt',
					label: '更新于',
					width: '150',
					formatter(r, c, v) {
						return new Date(v).toDateString();
					}
				},
			]
		};
	},
	computed: {
		...mapState({
			articles: state => {
				return Object.values(state.article.articles).sort((a, b) => { return b.id - a.id; });
			},
			msg: state => state.article.msg,
			status: state => state.article.status
		})
	},
	components: {
		Table
	},
	methods: {
		edit(row) {
			this.$store.dispatch(TYPES.article.actions.GET_ARTICLE, { id: row.id }, { root: true }).then(() => {
				this.$store.commit(TYPES.article.mutations.SET_EDIT_ID, { editId: row.id }, { root: true });
				this.$store.commit(TYPES.article.mutations.SET_OPERATION, { operation: 'edit' }, { root: true });
				this.$router.push('/post');
			});
		},
		remove(row) {
			this.$store.dispatch(TYPES.article.actions.DELETE_ARTICLE, { id: row.id }, { root: true }).then(() => {
				if (!this.status) this.$message.error(this.msg);
			});
		},
		create() {
			this.$store.commit(TYPES.article.mutations.SET_OPERATION, { operation: 'create' }, { root: true });
			this.$router.push('/post');
		}
	}
};
</script>