/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-31 16:44:09
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-31 16:58:56
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/center/index.js
 * @Description: 个人中心组件(center)的小仓库
 *
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved.
 */

import { reqGetMyOrderList } from "@/api";

const state = {
  // 初始化一些发请求需要用到的参数
  page: 1,
  limit: 5,
  myOrderList: {},
};
const mutations = {
  UPDATEMYORDERLIST(state, myOrderList) {
    state.myOrderList = myOrderList;
    state.page = myOrderList.pages
    state.size = myOrderList.limit
  },
};
const actions = {
  /**
   * @description: 获取我的订单列表
   * @param {*} context actions中的上下文
   * @return {*}
   */
  getMyOrderList(context) {
    reqGetMyOrderList(context.state.page, context.state.limit)
      .then((res) => {
        context.commit("UPDATEMYORDERLIST", res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
