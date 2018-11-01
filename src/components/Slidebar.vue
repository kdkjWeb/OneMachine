<!--左侧菜单栏组件-->
<template>
  <div :class="collapse ? 'sidebar_collapse':'sidebar'">
    <!-- start菜单栏是否折叠按钮 -->
    <div class="slide">
      <span class="iconfont icon-webicon03-copy" @click="colapaseChange"></span>
    </div>
    <!-- end菜单栏是否折叠按钮 -->

    <!-- start菜单栏 -->
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="collapse" :collapse-transition="false" router  background-color="#42475b" text-color="#fff">
      <template v-for="item in routerItem">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{subItem.title}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <!-- end菜单栏 -->
  </div>
</template>

<script>
  import bus from './bus.js'   //引入公共中间件
  export default {
    name: 'Slidebar',
    data(){
      return{
        collapse: false,   //菜单栏是否折叠
        routerItem: [
          {
            icon: 'icon-shangsheng4',
            index: 'index',
            title: '运营统计'
          }
        ]
      }
    },
    computed:{
      //匹配选中路由
      onRoutes(){
        return this.$route.path.replace('/','')
      }
    },
    methods: {
      //点击菜单栏是否折叠按钮
      colapaseChange(){
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse)
      }
    }
  }
</script>

<style>
  .el-menu-vertical-demo i.iconfont{
    font-size: 20px;
    padding-right: 6px;
    vertical-align: middle;
  }
</style>



<style scoped>
  .el-menu{
    border: none;
  }
  .sidebar{
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 99;
    width: 175px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
  }
  .sidebar_collapse{
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 99;
    width: 65px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
  }
  .slide{
    width: 100%;
    height: 30px;
    background-color: #4b5064;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .slide span{
    font-size: 20px;
    cursor: pointer;
  }


</style>
