/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 18:47:19
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-14 15:39:21
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/home/index.js
 * @Description: Home模块的小仓库
 *
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved.
 */

import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
// 仓库存储数据的地方
const state = {
  // state中数据的默认初始值别瞎写，根据接口的返回值来决定初始值

  // 存储三级菜单的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor组件的数据
  floorList: [],
};
// 修改state的唯一手段
const mutations = {
  UPDATECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },

  UPDATEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },

  UPDATEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
// 可以书写自己的业务逻辑，也可以处理异步
const actions = {
  /**
   * @description: 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
   * @param {*} context 上下文
   * @return {Object: Promise}
   */
  async getCategoryList(context) {
    // 要拿到Promise成功的结果，需要加上await 前面需要加上async
    let result = await reqGetCategoryList();
    if (result.code === 200) {
      context.commit("UPDATECATEGORYLIST", result.data);
    } else {
      console.log("请求错误");
    }
  },
  // 通过then获取response也可以实现上面一模一样的效果，都是成功的回调，都是对象
  // getCategoryList(context){
  //     reqGetCategoryList().then(
  //         (res) => {
  //         if (res.code === 200) {
  //             context.commit('UPDATECATEGORYLIST', res.data)
  //         }
  //     },
  //         (error) => {
  //             console.log(error);
  //     })
  // },

  /**
   * @description: 获取首页轮播图的数据
   * @param {*} context 上下文
   * @return {Object: Promise}
   */
  getBannerList(context) {
    reqGetBannerList().then((res) => {
      if (res.code === 200) {
        context.commit("UPDATEBANNERLIST", res.data);
      } else {
        console.log("请求失败:", res);
      }
    });
  },

  /**
   * @description: 获取首页下层“家用电器”、“手机通讯”的数据
   * @param {*} context 上下文
   * @return {Object: Promise}
   */
  getFloorList(context) {
    reqGetFloorList().then((res) => {
      if (res.code === 200) {
        context.commit("UPDATEFLOORLIST", res.data);
      } else {
        console.log("请求失败:", res);
      }
    });
  },
};
// getters理解为计算属性，更多用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
