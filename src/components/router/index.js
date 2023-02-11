import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
import LoginView from '../user/login.vue'
import RegisterView from '../user/register.vue'
import Userside_Main_Page from '../pay/main.vue'
import Userside_Code_Page from '../pay/code.vue'
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
        path: '/admin/login',
        name: '管理侧 登录页（业务隔离）',
        component: Adminside_Login_Page
    },
    {
        path: '/admin/index',
        name: '管理侧 主页（业务隔离）',
        component: Adminside_Console_Page
    }
]

const router = createRouter({history: createWebHashHistory(),routes: routes});
export default router;