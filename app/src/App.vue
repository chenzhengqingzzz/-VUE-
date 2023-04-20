<template>
  <div>
    <Header/>
    <!-- 路由组件展示的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>