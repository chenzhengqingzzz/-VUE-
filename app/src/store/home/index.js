/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 18:47:19
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-23 18:49:03
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/home/index.js
 * @Description: Home模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

// 仓库存储数据的地方
const state = {}
// 修改state的唯一手段
const mutations = {}
// 可以书写自己的业务逻辑，也可以处理异步
const actions = {}
// getters理解为计算属性，更多用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}