/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-23 18:17:20
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/api/index.js
 * @Description: 对API接口进行统一管理
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
// 当前模块，所有的API接口进行统一管理
import requests from "./request";

/**
 * @description: 三级联动菜单的接口 是get请求 无参数
 * @url /api/product/getBaseCategoryList 
 * @return {Function}
 */
export const reqCategoryList = () => {
    // 发请求：axios发请求返回的结果是Promise对象
    // 必须把服务器响应的数据返回供其他组件和模块使用
    return requests({
        method: 'GET',
        url: '/product/getBaseCategoryList', 
    })
}