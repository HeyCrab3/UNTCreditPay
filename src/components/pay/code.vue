<template>
  <el-page-header @back="goBack" style="margin-left: 20px; margin-top: 20px;">
    <template #content>
      <span class="text-large font-600 mr-3"> 付款码 </span>
    </template>
  </el-page-header>
  <div class="code">
    <van-tabs v-model:active="active">
    <van-tab title="付款码">
        <span style="display: inline-block; margin-top: 20px">{{ showCode }} </span><div @click="hcCode" style="margin-left: 10px; margin-top: -6px; display: inline-block;"><el-icon><View /></el-icon></div><br/>
        <img :src=barcodeLink alt="code" style="position:relative; top: 20px; margin: auto; width: 95%; display: block"/>
        <img :src=qrcodeLink alt="qr" style="margin-top: 10px; width: 150px"/>
        <van-cell-group inset style="box-shadow: 0px 0px 1px #cccccc;">
            <van-cell title="粉末银行（6331）" value="优先使用此方式付款" is-link/>
        </van-cell-group>
    </van-tab>
    <van-tab title="NFC">
      <el-result icon="error" title="NFC 不可用" :sub-title=errorinfo style="display: {{ iserror }}; margin-top: 20px"></el-result>
    </van-tab>
    </van-tabs>
  </div>
</template>
<style>
.code{
    box-shadow: 0px 0px 5px #cccccc;
    width: 90%;
    height: 80%;
    margin: auto;
    margin-top: 10%;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}
</style>
<script setup>
import router from '../router';
import { View } from '@element-plus/icons-vue';
import { ref } from 'vue';
function randomNum(n) {
  var res = "";
  for(var i=0;i<n;i++){
    res += Math.floor(Math.random()*10);
  }
  return res;
}
let originalcode = randomNum(16)
let iserror = ref('hide');
let errorinfo = ref(null)
const barcodeLink = ref(`http://www.t-x-m.com/barcode.asp?bc1=${originalcode}&bc2=10&bc3=3.5&bc4=1.2&bc5=0&bc6=1&bc7=Arial&bc8=15&bc9=1`)
const qrcodeLink = ref(`http://www.t-x-m.com/QRCode/qrcode.asp?bc1=${originalcode}&bc2=33&bc3=3.5&bc4=3.5&bc5=1&bc6=1&bc7=1&bc8=5&bc9=1`)
let showCode = ref(originalcode.substring(0,4) + " **** **** ****")
const goBack = () => {
    router.push('/')
}

const hcCode = () => {
    if (showCode.value.includes('*')){
        showCode.value = originalcode;
    }else{
        showCode.value = originalcode.substring(0,4) + " **** **** ****";
    }
}

try{
  var NFCInstance = new NDEFMessage(originalcode);
  console.log(NFCInstance)
}
catch (error){
  console.error(`错误：NFC无法初始化 ${error}`)
  iserror.value = "show"
  errorinfo.value = `当前环境不支持NFC功能\n${error}`
}
</script>