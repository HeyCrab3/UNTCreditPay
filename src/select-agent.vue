<template>
    <div class="mdui-appbar">
        <div class="mdui-toolbar mdui-color-yellow">
            <a href="https://bbs.ungov.net" class="mdui-btn mdui-ripple mdui-btn-icon">
                <i class="mdui-icon material-icons">home</i>
            </a>
            <a href="javascript:;" class="mdui-typo-headline">CreditPay</a>
            <a href="javascript:;" class="mdui-typo-title">选择用户身份</a>
        </div>
    </div>
    <div id="a">
        <div class="mdui-typo"><h1>请选择用户身份  <small>你当前正在使用电脑端访问，<del>请选择一个你要去往的异世界</del></small></h1></div>
        <div class="card-group">
            <el-card :body-style="{ padding: '0px' }">
                <img
                :src="undefined"
                class="image"
                />
                <div style="padding: 20px; max-width: 200px; text-align: center;">
                    <span style="font-size: var(--el-font-size-extra-large);">商家平台</span>
                    <div class="bottom">
                        <time class="time">一站式的收单服务，高效愉悦的收款体验</time><br/>
                        <el-button @click="goto('/market/home')" class="button mdui-ripple mdui-ripple-white" type="primary">进入后台</el-button>
                        <el-button class="button mdui-ripple">查看简介</el-button>
                    </div>
                </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" style="margin-left: 20px;">
                <img
                :src="undefined"
                class="image"
                />
                <div style="padding: 20px; max-width: 200px; text-align: center;">
                    <span style="font-size: var(--el-font-size-extra-large);">管理员平台</span>
                    <div class="bottom">
                        <time class="time">仅限论坛管理员进入</time><br/>
                        <el-button class="button mdui-ripple mdui-ripple-white" type="primary">进入后台</el-button>
                    </div>
                </div>
            </el-card>
            <el-card :body-style="{ padding: '0px' }" style="margin-left: 20px;">
                <img
                :src="undefined"
                class="image"
                />
                <div style="padding: 20px; max-width: 200px; text-align: center;">
                    <span style="font-size: var(--el-font-size-extra-large);">用户后台</span>
                    <div class="bottom">
                        <time class="time">你最常用的付款工具（至少在流浪地球时代）</time><br/>
                        <el-popover style="text-align: center;">
                            <template #reference><el-button class="button mdui-ripple mdui-ripple-white" type="primary">进入后台</el-button></template>
                            <img style="width: 100%" src="data:image/png;base64,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" alt="qrcode"/>
                        </el-popover>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
    <!-- <div class="loading-box">
        <div class="mdui-spinner mdui-spinner-colorful"></div>
        <span>正在加载数据...</span>
    </div> -->
</template>
<script lang="ts" setup>
import router from './components/router/index'
document.title = "选择用户身份 | CreditPay"
const goto = (url: string) => {
    router.push(url)
}
</script>
<style>
#a{
    padding: 20px;
    height: 100%;
    background: url(/a.svg) no-repeat;
    background-size: cover;
}
.card-group{
    margin-top: 20px;
}
.button{
    margin-top: 20px;
}
.loading-box{
    padding: 15px;
    box-shadow: 0px 0px 15px #DDDDDD;
    max-width: 20%;
    height: 40px;
    line-height: 40px;
    font-size: 1.5rem;
    border-radius: 10px;
    position: fixed;
    left: 10px;
    bottom: 20px;
    transition: 0.5s;
}
.loading-box span{
    margin-left: 10px;
}
.loading-box .mdui-spinner{
    position: relative;
    top: 5px;
}
</style>