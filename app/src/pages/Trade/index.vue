<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-25 20:09:59
 * @LastEditors: czqzzzzzz(czq)
 * @LastEditTime: 2023-05-26 21:03:24
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Trade/index.vue
 * @Description: 路由组件————交易结算(Trade)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(address, index) in userAddressList"
        :key="address.id"
      >
        <span class="username" :class="{ selected: address.isDefault == 1 }">{{
          address.consignee
        }}</span>
        <p @click="changeIsDefault(address, userAddressList)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(order, index) in orderInfo.detailArrayList"
          :key="skuId"
        >
          <li>
            <img
              :src="order.imgUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </li>
          <li>
            <p>{{ order.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ order.orderPrice }}</h3>
          </li>
          <li>X{{ order.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="customerMsg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ orderInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ orderInfo.originalTotalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ orderInfo.totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userDeliveryAddress.fullAddress }}</span>
        收货人：<span>{{ userDeliveryAddress.consignee }}</span>
        <span>{{ userDeliveryAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      // 收集买家的留言信息
      customerMsg: '',
      // 交易成功的dingdanhao 
      orderId: ''
    };
  },
  mounted() {
    this.$store.dispatch("trade/getUserAddressList");
    this.$store.dispatch("trade/getOrderInfo");
  },
  computed: {
    ...mapState("trade", ["userAddressList", "orderInfo"]),

    /**
     * @description: 页面右下角用户配送地址 和上面目前选中的地址信息有关
     * @return {Array}
     */
    userDeliveryAddress() {
      // 这里可以用filter（返回所有符合条件的参数并在外面包一个数组）或find（返回第一个符合条件的参数为对象）
      return this.userAddressList.find((item) => {
        return item.isDefault == 1;
      });
    },
  },
  methods: {
    /**
     * @description: 点击哪一个地址则会设置默认地址
     * @param {Object} address 点击的目标地址项
     * @param {Array} userAddressList 总的用户地址数组，其实也可以从组件中获取
     * @return {*}
     */
    changeIsDefault(address, userAddressList) {
      // 排他操作
      // 全部的isDefault为0
      userAddressList.forEach((item) => {
        item.isDefault = 0;
        // 点击的目标地址isDefault为1
        address.isDefault = 1;
      });
    },

    /**
     * @description: 提交订单
     * @return {*}
     */
    async submitOrder() {
      // 交易编号
      let { tradeNo } = this.orderInfo;
      // 带的其余6个参数 他们都会放在请求的data中
      let data = {
        consignee: this.userDeliveryAddress.consignee, // 最终收件人名字
        consigneeTel: this.userDeliveryAddress.phoneNum, // 最终收件人手机号
        deliveryAddress: this.userDeliveryAddress.fullAddress, // 最终收件地址
        paymentWay: "ONLINE", // 最终支付方式
        orderComment: this.customerMsg, // 顾客留言
        orderDetailList: this.orderInfo.detailArrayList // 最终购买的商品信息
      };
      // 我们尝试在写Pay组件的数据的时候，在组件内发请求而不借用Vuex 在main.js已经提前引入好了api的函数
      let result = await this.$API.reqSubmitOrder(tradeNo, data);
      if (result.code === 200) {
        // 提交订单成功
        this.orderId = result.data
        // 路由跳转+传参 模板字符串写法
        // this.$router.push(`/pay?${this.orderId}`)
        // 路由跳转+传参 对象写法
        this.$router.push({
          name: 'Pay',
          query: {
            orderId: this.orderId
          }
        })
      }else{
        // 提交订单失败
        alert(result.message)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
