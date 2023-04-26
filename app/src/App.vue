<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-26 20:02:24
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/App.vue
 * @Description: App组件，用于管理所有的其他组件
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div>
    <Header />
    <!-- 路由组件展示的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求，获取数据存储于仓库中
    // 使用命名空间后，必须指定某一个小仓库对应的actions
    // 把在TypeNav组件发的请求放到了全局组件App中，代表了只会发送一次，有利于性能节省
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style></style>
