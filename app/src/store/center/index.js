/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-31 16:44:09
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-05-31 20:43:45
 * @FilePath: /shangpinhuishop/app/src/store/center/index.js
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
   * @param {*} page 用户所点击的页码数 默认为1
   * @param {*} context actions中的上下文
   * @return {*}
   */
  getMyOrderList(context, page) {
    reqGetMyOrderList(page || context.state.page, context.state.limit)
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
