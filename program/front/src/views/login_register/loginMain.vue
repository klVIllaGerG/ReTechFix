<template>
    <div :class="{ container: true, 'sign-up-model': vari }">
        <div class="inner-left-container">
            <div class="login-content">
                <h1 style="color: white;font-size: 90px;">ReTechFix</h1>
                <ElButton type="primary" @click="onClick" size="large" color="white" style="margin-top: 20%;margin-left: 30%;"> <el-text class="mx-1" type="primary">注册</el-text></ElButton>
            </div>
            <img src="@/assets/logo.png" class="image" >
        </div>
        <div class="inner-right-container">
            <div class="register-content">
                <h1 style="color: white;font-size: 90px;">ReTechFix</h1>
                <ElButton type="primary" @click="onClick" size="large" color="white" style="margin-top: 20%;margin-left: 30%;"> <el-text class="mx-1" type="primary">登录</el-text></ElButton>
            </div>
            <img src="@/assets/logo.png" class="image">
        </div>
        <div class="inner-sign-up-container">
            <login v-bind:class="{ 'sign-up-model' : vari }"></login>
            <register :class="{ 'sign-up-model' : vari }"></register>
        </div>
    </div>
  </template>
  
  <script >
  import login from '../login_register/login.vue'
  import register from '../login_register/regiser.vue'
  export default {
     components:
      {
        login,
        register
      },
      data()
      {
        return{
          vari:false,
          vari2:true
        };
      },
      methods:{
        onClick()
      {
        this.vari = !this.vari;
        this.vari2 = !this.vari2;
        
      }
      }
    }
 
  </script>
  <style scoped>

  .container {
    width: 100vw;
    height: 100vh;
    background-color: white;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    
  }
  .container::before {
    content: "";
    width: 2000px;
    height: 2000px;
    background-color: rgb(81, 168, 255);
    position: absolute;
    border-radius: 50%;
    transform: translateY(-50%);
    right: 48%;
    top: -10%;
    transition: 1.8s ease-in-out;
    z-index: 2;
  }
  .inner-left-container {
    width: 0;
    flex: 1;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    /* 上边|右边|下边|左边 */
    padding: 3rem 10% 2rem 10%;
    pointer-events: all;
  
  }
  .inner-right-container {
    width: 0;
    flex: 1;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    /* 上边|右边|下边|左边 */
    padding: 3rem 10% 2rem 10%;
    pointer-events: none;
  }
  .container .inner-right-container .register-content
  {
    transform: translateX(1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  .container .inner-right-container .image {
    width: 410px;
    height: 288px;
    transform: translateX(1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  
  }
  .container .inner-left-container .login-content
  {
    transform: translateX(0px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  .container .inner-left-container .image {
    width: 410px;
    height: 288px;
    
    transform: translate(380px,60px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  .image {
     width: 100%;
  }
  .inner-sign-up-container {
    width: 50%;
    height: 50%;
    position: absolute;
    right: 0;
    top: 10%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
    display: grid;
    grid-template-columns: 1fr;
  }
  
  /* 动画 */
  .container.sign-up-model::before {
    transform: translate(100%, -50%);
    transition: 1.8s ease-in-out;
    right: 52%;
  }
  
  .container.sign-up-model .inner-right-container .register-content
  {
    transform: translateX(0px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  .container.sign-up-model .inner-right-container .image {
    transform: translateX(-300px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  
  .container.sign-up-model .inner-left-container .login-content,
  .container.sign-up-model .inner-left-container .image {
    transform: translateX(-1000px);
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  
  .container.sign-up-model .inner-sign-up-container {
    width: 50%;
    height: 50%;
    top: 10%;
    right: 50%;
    transition: 1s ease-in-out;
    transition-delay: 0.5s;
  }
  
  .container.sign-up-model .inner-right-container {
    pointer-events: all;
  }
  
  .container.sign-up-model .inner-left-container {
    pointer-events: none;
  }
  
  </style>
  