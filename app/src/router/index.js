// 路由器，配置路由器的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '../pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// 配置路由
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {isShowFooter: true}
        },
        {
            path: '/search',
            component: Search,
            meta: {isShowFooter: true}
        },
        {
            path: '/login',
            component: Login,
            meta: {isShowFooter: false}
        },
        {
            path: '/register',
            component: Register,
            meta: {isShowFooter: false}
        },
        // 重定向，在项目跑起来的时候，访问"/"，立马定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})