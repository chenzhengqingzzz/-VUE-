/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-15 19:11:27
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-20 21:37:15
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/shopcart/index.js
 * @Description: ShopCart模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
import { reqDeleteCartBySkuId, reqGetCartList, reqUpdateCartCheckedById } from "@/api"
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
    },

    /**
     * @description: 修改购物车某一个产品的选中状态
     * @param {*} context action中的上下文
     * @param {*} skuId 所操作的那个商品的id
     * @param {*} isChecked 所选中商品的勾选状态
     * @return {*}
     */
    async updateCartCheckedById(context, {skuId, isChecked}){
        let result = await reqUpdateCartCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return '更新勾选状态成功'
        }else{
            return Promise.reject(new Error('更新勾选状态失败'))
        }
    },

    /**
     * @description: 删除全部勾选的商品
     * @param {*} context action中的上下文 小仓库 里面包含state/getters等
     * @return {*}
     */
    async deleteAllCheckedCart(context){
        // 获取购物车中的全部商品（是一个数组）
        let result = []
        context.getters.cartList.cartInfoList.forEach(cartInfo => {
            let promise = cartInfo.isChecked == 1 ? context.dispatch('deleteCartBySkuId', cartInfo.skuId) : ''
            // 将每一次返回的Promise添加到数组当中
            result.push(promise)
        });
        // 等待所有异步操作完成
        return Promise.all(PromiseAll);
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