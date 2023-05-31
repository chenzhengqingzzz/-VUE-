<!--
 * @Author: czqczqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-31 17:53:15
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-05-31 20:49:16
 * @FilePath: /shangpinhuishop/app/src/pages/Center/MyOrder/index.vue
 * @Description: 个人中心的子组件————我的订单(MyOrder)
 * 
 * Copyright (c) by czqczqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <!-- 右侧内容 -->
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- 每一个table是一组订单 -->
        <table class="order-item" v-for="(order, index) in myOrderList.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{order.createTime}}　订单编号：{{order.outTradeNo}}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" width="100px; height=100px"/>
                  <a href="#" class="block-text">{{cart.skuName}}</a>
                  <span>x{{cart.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- rowspan指的是表格的一列可跨越的行数 我们这里把它设置为商品的数量 让信息实现纵向跨越 -->
              <!-- 后面的用户信息只需要遍历第一次的结果就行 其他的都是多出来的 所以我们只让第一次的显示出来 让信息实现横向跨越 -->
              <template v-if="index == 0">
                  <td :rowspan="order.orderDetailList.length"  width="8%" class="center">{{order.consignee}}</td>
                  <td :rowspan="order.orderDetailList.length"  width="13%" class="center">
                    <ul class="unstyled">
                      <li>总金额</li>
                      <span style="color: red">￥{{order.totalAmount}}</span>
                      <li>在线支付</li>
                    </ul>
                  </td>
                  <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                    <a href="#" class="btn">{{order.orderStatusName}}</a>
                  </td>
                  <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                    <ul class="unstyled">
                      <li>
                        <a href="mycomment.html" target="_blank">评价|晒单</a>
                      </li>
                    </ul>
                  </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
          <!-- 分页器 -->
          <Pagination
            :pageNo="this.myOrderList.current"
            :pageSize="this.myOrderList.size"
            :total="this.page"
            :continues="this.limit"
            @getPageNo="getPageNo"
          />
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyOrder",
  mounted() {
    // 获取我的订单数据
    this.$store.dispatch('center/getMyOrderList')
  },
  methods: {
    /**
     * @description: 子组件Pagination通过自定义事件给父组件传递过来的当前页码
     * @param {*} receivedPageNo 从子组件接收到的当前页码
     * @return {*}
     */
    getPageNo(receivedPageNo){
      // 修改仓库中的page并发请求
      this.$store.dispatch('center/getMyOrderList', receivedPageNo)
    }
  },
  computed: {
    ...mapState('center', ['page', 'limit', 'myOrderList'])
  }
};
</script>

<style>
</style>