<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像-->
      <div class="avatar_box">
        <img class="title" src="@/assets/404_images/404.png"/>
      </div>
      <!--表单-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">
        <!--用户名-->
        <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%"
                   @click.native.prevent="login">登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login } from '../../api/user'

export default {
  name: 'Login',
  data() {
    return {
      //表单的数据绑定对象 设置为admin 123456方便调试
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单的验证规则对象
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min:3, max: 12, trigger: 'blur', message: '长度在3到10个字符' }
          ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min:6, max: 15, trigger: 'blur', message: '长度在6到15个字符' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return
        }
        //直接使用axios （需要手动处理成功与失败）
        /*axios
          .post('/dev-api/vue-admin-template/user/login', this.loginForm)
          .then((response) => {
            const content = response.data
            console.log(content)
            if (content.code === 60204){
              alert(content.message)
            }else if (content.code === 20000){
              this.$store.dispatch('user/login', this.loginForm).then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
          }).catch((error) => {
          console.log(error)
        })*/

        //用封装的login (将失败进行封装，失败处理在@/utils/request.js里)
        const response = await login(this.loginForm)
        if (response.code === 20000){
          console.log(response)
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #E5E5E5;
  $light_gray: #2D3A4B;
  $cursor: #2D3A4B;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #FFFFFF;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-box{
    }
    .login-form {
      position: relative;
      width: 520px;
      height: 280px;
      max-width: 100%;
      padding: 10px;
      margin: 160px auto 0;
      border: 1px solid #ffffff;
      border-radius: 10px;
      background: #FFF;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .avatar_box {
      width: 100px;
      height: 100px;
      position: absolute;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      box-shadow: 0 0 10px #ddd;
      z-index: 1;

      .title {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
