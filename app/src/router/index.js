/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-05 19:50:26
 * @FilePath: /shangpinhuishop/app/src/router/index.js
 * @Description: 路由器，配置路由器的地方
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

// 引入路由组件
// 我们将全部使用路由懒加载 所以这里的就注释掉了
// import Home from '../pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 引入二级路由组件
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'
 
// 先把VueRouter原型对象上的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace方法 用于解决多次push、replace的报错，实际对页面影响
/**
 * @description: 重写的push方法
 * @param {*} location 告诉原来的push方法，往哪里跳转，传递哪些参数
 * @param {*} resolve 成功的回调
 * @param {*} reject 失败的回调
 * @return {*}
 */
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        // call/apply的区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    }else{
        originPush.call(this, location, () => {}, () => {})
    }
}
/**
 * @description: 重写的replace方法方法
 * @param {*} 上同
 * @return {*}
 */
VueRouter.prototype.replace = function(location, resolve, reject) {  
    if (resolve && reject) {
        originReplace.call(this, location, () => {}, () => {})
    }else{
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
const router = new VueRouter({
    routes: [
        // 我们将在这里使用路由懒加载
        {
            path: '/home',
            component: () => import('@/pages/Home'),
            meta: {isShowFooter: true}
        },
        {
            name: 'Search',
            // ?代表参数可传可不传
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            meta: {isShowFooter: true},
            // 路由组件可以传递props数据
            // 1.对象写法 额外给路由组件传递一些props
            // props: {a: 1, b: 'hello'},
            // 2.布尔值写法 如果为true，会把传的params以props形式接收
            // props: true,
            // 3.函数写法 可以把params参数、query参数通过props传递给路由组件
            props: ($route) => {
                return {
                    keyword: $route.params.keyword,
                    // big: $route.query.big
                }
            }
        },
        {
            name: 'Detail',
            // 路由跳转的时候带上产品id给详情页
            path: '/detail/:skuid',
            component: () => import('@/pages/Detail'),
            meta: {isShowFooter: true}
        },
        {
            name: 'AddCartSuccess',
            path: '/addcartsuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: {isShowFooter: true}
        },
        {
            name: 'ShopCart',
            path: '/shopcart',
            component: () => import('@/pages/ShopCart'),
            meta: {isShowFooter: true}
        },
        {
            name: 'Login',
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: {isShowFooter: false}
        },
        {
            name: 'Register',
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {isShowFooter: false},
        },
        {
            name: 'Trade',
            path: '/trade',
            component: () => import('@/pages/Trade'),
            meta: {isShowFooter: true},
            // 路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    // 如果是从购物车页面而来，则放行
                    next()
                }else{
                    // 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                    next(false)
                }
            }
        },
        {
            name: 'Pay',
            path: '/pay',
            component: () => import('@/pages/Pay'),
            meta: {isShowFooter: true},
            beforeEnter: (to, from, next) => {
                // 三元表达式
                from.path == '/trade' ? next() : next(false)
            }
        },
        {
            name: 'PaySuccess',
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: {isShowFooter: true}
        },
        {
            name: 'Center',
            path: '/center',
            component: () => import('@/pages/Center'),
            meta: {isShowFooter: true},
            // 二级路由配置
            children: [
                {
                    name: 'MyOrder',
                    path: 'myorder',
                    component: () => import('@/pages/Center/MyOrder')
                },
                {
                    name: 'GroupOrder',
                    path: 'grouporder',
                    component: () => import('@/pages/Center/GroupOrder')
                },
                // 写在二级路由里
                // {
                //     path: '/center',
                //     redirect: 'center/myorder'
                // }
            ],
            //一级路由默认重定向到myorder界面 避免一打开网页右侧是空白的
            // 写在一级路由里
            redirect: '/center/myorder'
        },
        // 重定向，在项目跑起来的时候，访问"/"，立马定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ],
    // 滚动行为
    /**
     * @description: Vue官方指定的滚动行为配置
     * @param {*} to 跳转的目标路由
     * @param {*} from 跳转前所在的路由
     * @param {*} savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用
     * @return {Object}
     */
    scrollBehavior(to, from, savedPosition){
        return {x: 0, y: 0, behavior: 'smooth'}
    }

})

/**
 * @description: 全局守卫：前置守卫（在路由跳转之前进行判断）
 * @return {*}
 */
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转的目标路由信息
    // from:可以获取到你从哪个路由而来的信息
    // next:放行函数 next()放行 next(path) 放行到指定路由位置 next(false)
    // 用户登录了才会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 1、有token代表登录，全部页面放行
    if (token) {
        // 用户已经登录了，就无法去login、register页面了
        if (to.path === '/login' || to.path === '/register') {
            next(from.path)
        }else{
            // 1.2、因为store中的token是通过localStorage获取的，token有存放在本地
            // 当页面刷新时，token不会消失，但是store中的其他数据会清空，
            // 所以不仅要判断token,还要判断用户信息

            // 登录了但是没去login、register页面[可能是home、detail、shopcart]
            // 1.2.1、判断仓库中是否有用户信息，如果有就放行，没有就派发actions获取信息
            if (name) {
                next()
            }else{
                // 1.2.2、如果没有name（用户信息），则派发action，让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('user/getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    // 1.2.3、获取用户信息失败，原因：token过期
                    //清除前后端token，跳转到登陆页面
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录：不能去交易相关的【trade】、支付相关的【pay、paysuccesss】、个人中心【center】的页面
        // 未登录访问上述页面时，应该弹出未登录警告并且定向到目标页
        let toPath = to.path
        // 判断toPath如果包含有目标url则弹窗+重定向
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') != -1) {
            alert('请先登录')
            // 把未登录时 想去而又没去成的信息存储在地址栏当中【路由的query参数】
            next('/login?redirect=' + toPath)
        }else{
            // 未登录的时候首页、登录页、注册页、购物车(home、login、register、shopcart)都可以正常访问
            next()
        }
    }
})

// 导出路由器
export default router