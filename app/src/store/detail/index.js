/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-11 15:11:47
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-14 16:30:45
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/detail/index.js
 * @Description: Detail模块的小仓库
 *
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved.
 */

import { reqGetAddOrUpdateShopCart, reqGetGoodInfo } from "@/api";
const state = {
  // 产品信息的初始值
  goodInfo: {},
};
const mutations = {
  UPDATEGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  /**
   * @description: 获取产品具体信息的action
   * @param {*} context action中的上下文
   * @param {*} skuId 用户派发actions的时候，传递过来的需要用在我们接口中的参数（载荷），必传
   * @return {Object: Promise}
   */
  getGoodInfo(context, skuId) {
    reqGetGoodInfo(skuId).then((res) => {
      if (res.code == 200) {
        context.commit("UPDATEGOODINFO", res.data);
      } else {
        console.log("请求失败:", res);
      }
    });
  },

  /**
   * @description: 将产品添加到购物车中或更新某一个产品的个数的action
   * @param {*} context action中的上下文
   * @param {*} skuId 被操作的商品Id
   * @param {*} skuNum 商品数量 正数代表增加 负数代表减少
   * @return {Object: Promise}
   */
  getAddOrUpdateShopCart(context, { skuId, skuNum }) {
    reqGetAddOrUpdateShopCart(skuId, skuNum).then(
      // 加入购物车成功的回调
      // 由于发完这个请求之后服务器没有返回数据 只是通知我们成功所以我们不需要三连环存储数据
      (res) => {
        // 要注意，在axios里，状态码200~299都被定义为成功
        // 我们自定义状态码200才是我们添加商品成功
        if (res.code === 200) {
            return 'ok'
        }else{
            // 这里终止Promise链
            return Promise.reject(new Error('faile'))
        }
      }
    )
  },
};
// 简化数据
const getters = {
  /**
   * @description: 路径导航简化的数据
   * @param {*} state 当前仓库中的state
   * @return {*}
   */
  categoryView(state) {
    // 当前计算出的categoryView属性值至少是一个空对象 假的报错不会有了 下同
    return state.goodInfo.categoryView || {};
  },
  /**
   * @description: 产品信息简化的数据
   * @param {*} state
   * @return {*}
   */
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  /**
   * @description: 售卖属性简化的数据
   * @param {*} state
   * @return {*}
   */
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
