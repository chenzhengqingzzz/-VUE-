/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 18:20:54
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-22 16:20:07
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/index.js
 * @Description: Vuex中的集中Store，最后统一暴露给入口文件
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import Vue from "vue";
import Vuex from "vuex"
// 需要使用插件一次
Vue.use(Vuex)
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail';
import shopcart from './shopcart';
import user from './user'
import trade from './trade'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})