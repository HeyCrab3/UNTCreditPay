<style>
#app{ background: #FFF;}
</style>
<template>
    <div style="height: 100%;" v-loading="loading">
        <van-nav-bar title="安全中心" left-arrow @click-left="goBack"/>
        <van-cell-group>
            <van-cell is-link title="注销账户" />
        </van-cell-group>
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
<script setup>
import { Money, Coin, Tickets, Service } from '@element-plus/icons-vue';
import Axios from 'axios'
import { ref } from 'vue'
import { GetCookie } from '../../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../../modules/StatusCodeParser';
import router from '../../router';
import { showLoadingToast, showSuccessToast, showFailToast, closeToast } from 'vant'
import { ElMessage } from 'element-plus';
let username = ref('****')
let userAvatar = ref(null)
showLoadingToast('正在获取用户数据')
const goBack = () => {
    router.push('user');
}
const goPay = () => {
    router.push('pay')
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
        userAvatar.value = Response.data.data.headPortrait
    }else{
        ElMessage.warning('当前不能同步登录数据: ' + Response['data']['msg'])
    }
})
.catch(function(error){
    ElMessage.error(`当前不能同步用户数据: ${error.message} (${error.code})`)
})
</script>