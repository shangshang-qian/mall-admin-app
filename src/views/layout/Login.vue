<template>
    <a-form-model
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginForm.email" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      const emailReg = /^[\w-]+@[\w.-]+.com$/;
      if (value === '') {
        callback(new Error('请输入邮箱！'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式错误'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！')); // 为什么在这里的箭头函数，我并没有return就不报错呢？
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .login(this.loginForm).then((res) => {
              this.$store.dispatch('toggleInfo', res);
              this.$router.push({
                name: 'Home',
              });
            }).catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        console.log('submit error');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
#app .login-form {
  width: 40vw;
  height: 30vw;
  margin: 10vw auto;
}
</style>
