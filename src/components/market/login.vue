<template>
    <div class="login1">
        <div class="login-box">
            <img src="/ueg-logo.png" style="width: 75px;" alt="unt logo"/>
            <div class="login-main">
                <h2 style="font-size: 1.5rem">欢迎登录</h2>
                <el-button size="large" style="width: 100%">社区授权登录</el-button>
                <el-divider>或者</el-divider>
                <el-input :disabled="isLoading" size="large" v-model="email" placeholder="电子邮箱地址" type="email" clearable :prefix-icon="User"/>
                <el-input :disabled="isLoading" size="large" v-model="password" placeholder="密码" type="password" show-password clearable :prefix-icon="Lock"/>
                <div id="captcha" style="margin-top: 20px; width: 100%"/>
                <el-button @click="login" :loading="isLoading" size="large" type="primary" style="width: 100%; margin-top: 20px;">登录</el-button>
            </div>
        </div>
    </div>
</template>
<style>
    .login1{
        width: 100%;
        height: 100%;
        background: url(/bg.jpg) no-repeat;
        background-size: cover;
    }
    .login-box{
        float: right;
        height: 100%;
        transition: 2s;
        padding: 20px;
    }
    .login-main{
        margin-top: 30%;
    }
    .login-main .el-input{
        margin-top: 10px;
    }
    @media (max-width: 899px){
        .login-box{
            width: 100%;
            background: #FFF;
        }
    }
    @media (min-width: 900px){
        .login-box{
            width: 80%;
            background: #FFF;
            /* background: #ffffffda;
            backdrop-filter: blur(25px); */
        }
    }
    @media (min-width: 1000px){
        .login-box{
            width: 60%;
        }
    }
    @media (min-width: 1100px){
        .login-box{
            width: 40%;
        }
    }
    @media (min-width: 1300px){
        .login-box{
            width: 35%;
        }
    }
    @media (min-width: 1500px){
        .login-box{
            width: 30%;
        }
    }
    @media (min-width: 1700px){
        .login-box{
            width: 25%;
        }
    }
</style>
<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { SetCookie } from '../../modules/CookieHelper';
import { isPassedVerifictionInt, GetStatusCode } from '../../modules/StatusCodeParser';
import router from '../router';
let email = ref(null)
let password = ref(null)
let captchaData = ref(null)
let isLoading = ref(false)
document.title = "商家登录 | CreditPay"
initGeetest4({
    captchaId: '5666833fd0cffc1ec7b2ec903bfffcd9',
    product: 'float'
},function (captcha) {
    window.captcha = captcha;
    captcha.appendTo("#captcha");
    captcha.onSuccess(function(){
        captchaData.value = captcha.getValidate();
    })
});

const login = () => {
    isLoading.value = true;
    if (captchaData.value ==  null){
        ElMessage.error('请先完成验证码！')
        isLoading.value = false;
    }else{
        axios({
            url: '/devapi/account/user/login',
            method: 'POST',
            data: {
                user: email.value,
                password: password.value,
                lot_number: captchaData.value.lot_number,
                captcha_id: '5666833fd0cffc1ec7b2ec903bfffcd9',
                captcha_output: captchaData.value.captcha_output,
                pass_token: captchaData.value.pass_token,
                gen_time: captchaData.value.gen_time
            }
        })
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            isLoading.value = false;
            if (result == true){
                ElMessage.success('登陆成功')
                SetCookie('waq-access_token', Response['data']['data']['token'])
                SetCookie('waq-timestamp', Date.now())
                SetCookie('wap-logreporter',true)
                router.push('home')
            }else{
                ElMessage.error(Response['data']['msg'])
                window.captcha.reset();
            }
        })
        .catch(function(error){
            ElMessage.error(`错误: ${error.message} (${error.code})`)
            isLoading.value = false;
        })
    }
}
</script>