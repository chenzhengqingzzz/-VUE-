<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-10 15:28:57
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-11 21:17:32
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Detail/Zoom/index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="spec-preview">
    <img :src="skuImageList[0].imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="skuImageList[0].imgUrl" />
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
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
      console.log(this.skuImageList);
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