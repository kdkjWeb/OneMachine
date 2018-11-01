<template>
    <div class="Home">
      <!-- 头部组件 -->
      <v-head></v-head>

      <!-- 左侧菜单栏组件 -->
      <vSlidebar></vSlidebar>

      <!-- 内容区域 -->
      <div id="content_wrap" :class="collapse? 'content_collapse' : 'content_box'">

        <!-- 路由内容区域 -->
        <div class="content">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>

      </div>
    </div>
</template>

<script>

    import vHead from './Header'    //引入头部组件
    import vSlidebar from './Slidebar' //引入左侧菜单组件
    import bus from './bus'  //引入中间件

    export default {
        name: "Home",
        components: {
          vHead,vSlidebar
        },
        data() {
          return {
            collapse: false,    //菜单栏折叠，内容区域是否跟着折叠
          }
        },
        created(){
          //内容区域是否折叠
          bus.$on('collapse', flag=>{
            this.collapse = flag
          })

        },
    }
</script>

<style scoped>
  .content_box{
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 175px;
    transition: all .3s ease-in;
    overflow-y: auto;
  }
  .content_collapse{
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 65px;
    transition: all .3s ease-in;
    overflow-y: auto;
  }
  .content{
    padding: 25px 20px 20px;
  }



  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
