<!-- 头部导航 -->
<template>
  <div class="header">
    <!-- start logo图片 -->
    <div class="logo"></div>
    <!-- end logo图片 -->

    <!-- start 标题 -->
    <h1 class="title">广告运营管理平台</h1>
    <!-- end 标题 -->

    <!-- start 右侧模块 -->
    <div class="right_model">
      <div>
        <span class="iconfont icon-yonghuming"></span>
        <p>您好！管理员</p>
      </div>
      <div @click="LoginOut">
        <span class="iconfont icon-084tuichu"></span>
        <p>退出</p>
      </div>
    </div>
    <!-- end 右侧模块 -->
  </div>
</template>

<script>
  import bus from './bus.js'
  export default {
    data(){
      return{
        show: false,
        userName: '测试账号',

      }
    },
    methods: {
      //退出登录
      LoginOut(){
        console.log('退出登录')
      },

    },

  }
</script>

<style scoped>
  .header{
    width: 100%;
    height: 50px;
    background: #383d41;
  }
  .logo{
    float: left;
    width: 127px;
    height: 100%;
    border-right: 1px solid #2c3135;
    background-image: url(../assets/images/header_logo.png);
    background-repeat: no-repeat;
    background-position: center;
  }
  .title{
    float: left;
    line-height: 50px;
    padding-left: 20px;
    color: #fff;
    font-size: 16px;
  }
  .right_model{
    display: flex;
    display: -webkit-flex;
    float: right;
    user-select: none;
    height: 100%;
    width: 260px;
    line-height: 50px;
    color: #fff;
  }
  .right_model div:first-child{
    flex: 4;
  }
  .right_model div:last-child{
    flex: 2;
  }
  .right_model span.iconfont{
    font-size: 20px;
  }
  .right_model p{
    display: inline-block;
    vertical-align: top;
    padding-right: 30px;
  }




  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
