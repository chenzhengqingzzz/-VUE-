/*
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-06-02 08:50:30
 * @LastEditors: 陈正清macbook pro
 * @LastEditTime: 2023-06-02 11:13:34
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/plugins/MyPlugins.js
 * @Description: 自我封装的一个插件
 * 
 * Copyright (c) by czqczqzzzzzz(czq), All Rights Reserved. 
 */

// Vue插件一定是一个对外暴露的对象

let myPlugins = {}

myPlugins.install = function(Vue, options){
    // 任何组件都可以使用
    // Vue.prototype.$ bus: 
    // Vue.component
    // Vue.filter(id, [definition])
    Vue.directive(options, name, () => {
        console.log('执行');
    })
}

export default myPlugins