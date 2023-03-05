// 导入依赖库
import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
// 导入全局对象
import LoginView from '../user/login.vue'
import RegisterView from '../user/register.vue'
import AgentSelection from '../../select-agent.vue'
// 用户侧
import Userside_Main_Page from '../pay/main.vue'
import Userside_Code_Page from '../pay/code.vue'
import Userside_User_Page from '../pay/user.vue'
import Userside_MyService_Page from '../market/myservice.vue'
import Userside_Aboutus_Page from '../pay/sub/aboutus.vue'
import Userside_Exchange_Page from '../pay/sub/exchange.vue'
// 商家侧
import Marketside_Login_Page from '../market/login.vue'
import Marketside_Home_Page from '../market/home.vue'
import Marketside_Pay_Page from '../market/pay.vue'
// 管理员侧（已废弃）
import Adminside_Login_Page from '../admin/login/main.vue'
import Adminside_Console_Page from '../admin/console/index.vue'

const routes = [
    {
        path: '/login',
        name: '登录',
        component: LoginView
    },
    {
        path: '/register',
        name: '注册',
        component: RegisterView
    },
    {
        path: '/',
        name: '用户侧 付款主页',
        component: Userside_Main_Page
    },
    {
        path: '/pay',
        name: '用户侧 付款码',
        component: Userside_Code_Page
    },
    {
        path: '/user',
        name: '用户侧 用户首页',
        component: Userside_User_Page
    },
    {
        path: '/admin/login',
        name: '管理侧 登录页（业务隔离）',
        component: Adminside_Login_Page
    },
    {
        path: '/admin/index',
        name: '管理侧 主页（业务隔离）',
        component: Adminside_Console_Page
    },
    {
        path: '/services',
        name: '用户侧 我的服务',
        component: Userside_MyService_Page
    },
    {
        path: '/about',
        name: '用户侧 关于',
        component: Userside_Aboutus_Page
    },
    {
        path: '/exchange',
        name: '用户侧 转账',
        component: Userside_Exchange_Page
    },
    {
        path: '/market/login',
        name: '商家侧 登录',
        component: Marketside_Login_Page
    },
    {
        path: '/market/home',
        name: '商家侧 主页',
        component: Marketside_Home_Page
    },
    {
        path: '/market/pay',
        name: '商家侧 收款',
        component: Marketside_Pay_Page
    },
    {
        path: '/agent',
        name: '选择身份',
        component: AgentSelection
    }
]

const router = createRouter({history: createWebHashHistory(),routes: routes});
export default router;