<template>
    <van-nav-bar title="关于我们" left-arrow @click-left="goBack"/>
    <div class="app-info">
        <img style="width: 30%" src="/ueg-logo.png" alt="logo"/>
        <span style="font-size: var(--el-font-size-extra-large)">CreditPay</span>
        <span style="font-size: var(--el-font-size-small); color: #b7b7b7">版本 v0.3.0</span>
    </div>
    <el-drawer lock-scroll size="90%" v-model="isOpen" :title="title" direction="btt">
        <iframe :src="url" style="width: 100%; height: 100%; border: 0"></iframe>
  </el-drawer>
  <van-cell style="margin-top: 30px" title="赞助我们" @click="openIFrameDialog('https://afdian.net/a/HeyCrab', '赞助我们！')" is-link />
  <van-cell title="用户协议" @click="openIFrameDialog('/bbs-proxy/help/contract/','用户协议')" is-link />
  <van-cell title="隐私政策" @click="openIFrameDialog('/bbs-proxy/help/privacy-policy/','隐私政策')" is-link />
</template>
<style>
.app-info{
    margin-top: 50px;
    text-align: center;
}
.app-info span{
    display: block;
    margin-top: 10px;
}
.el-dialog__body{
    height: 80%;
}
</style>
<script lang="ts" setup>
import router from '../../router';
import { ref } from 'vue';
const isOpen = ref(false);
const url = ref(null);
const title = ref(null);
const goBack = () => {
    router.push('user');
}

const openIFrameDialog = (uri: string, tit1e: string) => {
    isOpen.value = true;
    url.value = uri;
    title.value = tit1e;
}
</script>