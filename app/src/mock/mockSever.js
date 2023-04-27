/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-27 17:52:55
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-27 18:08:59
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/mock/mockSever.js
 * @Description: mock模拟数据服务器
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
// webpack默认对外暴露的资源：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

/**
 * @description: 模拟首页广告轮播图数据
 * @param {String} url 参数请求的地址
 * @param {Object} 请求的数据
 * @return {*}
 */
Mock.mock('/mock/banner', {code: 200, data: banner})

/**
 * @description: 模拟首页楼层数据
 * @param {String} url 参数请求的地址
 * @param {Object} 请求的数据
 * @return {*}
 */
Mock.mock('/mock/floor', {code: 200, data: floor})