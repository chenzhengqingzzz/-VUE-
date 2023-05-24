/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-22 16:17:57
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-24 19:17:09
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/user/index.js
 * @Description: Regiser和Login模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import { reqGetCode, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getToken, setToken } from "@/utils/token"

const state = {
    code: '',
    // 这个属性初始值为null 和空字符串没区别 如果通过mutations存入成功 下一次再刷新则会从localStorage取token而不是通过mutations
    // token: localStorage.getItem('TOKEN'),
    token: getToken('TOKEN'),
    userInfo: {}
}
const mutations = {

    /**
     * @description: 更新仓库中的验证码信息
     * @param {*} state 仓库中的state
     * @param {*} code 服务器响应回来的验证码
     * @return {*}
     */
    UPDATECODE(state, code){
        state.code = code
    },

    /**
     * @description: 更新仓库中的用户token信息
     * @param {*} state 仓库中的state
     * @param {*} token 服务器响应回来的token
     * @return {*}
     */
    USERLOGIN(state, token){
        state.token = token
    },

    /**
     * @description: 更新仓库中的用户信息
     * @param {*} state 仓库中的state
     * @param {*} userInfo 服务器响应回来的用户信息
     * @return {*}
     */
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    }
}
const actions = {

    /**
     * @description: 获取验证码
     * @param {*} context actions中的上下文
     * @param {*} phone 用户输入的手机号
     * @return {Object: Promise}
     */
    async getCode(context, phone){
        // 获取验证码这个接口应该是把验证码发到用户的手机上 但是我在学的时候的后台没有这个能力 暂时自动输入 等以后找到更好的借口将会平替
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            context.commit('UPDATECODE', result.data)
            return '发送验证码成功'
        }else{
            return Promise.reject(new Error('发送验证码失败'))
        }      
    },

    /**
     * @description: 用户注册
     * @param {*} context actions中的上下文
     * @param {Object} userInfo 在组件中收集过来的用户数据 
     * @return {Object: Promise}
     */
    async userRegister(context, userInfo){
        let result = await reqUserRegister(userInfo)
        if (result.code === 200) {
            return '成功'
        }else{
            return Promise.reject(new Error('注册失败，可能此用户已经存在！'))
        }
    },

    /**
     * @description: 用户登录
     * @param {*} context actions中的上下文
     * @param {Object} userLoginData 包含用户登录时输入的账户名和密码 它是一个对象
     * @return {Object: Promise}
     */
    async userLogin(context, userLoginData){
        let result = await reqUserLogin(userLoginData)
        if (result.code === 200) {
            // 服务器下发的token是用户的唯一标识符（像uuid）
            // 将来经常会通过带token找服务器要用户的信息进行展示
            context.commit('USERLOGIN', result.data.token)
            // 持久化存储token
            // localStorage.setItem('TOKEN', result.data.token)
            setToken(result.data.token)
            return '登录成功'
        }else{
            return Promise.reject(new Error('登录失败，用户名或密码错误！'))
        }
    },

    /**
     * @description: 注册过的用户登录获取用户的信息
     * @param {*} context actions中的上下文
     * @return {Object: Promise}
     */
    async getUserInfo(context){
        let result = await reqUserInfo()
        if (result.code === 200) {
            context.commit('GETUSERINFO', result.data)
            return '登录成功'
        }else{
            return Promise.reject(new Error('登录失败！'))
        }
    }

    
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}