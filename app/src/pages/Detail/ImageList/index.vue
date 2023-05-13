<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-10 15:28:57
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-13 15:23:53
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Detail/ImageList/index.vue
 * @Description: Detail组件中图片下方的预览的轮播图组件
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img :src="slide.imgUrl" :class="{active: currentIndex == index}" @click="changeCurrentIndex(index)"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      // 和三级分类菜单的套路一样 给每个image赋一个currentIndex 遍历的index等于currentIndex才会给新的类名
      currentIndex: 0
    }
  },
  props: {
    skuImageList: {
      type: Array,
      default: () => {
        return [{}];
      },
    },
  },
  watch: {
    skuImageList(newVal, oldVal) {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 显示几个图片的设置
          slidesPerView: 3,
          // 每一次切换图片个数
          slidesPerGroup: 1
        });
      });
    },
  },
  methods: {
    /**
     * @description: 点击图片的回调 
     * @param {*} index v-for遍历所对应的图片的索引值
     * @return {*}
     */
    changeCurrentIndex(index){
      // 修改响应式数据
      this.currentIndex = index
      // 使用全局事件总线传给兄弟组件被修改后的索引值
      this.$bus.$emit('getIndex', index)
    }
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
