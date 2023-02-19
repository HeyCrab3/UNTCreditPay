<template>
    <van-nav-bar title="转账" left-arrow @click-left="goBack"/>
    <van-tabs style="height: 100%" :active="0" animated>
        <van-tab title="通过论坛 UID 转账" >
            <el-input @focus="show = true" v-model="bbsid" placeholder="论坛用户 ID">
                <template #prefix>
                    <el-icon class="el-input__icon"><user-filled /></el-icon>
                </template>
            </el-input>
        </van-tab>
        <van-tab title="通过钱包号转账" >
            
        </van-tab>
    </van-tabs>
</template>
<style>
.van-tab__panel{
    padding: 20px;
    height: 100%;
}
.van-tabs__content{
    height: 100%;
}
</style>
<script lang="ts" setup>
import router from '../../router';
import Axios from 'axios';
import { ref } from 'vue';
import { GetCookie } from '../../../modules/CookieHelper';
import { isPassedVerifictionInt, GetStatusCode } from '../../../modules/StatusCodeParser';
import { ElMessage } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue';
let bbsid = ref(null);
let show = ref(false);
const goBack = () => {
    router.push('/');
}
Axios({
    url: '/devapi/account/user/verifyCodeV2',
    headers: {'Authorization': GetCookie('access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    if (result == true){
        console.log('OK')
    }else{
        ElMessage.warning('登录已失效，请重新登录')
        router.push('login')
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步登录数据: ${error.message} (${error.code})`)
})
</script>