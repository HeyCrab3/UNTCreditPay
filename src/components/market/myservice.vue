<style>
#app{ background: #FFF;}
</style>
<template>
    <div v-loading="loading">
        <van-nav-bar title="我的服务" />
        <el-backtop :right="100" :bottom="100" />
        <el-scrollbar>
            <div class="scrollbar-flex-content">
                <el-alert type="warning" title="此为第三方服务，由此带来的风险我们概不负责" :closeable="false" show-icon />
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
    background: #ca3030;
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
    background: #ca3030;
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
<script setup>
import { Money, Coin, Tickets, Service } from '@element-plus/icons-vue';
import Axios from 'axios'
import { ref } from 'vue'
import { GetCookie } from '../../modules/CookieHelper';
import { GetStatusCode, isPassedVerifictionInt } from '../../modules/StatusCodeParser';
import router from '../router';
import { showLoadingToast, showSuccessToast, showFailToast } from 'vant'
import { ElMessage } from 'element-plus';
let loading = ref(true)
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