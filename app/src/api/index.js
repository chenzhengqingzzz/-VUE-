// 当前模块，所有的API接口进行统一管理
import requests from "./request";

// 三级联动的接口
// /api/product/getBaseCategoryList 是get请求 无参数
export const reqCategoryList = () => {
    // 发请求：axios发请求返回的结果是Promise对象
    // 必须把服务器响应的数据返回供其他组件和模块使用
    return requests({
        method: 'GET',
        url: '/product/getBaseCategoryList', 
    })
}