<template lang="html">
    <div>
        <el-button type="primary" @click="dialogVisible = true" size="mini">编辑</el-button>
        <el-table :data="config">
            <el-table-column  v-for="(column,index) in columns"
                              :prop="column.prop"
                              :label="column.label"
                              :key="index"
                              :width="column.width"
                              :min-width="column.minWidth"
                              :formatter="column.formatter"
            >
            </el-table-column>
        </el-table>
        <el-dialog title="编辑配置"
                   :visible.sync="dialogVisible"
                   width="70%"
                   :show-close="false"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false">
            <ConfigForm :loading="loading"
                            @hideDialog="dialogVisible = false"
                            @onSubmit="handle"
                            :config="rawData"
            ></ConfigForm>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ConfigForm from '../../components/config/ConfigForm.vue'
    import {TYPES} from '../../models/types'
    export default{
        name:'Config',
        data(){
            return {
                dialogVisible:false,
                columns:[{prop:'key',label:'键'},{prop:'value',label:'值'}]
            }
        },
        computed:{
            ...mapState({
                rawData:state=>state.config.config,
                loading:state=>state.config.loading,
                status:state=>state.config.status,
                msg:state=>state.config.msg,
            }),
            config(){return Object.keys(this.rawData).filter(k=>k!=='id').map(k => {return {key:k,value:this.rawData[k]}})},
        },
        methods:{
            handle(data){
                delete data['id'];
                this.$store.dispatch(TYPES.config.actions.UPDATE_CONFIG,{config:data},{root:true}).then(()=> {
                    this.dialogVisible = false;
                    if(!this.status)
                        this.$message.error(this.msg)
                });
            }
        },
        components:{
            ConfigForm
        }
    }
</script>