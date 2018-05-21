<template lang="html">
    <div>
        <el-button type="success" @click="openDialog('create')" size="mini">创建</el-button>
        <Table :columns="columns" :data="tags" @edit="edit" @delete="remove"></Table>
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogVisible"
                   width="40%"
                   :show-close="false"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false">
            <SingleNameForm :loading="loading"
                            @hideDialog="dialogVisible = false"
                            @onSubmit="handle"
                            :data="data"
                            :operation="operation"
            ></SingleNameForm>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Table from '../../components/common/DefaultOperationTable.vue';
import SingleNameForm from '../../components/common/SingleNameForm.vue';
import { TYPES } from '../../models/types';
export default {
	name: 'Tags',
	data() {
		return {
			data: {
				id: 0,
				name: '',
			},
			dialogVisible: false,
			operation: '',
			columns: [{ prop: 'id', label: 'id' }, { prop: 'name', label: '名字' }],
		};
	},
	computed: {
		...mapState({
			tags: state => {
				return Object.values(state.tag.tags);
			},
			loading: state => state.tag.loading,
			status: state => state.tag.status,
			msg: state => state.tag.msg,
		}),
		dialogTitle() {
			return this.operation === 'create' ? '创建标签' : '编辑标签';
		},
	},
	components: {
		Table,
		SingleNameForm,
	},
	methods: {
		edit(row) {
			let info = this.tags.filter(item => item.id === row.id)[0];
			if (info) {
				let data = {};
				data.id = info.id;
				data.name = info.name;
				this.openDialog('update', { data });
			}
		},
		remove(row) {
			this.$store.dispatch(TYPES.tag.actions.DELETE_TAG, { id: row.id }, { root: true }).then(() => {
				if (!this.status) this.$message.error(this.msg);
			});
		},
		handle(data) {
			let params = data;
			let id = data.id;
			delete data['id'];
			if (this.operation === 'create') {
				this.$store.dispatch(TYPES.tag.actions.CREATE_TAG, { tag: params }, { root: true }).then(() => {
					this.dialogVisible = false;
					if (!this.status) this.$message.error(this.msg);
				});
			} else {
				this.$store.dispatch(TYPES.tag.actions.UPDATE_TAG, { id: id, tag: params }, { root: true }).then(() => {
					this.dialogVisible = false;
					if (!this.status) this.$message.error(this.msg);
				});
			}
		},
		openDialog(operation, payload) {
			if (operation === 'create') {
				this.data = {
					id: 0,
					name: '',
				};
			} else {
				this.data = payload.data;
			}
			this.dialogVisible = true;
			this.operation = operation;
		},
	},
};
</script>