<style>
#app{ background: #FFF;}
</style>
<template>
    <div>
        <div class="header">
            <h2 style="margin: 0">UNT Credit Pay</h2><br/>
            <span>由 粉末信用点发行中心 提供服务 <el-tag type="primary">测试版</el-tag></span>
        </div>
        <el-backtop :right="100" :bottom="100" />
        <el-scrollbar>
            <div class="scrollbar-flex-content">
                <!-- Bye -->
                <!-- <span style="font-size: 1.75rem">你好，领航员</span> -->
                <span style="font-size: var(--el-font-size-extra-large); display: block; margin-top: 0;">我的信用点钱包</span>
                <div class="credit-card">
                    <img src="/card.png" style="display: block; float: right; width: 50px" alt="卡面"/>
                    <span style="font-size: var(--el-font-size-extra-large)"> {{ username }} </span><br/>
                    <span style="font-size: var(--el-font-size-medium)"> {{ card }} </span>
                    <div id="card-info">
                        <span style="font-size: var(--el-font-size-medium)">可用余额</span><br/>
                        <span style="font-size: var(--el-font-size-extra-large)"> {{ balance }} </span><span style="font-size: var(--el-font-size-small)"> 信用点</span>
                    </div>
                </div>
                <div id="services">
                    <span style="font-size: var(--el-font-size-extra-large)">我的服务</span>
                    <div class="card-group">
                        <div @click="go('pay')"  class="service-card"><el-icon><Coin /></el-icon>收付款</div>
                        <div @click="go('exchange')" class="service-card"><el-icon><Money /></el-icon>转账</div>
                        <div @click="go('list')" class="service-card"><el-icon><Tickets /></el-icon>账单</div>
                        <div class="service-card"><el-icon><Service /></el-icon>客服</div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <van-tabbar route bind:change="onChange">
            <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item to="/services" icon="add-o">服务</van-tabbar-item>
            <van-tabbar-item to="/user" icon="user-circle-o">我的</van-tabbar-item>
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
.card-group{
    display: flex;
}
.service-card{
    cursor: pointer;
    margin-top: 20px;
    width: 90%;
    height: 100px;
    padding: 10px;
    background: #008aff;
    color: #FFF;
    text-align: center;
    border-radius: 10px;
    margin-right: 10px;
    box-shadow: 0px 0px 5px #bbbbbb;
}
#services{
    margin-top: 20px;
}
.credit-card{
    margin: auto;
    width: 90%;
    height: 200px;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: 0px 0px 10px #bbbbbb;
    background: #008aff;
    padding: 20px;
}
/* 以下为自适应布局 */
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
@media (min-width: 600px){
    #card-info{
        margin-top: 20%
    }
}
@media (min-width: 700px){
    #card-info{
        margin-top: 15%
    }
}
@media (min-width: 800px){
    #card-info{
        margin-top: 10%
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
.service-card .el-icon{
    display: block;
    font-size: 2.5rem;
    text-align: center;
    margin: auto;
    margin-bottom: 30px;
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
<script lang="ts" setup>
import { Money, Coin, Tickets, Service } from '@element-plus/icons-vue';
import Axios from 'axios'
import { VerifySessionV2, GetUserBasicInfo } from '../../modules/AccountProvider';
import { isPassedVerifictionInt, GetStatusCode } from '../../modules/StatusCodeParser'
import { ref } from 'vue'
import { GetCookie } from '../../modules/CookieHelper';
import router from '../router';
import { showLoadingToast, showSuccessToast, showFailToast, closeToast } from 'vant'
import { ElMessage } from 'element-plus';
let username = ref('****')
let card = ref('***')
let balance = ref(undefined)
showLoadingToast('正在获取用户数据')

function _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
}

if (!_isMobile()) {
      router.replace('/agent');
} else {
      console.log('ok')
}

Axios({
    method: 'POST',
    url: '/apiv2/getCardInfo',
    data: {'access_token': GetCookie('access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 0)
    if (result == true){
        console.log(result)
        card.value = Response.data['data']['cardNo']
        balance.value = Response.data['data']['balance']
    }else{
        const result1 = isPassedVerifictionInt(GetStatusCode(Response), 404)
        if (result1 == true){
            showFailToast('账号未初始化')
            router.push('setup')
        }else{
            showFailToast('卡片数据同步失败，请联系管理员')
        }
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步卡片数据: ${error.message} (${error.code})`)
})

const go = (url: string) => {
    router.push(url)
}
Axios({
    url: '/devapi/account/user/verifyCodeV2',
    headers: {'Authorization': GetCookie('access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    if (result == true){
        console.log('OK')
        closeToast(true)
    }else{
        showFailToast('登录已失效，请重新登录')
        router.push('login')
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步登录数据: ${error.message} (${error.code})`)
})
Axios({
    url: '/devapi/account/user/getUserInfoV2',
    headers: {'Authorization': GetCookie('access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    if (result == true){
        console.log(Response['data'])
        username.value = Response.data.data.nickname + ` (UID ${Response.data.data.uuid})`
    }else{
        ElMessage.warning('当前不能同步登录数据: ' + Response['data']['msg'])
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步用户数据: ${error.message} (${error.code})`)
})
</script>