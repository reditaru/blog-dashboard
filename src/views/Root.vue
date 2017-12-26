<template lang="html">
    <el-container>
        <el-header>

        </el-header>
        <el-container>
            <el-aside></el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default{
        name:'Root'
    }
</script>
<style>
    .el-aside{
        width:15%
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
</style>