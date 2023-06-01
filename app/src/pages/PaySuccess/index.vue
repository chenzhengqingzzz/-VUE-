<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-05-30 21:42:43
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-01 21:55:58
 * @FilePath: /shangpinhuishop/app/src/pages/PaySuccess/index.vue
 * @Description: 路由组件————支付成功(PaySuccess)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    /**
     * @description: 组件内守卫
     * @param {Route} to 即将要进入的目标路由对象
     * @param {Route} from 当前导航正要离开的路由
     * @param {*} next 跳转的行为
     * @return {*}
     */
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建

      // 根据条件决定是放行还是中断导航
      from.path == '/pay' ? next() : next(false)
    }
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;
    width: 1148px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;

        img {
          max-width: 100%;
          vertical-align: middle;
          border: 0;
          margin-right: 14px;
        }
      }

      .paydetail {
        margin-left: 66px;
        font-size: 15px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: #e1251b;
              border: 1px solid #e1251b;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>