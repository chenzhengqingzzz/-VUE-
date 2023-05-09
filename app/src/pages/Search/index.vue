<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-09 18:10:33
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Search/index.vue
 * @Description: 路由组件——搜索(Search)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div>
    <!-- 商品分类三级联动列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 面包屑 全部结果这边的小叉叉标签 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类categoryName的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeBreadCategoryName">×</i>
            </li>
            <!-- 关键字keyword的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeBreadKeyword">×</i>
            </li>
            <!-- 品牌trademark的面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeBreadTrademark">×</i>
            </li>
            <!-- 商品属性attrId、attrName、attrValue的面包屑 由于props是数组 里面有多个元素的时候我们需要遍历生成多个面包屑 -->
            <li
              class="with-x"
              v-for="(attrItem, index) in searchParams.props"
              :key="attrItem.attrId"
            >
              <!-- 删除面包屑 我们传入被删除的那个项 -->
              {{ attrItem.split(":")[1]
              }}<i @click="removeBreadAttr(attrItem)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件 @事件名="事件回调名" -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 商品排序 -->
              <ul class="sui-nav">
                <!-- 表示当前这个属性里面包含1这个标识的时候赋予其active这个类名 -->
                <!-- 这里isOrderOne、isOrderTwo、isOrderAsc、isOrderDesc是计算属性，如果不使用计算属性，就要在页面中写很长的代码-->
                <li :class="{ active: isOrderOne }" @click="changeOrder('1')">
                  <!-- 使用了ElementUI组件库 -->
                  <a
                    >综合
                    <span
                      :class="{
                        'el-icon-top': isOrderAsc,
                        'el-icon-bottom': isOrderDesc,
                      }"
                      v-show="isOrderOne"
                    ></span
                  ></a>
                </li>
                <!-- 表示当前这个属性里面包含2这个标识的时候赋予其active这个类名 -->
                <li :class="{ active: isOrderTwo }" @click="changeOrder('2')">
                  <!-- 使用了ElementUI组件库 -->
                  <a
                    >价格
                    <span
                      :class="{
                        'el-icon-top': isOrderAsc,
                        'el-icon-bottom': isOrderDesc,
                      }"
                      v-show="isOrderTwo"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="27" :pageSize="3" :total="91" :continues="5"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 产品相应的Id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        // 产品的名字
        categoryName: "",
        // 搜索的关键字
        keyword: "",
        // 排序 初始状态应该是综合|降序
        order: "1:desc",
        // 第几页
        pageNo: 1,
        // 每一页展示条数
        pageSize: 3,
        // 平台属性的操作
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 在组件挂载完毕之前执行一次 于mounted之前修改data中的数据
  created() {
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword

    /**
     * @description: ES6新增语法，合并对象
     * @return {*}
     */
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在发请求之前带给服务器的参数【searchParams参数发生变化】
    this.getData(this.searchParams);
  },
  computed: {
    // 使用命名空间的简化写法
    // ...mapState('search', {
    //   goodsList: state => state.searchList.goodsList
    // })

    // 使用getters的简化写法 需要提前在仓库中配置好 第一个参数为命名空间 第二个为对应的getters
    ...mapGetters("search", ["goodsList"]),

    /**
     * @description: 判断data中order这个属性里面有没有1这个标识 1代表选中综合
     * @return {Boolean} 用于class-active的布尔值
     */
    isOrderOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },

    /**
     * @description: 判断data中order这个属性里面有没有2这个标识 2代表选中价格
     * @return {Boolean} 用于class-active的布尔值
     */
    isOrderTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },

    /**
     * @description: 判断data中order这个属性里面有没有asc这个标识 asc代表选升序 箭头向上
     * @return {*} 用于class-top的布尔值
     */
    isOrderAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },

    /**
     * @description: 判断data中order这个属性里面有没有desc这个标识 desc代表选降序 箭头向下
     * @return {Boolean} 用于class-bottom的布尔值
     */
    isOrderDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    /**
     * @description: 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
     * 把这个请求封装成一个函数，当需要发请求的时候调用即可
     * @return {Object}
     */
    getData(params) {
      // 派发action
      this.$store.dispatch("search/getSearchList", params);
    },

    /**
     * @description: 删除面包屑中分类名字的回调
     * @return {*}
     */
    removeBreadCategoryName() {
      // 和watch那里一样 把带给服务器的参数置空
      // 后台规定，带给服务器的参数是可有可无的，如果属性值为空的字符串还是会把相应的字段带给服务器
      // 如果把字段变成undefined，当前这个字段就不会返回给服务器
      this.searchParams.categoryName = "" || undefined;
      this.searchParams.category1Id = "" || undefined;
      this.searchParams.category2Id = "" || undefined;
      this.searchParams.category3Id = "" || undefined;
      // 路由参数变，watch里面会自动发请求，所以不需要额外发请求
      // this.getData(this.searchParams);
      // 地址栏也需要修改：进行路由跳转(自己跳自己)
      // 路由中包含params参数的情况
      if (this.$route.params) {
        this.$router.push({ name: "Search", params: this.$route.params });
      }
    },

    /**
     * @description: 删除面包屑中关键字的回调
     * @return {*}
     */
    removeBreadKeyword() {
      // 给服务器带的searchParams中的keyword属性置空
      this.searchParams.keyword = "" || null;
      // 这里也不需要额外发送请求，因为下面已经对路由进行了操作
      // this.getData(this.searchParams)
      // 既然用户都点击删除了关键字产生的面包屑，咱们自然而然应该清空搜索框的文字（v-model绑定了Header组件）
      // 使用全局事件总线通知兄弟组件Header清除keyword
      this.$bus.$emit("clearKeyword");
      // 进行路由的跳转
      // 地址栏也需要修改：进行路由跳转(自己跳自己)
      // 路由中包含query参数的情况
      if (this.$route.query) {
        this.$router.push({ name: "Search", query: this.$route.query });
      }
    },

    /**
     * @description: 子组件通过自定义事件给父组件传递过来的品牌数据
     * @param {*} trademark 子组件传入的对象
     * @return {*}
     */
    trademarkInfo(trademark) {
      // 整理品牌字段参数 "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求 带刚刚拼接好的参数传给服务器 以达到搜索目的
      // 不需要判断是因为我们没有修改路由 不会引起watch的回调函数执行
      this.getData(this.searchParams);
    },

    /**
     * @description: 删除面包屑中品牌信息的回调
     * @return {*}
     */
    removeBreadTrademark() {
      // 置空
      // 这里如果用undefined或者null的话 由于v-show只是隐藏而不是销毁结构，所以会引起控制台警告 但是如果像我这样用空字符串的话不利于性能节省
      this.searchParams.trademark = "";
      // 再次发请求
      this.getData(this.searchParams);
    },

    /**
     * @description: 子组件通过自定义事件给父组件传递过来的商品属性数据
     * @param {*} attrId 子组件传过来的商品属性ID
     * @param {*} attrValue 子组件传过来的商品属性值
     * @param {*} attrName 子组件传过来的商品属性名
     * @return {*}
     */
    attrInfo(attrId, attrName, attrValue) {
      // 整理参数格式 ["属性ID:属性值:属性名"]
      const propElement = `${attrId}:${attrValue}:${attrName}`;
      // 由于props是数组 我们每次push之前需要进行判断是否有重复元素
      if (this.searchParams.props.indexOf(propElement) == -1) {
        this.searchParams.props.push(propElement);
        // 再次发请求 带刚刚拼接好的参数传给服务器 以达到搜索目的
        this.getData(this.searchParams);
      }
    },

    /**
     * @description: 删除面包屑中商品属性的回调
     * @param {*} index 由于我们遍历了多个 所以删除的时候要传入被删除的那个元素的索引值
     * @return {*}
     */
    removeBreadAttr(deletedPropElement) {
      // 以被删除的数组元素为依据 并用数组过滤方法实现
      this.searchParams.props = this.searchParams.props.filter((element) => {
        return element != deletedPropElement;
      });
      //  再次发请求
      this.getData(this.searchParams);

      // 以索引值为删除的依据
      // this.searchParams.props.splice(index, 1);
      // this.getData(this.searchParams);
    },

    /**
     * @description: 排序的操作
     * @param {*} flag 它是一个标记 代表用户点击的是综合（1）还是价格（2）【用户点击的时候传递】
     * @return {*}
     */
    changeOrder(flag){
      // 读取存放在data中的order
      let originOrder = this.searchParams.order
      let originFlag = originOrder.split(':')[0] // 1 或 2
      let originSort = originOrder.split(':')[1] // desc 或 asc
      let newOrder = ''
      // 判断的是多次点击的是不是同一个标签
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == 'desc'? 'asc': 'desc'}`
      }else{
        // 这是每次点击另一个标签会走的判断
        newOrder = `${flag}:${'desc'}` // 这里走完之后 下面会重新赋值 会引起originOrder、originFlag的变化，则如果我们点击了一次价格 下一次点击的话会走上面的if判断
      }
      // 将newOrder赋给searchParams 我们下一次进入这个函数的时候 originOrder、originFlag可能会是新的值
      this.searchParams.order = newOrder
      // 再次发请求
      this.getData(this.searchParams)
    }
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    /**
     * @description: 监听路由的信息是否发生改变 如果发生变化则再次发请求
     * @param {*} newVal 发生变化后的$route
     * @param {*} oldVal 发生变化前的$route
     * @return {*}
     */
    $route(newVal, oldVal) {
      // 这里面数据结构简单，不需要使用深度监听
      // 再次发请求之前，我们需要整理带给服务器的参数
      Object.assign(this.searchParams, newVal.params, newVal.query);
      // 再次发请求
      this.getData(this.searchParams);
      // 每一次请求完毕，应该把相应的1、2、3级分类的id置空，让他能接受下一次相应的id
      this.searchParams.category1Id = "" || undefined;
      this.searchParams.category2Id = "" || undefined;
      this.searchParams.category3Id = "" || undefined;
      // 下一次点击其他分类的时候清空关键词 因为不知道用户在搜索之后会点击哪个分类
      // 另外这里如果为undefined可能会导致removeCategoryName的路由跳转出现异常 所以用null占位
      // 这句代码需要注释 不然在我们清除面包屑的时候会连同query一起删除
      // this.$route.params.keyword = "" || null;
      // 为什么categoryName为什么不用置空？
      // 因为每一次路由发生变化的时候，这个属性值会发生变化
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
