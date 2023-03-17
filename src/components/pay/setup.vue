<template>
    <div id="head" style="text-align: center; margin-top: 40px; "><img style="width: 150px" src="/newcard.svg" alt="设置卡片"/></div>
        <div id="setup">
            <div class="mdui-typo"><h3>设置你的新信用点账号</h3></div>
            <div class="mdui-typo"><p>欢迎使用 Credit Pay</p></div>
            <div style="margin-top: 30px">
                <p style="font-size: var(--el-font-size-medium)">选择一种卡面</p>
                <div class="credit-card">
                    <img src="/card.png" style="display: block; float: right; width: 50px" alt="卡面"/>
                </div>
                <p>UNT蓝</p>
            </div>
            <div id="top" style="text-align: left;">
                <el-checkbox v-model="isAgree" label="我同意用户协议和隐私政策"/>
            </div>
            <div id="top">
                当您点击领卡时，我们视为您知悉并同意我们的<el-link target="_blank" type="primary" style="margin-top: -2px" size="small"  href="https://bbs.ungov.net/help/contract/">用户协议</el-link>和<el-link target="_blank" type="primary" style="margin-top: -2px;" size="small"  href="https://bbs.ungov.net/help/privacy-policy/">隐私政策</el-link>，并且知悉并允许我们可能将您的部分数据传输至您居住地所在国家（地区）之外的区域处理。
            </div>
            <div id="top">
                <el-button @click="getMyCard" :disabled="!isAgree" size="large" style="width: 100%" type="primary">立即开卡</el-button>
            </div>
        </div>
</template>
<script lang="ts" setup>
import Axios from 'axios';
import { ElMessage } from 'element-plus';
import { closeToast, showFailToast, showLoadingToast, showSuccessToast } from 'vant';
import { ref } from 'vue';
import { GetCookie } from '../../modules/CookieHelper';
import { isPassedVerifictionInt, GetStatusCode } from '../../modules/StatusCodeParser';
import router from '../router';
const isAgree = ref(false)
const getMyCard = () =>{
    showLoadingToast({
        message: '正在处理，请等待',
        forbidClick: true,
        duration: 0
    })
    Axios({
        method: 'POST',
        url: '/apiv2/setup',
        data: {'access_token': GetCookie('access_token'), 'cardBg': 1}
    })
    .then(function(Response){
        const result = isPassedVerifictionInt(GetStatusCode(Response), 0)
        closeToast()
        if (result == true){
            showSuccessToast('操作成功')
            router.push('/')
        }else{
            showFailToast(Response.data['msg'])
        }
    })
    .catch(function(error){
        ElMessage.error(`操作失败: ${error.message} (${error.code})`)
    })
}
</script>
<style scoped>
@keyframes setup{
    from{
        margin-top: -100%;
    }
    to{
        margin-top: 20px;
    }
}
@keyframes icon1{
    from{
        margin-top: -100%
    }
    to{
        margin-top: 20px;
    }
}
.el-checkbox__label{
    width: 60%;
}
#head{
    animation-name: icon1; 
    animation-duration: 3s;
}
#setup{
    animation-name: setup;
    animation-duration: 3s;
    margin-top: 20px;
    text-align: center;
}
#top{
    padding: 10px 20px;
}
.credit-card{
    margin: auto;
    width: 60%;
    height: 150px;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: 0px 0px 10px #bbbbbb;
    background: #008aff;
    padding: 20px;
}
</style>