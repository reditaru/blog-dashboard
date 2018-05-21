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
                    <el-menu :router="true"
                            :default-active="$route.path"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="/articles">
                            <i class="el-icon-document"></i>
                            <span slot="title">文章</span>
                        </el-menu-item>
                        <el-menu-item index="/categories">
                            <i class="el-icon-menu"></i>
                            <span slot="title">目录</span>
                        </el-menu-item>
                        <el-menu-item index="/tags">
                            <i class="el-icon-news"></i>
                            <span slot="title">标签</span>
                        </el-menu-item>
                        <el-menu-item index="/config">
                            <i class="el-icon-setting"></i>
                            <span slot="title">设置</span>
                        </el-menu-item>
                    </el-menu>
            <el-main>
                    <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import { mapState } from 'vuex';
import { TYPES } from '../models/types';
export default {
	name: 'Root',
	data() {
		return {
			activeLink: null,
		};
	},
	computed: {
		...mapState({
			user: state => state.user.user,
		}),
		mail() {
			return `mailto:${this.user.email}`;
		},
	},
	methods: {
		handleCommand(command) {
			switch (command) {
				case 'logout':
					this.$store.dispatch(TYPES.auth.actions.logout, { id: this.user.id }, { root: true });
					break;
			}
		},
	},
};
</script>
<style lang="less" rel="stylesheet/less">
.main-container {
	.el-container {
		.el-menu {
			padding-top: 20px;
			border: 0;
		}
		.el-main {
			overflow-y:hidden;
			.collapse-icon {
				font-size: 18px;
				cursor: pointer;
			}
		}
	}
}
.main-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
	text-align: right;
	.el-dropdown-link {
		cursor: pointer;
		i {
			color: #409eff;
		}
	}
	.avatar {
		height: 24px;
		width: 24px;
		border-radius: 50%;
	}
}
</style>