<template>
    <div class="top_nav">
      <ul>
        <li>
          <span class="iconfont" :class="nav.icon"></span>
          <span>{{nav.title}}</span>
        </li>
        <li>
          <span>{{nav.subtitle}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "TopNav",
        props: {
          nav: {
            required: true,
            type: Object,
            default: {}
          }
        }
    }
</script>

<style scoped>
.top_nav{
  width: 100%;
  height: 40px;
  border: 1px solid #999;
  margin-bottom: 15px;
  font-size: 12px;
}
.top_nav ul{
   height: 100px;
   line-height: 40px;
   display: flex;
   padding: 0 15px;
   box-sizing: border-box;

 }
.top_nav ul li span.iconfont{
  vertical-align: top;
  display: inline-block;
  font-size: 23px;
}
.top_nav ul li:last-child::before{
  position: relative;
  left: 3px;
  right: 1px;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: '>>';
}
</style>
