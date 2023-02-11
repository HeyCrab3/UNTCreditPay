<template>
    <div id="bg">
        <div class="login-a" v-loading="loading">
            <img src="/unt-logo.png" alt="联合社区" style="max-width: 300px"/>
            <div class="v-margin-50 login-box">
                <h2>登录</h2>
                <h1 style="font-weight: 400">Credit<span style="color: rgba(173, 2, 2, 1)">P</span>ay 管理后台</h1>
                <el-input v-model="username" class="ep-input" size="large" type="email" placeholder="邮箱" :prefix-icon="User" />
                    <el-input  v-model="code" class="ep-input" size="large" placeholder="验证码" :prefix-icon="Lock" ><template #append><el-button @click="sendCode" size="large">发送验证码</el-button></template></el-input>
                    <div class="ep-input">
                        <el-button @click="LoginByCode" type="primary" style="width: 100%" size="large">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
#bg{
    background: url(/bg.jpg)
}
.login-a{
        width: 40%;
        float: right;
        height: 100%;
        text-align: left;
        padding: 20px;
        margin: 0;
        background-color: #FFF;
}
.login-box{
    max-width: 80%;
}
.ep-input{
        margin-top: 10px;
}
.v-margin-20{
    margin-left: 20px;
}
.v-margin-30{
    margin-left: 20px;
}
.v-margin-40{
    margin-left: 20px;
}
.v-margin-50{
    margin-left: 20px;
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import Axios from 'axios';
import router from '../../router';
import { GetStatusCode, isPassedVerifictionInt } from '../../../modules/StatusCodeParser.js'
import { SetCookie } from '../../../modules/CookieHelper.js'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { ElMessage, ElLoading } from 'element-plus'
const username = ref(null)
let loading = ref(false)
const code = ref(null)
initGeetest4({
    captchaId: '5666833fd0cffc1ec7b2ec903bfffcd9',
    product: 'bind'
}, function(captchaObj){
    window.captcha1 = captchaObj;
    captchaObj.onReady(function(){
        console.log('邮箱验证码 ok')
    }).onSuccess(function(){
        showLoadingToast('请稍等')
        loading.value = true;
        var result = captchaObj.getValidate();
        Axios.get(`/devapi/account/user/sendCode?value=${username.value}&captcha_id=5666833fd0cffc1ec7b2ec903bfffcd9&lot_number=${result.lot_number}&captcha_output=${result.captcha_output}&pass_token=${result.pass_token}&gen_time=${result.gen_time}`)
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            loading.value = false;
            if (result == true){
                showSuccessToast('验证码发送成功')
                ElMessage.success(Response['data']['msg'])
            }else{
                ElMessage.error(Response['data']['msg'])
                showFailToast(Response['data']['msg'])
                captchaObj.reset();
            }
        })
        .catch(function(error){
            ElMessage.error(`错误: ${error.message} (${error.code})`)
            showFailToast(`错误: ${error.message} (${error.code})`)
        })
    }).onError(function(){
        ElMessage.error(`验证码代码逻辑错误`)
        showFailToast('验证码代码逻辑错误')
    })
})
initGeetest4({
    captchaId: '5666833fd0cffc1ec7b2ec903bfffcd9',
    product: 'bind'
}, function(captchaObj){
    window.captcha2 = captchaObj;
    captchaObj.onReady(function(){
        console.log('登录验证码 ok')
    }).onSuccess(function(){
        loading.value = true;
        showLoadingToast('请稍等')
        var result = captchaObj.getValidate();
        var data = {
            user: username.value,
            code: code.value,
            lot_number: result.lot_number,
            captcha_id: '5666833fd0cffc1ec7b2ec903bfffcd9',
            captcha_output: result.captcha_output,
            pass_token: result.pass_token,
            gen_time: result.gen_time
        }
        loading.value = false;
        Axios.post('/devapi/account/user/loginCode', data)
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            if (result == true){
                showSuccessToast('登陆成功')
                ElMessage.success('登陆成功')
                SetCookie('wap-access_token', Response['data']['data']['token'])
                SetCookie('waq-timestamp', result.gen_time)
                SetCookie('wap-logreporter',true)
                router.push('index')
            }else{
                ElMessage.error(Response['data']['msg'])
                showFailToast(Response['data']['msg'])
                captchaObj.reset();
                code.value = null;
            }
        })
        .catch(function(error){
            ElMessage.error(`错误: ${error.message} (${error.code})`)
            showFailToast(`错误: ${error.message} (${error.code})`)
        })
    }).onError(function(){
        ElMessage.error(`验证码代码逻辑错误`)
        showFailToast('验证码代码逻辑错误')
    })
})
const sendCode = () => {
    window.captcha1.showCaptcha();
}
const LoginByCode = () => {
    window.captcha2.showCaptcha();
}
</script>