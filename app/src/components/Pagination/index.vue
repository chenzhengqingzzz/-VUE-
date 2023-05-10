<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-09 14:17:19
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-10 14:33:10
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/components/Pagination/index.vue
 * @Description: 全局组件——分页器(Pagination)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="pagination">
    <!-- 左边部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-show="page >= startNumAndEndNum.start" @click="$emit('getPageNo', page)">{{page}}</button>

    <!-- 下边部分 -->
    <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    /**
     * @description: 计算出总共的页数
     * @return {Number}
     */
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    /**
     * @description: 计算出连续的页码中起始数字与结束数字[连续的页码数至少为5]
     * @return {Object}
     */
    startNumAndEndNum() {
      // 解构
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始页码和结束页码
      let start = 0,
        end = 0;
      // 当总页数没有连续页码数多的时候（特殊情况） 走这个判断处理这个情况
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 总页码数大于等于连续页码数的时候（正常情况）
        // continues向下取整
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // start为负数或0的时候（特殊情况） 我们需要纠正显示的分页
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 当end大于总页码的时候（特殊情况） 我们需要纠正显示的分页
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1
        }
      }
      return {start, end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
