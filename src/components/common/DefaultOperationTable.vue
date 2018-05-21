<template lang="html">
    <el-table :data="data" :cell-class-name="cellClass">
        <el-table-column  v-for="(column,index) in columns"
                          :prop="column.prop"
                          :label="column.label"
                          :key="index"
                          :width="column.width"
                          :min-width="column.minWidth"
                          :formatter="column.formatter"
                          >
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="150"
                key="operation">
            <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="primary" size="mini">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="danger" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
	name: 'Table',
	props: ['columns', 'data'],
	methods: {
		handleEdit(row) {
			this.$emit('edit', row);
		},
		handleDelete(row) {
			this.$emit('delete', row);
		},
		cellClass({ row, column, rowIndex, columnIndex }) {
			if (
				this.columns[columnIndex] &&
				this.columns[columnIndex].type &&
				column.property === this.columns[columnIndex].prop
			) {
				switch (this.columns[columnIndex].type) {
					case 'label':
						return 'tag';
				}
			}
		},
	},
};
</script>

<style lang="less" rel="stylesheet/less">
.tag {
	.cell {
		display: inline;
		border: 1px solid rgba(64, 158, 255, 0.2);
		background-color: rgba(64, 158, 255, 0.1);
		padding: 0 10px;
		border-radius: 4px;
		color: #409eff;
	}
}
</style>