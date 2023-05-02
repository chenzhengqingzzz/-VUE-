<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-01 18:14:05
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-02 15:06:18
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/components/Carousel/index.vue
 * @Description: 全局组件——轮播图
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["carouselList"],
  watch: {
    carouselList: {
      // 立即监听一次 不管数据有没有变化
      immediate: true,
      // 为什么watch监听不到carouselList：因为这个数据从来没有发生变化（数据是父组件给的，父组件给的时候就是一个对象）
      handler() {
        // 只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(function () {
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
