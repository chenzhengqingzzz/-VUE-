<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-14 21:40:15
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-17 16:46:42
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/ShopCart/index.vue
 * @Description: 路由组件——购物车(ShopCart)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('decrement', -1, cartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cartInfo.skuNum"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a href="javascript:void(0)" class="plus" @click="handler('increment', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckAll"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    /**
     * @description: 获取个人购物车数据（每个人的购物车数据都应该是不一样的）
     * @return {*}
     */
    getData() {
      this.$store.dispatch("shopcart/getCartList");
    },
    
    /**
     * @description: 通过各种方式修改商品数量 由于多次点击会出现不正常的情况 我们需要加入节流阀
     * @param {String} flag 根据传入的标识 来区分我们点击的是加号(increment)、减号（decrement）还是编辑数量(change)
     * @param {Number} disNum 加:变化量1 减:变化量-1 input:最终的个数（并不是变化量）
     * @param {Object} cartInfo 被操作的商品的信息 身上有id、产品数量（skuNum）
     * @return {*}
     */
    handler: throttle(function(flag, disNum, cartInfo){
      // 区分传入的flag
      switch (flag) {
        case 'increment':
          // 带给服务器变化的量
          disNum = 1
          break;
        case 'decrement':
          // 判断产品的个数大于1时，才可以给服务器传递-1 如果小于等于1则传递给服务器0(原封不动)
          disNum = cartInfo.skuNum > 1 ? -1 : 0
          break;
        case 'change': 
          // 如果用户最终输入了非法字符（带汉字），则应该不变我们的disNum
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          }else{
            // 特殊情况：遇到小数我们需要取整 既然我们在input框传入的disNum是最终的数量 则我们带给服务器的商品变化量则要经过计算
            disNum = Math.floor(disNum) - cartInfo.skuNum
          }
          // 三元表达式简写：
          // disNum = (isNaN(disNum) || disNum < 1) ? 0 : Math.floor(disNum) - cartInfo.skuNum
          break;
      }
      // 带着修改后的商品数量派发action
      this.$store.dispatch('detail/getAddOrUpdateShopCart', {skuId: cartInfo.skuId, skuNum: disNum}).then(
        // 成功时，再一次获取服务器最新的数据进行展示
        this.getData
        // 发请求失败的回调
      ).catch(err => console.log(err))
    }, 100)
  },
  computed: {
    // 获取仓库中的数据
    ...mapGetters("shopcart", ["cartList"]),

    /**
     * @description: 计算出来的购物车商品数据 这个数组里面放的是我们一个个购物车的商品
     * @return {Array}
     */
    cartInfoList() {
      return this.cartList.cartInfoList || [];

    },
    /**
     * @description: 通过商品信息里的isChecked来计算购物车中商品的总价
     * @return {Number}
     */
    totalPrice() {
      // 使用filter方法筛选isChecked为1的对象，然后使用reduce方法计算skuPrice属性并累加到num中
      let num = this.cartInfoList.filter((obj) => {
        return obj.isChecked === 1
      }).reduce((accumulator, obj) => {
        return accumulator + obj.skuPrice
      }, 0)
      // 简写方式
      // let num = this.cartInfoList.filter(obj => obj.isChecked === 1).reduce((acc, obj) => acc + obj.skuPrice, 0)
      console.log(num);
    },

    /**
     * @description: 判断底部全选的复选框是否应该勾上【全部产品都选中才勾选】
     * @return {Boolean}
     */
    isCheckAll(){
      // every方法用于遍历数组的每一个元素 return后面跟条件 如果每一个元素都满足条件则会返回true
      return this.cartInfoList.every((obj) => {
        return obj.isChecked == 1
      })
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
