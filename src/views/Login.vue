<template lang="html">

    <div class="login">
        <h1 class="title">Reditaru Blog</h1>
        <el-alert :title="msg" type="error" v-show="!loading&&!status" show-icon></el-alert>
        <LoginForm @onSubmit="submit" :loading="loading"></LoginForm>
    </div>
</template>

<script>
    import LoginForm from '../components/auth/LoginForm.vue'
    import {TYPES} from '../models/types'
    import {mapState} from 'vuex'
    export default{
        name:'Login',
        data(){
            return{
            }
        },
        computed:{
            ...mapState({
                loading:state=>state.auth.loading,
                status:state=>state.auth.status,
                msg:state=>state.auth.msg,
            })
        },
        components: {
            LoginForm
        },
        methods:{
            submit({username,password}){
                console.log(username,password)
                this.$store.dispatch(TYPES.auth.actions.login,{username,password},{root:true})
            }
        }
    }
</script>
<style lang="less">
    .login{
        text-align: center;
        margin:120px auto;
        width:312px;
        .el-alert{
            margin-bottom: 5px;
        }
    }
</style>