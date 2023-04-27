<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-04-27 16:59:16
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/components/TypeNav/index.vue
 * @Description: 全局组件——商品分类导航、三级联动菜单(TypeNav)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 鼠标离开h2和h3才会让currentIndex变回-1 以及离开或进入标题时h1的显示与隐藏 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition
          name="animate__animated animate__bounce"
          enter-active-class="animate__fadeIn"
          leave-active-class="animate__fadeOut"
        >
          <div class="sort" v-show="isShow">
            <!-- 事件委派 谁需要这个事件的回调就给谁用 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
import "animate.css";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: null,
      // 存储是否显示一二三级菜单的标识
      isShow: true,
    };
  },
  /**
   * @description: 组件挂载完毕：可以向服务器发送请求
   * @return {*}
   */
  mounted() {
    // 当路由调到search并且组件挂载完毕，让存放在data中的isShow属性变为false
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数将会立即执行一次
      // 注入一个参数state，其实即为大仓库的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    /**
     * @description: 鼠标进入修改响应式数据currentIndex 没有给这个函数做节流
     * @param {*} index 鼠标移上某一个一级分类的元素索引值
     * @return {*}
     */
    // changeIndex(index) {
    //   // 正常情况（用户慢慢地操作）：鼠标进入，每一个一级分类h3都会触发鼠标进入事件
    //   // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分的h3触发了
    //   // 就是因为用户行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，就会出现卡顿
    //   this.currentIndex = index;
    // },

    // es6写法无法操作lodash的对象“_” 所以我们必须用es5的key:value写法
    /**
     * @description: 三级联动菜单中一级分类选中的节流
     * @param {Function} 需要做节流的函数
     * @param {[wait=0]} 在 wait 秒内最多执行 Function 函数
     * @return {*}
     */
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    /**
     * @description: 一级分类鼠标移出事件的回调 在Search组件有额外效果：移出不显示
     * @return {*}
     */
    leaveShow() {
      // 直接调用上面的函数，传入null更改currentIndex
      this.changeIndex(null);
      // 判断如果是非Home组件的时候才会执行
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },

    /**
     * @description: 路由跳转到的Search组件的回调
     * @return {*}
     */
    goSearch(e) {
      // 最好的解决方案：编程式路由导航+事件委派
      // 利用事件委派存在的一些问题：1.点击的不一定是a标签 2.如何获取参数【1、2、3级分类的产品名字、id】
      // 我们需要点击a标签的时候才会进行路由跳转【怎么能确定点击的一定是a标签】
      // 即使我们能确定点击的是a标签，是如何区分一级、二级、三级的a标签呢
      // 第一个问题：把子节点当中的a标签，加上我们自定义的属性data-categoryName，其余子节点是没有的
      // ES6写法：解构
      // html中会把大写转为小写
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      //categoryname存在，表示为a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "Search" }; // 路由跳转的name
        let query = { categoryName: categoryname }; // 路由的query参数
        if (category1id) {
          // category1id一级a标签
          query.category1Id = category1id;
        } else if (category2id) {
          // category2id二级a标签
          query.category2Id = category2id;
        } else {
          // category3id三级a标签
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转带有了params参数，我们要捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数，将两个对象合二为一
          location.query = query;
          // 这样就可以携带query参数进行路由跳转操作
          this.$router.push(location);
        }
      }
    },

    /**
     * @description: 当鼠标移入的时候，让商品分类列表进行展示
     * @return {*}
     */
    enterShow() {
      this.isShow = true;
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
    // // 过渡动画的样式
    // // 过渡动画开始状态（进入）
    // .sort-enter {
    //   height: 461px;
    // }
    // // 定义动画时间、速率
    // .sort-enter-active {
    //   transition: all .5s linear;
    // }
  }
}
</style>
