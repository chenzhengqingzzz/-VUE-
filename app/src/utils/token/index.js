/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-24 18:23:38
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-24 19:00:50
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/utils/token/index.js
 * @Description: 封装服务器返回来的用户标识token 把它封装成一个函数
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */


/**
 * @description: 存储token
 * @param {*} token 存入的token
 * @return {*}
 */
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}

/**
 * @description: 获取token
 * @return {*}
 */
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}