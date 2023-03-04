<template>
    <el-container style="height: 100%">
        <el-aside>
            <el-scrollbar style="height: 100%">
                <el-menu router :default-active="route.path" style="height: 100%">
                    <el-menu-item disabled style="opacity: 1.0"><img style="height: 40px" src="/ueg-logo.png"/></el-menu-item>
                    <el-menu-item index="/market/home"><el-icon><House/></el-icon>主页</el-menu-item>
                    <el-menu-item index="1">1111111</el-menu-item>
                    <el-menu-item>1111111</el-menu-item>
                    <el-menu-item>1111111</el-menu-item>
                    <el-menu-item>1111111</el-menu-item>
                    <el-menu-item>1111111</el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <div class="flex-grow"></div>
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px"
                        ><setting
                        /></el-icon>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>{{username}}</span>
                </div>
            </el-header>
            <el-main>
                <el-scrollbar style="padding: 20px;">
                    <div class="mdui-typo"><h2>商户主页</h2></div>
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>业绩</span>
                                <el-button class="button" text>操作1</el-button>
                            </div>
                        </template>
                        114,514
                    </el-card>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>
<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  right: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-scrollbar .el-card{
    margin-top: 10px;
    max-width: 20%
}
.el-menu--collapse{
    width: 50px;
}
.el-scrollbar__view{
    height: 100%
}
.flex-grow{
    flex-grow: 1;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting, House } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import Axios from 'axios';
import { GetCookie, RemoveCookie } from '../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../router';
document.title = "商户主页 | CreditPay"
const username = ref(null)
const route = useRoute();

const logout = () => {
    ElMessageBox.confirm(
    '是否退出登录？',
    '注意',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '您已退出登录',
      })
      RemoveCookie('waq-access_token')
      router.push('/market/login')
    })
}

Axios({
    url: '/devapi/account/user/verifyCodeV2',
    headers: {'Authorization': GetCookie('waq-access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    if (result == true){
        console.log('OK')
    }else{
        ElMessage.warning('登录已失效，请重新登录')
        router.push('/market/login')
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步登录数据: ${error.message} (${error.code})`)
})
Axios({
    url: '/devapi/account/user/getUserInfoV2',
    headers: {'Authorization': GetCookie('waq-access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    if (result == true){
        console.log(Response['data'])
        username.value = Response.data.data.nickname + ` (UID ${Response.data.data.uuid})`
        userAvatar.value = Response.data.data.headPortrait
    }else{
        ElMessage.warning('当前不能同步登录数据: ' + Response['data']['msg'])
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步用户数据: ${error.message} (${error.code})`)
})

</script>