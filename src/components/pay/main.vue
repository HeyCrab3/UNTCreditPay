<style>
#app{ background: #FFF;}
</style>
<template>
    <div v-loading="loading">
        <div class="header">
            <h2 style="margin: 0">UNT Credit Pay</h2><br/>
            <span>由 粉末信用点发行中心 提供服务 <el-tag type="primary">测试版</el-tag></span>
        </div>
        <el-backtop :right="100" :bottom="100" />
        <el-scrollbar>
            <div class="scrollbar-flex-content">
                <span style="font-size: var(--el-font-size-extra-large)">我的信用点钱包</span>
                <div class="credit-card">
                    <img src="/card.png" style="display: block; float: right; width: 50px" alt="卡面"/>
                    <span style="font-size: var(--el-font-size-extra-large)">用户名</span><br/>
                    <span style="font-size: var(--el-font-size-medium)">4003111111111111</span>
                    <div id="card-info">
                        <span style="font-size: var(--el-font-size-medium)">可用余额</span><br/>
                        <span style="font-size: var(--el-font-size-extra-large)">370117.1</span><span style="font-size: var(--el-font-size-small)">信用点</span>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <van-tabbar route bind:change="onChange">
            <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item to="services" icon="add-o">服务</van-tabbar-item>
            <van-tabbar-item to="user" icon="user-circle-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<style>
.crab-card{
    width: 80%;
    height: 80%;
    margin-top: 20px;
    margin-left: 20px;
    box-shadow: 0px 0px 10px #bbbbbb;
    border-radius: 10px;
    padding: 10px;
}
.credit-card{
    margin: auto;
    width: 90%;
    height: 200px;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: 0px 0px 10px #bbbbbb;
    background: #ca3030;
    padding: 20px;
}
@media (min-width: 300px){
    #card-info{
        margin-top: 35%
    }
}
@media (min-width: 400px){
    #card-info{
        margin-top: 30%
    }
}
@media (min-width: 500px){
    #card-info{
        margin-top: 25%
    }
}
.credit-card span{
    color: #FFF;
}
.header{
    padding: 20px;
    width: 100%;
}
.crab-card .el-icon{
    font-size: 5em;    
    margin-top: 30%
}
.crab-card h2{
    margin-top: 10px;
}
.crab-card-primary{
    background: #FF4444;
    box-shadow: 0px 0px 10px #ff9191;
    color: #FFF
}
.scrollbar-flex-content{
    padding: 20px;
}
</style>
<script setup>
import { Money } from '@element-plus/icons-vue';
import Axios from 'axios'
import { ref } from 'vue'
import { GetCookie } from '../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import router from '../router';
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { ElMessage } from 'element-plus';
let loading = ref(true)
const goPay = () => {
    router.push('pay')
}
Axios({
    url: '/devapi/account/user/verifyCode',
    headers: {'Authorization': GetCookie('access_token')}
})
.then(function(Response){
    var result = isPassedVerifictionInt(GetStatusCode(Response),200)
    if (result == true){
        console.log('登录态正常')
    }else{
        ElMessage.warning('登录已失效，请重新登录')
        showFailToast(Response['data']['msg'])
        router.push('login')
    }
    loading.value = false;
})
.catch(function(error){
    ElMessage.error(`错误: ${error.message} (${error.code})`)
    showFailToast(`错误: ${error.message} (${error.code})`)
})
</script>