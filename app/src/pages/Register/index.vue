<!--
 * @Author: czqzzzzzz(czq)
 * @Email: tenchenzhengqing@qq.com
 * @Date: 2023-04-23 17:02:24
 * @LastEditors: 陈正清MacPro
 * @LastEditTime: 2023-06-04 14:45:25
 * @FilePath: /shangpinhuishop/app/src/pages/Register/index.vue
 * @Description: 路由组件——注册(Register)
 * 
 * Copyright (c) 2023 by czqzzzzzz(czq), All Rights Reserved. 
-->
<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3 class="title">
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <el-form
        :rules="rules"
        :model="formData"
        status-icon
        ref="formData"
        class="content"
        label-width="80px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入验证码"
            autocomplete="off"
          ></el-input>
          &nbsp;
          <el-button type="primary" size="medium" @click="getCode"
            >获取验证码</el-button
          >
          <!-- <img ref="code" src="http://gmall-h5-api.atguigu.cn/api/user/passport/code" alt="code"> -->
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="formData.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="formData.confirmPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-switch
            v-model="formData.agree"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已阅读并同意《尚品汇用户协议》"
          ></el-switch>
        </el-form-item>
        <div class="button-container">
          <el-button type="warning" round @click="resetForm('formData')"
            >重置注册信息</el-button
          >
          <el-button type="success" round @click="userRegister('formData')"
            >完成注册</el-button
          >
        </div>
      </el-form>
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
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    /**
     * @description: 自定义校验规则————密码
     * @param {Object} rule 约定的验证规则
     * @param {String} value 当前表单元素的值
     * @param {Function} callback 个人理解：类似于路由跳转中next的作用
     * @return {*}
     */
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      else if(value.length > 16 || value.length < 6){
        callback(new Error("请输入6~16位的字符"))
      } else {
        // 如果输入密码符合要求，则跳到校验确认密码那一项并且此次校验通过
        if (this.formData.confirmPassword !== "") {
          this.$refs.formData.validateField("confirmPassword");
        }
        callback();
      }
    };

    /**
     * @description: 自定义校验规则————确认密码
     * @param {Object} rule 约定的验证规则
     * @param {String} value 当前表单元素的值
     * @param {Function} callback 个人理解：类似于路由跳转中next的作用
     * @return {*}
     */
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    /**
     * @description: 自定义校验规则————是否同意用户协议
     * @param {Object} rule 约定的验证规则
     * @param {Boolean} value 当前表单元素的值
     * @param {Function} callback 个人理解：类似于路由跳转中next的作用
     * @return {*}
     */
    var validateButton = (rule, value, callback) => {
      if (value == false) {
        callback(new Error("请同意用户协议"));
      } else {
        callback();
      }
    };
    return {
      // 存储表单的数据
      formData: {
        // 收集表单数据————手机号
        phone: "",
        // 收集表单数据————验证码
        code: "",
        // 收集表单数据————登录密码
        password: "",
        // 收集表单数据————确认密码
        confirmPassword: "",
        // 收集表单数据————是否同意协议
        agree: true,
      },

      // 具体的表单元素验证规则 其中密码、确认密码、开关按钮都包含自定义校验规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号必须为11个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码必须为6个字符", trigger: "blur" },
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
        confirmPassword: [
          {
            required: true,
            validator: validateConfirmPassword,
            trigger: "blur",
          },
        ],
        agree: [
          { required: true, validator: validateButton, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    /**
     * @description: 获取用户的验证码
     * @return {*}
     */
    async getCode() {
      try {
        // 简单判断一下
        // 解构赋值
        const { phone } = this.formData;
        // 判断 如果有phone 则执行dispatch 如果没有就不执行任何操作
        phone &&
          (await this.$store.dispatch("user/getCode", this.formData.phone));
        // 将组件的code属性变为仓库中的验证码[验证码直接自己填写 正常开发应该是要用户看手机输入]
        this.formData.code = this.$store.state.user.code;
      } catch (error) {
        alert(error);
      }
    },

    /**
     * @description: 点击完成注册的回调 用的是当前组件存储的数据
     * @return {*}
     */
    // async userRegister() {
    //   try {
    //     // 如果成功 则进行路由跳转
    //     const { phone, code, password, confirmPassword } = this.formData;
    //     // dispatch的条件
    //     if (phone && code && password == confirmPassword) {
    //       await this.$store.dispatch("user/userRegister", {
    //         phone,
    //         code,
    //         password,
    //       });
    //       this.$router.push("/login");
    //     }
    //   } catch (error) {
    //     alert(error);
    //   }
    // },
    /**
     * @description: 点击完成注册的回调 用的是elementUI验证表单的逻辑
     * @param {Object} formData 存放在当前组件中的数据
     * @return {*}
     */
    userRegister(formData) {
      const { phone, code, password } = this.formData;
      this.$refs[formData].validate((valid) => {
        // 表单符合规则，代表验证成功 则发请求以及处理错误
        if (valid) {
          this.$store.dispatch("user/userRegister", { phone, code, password })
            .then((res) => {
              // 提醒用户注册成功并进行路由跳转
              alert('注册成功，请尽快登录吧！')
              this.$router.push("/login");
            })
            .catch((err) => {
              // 提醒用户出现错误并对该表单项进行重置
              this.resetForm(formData)
              alert(err);
            });
        } else {
          // 不符合规则，则显示错误
          return false;
        }
      });
    },

    /**
     * @description: 重置表单的方法 将其值重置为初始值并移除校验结果
     * @param {*} formData 被重置的表单元素
     * @return {*}
     */
    resetForm(formData){
      // 使用ElementUI提供的方法 resetFields
      this.$refs[formData].resetFields();
    }
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    /* 添加背景色和边框样式 */
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      /* 调整标题样式 */
      background: #ececec;
      margin: 0;
      padding: 10px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20px;
      line-height: 1.5;
    }

    .el-input {
      width: 200px;
    }
    /* 调整输入框的样式 */
    .content {
      margin-top: 40px;
      margin-bottom: 20px;
      label {
        width: 80px;
        text-align: right;
        display: inline-block;
        margin-right: 10px;
      }

      input[type="text"],
      input[type="password"] {
        width: 200px;
        height: 30px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
      }
    }

    /* 调整按钮容器样式 */
    .button-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    /* 调整按钮的样式 */
    .btn {
      text-align: center;
      margin-top: 20px;

      button {
        width: 120px;
        height: 36px;
        background-color: #e1251b;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
    }
  }

  /* 调整底部版权信息的样式 */
  .copyright {
    margin-top: 40px;
    text-align: center;
    line-height: 24px;
    color: #999;

    ul {
      li {
        display: inline-block;
        margin: 0 10px;
        padding: 0 5px;
        border-right: 1px solid #ccc;
      }
      li:last-child {
        border-right: none;
      }
    }

    .address {
      margin-top: 10px;
    }

    .beian {
      margin-top: 10px;
    }
  }
}

/* 调整“我有账号，去登陆”部分的样式 */
.register-container .go {
  font-size: 14px;
  float: right;
  margin-top: 10px;
}

.register-container .go a {
  color: #e1251b;
  text-decoration: none;
}

.register-container .go a:hover {
  text-decoration: underline;
}

.register-container .register .title {
  width: 100%; /* 或者根据需要设置具体的宽度值，例如 'width: 400px;' */
}
</style>
