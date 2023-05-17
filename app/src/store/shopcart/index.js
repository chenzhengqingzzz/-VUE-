import { reqDeleteCartBySkuId, reqGetCartList } from "@/api"

/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-15 19:11:27
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-17 18:44:44
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
     * @return {Object: Promise}
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
    },

    /**
     * @description: 删除商品 由于用.then会出现页面不更新的bug 所以这里用async和await
     * @param {*} context action中的上下文
     * @param {*} skuId 所操作的那个商品的id
     * @return {Object: Promise}
     */
    async deleteCartBySkuId(context, skuId){
            let result = await reqDeleteCartBySkuId(skuId)
            if (result.code == 200) {
                return '删除成功';
           } else {
                return Promise.reject(new Error('删除失败'));
           }
    }
}
const getters = {
    /**
     * @description: 计算出来的购物车相关数据
     * @param {*} state 当前仓库中的state
     * @return {Array}
     */
    cartList(state){
        return state.cartList[0] || []
    },
}
export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}