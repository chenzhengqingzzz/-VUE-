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
            name: 'Search',
            path: '/search/:keyWord?',
            component: Search,
            meta: {isShowFooter: true},
            // 路由组件可以传递props数据
            // 1.对象写法 额外给路由组件传递一些props
            // props: {a: 1, b: 'hello'},
            // 2.布尔值写法 如果为true，会把传的params以props形式接收
            // props: true,
            // 3.函数写法 可以把params参数、query参数通过props传递给路由组件
            props: ($route) => {
                return {
                    keyWord: $route.params.keyWord,
                    k: $route.query.k
                }
            }
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