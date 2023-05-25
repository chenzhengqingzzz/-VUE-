<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-25 17:11:01
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Home/index.vue
 * @Description: 路由组件——主页（Home）
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div>
    <!-- 三级联动全局组件 它已经注册为全局组件了，因此不需要引入 -->
    <TypeNav />
    <!-- 其他子组件 -->
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <!-- 通过遍历生成多个组件 -->
    <Floor v-for="(item, index) in floorList" :key="item.id" :list="item" />
    <Brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action，获取floor组件的数据（两个不同的对象）
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    ...mapState({
      // 获取在state中的floor组件数据
      floorList: (state) => state.home.floorList,
    }),
  },
  // methods: {
  //   // 自定义事件
  //   sendFloorListData() {
  //     this.$bus.$emit("getFloorListData", this.floorList);
  //     console.log("已发送");
  //   },
  // },
  /**
   * @description: 视频里面使用的是props传参，我这里使用了全局事件总线，可能和ListContainer里面的v-for循环一样会有异步问题，这里仍然使用watch+nextTick来解决这个问题
   * @return {*}
   */
  // watch: {
  //   floorList: {
  //     handler() {
  //       this.$nextTick(() => {
  //         this.sendFloorListData();
  //       });
  //     },
  //   },
  // },
};
</script>

<style></style>
