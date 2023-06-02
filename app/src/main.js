/*
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: 陈正清macbook pro
 * @LastEditTime: 2023-06-02 11:13:57
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/main.js
 * @Description: 整个应用的入口文件
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
 */
import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServer.js --- mock数据
import '@/mock/mockSever'
// 引入Swiper的样式
import 'swiper/css/swiper.css'
// 统一引入
// 我们尝试在写Pay组件的数据的时候，在组件内发请求而不借用Vuex 这里就需要用到引入api的函数了
import * as API from '@/api'
// 现在API是一个包含api/index.js所有函数的对象


// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
// 轮播图组件---全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器组件---全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 按需引入ElementUI
import { Icon, MessageBox, Form } from 'element-ui'
// 应用ElementUI
Vue.component(Icon.name, Icon)
Vue.component(Form.name. Form)
Vue.component(MessageBox.name, MessageBox)
// 按需引入并注册全局配置 $msgbox、$alert本质是一个函数
// ElementUI应用还有一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入懒加载的默认图片(JSON、图片默认对外暴露)
import kunkunGIF from '@/assets/kunkun.gif';
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: kunkunGIF
})

// 引入自定义插件
// import myPlugins from '@/plugins/MyPlugins'

// Vue.use(myPlugins, {
//   name: 'upper'
// })

// 关闭Vue生产提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 注册路由 以下的写法是key-value一致省略value
  router,
  // 注册仓库，组件实例的身上会多一个属性：$store
  store,
  // 安装全局事件总线
  // 所有组件实例可以找它的原型的原型（Vue.prototype）借用其中的方法
  beforeCreate(){
    Vue.prototype.$bus = this
    // 所有的组件不需要引入请求函数 直接可以找$API这个对象
    Vue.prototype.$API = API
  }
}).$mount('#app')
