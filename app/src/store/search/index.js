/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 18:47:22
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-14 15:39:35
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/search/index.js
 * @Description: Search模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import { reqGetSearchInfo } from "@/api"

const state = {
    // 仓库初始状态
    searchList: {}
}
const mutations = {
    UPDATESEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const actions = {
    /**
     * @description: 获取Search模块的数据
     * @param {*} context action中的上下文
     * @param {*} value 用户派发actions的时候，传递过来的需要用在我们接口中的参数（载荷），至少是一个空对象
     * @return {Object: Promise}
     */
    getSearchList(context, value = {}){
        // 这个函数在调用获取服务器数据的时候至少传递一个参数（空对象）
        reqGetSearchInfo(value).then(
            (res) => {
                if (res.code === 200) {
                    context.commit('UPDATESEARCHLIST', res.data)
                }else{
                    console.log('请求失败:', res);
                }
            }
        )
    }
}
// 计算属性，在项目当中是为了简化数据而生
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件中获取数据的时候就方便了】
const getters = {
    /**
     * @description: getters简化数据 下同
     * @param {*} state 当前仓库中的state
     * @return {*}
     */
    goodsList(state){
        // 这样书写是有问题的 因为state中的数据有两种状态：空对象和一个包含服务器数据的对象
        // 如果是空对象的话，里面的goodList属性就为undefined 最后页面中如果要遍历undefined就会报错
        // 计算新的属性的属性值至少得来一个数组 以防万一
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}