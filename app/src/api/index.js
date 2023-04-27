/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-27 20:38:43
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
 * @description: 轮播图的接口 是get请求 无参数
 * @url /mock/banner
 * @return {Object: Promise}
 */
export const reqGetBannerList = () => {
    return mockRequests({
        method: 'GET',
        url: '/banner'
    })
}