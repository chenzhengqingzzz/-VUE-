<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-10 15:28:57
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-13 18:11:46
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Detail/Zoom/index.vue
 * @Description: Detail中左侧的放大镜组件
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="spec-preview">
    <img :src="skuImageList[showImageIndex].imgUrl" />
    <div class="event" @mousemove="mousemoveHandler"></div>
    <div class="big">
      <img :src="skuImageList[showImageIndex].imgUrl" ref="big"/>
    </div>
    <!-- 绿色蒙板 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        // 应该展示图片的索引值
        showImageIndex: 0
      }
    },
    props: {
      skuImageList: {
        type: Array,
        // 又是因为异步 可能传入子组件的东西是空的 会出现undefined警告 根据传过来的类型来决定传空数组还是空对象
        default: () => {
          return [{}]
        }
      }
    },
    mounted() {
      // 全局事件总线获取兄弟组件传递来的索引值
      this.$bus.$on('getIndex', (index) => {
        // 修改响应式数据
        this.showImageIndex = index
      })
    },
    methods: {
      /**
       * @description: 鼠标移动涉及到的处理逻辑 主要是绿色方块的位置 放大镜的效果
       * @param {*} e 事件对象
       * @return {*}
       */
      mousemoveHandler(e){
        let mask = this.$refs.mask
        let big = this.$refs.big
        // 计算之后的left|top值
        let left = e.offsetX - mask.offsetWidth / 2
        let top = e.offsetY - mask.offsetHeight / 2
        // 约束范围
        if (left <= 0) left = 0
        if (left >= mask.offsetWidth) left = mask.offsetWidth
        if (top <= 0) top = 0
        if (top >= mask.offsetHeight) top = mask.offsetHeight
        // 修改元素的left|top属性值
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        // 由于big是2倍的img 所以我们放大操作需要带倍数
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'
      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>