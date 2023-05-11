/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-11 15:11:47
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-11 19:16:26
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/detail/index.js
 * @Description: Detail模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import { reqGetGoodInfo } from "@/api"
const state = {
    // 产品信息的初始值
    goodInfo: {}
}
const mutations = {
    UPDATEGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    /**
     * @description: 获取产品具体信息的action
     * @param {*} context action中的上下文
     * @param {*} skuId 用户派发actions的时候，传递过来的需要用在我们接口中的参数（载荷），必传
     * @return {Object: Promise}
     */
    getGoodInfo(context, skuId){
        reqGetGoodInfo(skuId).then(
            (res) => {
                if (res.code == 200) {
                    context.commit('UPDATEGOODINFO', res.data)
                }
            },
            (err) => {
                console.log(err);
            }
        )
    }
}
// 简化数据
const getters = {
    /**
     * @description: getters简化数据 下同
     * @param {*} state 当前仓库中的state
     * @return {*}
     */
    categoryView(state){
        // 当前计算出的categoryView属性值至少是一个空对象 假的报错不会有了
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}