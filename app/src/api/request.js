/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-23 18:11:29
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/api/request.js
 * @Description: 对axios进行二次封装以满足项目的自定义需求，需要注意其暴露的是二次封装的requests
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// start：进度条开始 done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests其实就axios，只不过咱们可以稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现/api
    baseURL: '/api',
    // 代表请求超时的时间为5s
    timeout: 5000,
})
/**
 * @description: 请求拦截器：在发请求之前，它可以检测到，并做一些事情
 * @return {*} 
 */
requests.interceptors.request.use((config) => {
    // config是一个配置对象，对象里面有一个属性很重要：headers请求头
    //config内主要是对请求头Header配置
    //比如添加token

    // 开启进度条
    nProgress.start()

    return config
})
/**
 * @description: 响应拦截器
 * @return {*}
 */
requests.interceptors.response.use((response) => {
    // 请求成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到并做一些事情
    // 响应成功，关闭进度条
    nProgress.done()
    return response.data
}, (error) => {
    // 请求失败的回调函数
    console.log("服务器响应失败" + error);
    // 这里终止Promise链
    return Promise.reject(new Error('Fail'))
})

// 对外暴露
export default requests