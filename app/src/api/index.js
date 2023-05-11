/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-11 15:08:33
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/api/index.js
 * @Description: 对API接口进行统一管理
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
// 当前模块，所有的API接口进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

/**
 * @description: 三级联动菜单的接口 是get请求 无参数
 * @url /api/product/getBaseCategoryList 
 * @return {Object: Promise}
 */
export const reqGetCategoryList = () => {
    // 发请求：axios发请求返回的结果是Promise对象
    // 必须把服务器响应的数据返回供其他组件和模块使用
    return requests({
        method: 'GET',
        url: '/product/getBaseCategoryList', 
    })
}

/**
 * @description: 首页轮播图的接口 是get请求 无参数
 * @url /mock/banner
 * @return {Object: Promise}
 */
export const reqGetBannerList = () => {
    return mockRequests({
        method: 'GET',
        url: '/banner'
    })
}

/**
 * @description: 首页下层“家用电器”、“手机通讯”接口 是get请求 无参数
 * @url /mock/floor
 * @return {Object: Promise}
 */
export const reqGetFloorList = () => {
    return mockRequests({
        method: 'GET',
        url: '/floor'
    })
}

/**
 * @description: 获取搜索模块数据 是post请求，需要带参数
 * @url /api/list
 * @param {*} params 至少是一个空对象 里面的参数可传可不传 参数示例:
 * {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
    }
 * @return {Object: Promise}
 */
export const reqGetSearchInfo = (params) => {
    return requests({
        method: 'POST',
        url: '/list',
        data: params // 当前这个接口给服务器传递一个默认参数（params至少得是一个空对象 否则返回失败）
    })
}

/**
 * @description: 在搜索列表时点击具体商品获取商品详情时请求数据 是get请求 需要带参数 
 * @url `/item/${skuId}`
 * @param {*} skuId 从goodsList获取的产品Id
 * @return {Object: Promise}
 */
export const reqGetGoodInfo = (skuId) => {
    return requests({
        method: 'GET',
        url: `/item/${skuId}`
    })
}