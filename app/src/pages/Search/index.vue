<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-23 17:41:43
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Search/index.vue
 * @Description: 路由组件——搜索(Search)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div>
    我是搜索
    <h1>params参数---{{$route.params.keyWord}}</h1>
    <h1>query参数---{{$route.query.k}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['keyWord', 'k']
}
</script>

<style>

</style>