/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-25 20:48:11
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-25 21:25:03
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/trade/index.js
 * @Description: Trade模块的小仓库
 *
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved.
 */

import { reqFindUserAddressList, reqGetOrderInfo } from "@/api";

const state = {
  userAddressList: [],
  orderInfo: {}
};
const mutations = {
  /**
   * @description: 更新仓库中用户的地址信息
   * @param {*} state 仓库中的state
   * @param {*} userAddressList 服务器响应回来的用户地址信息
   * @return {*}
   */
  UPDATEUSERADDRESSLIST(state, userAddressList) {
    state.userAddressList = userAddressList;
  },

  /**
   * @description: 更新仓库中用户的商品信息
   * @param {*} state 仓库中的state
   * @param {*} orderInfo 服务器响应回来的用户商品信息
   * @return {*}
   */
  UPDATEORDERINFO(state, orderInfo){
    state.orderInfo = orderInfo
  }
};
const actions = {
  /**
   * @description: 获取用户地址信息
   * @param {*} context actions中的上下文
   * @return {*}
   */
  async getUserAddressList(context) {
    let result = await reqFindUserAddressList();
    if (result.code === 200) {
      context.commit('UPDATEUSERADDRESSLIST', result.data);
    }
  },

  /**
   * @description: 获取商品清单数据
   * @param {*} context actions中的上下文
   * @return {*}
   */
  async getOrderInfo(context) {
    let result = await reqGetOrderInfo()
    if (result.code === 200) {
        context.commit('UPDATEORDERINFO', result.data)
    }
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
