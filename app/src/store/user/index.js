/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-22 16:17:57
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-23 16:26:55
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/store/user/index.js
 * @Description: Regiser和Login模块的小仓库
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */

import { reqGetCode, reqUserRegister } from "@/api"

const state = {
    code: ''
}
const mutations = {
    UPDATECODE(state, code){
        state.code = code
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
     * @param {Object}} userInfo 在组件中收集过来的用户数据 
     * @return {*}
     */
    async userRegister(context, userInfo){
        let result = await reqUserRegister(userInfo)
        if (result.code === 200) {
            return '成功'
        }else{
            return Promise.reject(new Error('注册失败！'))
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