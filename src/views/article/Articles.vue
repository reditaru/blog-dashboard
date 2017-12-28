<template lang="html">
    <div>
        <el-button type="success" @click="openDialog('create')" size="mini">创建</el-button>
        <Table :columns="columns" :data="articles" @edit="edit" @delete="remove"></Table>

        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogVisible"
                   width="70%"
                   :show-close="false"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false">
            <ArticleForm :loading="loading"
                         :categories="categories"
                         :tags="tags"
                         @hideDialog="dialogVisible = false"
                         @onSubmit="handle"
                         :article="article"
                         :operation="operation"
                        ></ArticleForm>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Table from '../../components/common/DefaultOperationTable.vue'
    import ArticleForm from '../../components/article/ArticleForm.vue'
    import {TYPES} from '../../models/types'
    export default{
        name:'Articles',
        data(){
          return {
              article:{
                  title:'',
                  summary:'',
                  content:'',
                  category:'',
                  tags:[]
              },
              columns:[{prop:'title',label:'标题',minWidth:"200"},
                  {prop:'category.name',label:'目录',type:"label"},
                  {prop:'tags',label:'标签',formatter(r,c,v){return v.map(i=>i.name).join(',')}},
                  {prop:'createdAt',label:'创建于',width:"150",formatter(r,c,v){return new Date(v).toDateString()}},
                  {prop:'readCount',label:'阅读量',width:"70"},
                  {prop:'commentCount',label:'评论数',width:"70"},
                  {prop:'updatedAt',label:'更新于',width:"150",formatter(r,c,v){return new Date(v).toDateString()}}],
              dialogVisible:false,
              operation:'',
          }
        },
        computed:{
            ...mapState({
                    articles:state=>{return Object.values(state.article.articles)},
                    user:state=>state.user.user,
                    categories:state=>{return Object.values(state.category.categories).map((item)=>{return{value:item.id,label:item.name}})},
                    tags:state=>{return Object.values(state.tag.tags).map((item)=>{return{value:item.id,label:item.name}})},
                    loading:state=>state.article.loading,
                    status:state=>state.article.status,
                    msg:state=>state.article.msg,
                }),
            dialogTitle(){
                return this.operation ==='create'? '创建文章':'编辑文章';
            }
        },
        components:{
            Table,ArticleForm
        },
        methods:{
            edit(row){
                this.$store.dispatch(TYPES.article.actions.GET_ARTICLE,{id:(row.id)},{root:true}).then(()=>{
                    let info = this.articles.filter(item=>item.id===row.id)[0];
                    if(info){
                        let article ={};
                        article.id = info.id;
                        article.title = info.title;
                        article.summary = info.summary;
                        article.category = info.category.id;
                        article.content = info.content;
                        article.tags = info.tags.map(i=>i.id);
                        this.openDialog('update',{article})
                    }
                    }
                )
            },
            remove(row){
                this.$store.dispatch(TYPES.article.actions.DELETE_ARTICLE,{id:(row.id)},{root:true}).then(()=>{
                    if(!this.status)
                        this.$message.error(this.msg)
                })
            },
            handle(article){
                let params = article;
                let id = article.id;
                delete article['id'];
                params.author = this.user.id;
                if(this.operation==='create'){
                    this.$store.dispatch(TYPES.article.actions.CREATE_ARTICLE,{article:params},{root:true}).then(()=> {
                        this.dialogVisible = false;
                        if(!this.status)
                            this.$message.error(this.msg)
                    })
                }else{
                    this.$store.dispatch(TYPES.article.actions.UPDATE_ARTICLE,{id:id,article:params},{root:true}).then(()=> {
                        this.dialogVisible = false;
                        if(!this.status)
                            this.$message.error(this.msg)
                    })
                }
            },
            openDialog(operation,payload){
                if(operation==='create'){
                    this.article = {
                        id:0,
                        title:'',
                        summary:'',
                        content:'',
                        category:'',
                        tags:[]
                    }
                }else{
                    this.article = payload.article;
                }
                this.dialogVisible = true;
                this.operation = operation;
            }
        }
    }
</script>