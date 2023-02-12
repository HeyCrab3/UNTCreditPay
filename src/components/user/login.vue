<template>
    <div class="login">
        <img src="/ueg-logo.png" style="width: 30%;" alt="UEG Logo" />
        <h2 style="text-align: center; font-weight: 400">Credit<span style="color: rgba(173, 2, 2, 1)">P</span>ay</h2>
        <van-tabs>
            <van-tab title="账号登录">
                <el-input v-model="username" class="ep-input" size="large" placeholder="信用点账号" :prefix-icon="User" />
                <el-input v-model="password" class="ep-input" size="large" type="password" placeholder="密码" :prefix-icon="Lock" />
                <div class="ep-input">
                    <el-button type="primary" style="width: 100%" size="large" @click="Login">登录</el-button>
                </div>
            </van-tab>
            <van-tab title="验证码登录">
                <el-alert type="warning" show-icon title="该登录方法即将被弃用，请切换新版API" />
                <el-input v-model="username" class="ep-input" size="large" type="email" placeholder="邮箱" :prefix-icon="User" />
                <el-input  v-model="code" class="ep-input" size="large" placeholder="验证码" :prefix-icon="Lock" ><template #append><el-button @click="sendCode" size="large">发送验证码</el-button></template></el-input>
                <div class="ep-input">
                    <el-button @click="LoginByCode" type="primary" style="width: 100%" size="large">登录</el-button>
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
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser.js'
import { SetCookie } from '../../modules/CookieHelper.js'
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { ElMessage, ElLoading } from 'element-plus'
import * as $ from 'jquery'
const username = ref(null)
const password = ref(null)
const code = ref(null)
initGeetest4({
    captchaId: '5666833fd0cffc1ec7b2ec903bfffcd9',
    product: 'bind'
}, function(captchaObj){
    window.captcha1 = captchaObj;
    captchaObj.onReady(function(){
        console.log('邮箱验证码 ok')
    }).onSuccess(function(){
        const loading = ElLoading.service()
        showLoadingToast('请稍等')
        var result = captchaObj.getValidate();
        Axios.get(`/devapi/account/user/sendCode?value=${username.value}&captcha_id=5666833fd0cffc1ec7b2ec903bfffcd9&lot_number=${result.lot_number}&captcha_output=${result.captcha_output}&pass_token=${result.pass_token}&gen_time=${result.gen_time}`)
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            loading.close();
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
        const loading = ElLoading.service()
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
        loading.close();
        Axios.post('/devapi/account/user/loginCode', data)
        .then(function(Response){
            const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
            if (result == true){
                showSuccessToast('登陆成功')
                ElMessage.success('登陆成功')
                SetCookie('access_token', Response['data']['data']['token'])
                SetCookie('waq-timestamp', result.gen_time)
                SetCookie('wap-logreporter',true)
                router.push('/')
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
const Login = () => {
    var data = {
        login: username.value,
        password: password.value
    }
    const loading = ElLoading.service();
    // FUCK JQUERY JQUERY IS BAD WHY DOES EVERYONE HATES AXIOS
    // Axios({
    //     method: 'POST',
    //     url: '/apiv2/auth',
    //     data: data,
    //     headers: {'XF-Api-Key': 'UrB9pei9-vdpu_t4G_G7OsYTGoq5eUKq'}
    // })
    // .then(function(Response){
    //         const result = isPassedVerifictionInt(GetStatusCode(Response), 200)
    //         loading.close();
    //         if (result == true){
    //             console.log(result)
    //             showSuccessToast('登陆成功')
    //             ElMessage.success('登陆成功')
    //             SetCookie('access_token', Response['data']['data']['token'])
    //             SetCookie('waq-timestamp', Date.now())
    //             SetCookie('wap-logreporter',true)
    //             router.push('/')
    //         }else{
    //             ElMessage.error(Response['data']['msg'])
    //             showFailToast(Response['data']['msg'])
    //             captchaObj.reset();
    //             code.value = null;
    //         }
    //     })
    //     .catch(function(error){
    //         console.log(error)
    //         loading.close();
    //         ElMessage.error(`错误: ${error.response.request.response['message']} (${error.code})`)
    //     })


    // L
    // $.post('/apiv2/auth', data, function(data){
    //     console.log(data)
    // })

    $.ajax({
        url: '/apiv2/auth',
        data: data,
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("XF-Api-Key", "UrB9pei9-vdpu_t4G_G7OsYTGoq5eUKq");
        },
        success: function(data){
            console.log(data);
            $.ajax({
                url: '/apiv2/auth/login-token',
                type: "POST",
                beforeSend: function(request) {
                    request.setRequestHeader("XF-Api-Key", "UrB9pei9-vdpu_t4G_G7OsYTGoq5eUKq");
                },
                data: {
                    user_id: data['user']['user_id'],
                    remember: true
                },
                success: function(data){
                    console.log(data);
                    loading.close();
                },
                error: function(error){
                    console.log(error)
                    ElMessage.error(error.responseJSON.errors[0].message)
                    loading.close();
                }
            })
            loading.close();
        },
        error: function(error){
            console.log(error)
            ElMessage.error(error.responseJSON.errors[0].message)
            loading.close();
        }
    })
}
const sendCode = () => {
    window.captcha1.showCaptcha();
}
const LoginByCode = () => {
    window.captcha2.showCaptcha();
}
</script>