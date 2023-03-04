<template>
    <div class="login">
        <img src="/ueg-logo.png" style="width: 30%;" alt="UEG Logo" />
        <h2 style="text-align: center; font-weight: 400">Credit<span style="color: rgba(173, 2, 2, 1)">P</span>ay</h2>
        <van-tabs>
            <van-tab title="账号登录">
                <el-input :disabled="isLoading" v-model="username" class="ep-input" size="large" placeholder="信用点账号" :prefix-icon="User" />
                <el-input :disabled="isLoading" v-model="password" class="ep-input" size="large" type="password" placeholder="密码" :prefix-icon="Lock" />
                <div class="ep-input">
                    <el-button :loading="isLoading" type="primary" style="width: 100%" size="large" @click="Login">登录</el-button>
                </div>
            </van-tab>
        </van-tabs>
        <div class="ep-input" style="font-size: var(--el-font-size-small)">
            <span>或者</span>
        </div>
        <div class="ep-input">
            <el-button type="text">注册</el-button>
        </div>
        <div class="ep-input">
            <el-button type="text">忘记密码</el-button>
        </div>
        <div class="ep-input" style="font-size: var(--el-font-size-small)">
            <span>用户协议 </span>
            <span style="color: rgb(193,193,193)"> | </span>
            <span> 隐私政策</span>
        </div>
        <div class="ep-input" style="font-size: var(--el-font-size-small)">
            <span>©2058 United Earth Government</span>
        </div>
    </div>
</template>
<style>
    .login{
        margin: auto;
        text-align :center;
        padding: 20px;
        margin-top: 20%
    }
    .ep-input{
        margin-top: 10px;
    }
</style>
<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import Axios from 'axios';
import router from '../router';
import { LoginV2 } from '../../modules/AccountProvider'
import { SetCookie } from '../../modules/CookieHelper'
import { isPassedVerifictionInt, GetStatusCode } from '../../modules/StatusCodeParser'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { ElMessage, ElLoading } from 'element-plus'
import * as $ from 'jquery'
const username = ref(null)
const password = ref(null)
const isLoading = ref(false)
function _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
}

if (!_isMobile()) {
      router.replace('/agent');
} else {
      console.log('ok')
}
initGeetest4({
    captchaId: '5666833fd0cffc1ec7b2ec903bfffcd9',
    product: 'bind'
}, function(captchaObj){
    window.captcha2 = captchaObj;
    captchaObj.onReady(function(){
        console.log('登录验证码 ok')
    }).onSuccess(function(){
        isLoading.value = true;
        showLoadingToast({
            message: '正在登录',
            forbidClick: true
        });
        var result = captchaObj.getValidate();
        var data = {
            user: username.value,
            password: password.value,
            lot_number: result.lot_number,
            captcha_id: '5666833fd0cffc1ec7b2ec903bfffcd9',
            captcha_output: result.captcha_output,
            pass_token: result.pass_token,
            gen_time: result.gen_time
        }
        Axios.post('/devapi/account/user/login', data)
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            isLoading.value = false;
            if (result == true){
                showSuccessToast('登陆成功')
                SetCookie('access_token', Response['data']['data']['token'])
                SetCookie('waq-timestamp', Date.now())
                SetCookie('wap-logreporter',true)
                router.push('/')
            }else{
                showFailToast(Response['data']['msg'])
            }
        })
        .catch(function(error){
            showFailToast(`错误: ${error.message} (${error.code})`)
            isLoading.value = false;
        })
    }).onError(function(){
        showFailToast('验证码代码逻辑错误')
    })
})
const Login = () => {
    window.captcha2.showCaptcha();
}
</script>