import { reqGetCartList } from "@/api"

/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-15 19:11:27
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-15 19:24:05
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/shopcart/index.js
 * @Description: Shopcart模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
const state = {
    cartList: []
}
const mutations = {
    UPDATECARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
    /**
     * @description: 获取Shopcart模块的数据
     * @param {*} context action中的上下文
     * @return {*}
     */
    getCartList(context){
        reqGetCartList().then(
            (res) => {
                if (res.code === 200) {
                    context.commit('UPDATECARTLIST', res.data)
                }else{
                    console.log('请求失败', res);
                }
            }
        ).catch(
            (err) => {
                console.log('请求失败', err);
            }
        )
    }
}
const getters = {}
export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}