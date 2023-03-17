<template>
    <van-nav-bar title="账单" left-arrow @click="goBack"/>
    <div class="billing-card" v-for="item in codeList">
        <h3 class="billing-header">{{ item['pay'] }}</h3>
        <span class="billing-info">{{ item['detail'] }}</span>
        <span class="billing-info">订单号 {{ item['_id'] }}</span>
        <span class="billing-info">{{ item['status'] }}</span>
        <span class="billing-info">{{ item['time'] }}</span>
        <span class="billing-amount">￥{{ item['value'] }} C</span>
    </div>
</template>
<style scoped>
.billing-card{
    margin: auto;
    width: 85%;
    border-radius: 5px;
    padding: 10px 25px 20px;
    box-shadow: 0px 0px 6px #cccccc;
    margin-top: 20px;
}
.billing-info{
    display: block;
    margin-top: 5px;
    color: #666666
}
.billing-amount{
    display: block;
    font-size: 1.5rem;
    margin-top: 10px;
    color: #0080e9;
}
</style>
<script lang="ts" setup>
import { Money, Coin, Tickets, Service } from '@element-plus/icons-vue';
import Axios from 'axios'
import { ref } from 'vue'
import { GetCookie } from '../../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../../modules/StatusCodeParser';
import router from '../../router';
import { showLoadingToast, showSuccessToast, showFailToast, closeToast, showDialog } from 'vant'
import { ElMessage } from 'element-plus';
import { Dictionary } from 'lodash';
import { timePanelSharedProps } from 'element-plus/es/components/time-picker/src/props/shared';
let username = ref('****')
let userAvatar = ref(null)
let codeList = ref([])
showLoadingToast('正在获取用户数据')
const goBack = () => {
    router.push('/#/');
}
Axios({
    method: 'POST',
    url: '/apiv2/getBilling',
    data: {'access_token': GetCookie('access_token')}
})
.then(function(Response){
    const result = isPassedVerifictionInt(GetStatusCode(Response), 0)
    if (result == true){
        console.log('OK')
        var list = []
        var a = JSON.parse(Response['data']['data'])
        console.log(a)
        for (var i = 0; i < a.length; i++){
            var b = new Date(a[i]['time'] * 1000)
            console.log(a[i])
            var data = {
                '_id': a[i]['_id']['$oid'],
                'owner': a[i]['owner'],
                'value': a[i]['value'],
                'pay': a[i]['pay_to'],
                'detail': a[i]['detail'],
                'status': a[i]['status'],
                'time': b.toLocaleString()
            }
            list.push(data)
        }
        codeList.value = list
        console.log(codeList)
    }else{
        showFailToast('发生意外错误')
    }
})
.catch(function(error){
    showDialog({
        title: '发生了意外错误',
        message: '发生了意外错误，点击确定刷新页面\n' + error
    }).then(() => {window.location.reload()})
})

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