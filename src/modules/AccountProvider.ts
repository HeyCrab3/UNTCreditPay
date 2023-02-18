// GitHub @HeyCrab3

// 重要：代码逻辑存在问题，该库弃用！！
import Axios from 'axios';
import { ref } from 'vue';
import { SetCookie } from './CookieHelper'
import { isPassedVerifictionInt, GetStatusCode } from './StatusCodeParser'
function LoginV2 (APIUri: string, UserName: string, PassWord: string){
    let isSuccess = ref(false)
    let message = ref('')
    const loginData = {"user": UserName, "password": PassWord}
    Axios({
        url: APIUri,
        method: "POST",
        data: loginData
    })
    .then(function(Response){
        const isSuccess1: boolean = isPassedVerifictionInt(GetStatusCode(Response), 200)
        if (isSuccess1 == true){
            SetCookie('access_token', Response['data']['data']['token'])
            SetCookie('waq-timestamp', Date.now())
            SetCookie('wap-logreporter',true)
            isSuccess.value = true;
            message.value = Response.data['msg'];
            return {'isSuccess': true, 'message': Response.data['msg']}
        }else{
            isSuccess.value = false;
            message.value = Response.data['msg'];
            return {'isSuccess': false, 'message': Response.data['msg']}
        }
    })
    .catch(function(error){
        isSuccess.value = false;
        message.value = `错误：${error}`;
        return {'isSuccess': false, 'message': `错误：${error}`}
    })
    // return {'isSuccess': isSuccess.value, 'message': message.value}
}

function VerifySessionV2 (APIUri: string, SessionToken: string){
    let isSuccess = ref(false)
    let message = ref('')
    Axios({
        url: APIUri,
        headers: {'Authorization': SessionToken}
    })
    .then(function(Response){
        const isSuccess1: boolean = isPassedVerifictionInt(GetStatusCode(Response), 200)
        if (isSuccess1 == true){
            isSuccess.value = true;
            message.value = Response.data['msg'];
        }else{
            isSuccess.value = false;
            message.value = Response.data['msg'];
        }
    })
    .catch(function(error){
        isSuccess.value = false;
        message.value = `错误：${error}`;
    })
    return {'isSuccess': isSuccess.value, 'message': message.value}
}

function GetUserBasicInfo (APIUri: string, SessionToken: string){
    let isSuccess = ref(false)
    let message = ref('')
    let data = ref({})
    Axios({
        url: APIUri,
        headers: {'Authorization': SessionToken}
    })
    .then(function(Response){
        const isSuccess1: boolean = isPassedVerifictionInt(GetStatusCode(Response), 200)
        if (isSuccess1 == true){
            isSuccess.value = true;
            message.value = Response.data['msg'];
            data.value = Response.data['data']
        }else{
            isSuccess.value = false;
            message.value = Response.data['msg'];
        }
    })
    .catch(function(error){
        isSuccess.value = false;
        message.value = `错误：${error}`;
    })
    return {'isSuccess': isSuccess.value, 'message': message.value, 'data': data.value}
}

export { LoginV2, VerifySessionV2, GetUserBasicInfo }