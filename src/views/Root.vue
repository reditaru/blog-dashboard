<template lang="html">
    <el-container class="main-container">
        <el-header class="main-header">
            <a :href="mail"><img :src="user.avatar"  alt="" class="avatar"></a>
            <el-dropdown trigger="click" @command="handleCommand" :show-timeout="50">
                <span class="el-dropdown-link">
                    {{user.name}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside>
                    <el-menu
                            default-active="1"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span>文章</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-news"></i>
                            <span slot="title">标签</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <span slot="title">目录</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">设置</span>
                        </el-menu-item>
                    </el-menu>
            </el-aside>
            <el-main>
                <transition name="slide">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import {mapState} from 'vuex'
    import {TYPES} from '../models/types'
    export default{
        name:'Root',
        computed:{
            ...mapState({
                user:state=>state.user.user
            }),
            mail(){
                return `mailto:${this.user.email}`;
            }
        },
        methods:{
            handleCommand(command){
                console.log(this.user)
                switch (command){
                    case'logout':
                        this.$store.dispatch(TYPES.auth.actions.logout,{id:this.user.id},{root:true})
                        break;
                }
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .main-container{
        .el-container{
            .el-aside{
                background-color: #545c64;
            }
        }
    }
    .main-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        text-align: right;
        .el-dropdown-link {
            cursor: pointer;
            i{
                color: #409EFF;
            }
        }
        .avatar{
            height: 24px;
            width:  24px;
            border-radius: 50%;
        }
    }
</style>