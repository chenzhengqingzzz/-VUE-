/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-10 15:39:44
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/router/index.js
 * @Description: 路由器，配置路由器的地方
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '../pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

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
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {isShowFooter: true}
        },
        {
            name: 'Search',
            // ?代表参数可传可不传
            path: '/search/:keyword?',
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
                    keyword: $route.params.keyword,
                    // big: $route.query.big
                }
            }
        },
        {
            name: 'Detail',
            // 路由跳转的时候带上产品id给详情页
            path: '/detail:skuid',
            component: Detail,
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
            meta: {isShowFooter: false},
        },
        // 重定向，在项目跑起来的时候，访问"/"，立马定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})