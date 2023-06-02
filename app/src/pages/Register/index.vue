<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: 陈正清macbook pro
 * @LastEditTime: 2023-06-02 15:22:12
 * @FilePath: /尚硅谷VUE项目实战——尚品汇/app/src/pages/Register/index.vue
 * @Description: 路由组件——注册(Register)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="年龄"
          prop="phone"
          :rules="[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]"
        >
          <el-input v-model.number="formData.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button style="width:100px;height:38px" @click="getCode">获取验证码</button>
        <!-- <img ref="code" src="http://gmall-h5-api.atguigu.cn/api/user/passport/code" alt="code"> -->
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="confirmPassword">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        formData: {
          // 收集表单数据————手机号
          phone: '',
          // 收集表单数据————验证码
          code: '',
          // 收集表单数据————登录密码
          password: '',
          // 收集表单数据————确认密码
          confirmPassword: '',
          // 收集表单数据————是否同意协议
          agree: true
        }
      }
    },
    methods: {
      /**
       * @description: 获取用户的验证码
       * @return {*}
       */
      async getCode(){
        try {
          // 简单判断一下
          // 解构赋值
          const {phone} = this
          // 判断 如果有phone 则执行dispatch 如果没有就不执行任何操作
          phone && await this.$store.dispatch('user/getCode', this.phone)
          // 将组件的code属性变为仓库中的验证码[验证码直接自己填写 正常开发应该是要用户看手机输入]
          this.code = this.$store.state.user.code
        } catch (error) {
          alert(error)
        }
      },

      /**
       * @description: 点击完成注册的回调 用的是当前组件存储的数据
       * @return {*}
       */
      async userRegister(){
        try {
          // 如果成功 则进行路由跳转
          const {phone, code, password, confirmPassword} = this
          // dispatch的条件
          if (phone && code && password == confirmPassword) {
            await this.$store.dispatch('user/userRegister', {phone, code, password})
            this.$router.push('/login')
          }
        } catch (error) {
          alert(error)
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>